// Product Dataset Mapping (Aapki image links directly integrate kar di hain)
const products = [
    {
        id: 1,
        title: "Classic Golden Drop",
        price: "₹95",
        image: "images/1782475435503.png"
    },
    {
        id: 2,
        title: "Elegant Diamond Stud",
        price: "₹96",
        image: "images/1782475901117.png" // Agar ye load na ho, toh ise rename karke '2.png' kar dena repo me
    },
    {
        id: 3,
        title: "Royal Jhumka Edition",
        price: "₹99",
        image: "images/1782476324392.png" // Screenshot me iska naam '624746743...' se shuru ho raha hai!
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

    // Mapping details using sequential luxury transition effects
    grid.innerHTML = products.map((product, index) => `
        <div class="product-card" style="animation: premiumFadeIn ${0.4 + index * 0.15}s ease forwards; opacity: 0;">
            <div class="product-img-container">
                <!-- Isme maine ek automatic backup image bitha di hai agar path galat ho toh bhi broken icon nahi dikhega -->
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
}

// WhatsApp instant billing system routing
function sendOrder() {
    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const phoneNumber = "917507726901"; // Target receiver number

    if(name && address) {
        // Upgrade dynamic header cart indicators
        cartCount++;
        const badge = document.getElementById('cart-count');
        if(badge) badge.innerText = cartCount;

        // Structured enterprise dispatch message formatting
        const message = `✨ *NEW ORDER RECEIVED* ✨\n\n👤 *Customer Name:* ${name}\n📍 *Delivery Address:* ${address}\n\n📦 *Product Ordered:* ${selectedProduct}\n💰 *Price Total:* ${selectedPrice}\n\nPlease confirm my order order dispatch schedule! 🫂💞`;
        
        // Securely passing text parameters into secure API link
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        closeModal();
    } else {
        alert("Bhai, order process karne ke liye Name aur Address fill kijiye! 😊");
    }
}

// Initializing execution loop upon loading DOM architecture
document.addEventListener('DOMContentLoaded', loadProducts);
