# City Income Comparison Website 🌍

A simple, interactive website that allows users to explore and compare median disposable and discretionary incomes across various cities worldwide. The project provides an easy-to-use interface for analyzing income data with sorting and filtering capabilities.

## 🌟 Features

- **Interactive Data Table**
  - Sort by any column (city, country, income levels)
  - Filter cities by spoken languages
  - Fixed header for easy navigation
  - Automatic highlighting of highest discretionary income
- **Clear Data Presentation**
  - Income values in USD with proper formatting
  - Easy-to-read layout with alternating row colors
  - Mobile-responsive design
- **Educational Content**
  - Clear definitions of disposable and discretionary income
  - Numerical examples for better understanding
  - Links to additional resources

## 🚀 Getting Started

### Prerequisites

No installation required! This is a static website that runs entirely in the browser.

### Viewing the Website

1. Simply visit https://jonasrk.github.io/median_discretionary_income/
2. Or clone the repository and open `index.html` in your browser:
   ```bash
   git clone [your-repository-url]
   cd median_discretionary_income
   open index.html
   ```

## 📊 Data Structure

The city income data is stored in `data.csv` with the following columns:
- City Name
- Country
- Median Disposable Income (USD)
- Median Discretionary Income (USD)
- Languages Spoken

## 🛠️ Technology Stack

- HTML5
- CSS3
- Vanilla JavaScript
- DataTables.js for enhanced table functionality
- GitHub Pages for hosting

## 📁 Project Structure

```
📂 median_discretionary_income/
 ├── 📄 index.html       # Main webpage
 ├── 📄 style.css        # Styling
 ├── 📄 script.js        # JavaScript functionality
 ├── 📄 data.csv         # City income dataset
 └── 📄 README.md        # Project documentation
```

## 🔄 Data Updates

The dataset is manually maintained and updated. New data can be added by modifying the `data.csv` file following the existing format.

## 📝 Contributing

While this is a simple static website, contributions are welcome! Please feel free to submit issues and pull requests.

## 📜 License

This project is open source and available under the MIT License.

## 🤝 Acknowledgments

- DataTables.js for providing the interactive table functionality
