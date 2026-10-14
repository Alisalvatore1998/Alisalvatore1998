const products = [
    {
        id: 1,
        name: "Crème Brûlée",
        category: "Destacado",
        price: 8.50,
        description: "Delicada crema ligera infusionada con vainilla Bourbon de Madagascar, cubierta con una crujiente capa de caramelo tostado al momento.",
        image: "imagenes/creme-brulee.svg",
        photo: "imagenes/creme-brulee.jpg",
        remote: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Tarta de Queso Vasca",
        category: "Especialidad",
        price: 9.00,
        description: "Textura cremosa inigualable con un tostado exterior perfecto al horno que realza notas sutiles de caramelo artesanal.",
        image: "imagenes/tarta-queso-vasca.svg",
        photo: "imagenes/tarta-queso-vasca.jpg",
        remote: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Tiramisú Tradicional",
        category: "Especialidad",
        price: 7.50,
        description: "Capas de bizcocho empapadas en espresso intenso, crema suave de mascarpone italiano y finísimo cacao amargo.",
        image: "imagenes/tiramisu.svg",
        photo: "imagenes/tiramisu.jpg",
        remote: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Volcán de Chocolate Intenso",
        category: "Gourmet",
        price: 8.00,
        description: "Bizcocho tibio de chocolate oscuro con corazón fundente que fluye al primer corte. Elaborado con cacao 70%.",
        image: "imagenes/volcan-chocolate.svg",
        photo: "imagenes/volcan-chocolate.jpg",
        remote: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Macarons Franceses (Caja x6)",
        category: "Gourmet",
        price: 12.00,
        description: "Exquisitos merengues de almendra crujientes por fuera y suaves por dentro, rellenos de ganaches finos.",
        image: "imagenes/macarons.svg",
        photo: "imagenes/macarons.jpg",
        remote: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Cheesecake de Frutos Rojos",
        category: "Frutal",
        price: 8.50,
        description: "Base crujiente de galleta mantequillosa, crema de queso sedosa y un vibrante coulis de frutos silvestres frescos.",
        image: "imagenes/cheesecake-frutos-rojos.svg",
        photo: "imagenes/cheesecake-frutos-rojos.jpg",
        remote: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = [];

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.remove('active');
    });

    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    const targetBtn = document.getElementById(`btn-${tabId}`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderFeatured() {
    const featuredGrid = document.getElementById('featuredGrid');
    const cremeBrulee = products[0];
    featuredGrid.innerHTML = `
        <div class="card" style="margin: 0 auto; max-width: 380px; width: 100%;">
            <div class="card-img-container">
                <span class="tag-special">Estrella</span>
                <img src="${cremeBrulee.image}" data-photo="${cremeBrulee.photo}" data-remote="${cremeBrulee.remote}" alt="${cremeBrulee.name}">
            </div>
            <div class="card-content">
                <h3 class="card-title">${cremeBrulee.name}</h3>
                <p class="card-desc">${cremeBrulee.description}</p>
                <div class="card-footer">
                    <span class="price">$${cremeBrulee.price.toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart(${cremeBrulee.id})">Agregar</button>
                </div>
            </div>
        </div>
    `;
    loadPreferredPhotos(featuredGrid);
}

function renderProducts(filter = 'all') {
    const grid = document.getElementById('productGrid');
    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    grid.innerHTML = filteredProducts.map(product => `
        <div class="card">
            <div class="card-img-container">
                <span class="tag-special">${product.category}</span>
                <img src="${product.image}" data-photo="${product.photo}" data-remote="${product.remote}" alt="${product.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-desc">${product.description}</p>
                <div class="card-footer">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart(${product.id})">Agregar</button>
                </div>
            </div>
        </div>
    `).join('');
    loadPreferredPhotos(grid);
}

function filterMenu(category, button) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderProducts(category);
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.05)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 200);
}

function changeQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #777; margin-top: 2rem;">Tu carrito está vacío.</p>';
        cartFooter.style.display = 'none';
        return;
    }

    cartFooter.style.display = 'block';

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function finalizeOrder(event) {
    event.preventDefault();
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const address = document.getElementById('clientAddress').value;

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    alert(`¡Pedido Realizado con Éxito!\n\nCliente: ${name}\nTeléfono: ${phone}\nDirección: ${address}\nMonto Total: $${total.toFixed(2)}\n\nNos pondremos en contacto contigo de inmediato para coordinar la entrega.`);

    cart = [];
    updateCartUI();
    document.getElementById('checkoutForm').reset();
    toggleCart();
}

// Usar imagen JPEG descargada si existe; de lo contrario usar la original
// por Internet. Los SVG locales ya visibles permanecen como respaldo.
function loadPreferredPhotos(container = document) {
    container.querySelectorAll('img[data-photo]').forEach(img => {
        const remote = img.dataset.remote;
        const preferred = img.dataset.photo;
        const preload = (url, onFail) => {
            if (!url) return;
            const probe = new Image();
            probe.onload = () => { if (img.isConnected) img.src = url; };
            probe.onerror = () => { if (onFail) onFail(); };
            probe.src = url;
        };
        preload(preferred, () => preload(remote));
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderFeatured();
    renderProducts();
    loadPreferredPhotos(document.getElementById('about'));
});
