// Global variables to store data and DataTable instance
let globalData = [];
let dataTable;

// Format number with commas (e.g., 50000 => 50,000)
function formatNumber(number) {
    if (number === undefined || number === null || number === '') {
        return '';
    }
    const str = number.toString();
    if (!str) return '';
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Parse CSV string into array of objects
function parseCSV(csv) {
    console.log('[parseCSV] raw length:', csv?.length);
    const lines = csv.split('\n');
    console.log('[parseCSV] total lines:', lines.length);
    // Normalize headers and strip any BOM on first header
    let headers = lines[0].split(',').map(header => header.trim());
    if (headers.length > 0) {
        headers[0] = headers[0].replace(/^\uFEFF/, '');
    }
    console.log('[parseCSV] headers:', headers);
    
    const rows = lines.slice(1)
        .filter(line => line.trim() !== '')
        .map((line, idx) => {
            // Handle commas within quoted strings
            const values = [];
            let inQuotes = false;
            let currentValue = '';
            
            for (let char of line) {
                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(currentValue.trim());
                    currentValue = '';
                } else {
                    currentValue += char;
                }
            }
            values.push(currentValue.trim());
            
            if (values.length !== headers.length) {
                console.warn('[parseCSV] values/header length mismatch at row', idx + 2, 'values:', values, 'line:', line);
            }

            // Create object from headers and values
            const rowObject = headers.reduce((obj, header, index) => {
                obj[header] = values[index] !== undefined ? values[index] : '';
                return obj;
            }, {});

            // Ensure expected fields exist even if CSV row was short
            if (rowObject['languages_spoken'] === undefined) rowObject['languages_spoken'] = '';
            if (rowObject['median_disposable_income'] === undefined) rowObject['median_disposable_income'] = '';
            if (rowObject['median_discretionary_income'] === undefined) rowObject['median_discretionary_income'] = '';
            return rowObject;
        });

    console.log('[parseCSV] parsed rows:', rows.length, rows[0]);
    return rows;
}

// Get unique languages from the data
function getUniqueLanguages(data) {
    console.log('[getUniqueLanguages] input rows:', data?.length);
    const languagesSet = new Set();
    data.forEach((row, idx) => {
        // Split by both comma and semicolon to handle different separators
        const spoken = row && row['languages_spoken'];
        if (spoken === undefined) {
            console.warn('[getUniqueLanguages] languages_spoken undefined at index', idx, row);
        }
        const languages = (spoken ? String(spoken) : '').split(/[,;]/).map(lang => lang.trim());
        languages.forEach(lang => {
            if (lang) languagesSet.add(lang);
        });
    });
    const list = Array.from(languagesSet).sort();
    console.log('[getUniqueLanguages] unique languages count:', list.length, list);
    return list;
}

// Populate language dropdown
function populateLanguageDropdown(languages) {
    console.log('[populateLanguageDropdown] populating', languages.length, 'languages');
    const dropdown = document.getElementById('languageFilter');
    if (!dropdown) {
        console.warn('[populateLanguageDropdown] #languageFilter not found');
        return;
    }
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        dropdown.appendChild(option);
    });
}

// Assign ranks based on discretionary income
function assignRanks(data) {
    console.log('[assignRanks] input rows:', data?.length);
    // Create a copy of the data and sort by discretionary income
    const sortedData = [...data].sort((a, b) => 
        (parseInt(b['median_discretionary_income']) || 0) - (parseInt(a['median_discretionary_income']) || 0)
    );
    
    // Assign ranks and store in original data objects
    sortedData.forEach((item, index) => {
        const originalItem = data.find(d => 
            d.city_name === item.city_name && 
            d.country === item.country
        );
        if (originalItem) {
            originalItem.rank = index + 1;
        }
    });
    console.log('[assignRanks] top row:', data[0]);
    
    return data;
}

// Filter data by selected language
function filterByLanguage(language) {
    console.log('[filterByLanguage] selected language:', language);
    if (!language) {
        return globalData;
    }
    const filtered = globalData.filter(row => {
        const spoken = row['languages_spoken'];
        const languages = (spoken ? String(spoken) : '').split(/[,;]/).map(lang => lang.trim());
        return languages.includes(language);
    });
    console.log('[filterByLanguage] filtered count:', filtered.length);
    return filtered;
}

// Update table with filtered data
function updateTable(filteredData) {
    console.log('[updateTable] rendering rows:', filteredData.length);
    if (dataTable) {
        console.log('[updateTable] destroying previous DataTable instance');
        dataTable.destroy();
    }

    const tbody = document.querySelector('table tbody');
    if (!tbody) {
        console.warn('[updateTable] table tbody not found');
        return;
    }
    tbody.innerHTML = '';

    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6">No cities found for the selected language.</td>
            </tr>
        `;
        return;
    }

    // Find the highest discretionary income
    const highestDiscretionary = Math.max(...filteredData.map(row => 
        parseInt(row['median_discretionary_income']) || 0
    ));
    console.log('[updateTable] highest discretionary income:', highestDiscretionary);

    filteredData.forEach(row => {
        const tr = document.createElement('tr');
        // Add highlight class if this row has the highest discretionary income
        if ((parseInt(row['median_discretionary_income']) || 0) === highestDiscretionary) {
            tr.classList.add('highlight');
        }
        tr.innerHTML = `
            <td>${row.rank ?? ''}</td>
            <td>${row['city_name'] ?? ''}</td>
            <td>${row['country'] ?? ''}</td>
            <td>${formatNumber(row['median_disposable_income'])}</td>
            <td>${formatNumber(row['median_discretionary_income'])}</td>
            <td>${row['languages_spoken'] ? row['languages_spoken'] : ''}</td>
        `;
        tbody.appendChild(tr);
    });

    // Reinitialize DataTable
    if (typeof $ === 'undefined' || !$('#incomeTable').length) {
        console.warn('[updateTable] DataTables not initialized: missing jQuery or #incomeTable');
        return;
    }
    dataTable = $('#incomeTable').DataTable({
        "order": [],
        "pageLength": 50,
        "columnDefs": [
            { "orderable": true, "targets": "_all" },
            { 
                "targets": [3, 4],
                "render": function(data, type) {
                    if (type === 'sort') {
                        const numeric = parseFloat(String(data || '').replace(/,/g, ''));
                        return isNaN(numeric) ? 0 : numeric;
                    }
                    return data ?? '';
                }
            }
        ]
    });
    console.log('[updateTable] DataTable initialized with', filteredData.length, 'rows');
}

// Fetch data and populate table
async function fetchData() {
    console.log('[fetchData] start');
    try {
        const response = await fetch('data.csv');
        console.log('[fetchData] response.ok:', response.ok, 'status:', response.status);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const csvText = await response.text();
        console.log('[fetchData] csvText length:', csvText.length);
        globalData = parseCSV(csvText);
        console.log('[fetchData] parsed globalData length:', globalData.length);
        
        // Assign ranks based on discretionary income
        globalData = assignRanks(globalData);
        
        // Populate language dropdown
        const languages = getUniqueLanguages(globalData);
        populateLanguageDropdown(languages);

        // Initialize table with all data
        updateTable(globalData);

        // Add event listener for language filter
        const languageFilterEl = document.getElementById('languageFilter');
        if (languageFilterEl) {
            console.log('[fetchData] attaching change listener to #languageFilter');
            languageFilterEl.addEventListener('change', (e) => {
                const filteredData = filterByLanguage(e.target.value);
                updateTable(filteredData);
            });
        } else {
            console.warn('[fetchData] #languageFilter not found');
        }

    } catch (error) {
        console.error('Error loading data:', error);
        const tbody = document.querySelector('table tbody');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6">Error loading data. Please try again later.</td>
                </tr>
            `;
        } else {
            console.warn('[fetchData] table tbody not found to show error message');
        }
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', fetchData);