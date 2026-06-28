// Product Dataset Mapping
const products = [
    {
        id: 1,
        title: "Classic Golden Drop",
        price: "₹86",
        image: "images/1.png"
    },
    {
        id: 2,
        title: "Elegant Diamond Stud",
        price: "₹83",
        image: "images/2.png"
    },
    {
        id: 3,
        title: "Royal Jhumka Edition",
        price: "₹88",
        image: "images/3.png"
    },
    {
        id: 4,
        title: "Stylish Earing",
        price: "₹84",
        image: "images/4.png"
    },
    {
        id: 5,
        title: "xyz",
        price: "87",
        image: "images/5.png"
    },
    {
        id: 6,
        title: "xyz",
        price: "87",
        image: "images/6.png"
    },
    {
        id: 7,
        title: "xyz",
        price: "87",
        image: "images/7.png"
    },
    {
        id: 8,
        title: "xyz",
        price: "87",
        image: "images/8.png"
    },
    {
        id: 9,
        title: "xyz",
        price: "87",
        image: "images/9.png"
    },
    {
        id: 10,
        title: "xyz",
        price: "87",
        image: "images/10.png"
    },
    {
        id: 11,
        title: "xyz",
        price: "87",
        image: "images/11.png"
    },
    {
        id: 12,
        title: "xyz",
        price: "87",
        image: "images/12.png"
    },
    {
        id: 13,
        title: "xyz",
        price: "87",
        image: "images/13.png"
    },
    {
        id: 14,
        title: "xyz",
        price: "87",
        image: "images/14.png"
    },
    {
        id: 15,
        title: "xyz",
        price: "87",
        image: "images/15.png"
    },
    {
        id: 16,
        title: "xyz",
        price: "87",
        image: "images/16.png"
    },
];

// Tracking state parameters
let selectedProduct = "";
let originalBasePrice = 0; 
let finalCalculatedPrice = 0; 
let cartCount = 0;
let activeCouponApplied = "None"; // Konsa coupon laga track karne ke liye

// Injection and premium initialization function
function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map((product, index) => {
        const baseNum = parseInt(product.price.replace(/[^0-9]/g, ''));
        const displayPrice = baseNum + 25;

        return `
            <div class="product-card" style="animation: premiumFadeIn ${0.4 + index * 0.15}s ease forwards; opacity: 0;">
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1617038220319-276d3c1626c9?q=80&w=500';">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">₹${displayPrice}</p>
                    <button class="buy-btn" onclick="openModal('${product.title}', ${displayPrice})">
                         Buy Now
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Inline luxury dynamic animation and form styling parser
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
        font-size: 11px;
        color: #d4af37;
        font-weight: 600;
        margin-bottom: 8px;
        line-height: 1.4;
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
    .verification-group {
        margin: 10px 0;
        text-align: left;
    }
    .verification-group label {
        display: block;
        font-size: 12px;
        color: #aaa;
        margin-bottom: 5px;
        font-weight: 500;
    }
    .verification-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid #333;
        background: #111;
        color: #fff;
        border-radius: 8px;
        box-sizing: border-box;
    }
`;
document.head.appendChild(dynamicStyles);

// Seamless checkout Modal controls
function openModal(name, updatedPrice) {
    selectedProduct = name;
    originalBasePrice = updatedPrice;
    finalCalculatedPrice = updatedPrice;
    activeCouponApplied = "None"; // Reset state
    
    document.getElementById('modal-product-display').innerHTML = `
        ${name} — <span id="modal-price-tag">₹${finalCalculatedPrice}</span>
    `;

    let existingCoupon = document.getElementById('coupon-box-wrapper');
    let userNameField = document.getElementById('userName');
    
    if (!existingCoupon && userNameField) {
        let extraFields = document.createElement('div');
        extraFields.id = 'extra-verification-fields';
        extraFields.innerHTML = `
            <div class="verification-group">
                <label>📱 Contact Mobile Number (WhatsApp/Call)</label>
                <input type="tel" id="userPhone" placeholder="Enter 10-digit mobile number" maxlength="10">
            </div>
            <div class="verification-group">
                <label>📸 Instagram Username / Email (For Verification)</label>
                <input type="text" id="userSocial" placeholder="@username or email address">
            </div>
        `;
        userNameField.parentNode.insertBefore(extraFields, userNameField.nextSibling);

        // Updated text alert to inform about next-order premium card too!
        let couponWrapper = document.createElement('div');
        couponWrapper.id = 'coupon-box-wrapper';
        couponWrapper.className = 'coupon-section';
        couponWrapper.innerHTML = `
            <div class="coupon-header">🎁 Use code "RK KUMAR" for ₹20 OFF! <br>🌟 Got a Next-Order Card? Enter that code here for a bigger discount!</div>
            <div class="coupon-row">
                <input type="text" id="couponInput" placeholder="Enter Coupon Code">
                <button type="button" class="apply-btn" onclick="applyCoupon()">Apply</button>
            </div>
            <div id="couponMsg" class="coupon-success">🎉 Code Applied! Discount Added!</div>
        `;
        let addressField = document.getElementById('userAddress');
        if(addressField) {
            addressField.parentNode.insertBefore(couponWrapper, addressField.nextSibling);
        }
    } else {
        if(document.getElementById('userPhone')) document.getElementById('userPhone').value = "";
        if(document.getElementById('userSocial')) document.getElementById('userSocial').value = "";
        if(document.getElementById('couponInput')) {
            document.getElementById('couponInput').value = "";
            document.getElementById('couponInput').disabled = false;
        }
        if(document.getElementById('couponMsg')) document.getElementById('couponMsg').style.display = "none";
    }

    document.getElementById('orderModal').style.display = "block";
}

// Dual Coupon Evaluation Trigger
function applyCoupon() {
    let code = document.getElementById('couponInput').value.trim();
    let msg = document.getElementById('couponMsg');
    let priceTag = document.getElementById('modal-price-tag');

    if (code === "RK KUMAR") {
        // Code 1: Standard ₹20 off
        finalCalculatedPrice = originalBasePrice - 20;
        priceTag.innerText = `₹${finalCalculatedPrice}`;
        activeCouponApplied = "RK KUMAR (₹20 Off)";
        
        msg.innerText = `🎉 Code "RK KUMAR" Applied! ₹20 saved.`;
        msg.style.display = "block";
        msg.style.color = "#25D366";
        document.getElementById('couponInput').disabled = true;
    } 
    else if (code === "RK_PREMIUM") {
        // Code 2: Premium Box Card Coupon ₹25 off
        finalCalculatedPrice = originalBasePrice - 25;
        priceTag.innerText = `₹${finalCalculatedPrice}`;
        activeCouponApplied = "RK_PREMIUM (₹25 Next-Order Special)";
        
        msg.innerText = `🔥 Next-Order Card "RK_PREMIUM" Applied! ₹25 saved!`;
        msg.style.display = "block";
        msg.style.color = "#d4af37"; // Golden touch for premium card
        document.getElementById('couponInput').disabled = true;
    } 
    else {
        msg.innerText = `❌ Invalid Coupon Code!`;
        msg.style.display = "block";
        msg.style.color = "#ff3333";
    }
}

function closeModal() {
    document.getElementById('orderModal').style.display = "none";
    document.getElementById('userName').value = "";
    document.getElementById('userAddress').value = "";
    if(document.getElementById('userPhone')) document.getElementById('userPhone').value = "";
    if(document.getElementById('userSocial')) document.getElementById('userSocial').value = "";
    document.getElementById('agreeTerms').checked = false; 
}

function sendOrder() {
    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const phone = document.getElementById('userPhone') ? document.getElementById('userPhone').value.trim() : "";
    const social = document.getElementById('userSocial') ? document.getElementById('userSocial').value.trim() : "";
    const isAgreed = document.getElementById('agreeTerms').checked; 
    const phoneNumber = "917507726901"; 

    if(!name || !address || !phone || !social) {
        alert("Bhai, order confirm karne ke liye Name, Phone, Address aur Insta/Email saari details bharna zaroori hai! 😊");
        return;
    }

    if(phone.length < 10) {
        alert("⚠️ Please enter a valid 10-digit mobile number!");
        return;
    }

    if(!isAgreed) {
        alert("⚠️ Please agree to the terms: Payment online karna hoga aur ek baar bechne ke baad return nahi hoga!");
        return;
    }

    cartCount++;
    const badge = document.getElementById('cart-count');
    if(badge) badge.innerText = cartCount;

    // Structured Message with the active coupon log
    const message = `✨ *NEW ORDER CONFIRMED* ✨\n\n👤 *Customer Name:* ${name}\n📱 *Contact Number:* ${phone}\n📸 *Verification Info:* ${social}\n📍 *Delivery Address:* ${address}\n\n📦 *Product Ordered:* ${selectedProduct}\n🎫 *Coupon Used:* ${activeCouponApplied}\n💰 *Price Total:* ₹${finalCalculatedPrice}\n\n✅ *Customer Agreement:* I agree that payment will be online & No returns after sale.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    closeModal();
}

document.addEventListener('DOMContentLoaded', loadProducts);
