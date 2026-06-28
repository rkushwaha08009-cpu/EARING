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
        price: "₹86",
        image: "images/4.png"
    }      
];

// Tracking state parameters
let selectedProduct = "";
let originalBasePrice = 0; // Numeric value track karne ke liye
let finalCalculatedPrice = 0; // Final amount aur WhatsApp ke liye
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
    .coupon-section {
        background: rgba(212, 175, 55, 0.05);
        border: 1px dashed #d4af37;
        padding: 12px;
        border-radius: 12px;
        margin: 15px 0;
        text-align: left;
    }
    .coupon-header {
        font-size: 12px;
        color: #d4af37;
        font-weight: 600;
        margin-bottom: 8px;
    }
    .coupon-row {
        display: flex;
        gap: 8px;
    }
    .coupon-row input {
        margin-bottom: 0 !important;
        padding: 10px !important;
    }
    .apply-btn {
        background: #d4af37;
        color: black;
        border: none;
        padding: 0 15px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 13px;
        cursor: pointer;
        transition: 0.2s;
    }
    .apply-btn:hover { background: #fff; }
    .coupon-success {
        color: #25D366;
        font-size: 12px;
        margin-top: 5px;
        font-weight: 500;
        display: none;
    }
`;
document.head.appendChild(dynamicStyles);

// Seamless checkout Modal controls
function openModal(name, priceStr) {
    selectedProduct = name;
    
    // String price se sirf number nikalna (e.g., "₹86" -> 86)
    originalBasePrice = parseInt(priceStr.replace(/[^0-9]/g, ''));
    
    // Rule 1: Automatic ₹25 add karna base price me
    finalCalculatedPrice = originalBasePrice + 25;
    
    // Modal UI Update with increased price
    document.getElementById('modal-product-display').innerHTML = `
        ${name} — <span id="modal-price-tag">₹${finalCalculatedPrice}</span>
    `;

    // Dynamic Coupon Box Injector (agar pehle se nahi hai)
    let modalContent = document.querySelector('.modal-content');
    let existingCoupon = document.getElementById('coupon-box-wrapper');
    
    if (!existingCoupon) {
        let couponWrapper = document.createElement('div');
        couponWrapper.id = 'coupon-box-wrapper';
        couponWrapper.className = 'coupon-section';
        couponWrapper.innerHTML = `
            <div class="coupon-header">🎁 Use code "RK KUMAR" to get ₹20 OFF!</div>
            <div class="coupon-row">
                <input type="text" id="couponInput" placeholder="Enter Coupon Code">
                <button type="button" class="apply-btn" onclick="applyCoupon()">Apply</button>
            </div>
            <div id="couponMsg" class="coupon-success">🎉 Code Applied! ₹20 Discounted!</div>
        `;
        // Address input ke theek pehle append karna
        let addressGroup = document.querySelectorAll('.input-group')[1];
        addressGroup.parentNode.insertBefore(couponWrapper, addressGroup.nextSibling);
    } else {
        // Reset coupon state if modal re-opened
        document.getElementById('couponInput').value = "";
        document.getElementById('couponInput').disabled = false;
        document.getElementById('couponMsg').style.display = "none";
    }

    document.getElementById('orderModal').style.display = "block";
}

// Coupon Evaluation Trigger
function applyCoupon() {
    let code = document.getElementById('couponInput').value.trim();
    let msg = document.getElementById('couponMsg');
    let priceTag = document.getElementById('modal-price-tag');

    if (code === "RK KUMAR") {
        // Rule 2: Coupon match hone par ₹20 kam karna
        finalCalculatedPrice = (originalBasePrice + 25) - 20;
        priceTag.innerText = `₹${finalCalculatedPrice}`;
        
        msg.innerText = `🎉 Code "RK KUMAR" Applied! ₹20 saved.`;
        msg.style.display = "block";
        msg.style.color = "#25D366";
        document.getElementById('couponInput').disabled = true;
    } else {
        msg.innerText = `❌ Invalid Coupon Code!`;
        msg.style.display = "block";
        msg.style.color = "#ff3333";
    }
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
    const couponApplied = document.getElementById('couponInput') ? document.getElementById('couponInput').disabled : false;
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

    // Coupon tracking string for WhatsApp billing record
    const couponStatus = couponApplied ? "RK KUMAR (₹20 Applied)" : "None";

    // Structured enterprise dispatch message formatting
    const message = `✨ *NEW ORDER RECEIVED* ✨\n\n👤 *Customer Name:* ${name}\n📍 *Delivery Address:* ${address}\n\n📦 *Product Ordered:* ${selectedProduct}\n🎫 *Coupon Used:* ${couponStatus}\n💰 *Price Total:* ₹${finalCalculatedPrice}\n\n✅ *Customer Agreement:* I agree that payment will be online & No returns after sale.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
}

// Initializing execution loop upon loading DOM architecture
document.addEventListener('DOMContentLoaded', loadProducts);
