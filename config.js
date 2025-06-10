// Configuración para la integración con Google Sheets API

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
            categories: 'Categorías!A:B',
            expenseCategories: 'CategoriasGastos!A:B',
            shoppingList: 'ListaCompras!A:G'
        }
    },
    styling: {
        // Basado en las directrices por defecto (limpio, elegante, legible)
        colors: {
            background: '#ffffff',
            textPrimary: '#374151',
            textSecondary: '#6b7280',
            primary: '#2563eb',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            cardBackground: '#f9fafb'
        },
        spacing: {
            containerMaxWidth: '1200px',
            sectionPaddingTop: '4rem',
            sectionPaddingBottom: '5rem',
            cardBorderRadius: '0.75rem',
            cardShadow: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)'
        },
        typography: {
            headlineFontSize: '3rem', // 48px
            headlineFontWeight: '700',
            bodyFontSize: '1.125rem', // 18px
            bodyColor: '#6b7280',
            fontFamily: '"Inter", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        },
        effects: {
            transition: 'all 0.3s ease',
            hoverScale: '1.03'
        }
    },
    apiEndpoints: {
        // API URLs serán construidas dinámicamente con spreadsheetId y apiKey
        sheetsBaseUrl: 'https://sheets.googleapis.com/v4/spreadsheets/'
    }
};

export default APP_CONFIG;

