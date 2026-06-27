// Product Dataset Mapping
const products = [
    {
        id: 1,
        title: "Classic Golden Drop",
        price: "₹95",
        image: "images/1.png"
    },
    {
        id: 2,
        title: "Elegant Diamond Stud",
        price: "₹96",
        image: "images/2.png"
    },
    {
        id: 3,
        title: "Royal Jhumka Edition",
        price: "₹99",
        image: "images/3.png"
    },
    {
        id: 4,
        title: "Stylish Earing",
        price: "86",
        image: "images/4.png
    }      
];

// Tracking state parameters
let selectedProduct = "";
let selectedPrice = "";
let cartCount = 0;

// Injection and premium initialization function
function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation: premiumFadeIn ${0.4 + index * 0.15}s ease forwards; opacity: 0;">
            <div class="product-img-container">
                <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1617038220319-276d3c1626c9?q=80&w=500';">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${product.price}</p>
                <button class="buy-btn" onclick="openModal('${product.title}', '${product.price}')">
                     Buy Now
                </button>
            </div>
        </div>
    `).join('');
}

// Inline luxury dynamic animation parser
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
    @keyframes premiumFadeIn {
        from { opacity: 0; transform: translateY(40px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(dynamicStyles);

// Seamless checkout Modal controls
function openModal(name, price) {
    selectedProduct = name;
    selectedPrice = price;
    
    document.getElementById('modal-product-display').innerText = `${name} — ${price}`;
    document.getElementById('orderModal').style.display = "block";
}

function closeModal() {
    document.getElementById('orderModal').style.display = "none";
    document.getElementById('userName').value = "";
    document.getElementById('userAddress').value = "";
    document.getElementById('agreeTerms').checked = false; // Reset checkbox state
}

// WhatsApp instant billing system routing
function sendOrder() {
    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const isAgreed = document.getElementById('agreeTerms').checked; // Checkbox tracking
    const phoneNumber = "917507726901"; 

    // 1. Basic validation check
    if(!name || !address) {
        alert("Bhai, order process karne ke liye Name aur Address fill kijiye! 😊");
        return;
    }

    // 2. Strict Terms and Conditions verification check
    if(!isAgreed) {
        alert("⚠️ Please agree to the terms: Payment online karna hoga aur ek baar bechne ke baad return nahi hoga!");
        return;
    }

    // If both verified, proceed with dispatch logic
    cartCount++;
    const badge = document.getElementById('cart-count');
    if(badge) badge.innerText = cartCount;

    // Structured enterprise dispatch message formatting with accepted legal T&C conditions
    const message = `✨ *NEW ORDER RECEIVED* ✨\n\n👤 *Customer Name:* ${name}\n📍 *Delivery Address:* ${address}\n\n📦 *Product Ordered:* ${selectedProduct}\n💰 *Price Total:* ${selectedPrice}\n\n✅ *Customer Agreement:* I agree that payment will be online & No returns after sale.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
}

// Initializing execution loop upon loading DOM architecture
document.addEventListener('DOMContentLoaded', loadProducts);
