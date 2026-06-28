// Web aur App dono is function se live data uthayenge
async function initStore() {
    try {
        // GitHub ka Raw URL yahan daalein
        const response = await fetch('https://raw.githubusercontent.com/rkushwaha08009-cpu/EARING/main/products.json');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Data load failed, using local fallback:", error);
    }
}

function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map((product, index) => {
        const baseNum = parseInt(product.price);
        const displayPrice = baseNum + 25;
        const isSoldOut = product.status === "soldout";

        return `
            <div class="product-card" style="animation: premiumFadeIn ${0.4 + index * 0.15}s ease forwards; opacity: 0;">
                <div class="product-img-container">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='https://images.unsplash.com/photo-1617038220319-276d3c1626c9?q=80&w=500';">
                    ${isSoldOut ? '<div class="soldout-tag">SOLD OUT</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-price">₹${displayPrice}</p>
                    <button class="buy-btn" ${isSoldOut ? 'disabled' : ''} onclick="openModal('${product.title}', ${displayPrice})">
                         ${isSoldOut ? "Out of Stock" : "Buy Now"}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', initStore);
