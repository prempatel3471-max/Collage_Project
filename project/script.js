// ==========================================
// 1. DATABASE SIMULATION (LocalStorage)
// ==========================================
const defaultMenu = [
    { id: 1, name: "Truffle Edamame Dumplings", price: 550, category: "sushi-dimsum", img: "r11.webp", desc: "In massaman curry, chilly oil." },
    { id: 2, name: "Delhi Style Butter Masala", price: 500, category: "paneer", img: "r4.webp", desc: "Tandoori paneer tikka, fenugreek butter." },
    { id: 3, name: "Aka 3 Cheese Mushrooms Pizza", price: 590, category: "pizza", img: "r13.webp", desc: "Truffle oil, fresh leaves, capers." }
];

// Initialize Data
if (!localStorage.getItem('rms_menu')) {
    localStorage.setItem('rms_menu', JSON.stringify(defaultMenu));
}
if (!localStorage.getItem('rms_orders')) {
    localStorage.setItem('rms_orders', JSON.stringify([]));
}

function getMenu() { return JSON.parse(localStorage.getItem('rms_menu')); }
function getOrders() { return JSON.parse(localStorage.getItem('rms_orders')); }
function saveMenu(menu) { localStorage.setItem('rms_menu', JSON.stringify(menu)); }
function saveOrders(orders) { localStorage.setItem('rms_orders', JSON.stringify(orders)); }


// ==========================================
// 2. CUSTOMER WEBSITE LOGIC (index.html)
// ==========================================
let cart = [];
let currentOrderMode = 'Dine-In';

function initCustomerView() {
    renderMenu('all');
}

function renderMenu(category) {
    const container = document.getElementById("menu-container");
    if(!container) return;
    
    container.innerHTML = "";
    const menuData = getMenu();
    const filteredItems = category === 'all' ? menuData : menuData.filter(item => item.category === category);

    filteredItems.forEach(item => {
        container.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <div class="card-bottom">
                        <span class="price">₹${item.price.toFixed(2)}</span>
                        <button class="btn-add" onclick="addToCart(${item.id})">ADD</button>
                    </div>
                </div>
            </div>
        `;
    });
}

function filterMenu(category) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderMenu(category);
}

function setOrderMode(mode) {
    currentOrderMode = mode;
    document.getElementById('current-mode-display').innerText = mode;
    document.getElementById('dine-in-details').style.display = mode === 'Dine-In' ? 'block' : 'none';
    document.getElementById('delivery-details').style.display = mode === 'Delivery' ? 'block' : 'none';
}

function addToCart(itemId) {
    const menuData = getMenu();
    const item = menuData.find(i => i.id === itemId);
    const existing = cart.find(c => c.id === itemId);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    
    updateCartUI();
    toggleCart(true);
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        cartItemsContainer.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span>${item.name} (x${item.qty})</span>
                <span>₹${(item.price * item.qty).toFixed(2)}</span>
            </div>
        `;
    });

    const total = subtotal * 1.05; // 5% GST
    document.getElementById('cart-count').innerText = cart.reduce((a, b) => a + b.qty, 0);
    document.getElementById('cart-subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').innerText = `₹${total.toFixed(2)}`;
}

function toggleCart(forceOpen = false) {
    const modal = document.getElementById('cart-modal');
    if(modal) modal.classList.toggle('open', forceOpen || !modal.classList.contains('open'));
}

function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");
    
    const customerName = document.getElementById('customer-name').value || "Guest";
    const tableNo = document.getElementById('table-number').value;
    const address = document.getElementById('delivery-address').value;
    
    const totalAmount = parseFloat(document.getElementById('cart-total').innerText.replace('₹', ''));

    const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 10000),
        customer: customerName,
        type: currentOrderMode,
        details: currentOrderMode === 'Dine-In' ? `Table: ${tableNo}` : address,
        total: totalAmount,
        status: "Pending"
    };

    const orders = getOrders();
    orders.push(newOrder);
    saveOrders(orders);

    alert(`Payment Successful! Order ${newOrder.id} placed.`);
    cart = [];
    updateCartUI();
    toggleCart();
}

// ==========================================
// 3. ADMIN & MANAGER LOGIC (rms.html)
// ==========================================
function initRMS() {
    loadOrders();
    loadAdminMenu();
}

function switchTab(tabId) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.rms-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// Manager Functions
function loadOrders() {
    const tbody = document.getElementById('orders-table-body');
    if(!tbody) return;
    
    tbody.innerHTML = "";
    const orders = getOrders().reverse(); // Newest first
    
    orders.forEach(order => {
        const statusClass = order.status === 'Pending' ? 'status-pending' : 'status-completed';
        tbody.innerHTML += `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${order.customer}</td>
                <td>${order.type}</td>
                <td>${order.details || 'N/A'}</td>
                <td>₹${order.total.toFixed(2)}</td>
                <td><span class="status-badge ${statusClass}">${order.status}</span></td>
                <td>
                    ${order.status === 'Pending' ? `<button class="btn-action btn-complete" onclick="markOrderComplete('${order.id}')">Mark Complete</button>` : 'Done'}
                </td>
            </tr>
        `;
    });
}

function markOrderComplete(orderId) {
    let orders = getOrders();
    let order = orders.find(o => o.id === orderId);
    if(order) order.status = "Completed";
    saveOrders(orders);
    loadOrders();
}

// Admin Functions
function loadAdminMenu() {
    const tbody = document.getElementById('menu-table-body');
    if(!tbody) return;

    tbody.innerHTML = "";
    getMenu().forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td><button class="btn-action btn-delete" onclick="deleteMenuItem(${item.id})">Delete</button></td>
            </tr>
        `;
    });
}

function addMenuItem() {
    const name = document.getElementById('new-item-name').value;
    const price = parseFloat(document.getElementById('new-item-price').value);
    const category = document.getElementById('new-item-category').value;
    const desc = document.getElementById('new-item-desc').value;

    if(!name || !price) return alert("Please fill name and price!");

    let menu = getMenu();
    menu.push({
        id: Date.now(),
        name, price, category, desc, img: "default.webp"
    });
    
    saveMenu(menu);
    loadAdminMenu();
    
    // Clear inputs
    document.getElementById('new-item-name').value = '';
    document.getElementById('new-item-price').value = '';
    document.getElementById('new-item-desc').value = '';
}

function deleteMenuItem(id) {
    let menu = getMenu();
    menu = menu.filter(item => item.id !== id);
    saveMenu(menu);
    loadAdminMenu();
}