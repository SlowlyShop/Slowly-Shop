const APP_CONFIG = {
    googleSheets: {
        apiKey: 'AIzaSyARvBf9b18-ta99GAX0BAJwMuuyWFJ120I',
        spreadsheetId: '1VfWlYHBASBzbT52oCV5ZZcfbc9PDjjpmLoQeY5x_QfY',
        ranges: {
            products: 'Productos!A:G',
            customers: 'Clientes!A:D',
            sales: 'Ventas!A:G',
            expenses: 'Gastos!A:F',
            orders: 'Pedidos!A:F',
            categories: 'Categorías!A:B'
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    loadMainContent('products');
    document.getElementById('nav-products').addEventListener('click', () => loadMainContent('products'));
    document.getElementById('nav-customers').addEventListener('click', () => loadMainContent('customers'));
    document.getElementById('nav-sales').addEventListener('click', () => loadMainContent('sales'));
    document.getElementById('nav-expenses').addEventListener('click', () => loadMainContent('expenses'));
    document.getElementById('nav-orders').addEventListener('click', () => loadMainContent('orders'));
    document.getElementById('nav-categories').addEventListener('click', () => loadMainContent('categories'));
});

function loadMainContent(section) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `<h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2>`;
    // Aquí puedes agregar más lógica para cargar datos desde Google Sheets
}

// Funciones para interactuar con Google Sheets
async function getDataFromSheet(range) {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${APP_CONFIG.googleSheets.spreadsheetId}/values/${range}?key=${APP_CONFIG.googleSheets.apiKey}`);
    const data = await response.json();
    return data.values;
}

async function updateSheet(range, values) {
    const body = {
        values: values
    };
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${APP_CONFIG.googleSheets.spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED&key=${APP_CONFIG.googleSheets.apiKey}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}
