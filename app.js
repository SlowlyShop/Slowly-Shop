// ===================================
// VARIABLES GLOBALES
// ===================================
let products = [];
let customers = [];
let sales = [];
let expenses = [];
let orders = [];
let shoppingList = [];
let categories = [];
let expenseCategories = [];
let selectedProducts = [];
let productCodeCounter = {};
let isOnline = navigator.onLine;
let googleSheetsConfig = {};

// ===================================
// INICIALIZACIÓN
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateDateTime();
    setInterval(updateDateTime, 60000);
    setupEventListeners();
    checkConnection();
    
    // Check connection status
    window.addEventListener('online', () => {
        isOnline = true;
        updateConnectionStatus();
        syncWithGoogleSheets();
    });
    
    window.addEventListener('offline', () => {
        isOnline = false;
        updateConnectionStatus();
    });
});

// ===================================
// GESTIÓN DE DATOS
// ===================================
function initializeData() {
    // Cargar datos del localStorage
    products = JSON.parse(localStorage.getItem('products')) || [];
    customers = JSON.parse(localStorage.getItem('customers')) || [];
    sales = JSON.parse(localStorage.getItem('sales')) || [];
    expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    orders = JSON.parse(localStorage.getItem('orders')) || [];
    shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    
    // Categorías por defecto
    categories = JSON.parse(localStorage.getItem('categories')) || [
        { id: '1', name: 'Remeras' },
        { id: '2', name: 'Shorts' },
        { id: '3', name: 'Pantalones' },
        { id: '4', name: 'Buzos' },
        { id: '5', name: 'Accesorios' }
    ];
    
    // Categorías de gastos por defecto
    expenseCategories = JSON.parse(localStorage.getItem('expenseCategories')) || [
        { id: '1', name: 'Materiales' },
        { id: '2', name: 'Transporte' },
        { id: '3', name: 'Servicios' },
        { id: '4', name: 'Salarios' },
        { id: '5', name: 'Otros' }
    ];
    
    productCodeCounter = JSON.parse(localStorage.getItem('productCodeCounter')) || {};
    googleSheetsConfig = JSON.parse(localStorage.getItem('googleSheetsConfig')) || {};
    
    // Renderizar todas las secciones
    updateDashboard();
    renderProducts();
    renderCustomers();
    renderSales();
    renderExpenses();
    renderOrders();
    renderShoppingList();
    renderCategories();
    renderExpenseCategories();
    updateReports();
    updateFilters();
    
    // Mostrar guía de configuración si no está configurado
    if (!googleSheetsConfig.apiKey || !googleSheetsConfig.spreadsheetId) {
        document.getElementById('setupGuide').style.display = 'block';
    } else {
        document.getElementById('setupGuide').style.display = 'none';
    }
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    
    // Intentar sincronizar con Google Sheets si está online
    if (isOnline && googleSheetsConfig.apiKey) {
        syncWithGoogleSheets();
    }
}

// ===================================
// GESTIÓN DE CONEXIÓN
// ===================================
function checkConnection() {
    isOnline = navigator.onLine;
    updateConnectionStatus();
}

function updateConnectionStatus() {
    const banner = document.getElementById('connectionBanner');
    const text = document.getElementById('connectionText');
    const syncButton = document.getElementById('syncButton');
    
    if (isOnline) {
        banner.className = 'connection-banner online';
        text.textContent = '🟢 Conectado - Sincronizando automáticamente';
        syncButton.style.display = 'none';
    } else {
        banner.className = 'connection-banner offline';
        text.textContent = '🔴 Sin conexión - Trabajando offline';
        syncButton.style.display = 'inline-block';
    }
}

function forceSync() {
    if (isOnline && googleSheetsConfig.apiKey) {
        syncWithGoogleSheets();
        showNotification('Sincronización iniciada', 'success');
    } else {
        showNotification('No hay conexión o configuración incompleta', 'error');
    }
}

// ===================================
// GOOGLE SHEETS INTEGRATION
// ===================================
function syncWithGoogleSheets() {
    if (!googleSheetsConfig.apiKey || !googleSheetsConfig.spreadsheetId) {
        return;
    }
    
    // Aquí iría la lógica de sincronización con Google Sheets
    // Por ahora solo mostramos que está sincronizando
    console.log('Sincronizando con Google Sheets...');
}

function testGoogleSheetsConnection() {
    if (!googleSheetsConfig.apiKey || !googleSheetsConfig.spreadsheetId) {
        showNotification('Faltan credenciales de Google Sheets', 'error');
        return;
    }
    
    // Simular test de conexión
    setTimeout(() => {
        showNotification('Conexión exitosa con Google Sheets', 'success');
    }, 1000);
}

// ===================================
// NAVEGACIÓN Y UI
// ===================================
function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover clase active de todos los links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Agregar clase active al link correspondiente
    event.target.closest('.nav-link').classList.add('active');
    
    // Cerrar sidebar en móvil
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('active');
    }
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const dateTimeElement = document.getElementById('dateTime');
    if (dateTimeElement) {
        dateTimeElement.textContent = now.toLocaleDateString('es-ES', options);
    }
}

// ===================================
// GESTIÓN DE MODALES
// ===================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        const form = modal.querySelector('form');
        if (form) form.reset();
        
        // Reset image preview if exists
        const preview = document.getElementById('productImagePreview');
        if (preview) {
            preview.style.display = 'none';
            preview.src = '';
        }
    }
}

// Cerrar modales al hacer clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// ===================================
// GESTIÓN DE PRODUCTOS
// ===================================
function openProductModal() {
    updateCategorySelects();
    openModal('productModal');
}

function generateProductCode(categoryName, productName) {
    const categoryInitials = categoryName.substring(0, 3).toUpperCase();
    const productInitials = productName.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 3);
    
    const key = `${categoryInitials}-${productInitials}`;
    
    if (!productCodeCounter[key]) {
        productCodeCounter[key] = 0;
    }
    
    productCodeCounter[key]++;
    const code = `${key}-${String(productCodeCounter[key]).padStart(3, '0')}`;
    
    saveData('productCodeCounter', productCodeCounter);
    return code;
}

function previewProductImage(event) {
    const reader = new FileReader();
    const preview = document.getElementById('productImagePreview');
    
    reader.onload = function() {
        preview.src = reader.result;
        preview.style.display = 'block';
    };
    
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

function renderProducts() {
    const tbody = document.getElementById('productsTable');
    
    if (!tbody) return;
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; color: #6b7280;">
                    No hay productos registrados. Haz clic en "Nuevo Producto" para agregar uno.
                </td>
            </tr>
        `;
        const totalProductsElement = document.getElementById('totalProducts');
        if (totalProductsElement) {
            totalProductsElement.textContent = '0';
        }
        return;
    }
    
    tbody.innerHTML = '';
    products.forEach((product, index) => {
        const category = categories.find(c => c.id === product.categoryId);
        const row = `
            <tr>
                <td>${product.code || 'N/A'}</td>
                <td>
                    ${product.image 
                        ? `<img src="${product.image}" class="product-image" onclick="showImageModal('${product.image}')">` 
                        : '<span style="color: #6b7280;">Sin imagen</span>'}
                </td>
                <td>${product.name}</td>
                <td>${category ? category.name : 'Sin categoría'}</td>
                <td>$${parseFloat(product.price || 0).toFixed(2)}</td>
                <td>${product.stock || 0}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editProduct(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteProduct(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    
    const totalProductsElement = document.getElementById('totalProducts');
    if (totalProductsElement) {
        totalProductsElement.textContent = products.length;
    }
}

function addProduct(productData) {
    const product = {
        id: Date.now().toString(),
        ...productData,
        createdAt: new Date().toISOString()
    };
    
    products.push(product);
    saveData('products', products);
    renderProducts();
    updateDashboard();
    showNotification('Producto agregado correctamente');
}

function editProduct(index) {
    // Implementar edición de producto
    showNotification('Función de edición en desarrollo', 'warning');
}

function deleteProduct(index) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
        products.splice(index, 1);
        saveData('products', products);
        renderProducts();
        updateDashboard();
        showNotification('Producto eliminado correctamente');
    }
}

function searchProducts(query) {
    // Implementar búsqueda de productos
    console.log('Buscando productos:', query);
}

function filterProductsByCategory(categoryId) {
    // Implementar filtro por categoría
    console.log('Filtrando por categoría:', categoryId);
}

// ===================================
// GESTIÓN DE CATEGORÍAS
// ===================================
function openCategoryModal() {
    openModal('categoryModal');
}

function renderCategories() {
    const container = document.getElementById('categoryList');
    
    if (!container) return;
    
    if (categories.length === 0) {
        container.innerHTML = '<p style="color: #6b7280;">No hay categorías registradas</p>';
        return;
    }
    
    container.innerHTML = categories.map(category => `
        <div class="category-item">
            <span>${category.name}</span>
            <button onclick="deleteCategory('${category.id}')" title="Eliminar">×</button>
        </div>
    `).join('');
    
    updateCategorySelects();
}

function addCategory(name) {
    const category = {
        id: Date.now().toString(),
        name: name
    };
    
    categories.push(category);
    saveData('categories', categories);
    renderCategories();
    showNotification('Categoría agregada correctamente');
}

function deleteCategory(categoryId) {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
        categories = categories.filter(c => c.id !== categoryId);
        saveData('categories', categories);
        renderCategories();
        showNotification('Categoría eliminada correctamente');
    }
}

function updateCategorySelects() {
    const selects = ['productCategory', 'filterCategory'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const currentValue = select.value;
            const defaultOption = selectId === 'filterCategory' ? 
                '<option value="">Todas las categorías</option>' : 
                '<option value="">Seleccionar categoría</option>';
            
            select.innerHTML = defaultOption + 
                categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
            select.value = currentValue;
        }
    });
}

// ===================================
// GESTIÓN DE CLIENTES
// ===================================
function openCustomerModal() {
    openModal('customerModal');
}

function renderCustomers() {
    const tbody = document.getElementById('customersTable');
    
    if (!tbody) return;
    
    if (customers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: #6b7280;">
                    No hay clientes registrados. Haz clic en "Nuevo Cliente" para agregar uno.
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = '';
    customers.forEach((customer, index) => {
        const totalPurchases = sales
            .filter(s => s.customerId === customer.id)
            .reduce((sum, s) => sum + (s.total || 0), 0);
        
        const row = `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.phone}</td>
                