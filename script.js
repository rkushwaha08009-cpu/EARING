const GITHUB_BASE_URL = "https://raw.githubusercontent.com/rkushwaha08009-cpu/EARING/main/";

async function loadProducts() {
    const grid = document.getElementById('product-grid');
    try {
        const response = await fetch(GITHUB_BASE_URL + 'products.json');
        const products = await response.json();

        grid.innerHTML = products.map((product, index) => {
            const displayPrice = parseInt(product.price) + 25;
            // Image URL GitHub se fetch hoga
            const imageUrl = GITHUB_BASE_URL + product.image;

            return `
                <div class="product-card">
                    <div class="product-img-container">
                        <img src="${imageUrl}" alt="${product.title}" 
                             onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1617038220319-276d3c1626c9?q=80&w=500';">
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-price">₹${displayPrice}</p>
                        <button class="buy-btn" onclick="openModal('${product.title}', ${displayPrice})">Buy Now</button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (e) {
        console.error("Error loading products:", e);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);
