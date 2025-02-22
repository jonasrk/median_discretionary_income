// Global variables to store data and DataTable instance
let globalData = [];
let dataTable;

// Format number with commas (e.g., 50000 => 50,000)
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Parse CSV string into array of objects
function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
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
        
        // Create object from headers and values
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {});
    });
}

// Get unique languages from the data
function getUniqueLanguages(data) {
    const languagesSet = new Set();
    data.forEach(row => {
        const languages = row['languages_spoken'].split(';').map(lang => lang.trim());
        languages.forEach(lang => languagesSet.add(lang));
    });
    return Array.from(languagesSet).sort();
}

// Populate language dropdown
function populateLanguageDropdown(languages) {
    const dropdown = document.getElementById('languageFilter');
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        dropdown.appendChild(option);
    });
}

// Filter data by selected language
function filterByLanguage(language) {
    if (!language) {
        return globalData;
    }
    return globalData.filter(row => 
        row['languages_spoken'].split(';').map(lang => lang.trim()).includes(language)
    );
}

// Update table with filtered data
function updateTable(filteredData) {
    if (dataTable) {
        dataTable.destroy();
    }

    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5">No cities found for the selected language.</td>
            </tr>
        `;
        return;
    }

    // Find the highest discretionary income
    const highestDiscretionary = Math.max(...filteredData.map(row => 
        parseInt(row['median_discretionary_income'])
    ));

    filteredData.forEach(row => {
        const tr = document.createElement('tr');
        // Add highlight class if this row has the highest discretionary income
        if (parseInt(row['median_discretionary_income']) === highestDiscretionary) {
            tr.classList.add('highlight');
        }
        tr.innerHTML = `
            <td>${row['city_name']}</td>
            <td>${row['country']}</td>
            <td>${formatNumber(row['median_disposable_income'])}</td>
            <td>${formatNumber(row['median_discretionary_income'])}</td>
            <td>${row['languages_spoken']}</td>
        `;
        tbody.appendChild(tr);
    });

    // Reinitialize DataTable
    dataTable = $('#incomeTable').DataTable({
        "order": [],
        "pageLength": 10,
        "columnDefs": [
            { "orderable": true, "targets": "_all" },
            { 
                "targets": [2, 3],
                "render": function(data, type) {
                    return type === 'sort' ? 
                        parseFloat(data.replace(/,/g, '')) : 
                        data;
                }
            }
        ]
    });
}

// Fetch data and populate table
async function fetchData() {
    try {
        const response = await fetch('data.csv');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        
        const csvText = await response.text();
        globalData = parseCSV(csvText);
        
        // Populate language dropdown
        const languages = getUniqueLanguages(globalData);
        populateLanguageDropdown(languages);

        // Initialize table with all data
        updateTable(globalData);

        // Add event listener for language filter
        document.getElementById('languageFilter').addEventListener('change', (e) => {
            const filteredData = filterByLanguage(e.target.value);
            updateTable(filteredData);
        });

    } catch (error) {
        console.error('Error loading data:', error);
        document.querySelector('table tbody').innerHTML = `
            <tr>
                <td colspan="5">Error loading data. Please try again later.</td>
            </tr>
        `;
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', fetchData);