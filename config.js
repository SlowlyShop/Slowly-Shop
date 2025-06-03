// ===================================
// CONFIGURACIÓN GLOBAL DE LA APLICACIÓN
// ===================================

const APP_CONFIG = {
    // Información de la aplicación
    app: {
        name: 'Control Ropa Deportiva',
        version: '2.0.0',
        description: 'Sistema de gestión para fábrica de ropa deportiva',
        author: 'Tu Nombre',
        github: 'https://github.com/tu-usuario/control-ropa-deportiva'
    },

    // Configuración de Google Sheets
    googleSheets: {
        // Estas credenciales deben ser configuradas por el usuario
        apiKey: '',
        clientId: '',
        spreadsheetId: '',
        
        // Configuración de las hojas
        sheets: {
            products: 'Productos',
            customers: 'Clientes', 
            sales: 'Ventas',
            expenses: 'Gastos',
            orders: 'Pedidos',
            categories: 'Categorias',
            expenseCategories: 'CategoriasGastos',
            shoppingList: 'ListaCompras'
        },

        // Configuración de la API
        discoveryDoc: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    },

    // Configuración de la aplicación
    settings: {
        // Configuración de moneda
        currency: {
            symbol: '$',
            code: 'USD',
            decimals: 2
        },

        // Configuración de fecha
        dateFormat: {
            locale: 'es-ES',
            options: {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        },

        // Configuración de notificaciones
        notifications: {
            duration: 3000, // 3 segundos
            position: 'top-right'
        },

        // Configuración de paginación
        pagination: {
            itemsPerPage: 10,
            maxPages: 5
        },

        // Configuración de backup
        backup: {
            autoSave: true,
            interval: 30000, // 30 segundos
            maxBackups: 5
        }
    },

    // Datos por defecto
    defaultData: {
        // Categorías de productos por defecto
        productCategories: [
            { id: '1', name: 'Remeras', code: 'REM' },
            { id: '2', name: 'Shorts', code: 'SHO' },
            { id: '3', name: 'Pantalones', code: 'PAN' },
            { id: '4', name: 'Buzos', code: 'BUZ' },
            { id: '5', name: 'Accesorios', code: 'ACC' },
            { id: '6', name: 'Calzado', code: 'CAL' },
            { id: '7', name: 'Medias', code: 'MED' },
            { id: '8', name: 'Gorras', code: 'GOR' }
        ],

        // Categorías de gastos por defecto
        expenseCategories: [
            { id: '1', name: 'Materiales', description: 'Telas, hilos, botones, etc.' },
            { id: '2', name: 'Transporte', description: 'Envíos, combustible, etc.' },
            { id: '3', name: 'Servicios', description: 'Electricidad, internet, etc.' },
            { id: '4', name: 'Salarios', description: 'Pagos a empleados' },
            { id: '5', name: 'Marketing', description: 'Publicidad, promociones' },
            { id: '6', name: 'Equipos', description: 'Máquinas, herramientas' },
            { id: '7', name: 'Mantenimiento', description: 'Reparaciones, limpieza' },
            { id: '8', name: 'Otros', description: 'Gastos varios' }
        ],

        // Formas de pago
        paymentMethods: [
            'Efectivo $',
            'Pago móvil',
            'Transferencia',
            'Zelle',
            'PayPal',
            'Tarjeta de crédito',
            'Tarjeta de débito',
            'Otro'
        ],

        // Tipos de entrega
        deliveryTypes: [
            {
                id: 'zona',
                name: 'Entregas en la zona',
                description: 'Entrega en puntos específicos de la zona',
                cost: 0,
                requiresDetails: true,
                detailsType: 'text',
                detailsLabel: 'Punto de entrega'
            },
            {
                id: 'tienda',
                name: 'Recojo en tienda',
                description: 'Cliente recoge en la tienda',
                cost: 0,
                requiresDetails: false
            },
            {
                id: 'nacional',
                name: 'Envíos Nacionales',
                description: 'Envío a nivel nacional',
                cost: 5,
                requiresDetails: true,
                detailsType: 'textarea',
                detailsLabel: 'Dirección completa'
            },
            {
                id: 'delivery',
                name: 'Delivery',
                description: 'Entrega a domicilio',
                cost: 3,
                requiresDetails: true,
                detailsType: 'textarea',
                detailsLabel: 'Dirección de entrega'
            },
            {
                id: 'puntos_gratis',
                name: 'Entregas en puntos Gratis',
                description: 'Puntos de entrega sin costo',
                cost: 0,
                requiresDetails: true,
                detailsType: 'select',
                detailsLabel: 'Punto de entrega',
                options: [
                    'La California',
                    'Los dos caminos',
                    'Altamira',
                    'Chacao',
                    'Chacaito',
                    'Plaza Venezuela',
                    'Parque Carabobo'
                ]
            }
        ],

        // Estados de pedidos
        orderStatuses: [
            { id: 'pending', name: 'Pendiente', color: '#f59e0b', icon: '⏳' },
            { id: 'processing', name: 'Procesando', color: '#3b82f6', icon: '⚙️' },
            { id: 'ready', name: 'Listo', color: '#10b981', icon: '✅' },
            { id: 'delivered', name: 'Entregado', color: '#059669', icon: '📦' },
            { id: 'cancelled', name: 'Cancelado', color: '#ef4444', icon: '❌' }
        ],

        // Prioridades para lista de compras
        priorities: [
            { id: 'baja', name: 'Baja', color: '#6b7280' },
            { id: 'media', name: 'Media', color: '#f59e0b' },
            { id: 'alta', name: 'Alta', color: '#ef4444' }
        ]
    },

    // Configuración de validaciones
    validation: {
        product: {
            name: { required: true, minLength: 2, maxLength: 100 },
            price: { required: true, min: 0.01, max: 999999 },
            stock: { required: true, min: 0, max: 999999 },
            code: { required: true, minLength: 3, maxLength: 20 }
        },
        customer: {
            name: { required: true, minLength: 2, maxLength: 100 },
            phone: { required: true, pattern: /^[0-9+\-\s()]+$/ },
            address: { required: false, maxLength: 200 }
        },
        sale: {
            customerId: { required: true },
            items: { required: true, minItems: 1 },
            total: { required: true, min: 0.01 },
            paymentMethod: { required: true },
            deliveryType: { required: true }
        },
        expense: {
            description: { required: true, minLength: 3, maxLength: 200 },
            amount: { required: true, min: 0.01, max: 999999 },
            categoryId: { required: true },
            paymentMethod: { required: true }
        }
    },

    // Configuración de reportes
    reports: {
        dateRanges: [
            { id: 'today', name: 'Hoy', days: 0 },
            { id: 'week', name: 'Esta semana', days: 7 },
            { id: 'month', name: 'Este mes', days: 30 },
            { id: 'quarter', name: 'Este trimestre', days: 90 },
            { id: 'year', name: 'Este año', days: 365 },
            { id: 'custom', name: 'Personalizado', days: null }
        ],
        
        charts: {
            colors: [
                '#2563eb', '#10b981', '#f59e0b', '#ef4444', 
                '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
            ]
        }
    },

    // URLs y endpoints
    urls: {
        whatsapp: 'https://wa.me/',
        googleSheets: 'https://docs.google.com/spreadsheets/d/',
        googleConsole: 'https://console.cloud.google.com/',
        documentation: 'https://github.com/tu-usuario/control-ropa-deportiva/wiki'
    },

    // Configuración de localStorage
    storage: {
        keys: {
            products: 'ropa_deportiva_products',
            customers: 'ropa_deportiva_customers',
            sales: 'ropa_deportiva_sales',
            expenses: 'ropa_deportiva_expenses',
            orders: 'ropa_deportiva_orders',
            categories: 'ropa_deportiva_categories',
            expenseCategories: 'ropa_deportiva_expense_categories',
            shoppingList: 'ropa_deportiva_shopping_list',
            settings: 'ropa_deportiva_settings',
            googleConfig: 'ropa_deportiva_google_config',
            productCodeCounter: 'ropa_deportiva_product_code_counter'
        },
        
        // Configuración de compresión
        compression: {
            enabled: true,
            threshold: 1024 // 1KB
        }
    },

    // Configuración de debug
    debug: {
        enabled: false, // Cambiar a true para modo desarrollo
        logLevel: 'info', // 'error', 'warn', 'info', 'debug'
        showPerformance: false
    },

    // Configuración de PWA (Progressive Web App)
    pwa: {
        enabled: true,
        name: 'Control Ropa Deportiva',
        shortName: 'RopaDeportiva',
        description: 'Sistema de gestión para fábrica de ropa deportiva',
        themeColor: '#2563eb',
        backgroundColor: '#ffffff',
        display: 'standalone',
        orientation: 'portrait'
    },

    // Configuración de seguridad
    security: {
        // Configuración de sesión
        session: {
            timeout: 3600000, // 1 hora en milisegundos
            warningTime: 300000 // 5 minutos antes de expirar
        },
        
        // Configuración de backup
        backup: {
            encryption: false, // Para futuras implementaciones
            compression: true
        }
    }
};

// ===================================
// FUNCIONES DE CONFIGURACIÓN
// ===================================

/**
 * Obtiene un valor de configuración usando notación de punto
 * @param {string} path - Ruta del valor (ej: 'app.name')
 * @param {*} defaultValue - Valor por defecto si no existe
 * @returns {*} Valor de configuración
 */
function getConfig(path, defaultValue = null) {
    const keys = path.split('.');
    let value = APP_CONFIG;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }
    
    return value;
}

/**
 * Establece un valor de configuración
 * @param {string} path - Ruta del valor
 * @param {*} value - Nuevo valor
 */
function setConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    let target = APP_CONFIG;
    
    for (const key of keys) {
        if (!(key in target) || typeof target[key] !== 'object') {
            target[key] = {};
        }
        target = target[key];
    }
    
    target[lastKey] = value;
}

/**
 * Carga configuración desde localStorage
 */
function loadUserConfig() {
    try {
        const savedConfig = localStorage.getItem(APP_CONFIG.storage.keys.settings);
        if (savedConfig) {
            const userConfig = JSON.parse(savedConfig);
            
            // Merge con configuración por defecto
            Object.keys(userConfig).forEach(key => {
                if (key in APP_CONFIG) {
                    APP_CONFIG[key] = { ...APP_CONFIG[key], ...userConfig[key] };
                }
            });
        }
        
        // Cargar configuración de Google Sheets
        const googleConfig = localStorage.getItem(APP_CONFIG.storage.keys.googleConfig);
        if (googleConfig) {
            const config = JSON.parse(googleConfig);
            APP_CONFIG.googleSheets = { ...APP_CONFIG.googleSheets, ...config };
        }
        
    } catch (error) {
        console.error('Error cargando configuración del usuario:', error);
    }
}

/**
 * Guarda configuración en localStorage
 */
function saveUserConfig() {
    try {
        const configToSave = {
            settings: APP_CONFIG.settings,
            currency: APP_CONFIG.currency,
            notifications: APP_CONFIG.notifications
        };
        
        localStorage.setItem(
            APP_CONFIG.storage.keys.settings, 
            JSON.stringify(configToSave)
        );
        
        // Guardar configuración de Google Sheets por separado
        const googleConfig = {
            apiKey: APP_CONFIG.googleSheets.apiKey,
            clientId: APP_CONFIG.googleSheets.clientId,
            spreadsheetId: APP_CONFIG.googleSheets.spreadsheetId
        };
        
        localStorage.setItem(
            APP_CONFIG.storage.keys.googleConfig,
            JSON.stringify(googleConfig)
        );
        
    } catch (error) {
        console.error('Error guardando configuración:', error);
    }
}

/**
 * Resetea la configuración a valores por defecto
 */
function resetConfig() {
    localStorage.removeItem(APP_CONFIG.storage.keys.settings);
    localStorage.removeItem(APP_CONFIG.storage.keys.googleConfig);
    location.reload();
}

/**
 * Valida la configuración de Google Sheets
 * @returns {boolean} True si la configuración es válida
 */
function validateGoogleSheetsConfig() {
    const config = APP_CONFIG.googleSheets;
    return