// Sample product data
const products = [
    { id: 1, name: 'Organic Tomatoes', price: 5.99, category: 'vegetables', img: 'https://via.placeholder.com/250/4CAF50/FFFFFF?text=Tomatoes', desc: 'Fresh organic tomatoes.' },
    { id: 2, name: 'Apples', price: 3.99, category: 'fruits', img: 'https://via.placeholder.com/250/4CAF50/FFFFFF?text=Apples', desc: 'Crisp red apples.' },
    // Add more products as needed
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products
function loadProducts(filter = '') {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    products.filter(p => !filter || p.category === filter).forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <p>⭐⭐⭐⭐☆ (4.5)</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
            <button onclick="viewDetails(${p.id})">View Details</button>
        `;
        grid.appendChild(card);
    });
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// View product details
function viewDetails(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('detail-img').src = product.img;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-price').textContent = `$${product.price}`;
    document.getElementById('detail-desc').textContent = product.desc;
    showSection('product-details');
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();

    // Navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            showSection(target);
        });
    });

    // Categories
    document.querySelectorAll('.category').forEach(cat => {
        cat.addEventListener('click', () => {
            const category = cat.dataset.category;
            loadProducts(category);
            showSection('featured');
        });
    });

    // Search
    document.getElementById('search-btn').addEventListener('click', () => {
        const query = document.getElementById('search').value.toLowerCase();
        loadProducts();
        // Simple filter (expand as needed)
    });

    // Cart display
    document.getElementById('cart-link').addEventListener('click', () => {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = cart.map(item => `<p>${item.name} - $${item.price}</p>`).join('');
        showSection('cart');
    });

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', () => showSection('checkout'));

    // Account toggles
    document.getElementById('show-signup').addEventListener('click', () => {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
    });
    document.getElementById('show-login').addEventListener('click', () => {
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });
});