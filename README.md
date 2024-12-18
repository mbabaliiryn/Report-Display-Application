# Financial Reports Management Application

# Overview

The Financial Reports Management Application is a web-based tool for managing and viewing financial transaction reports. The application includes the following features:

* Dynamic Data Table: Displays transaction reports with sortable and filterable columns.
* Search Functionality: Easily search reports by account holder name.
Filter by Transaction Type: Use a dropdown to filter reports by transaction type (e.g., Deposit, 
* Withdrawal, Loan Payment).
* Export Options: Export the displayed data to CSV, PDF, or Excel formats.
* Responsive Design: Fully responsive UI designed for various screen sizes


# Features

*Search and Filter*:
* Search for reports by entering an account holder's name.
* Filter reports by transaction type using a dropdown menu.

*Export Options:*
* Export the data into multiple formats such as CSV, PDF, and Excel.

*Dynamic Data Table:*
* Automatically updates based on search queries and filters.
* Displays detailed financial information for each transaction.

# Prerequisites
Ensure you have the following installed on your local system:

* Node.js (LTS version recommended)
* Vue CLI
* Git


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## 1. Clone the Repository

```sh
git clone https://github.com/your-username/financial-reports-app.git
cd financial-reports-app

```
## 2. Install Dependencies

```sh
npm install
```
## 3. Run the Application
```sh
npm run dev
```
The application will be available at http://localhost:3000 by default.

## Technologies Used
* Frontend: Vue.js (with Vuetify for UI components)
* Export Libraries:
* jsPDF for PDF generation

