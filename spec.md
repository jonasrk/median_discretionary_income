# Developer Specification: City Income Comparison Website

## Overview
This project is a simple static website hosted on **GitHub Pages** that displays a table of cities with their **median disposable income** and **median discretionary income** in USD. The table is dynamically generated from a **CSV file** and provides sorting and filtering options to help users analyze the data.

## Features & Requirements

### 1. **Data Representation**
- The dataset is stored as a CSV file in the GitHub repository.
- The table includes the following columns:
  - `city_name`: Name of the city
  - `country`: Country where the city is located
  - `median_disposable_income`: Median disposable income (formatted with commas for thousand separators)
  - `median_discretionary_income`: Median discretionary income (formatted with commas for thousand separators)
  - `languages_spoken`: A comma-separated list of languages commonly spoken in the city
- All income values are in **USD** for consistency.

### 2. **Table Functionality**
- **Sorting**: Clicking a column header toggles sorting between ascending and descending order.
- **Filtering**: Users can filter cities by **language** using a **single-select dropdown**.
- **Fixed header row**: The table headers remain visible while scrolling.
- **Highlighting the highest discretionary income city**: The city with the highest discretionary income is visually distinguished (e.g., with a gold background or bold text).

### 3. **Page Layout & Styling**
- **Definitions Section** at the top:
  - Includes concise definitions of disposable and discretionary income.
  - Provides **numerical examples** to clarify differences.
  - Includes links to **Wikipedia pages** for further reading.
- **Table Placement**:
  - Centered with margins for readability.
  - Alternating row colors for clarity.
- **Minimalist Design**:
  - No branding, logos, or unnecessary styling.
  - Simple, readable fonts and colors.

## Architecture & Implementation Details

### 1. **Technology Stack**
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Table Interactivity**: **DataTables.js**
- **Hosting**: GitHub Pages
- **Data Handling**: JavaScript loads and parses the CSV file dynamically

### 2. **Project Structure**
```
📂 project-root/
 ├── 📄 index.html       # Main page
 ├── 📄 style.css       # Stylesheet
 ├── 📄 script.js       # JavaScript functionality
 ├── 📄 data.csv        # City income dataset
 ├── 📄 README.md       # Project documentation
```

### 3. **Data Loading & Processing**
- The **CSV file is loaded dynamically** using JavaScript.
- The script parses the CSV and inserts it into the HTML table.
- **DataTables.js** enhances the table with sorting and filtering functionalities.
- Formatting ensures income values include comma separators (e.g., `50,000`).

## Error Handling Strategy
- If the CSV file **fails to load**, display the message:
  - *"Error: Unable to load city data from CSV. Please try again later."*
- Ensure the site remains functional even if the dataset is incomplete.
- Provide a fallback message if no data matches the selected language filter.

## Maintenance & Updates
- **Manual Updates**:
  - The CSV file will be manually updated when new data is available.
  - No automated versioning or change tracking is required.
- **No Automated Testing or CI/CD**:
  - No automated validation of the CSV format before deployment.
  - Developers will manually verify updates before pushing them.

## Testing Plan

### 1. **Functional Testing**
- Verify that the **table loads correctly** with all city data.
- Confirm that **sorting works** correctly for each column.
- Test **language filtering** to ensure only matching cities are displayed.
- Ensure that the city with the **highest discretionary income is highlighted**.
- Validate that the **fixed header remains visible** while scrolling.

### 2. **Error Handling Testing**
- Temporarily remove or corrupt the CSV file and confirm the **error message appears**.
- Test for empty search results when filtering by a language that is not in the dataset.

### 3. **Cross-Browser Testing**
- Verify compatibility in **Chrome, Firefox, Edge, and Safari**.
- Ensure the table functions correctly on **desktop and mobile devices**.

## Deployment
- The site will be hosted using **GitHub Pages**.
- Any updates to the CSV file, HTML, CSS, or JavaScript will be reflected immediately after pushing changes to the repository.
