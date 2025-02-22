# TODO Checklist for City Income Comparison Website

## ✅ Project Setup
- [x] Create GitHub repository: `city-income-comparison`
- [x] Initialize the repository with the following files:
  - [x] `index.html` (empty HTML5 boilerplate)
  - [x] `style.css` (empty)
  - [x] `script.js` (empty)
  - [x] `data.csv` (placeholder content)
  - [x] `README.md` (brief project description)
- [x] Commit and push initial setup to GitHub

## ✅ Basic Page & Definitions
- [ ] Add `<header>` and `<main>` sections in `index.html`
- [ ] Include definitions for “disposable income” and “discretionary income”
- [ ] Provide a numeric example of income calculation
- [ ] Insert Wikipedia links for further reference
- [ ] Commit and push changes

## ✅ Static Table
- [ ] Add a `<table>` inside `<main>`
- [ ] Define table headers: City, Country, Disposable Income (USD), Discretionary Income (USD), Languages
- [ ] Add 2-3 static placeholder rows
- [ ] Apply basic styling in `style.css`:
  - [ ] Alternating row background colors
  - [ ] Padding and margin adjustments
- [ ] Commit and push changes

## ✅ Data Loading & Rendering
- [ ] Replace placeholder `data.csv` with real city income data
- [ ] Write `fetchData()` in `script.js` to:
  - [ ] Fetch `data.csv`
  - [ ] Parse CSV data
  - [ ] Generate `<tr>` and `<td>` elements dynamically
  - [ ] Remove static rows from `index.html`
  - [ ] Format income columns with comma separators
  - [ ] Ensure function runs on page load
- [ ] Commit and push changes

## ✅ Integrate DataTables.js
- [ ] Include DataTables.js via CDN in `index.html`
- [ ] Initialize DataTables after table data is loaded
- [ ] Confirm sorting works on all columns
- [ ] Commit and push changes

## ✅ Language Dropdown Filter
- [ ] Add `<select>` dropdown above the table
- [ ] Populate dropdown dynamically with unique languages from `data.csv`
- [ ] Implement filtering in `script.js` to show only matching cities
- [ ] Handle edge cases:
  - [ ] No matching rows should display “No cities found”
- [ ] Commit and push changes

## ✅ Highlight Highest Discretionary Income
- [ ] Identify the city with the highest discretionary income
- [ ] Add a CSS class (`highlight`) to the highest value row
- [ ] Apply styling (e.g., gold background)
- [ ] Commit and push changes

## ✅ Final Styling & Fixed Header
- [ ] Ensure table header remains fixed when scrolling
- [ ] Adjust font styles, spacing, and readability improvements
- [ ] Commit and push final styling updates

## ✅ Error Handling
- [ ] Wrap `fetchData()` in error handling
- [ ] Display a user-friendly error message if CSV fails to load
- [ ] Test error message by simulating a failed fetch
- [ ] Commit and push error-handling changes

## ✅ Testing & Deployment
- [ ] Test functionality in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify mobile responsiveness
- [ ] Enable GitHub Pages for deployment
- [ ] Confirm website is accessible at the GitHub Pages URL
- [ ] Final commit and push

## ✅ Final Review
- [ ] Conduct a full project walkthrough
- [ ] Verify sorting, filtering, and styling work correctly
- [ ] Ensure README.md includes project instructions and acknowledgments
- [ ] Submit project for final approval or review

