```
# Code-Generation Prompts for City Income Comparison Website

## Prompt Set A: Project Setup

### Prompt A1

```text
You are building a new GitHub repository called "city-income-comparison". Create the repository with an initial file structure. Include these files:
- index.html (empty HTML5 boilerplate)
- style.css (empty)
- script.js (empty)
- data.csv (with placeholder text "city_name,country,median_disposable_income,median_discretionary_income,languages_spoken")
- README.md (brief description of the project)

Please provide the initial commit code for these files.
```

### Prompt A2

```text
Now that we have the basic repository set up, please finalize the initial commit in GitHub. Provide the Git commands or the final file contents for each file to confirm everything is committed and pushed.
```

## Prompt Set B: Basic Page & Definitions

### Prompt B1-B5

```text
We have the empty project ready. Now, update the `index.html` to have a header (`<header>`) and main (`<main>`). In the header, add the following items:
1. Definitions for “disposable income” and “discretionary income”.
2. A short numeric example (e.g., if you earn X, pay Y in taxes, etc. how much is left).
3. Wikipedia links for both terms.

Leave the main section empty for now. Please show the updated `index.html`.
```

## Prompt Set C: Static Table

### Prompt C1-C4

```text
Now, let’s add a static table to `index.html`. Inside the `<main>` element, create a `<table>` with a `<thead>` and `<tbody>`. Include column headers: "City", "Country", "Disposable Income (USD)", "Discretionary Income (USD)", and "Languages". Add 2 or 3 static rows as placeholders.

Also update `style.css` to apply:
1. A simple alternating row background color (e.g., #f9f9f9 and #ffffff).
2. Some basic margin or padding around the table.

Please provide both the updated `index.html` and `style.css`.
```

## Prompt Set D: Data Loading & Rendering

### Prompt D1-D6

```text
1. Replace the placeholder `data.csv` contents with the following (3-5 cities with actual data):

city_name,country,median_disposable_income,median_discretionary_income,languages_spoken
New York,USA,50000,20000,English,Spanish
Tokyo,Japan,48000,18000,Japanese
Berlin,Germany,45000,17000,German,English
...

2. In `script.js`, create a function called `fetchData()` that uses `fetch` to load `data.csv`.
3. Parse the CSV data, then dynamically generate `<tr>` and `<td>` elements for each city row.
4. Remove the hard-coded rows from `index.html` and instead insert rows from the script.
5. Format the income columns with commas (e.g., 50000 => 50,000).
6. Call `fetchData()` when the page loads.

Please provide updated `data.csv`, `script.js`, and the changes to `index.html` (if any).
```

## Prompt Set E: Integrate DataTables.js

### Prompt E1-E4

```text
1. Include DataTables.js via a CDN link in `index.html`.
2. Initialize the DataTable in `script.js` after the CSV data is inserted into the table.
3. Confirm that the table columns are sortable.
4. Show the final updated `index.html` and `script.js` code that demonstrates DataTables integration.
```

## Prompt Set F: Language Dropdown Filter

### Prompt F1-F4

```text
We want a dropdown that filters cities by language.
1. Above the table in `index.html`, add a <select> element.
2. Populate it dynamically with unique languages found in `data.csv` (e.g., English, Spanish, Japanese, German).
3. When a language is selected, show only rows that contain that language in the ‘languages_spoken’ column.
4. If no rows match, display either an empty table or a message (“No cities found”).

Show your updated `index.html` and `script.js`.
```

## Prompt Set G: Highlight Highest Discretionary Income

### Prompt G1-G3

```text
Now, let’s highlight the row with the highest median discretionary income.
1. After data is loaded, find the city with the largest discretionary income value.
2. Add a CSS class `highlight` to that row (e.g., a gold background color).
3. Ensure only one row is highlighted.

Show updated `script.js` and `style.css` with the new class.
```

## Prompt Set H: Final Styling & Fixed Header

### Prompt H1-H3

```text
We want a fixed header for the table.
1. Update the CSS so the <thead> remains visible at the top of the page when scrolling.
2. Tweak fonts and spacing for a polished look.
3. Show the final `style.css` changes, ensuring the rest of the table remains functional.
```

## Prompt Set I: Error Handling

### Prompt I1-I3

```text
Implement error handling for CSV loading:
1. If the CSV fetch fails, catch the error.
2. Display a user-friendly message (e.g., “Error: Unable to load city data from CSV. Please try again later.”) inside the table area.
3. Confirm the message is shown by simulating or describing how to trigger an error.

Provide updated `script.js` with the error handling logic.
```

## Prompt Set J: Testing & Deployment

### Prompt J1-J4

```text
Finally, we’ll test and deploy.
1. Discuss how to test across multiple browsers and devices.
2. Check the site on mobile.
3. Enable GitHub Pages on the repository.
4. Confirm the final URL is accessible.

Show no code changes are needed, just a final summary of steps for deployment.
```
