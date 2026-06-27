// Product Data Mapping exactly matching your repo configuration
const products = [
    {
        id: 1,
        title: "Classic Golden Drop",
        price: "₹299",
        image: "images/1782475435503.png" // Apne folder se copy karke yahan paste karo
    },
    {
        id: 2,
        title: "Elegant Diamond Stud",
        price: "₹349",
        image: "images/1782475901117.png" // Apne folder se copy karke yahan paste karo
    },
    {
        id: 3,
        title: "Royal Jhumka Edition",
        price: "₹499",
        image: "images/1782476324392.png" // Apne folder se copy karke yahan paste karo
    }
];


// Tracking details for currently clicked item
let selectedProduct = "";
let selectedPrice = "";
let cartCount = 0;

// Dynamic load products on screen
function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img-container">
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/300x350?text=Earring'">
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

// Modal handling functions
function openModal(name, price) {
    selectedProduct = name;
    selectedPrice = price;
    
    // Display chosen product in modal
    document.getElementById('modal-product-display').innerText = `${name} (${price})`;
    document.getElementById('orderModal').style.display = "block";
}

function closeModal() {
    document.getElementById('orderModal').style.display = "none";
    // Clear inputs
    document.getElementById('userName').value = "";
    document.getElementById('userAddress').value = "";
}

// Main logic to dispatch order seamlessly via WhatsApp
function sendOrder() {
    const name = document.getElementById('userName').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    const phoneNumber = "917507726901"; // Target Business WhatsApp Line

    if(name && address) {
        // Increment cart counter seamlessly for dynamic experience
        cartCount++;
        const countElement = document.getElementById('cart-count');
        if(countElement) countElement.innerText = cartCount;

        // Structured order format
        const message = `✨ *NEW ORDER RECEIVED* ✨\n\n👤 *Customer Name:* ${name}\n📍 *Delivery Address:* ${address}\n\n📦 *Item Details:* ${selectedProduct}\n💰 *Price Total:* ${selectedPrice}\n\nPlease confirm the shipment schedule! 🤝`;
        
        // Finalizing secure encoding link
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Fire Redirection
        window.open(whatsappUrl, '_blank');
        closeModal();
    } else {
        alert("Bhai, order confirm karne ke liye Name aur Address dono fill kijiye! 😊");
    }
}

// Fire execution upon completely drawing content layout
document.addEventListener('DOMContentLoaded', loadProducts);
