// Product Dataset (Extended to 25)
const products = [
    { id: 1, title: "Classic Golden Drop", price: 86, image: "images/1.png" },
    { id: 2, title: "Elegant Diamond Stud", price: 83, image: "images/2.png" },
    { id: 3, title: "Royal Jhumka Edition", price: 88, image: "images/3.png" },
    { id: 4, title: "Stylish Earing", price: 84, image: "images/4.png" },
    { id: 5, title: "Minimalist Gold Hoop", price: 87, image: "images/5.png" },
    { id: 6, title: "Pearl Stud Classic", price: 87, image: "images/6.png" },
    { id: 7, title: "Rose Gold Delicate", price: 87, image: "images/7.png" },
    { id: 8, title: "Vintage Antique Brass", price: 87, image: "images/8.png" },
    { id: 9, title: "Crystal Dangler", price: 87, image: "images/9.png" },
    { id: 10, title: "Luxury Blue Tassel", price: 99, image: "images/10.png" },
    // 11 se 25 tak Upcoming
    { id: 11, title: "Upcoming", price: 0, image: "images/11.png" },
    { id: 12, title: "Upcoming", price: 0, image: "images/12.png" },
    { id: 13, title: "Upcoming", price: 0, image: "images/13.png" },
    { id: 14, title: "Upcoming", price: 0, image: "images/14.png" },
    { id: 15, title: "Upcoming", price: 0, image: "images/15.png" },
    { id: 16, title: "Upcoming", price: 0, image: "images/16.png" },
    { id: 17, title: "Upcoming", price: 0, image: "images/17.png" },
    { id: 18, title: "Upcoming", price: 0, image: "images/18.png" },
    { id: 19, title: "Upcoming", price: 0, image: "images/19.png" },
    { id: 20, title: "Upcoming", price: 0, image: "images/20.png" },
    { id: 21, title: "Upcoming", price: 0, image: "images/21.png" },
    { id: 22, title: "Upcoming", price: 0, image: "images/22.png" },
    { id: 23, title: "Upcoming", price: 0, image: "images/23.png" },
    { id: 24, title: "Upcoming", price: 0, image: "images/24.png" },
    { id: 25, title: "Upcoming", price: 0, image: "images/25.png" }
];

function loadProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = products.map((product, index) => {
        const isUpcoming = product.id > 10;
        const displayPrice = product.price + 25;

        return `
            <div class="product-card" style="animation: premiumFadeIn ${0.2 + index * 0.05}s ease forwards; opacity: 0;">
                <div class="product-img-container" style="position: relative;">
                    <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1617038220319-276d3c1626c9?q=80&w=500';">
                    ${isUpcoming ? '<div class="coming-soon-tag">COMING SOON</div>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${isUpcoming ? "Upcoming Style" : product.title}</h3>
                    <p class="product-price">${isUpcoming ? "---" : "₹" + displayPrice}</p>
                    <button class="buy-btn" ${isUpcoming ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : `onclick="openModal('${product.title}', ${displayPrice})"`}>
                         ${isUpcoming ? "Stay Tuned" : "Buy Now"}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}
// ... Baaki functions same rahenge (applyCoupon, sendOrder, etc.)
