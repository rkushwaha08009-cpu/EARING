// ===============================
// ROYAL ATELIER MAIN SCRIPT
// ===============================

// Aapke images folder ke exact file names ka array
const GitHubFallbackPhotos = [
    "1782475435503.png", 
    "1782475940117.png", 
    "1782476323492.png",
    "624746743_18054387368413838_5499993106643338994_n.webp.jpg"
];

// Initial default products jab pehli baar website kholenge
const defaultProducts = [
    {
        id: 1,
        name: "Premium Earring Edition 1",
        price: 85000,
        category: "Earrings",
        image: "./images/1782475435503.png",
        tag: "Exclusive"
    },
    {
        id: 2,
        name: "Premium Earring Edition 2",
        price: 95000,
        category: "Earrings",
        image: "./images/1782475940117.png",
        tag: "Hot"
    }
];

let products = JSON.parse(localStorage.getItem("products"));

// Agar LocalStorage khali hai toh default data load hoga
if (!products) {
    products = defaultProducts;
    localStorage.setItem("products", JSON.stringify(products));
}

// ===============================
// LOAD STORE
// ===============================

function loadProducts(list = products) {
    let box = document.getElementById("products");
    if (!box) return;
    box.innerHTML = "";

    if (list.length === 0) {
        box.innerHTML = `<h3 style="text-align:center; width:100%; color:#aaa; padding:40px;">No Products Available In Stock</h3>`;
        return;
    }

    list.forEach(p => {
        box.innerHTML += `
            <div class="card">
                <div class="badge">${p.tag}</div>
                <img src="${p.image}" alt="${p.name}">
                <div class="info">
                    <h2>${p.name}</h2>
                    <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
                    <button class="gold-btn" onclick="buyNow('${p.name}', ${p.price})">
                        <i class="fa-brands fa-whatsapp"></i> Buy Now
                    </button>
                </div>
            </div>
        `;
    });
}

// ===============================
// SEARCH & FILTER
// ===============================

function searchProduct() {
    let value = document.getElementById("search").value.toLowerCase();
    let result = products.filter(p => p.name.toLowerCase().includes(value));
    loadProducts(result);
}

function filterCategory() {
    let cat = document.getElementById("category").value;
    if (cat === "all") {
        loadProducts(products);
    } else {
        let result = products.filter(p => p.category === cat);
        loadProducts(result);
    }
}

// ===============================
// WHATSAPP ORDER
// ===============================

function buyNow(name, price) {
    let number = "919876543210";
    let msg = `Hello, I am interested in ${name}\nPrice ₹${price}`;
    window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(msg));
}

// ===============================
// ADMIN ADD PRODUCT (SMART FILTER)
// ===============================

function addProduct() {
    let name = document.getElementById("pname").value.trim();
    let price = Number(document.getElementById("price").value);
    let category = document.getElementById("ptype").value;
    let imageInput = document.getElementById("image").value.trim();

    if (!name || !price || !imageInput) {
        showToast("Fill all details first!");
        return;
    }

    // SMART CHECK: Check karega ki input kiya gaya naam hamare images array me hai ya nahi
    if (!GitHubFallbackPhotos.includes(imageInput)) {
        showToast("Error: Invalid Image Name! Use exact name from images folder.");
        alert("Bug Prevention: Yeh image folder me nahi hai! Kripya sahi naam dalein.\n\nAvailable files:\n" + GitHubFallbackPhotos.join("\n"));
        return; // Yahi se block kar dega, product add nahi hoga
    }

    // Agar naam sahi hai, toh strict path generate karega
    let finalImagePath = "./images/" + imageInput;

    products.push({
        id: Date.now(),
        name,
        price,
        category,
        image: finalImagePath,
        tag: "New"
    });

    localStorage.setItem("products", JSON.stringify(products));
    showToast("Product Added Successfully!");
    
    // Reset inputs
    document.getElementById("pname").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";

    loadAdmin();
}

// ===============================
// ADMIN TABLE
// ===============================

function loadAdmin() {
    let table = document.getElementById("adminList");
    if (!table) return;
    table.innerHTML = "";

    if (products.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#aaa;">Inventory is Empty! All Stock Cleared.</td></tr>`;
        return;
    }

    products.forEach(p => {
        table.innerHTML += `
            <tr>
                <td><img src="${p.image}" width="60" style="object-fit: cover; height: 60px; border-radius: 4px;"></td>
                <td>${p.name}</td>
                <td>₹${p.price.toLocaleString("en-IN")}</td>
                <td>${p.category}</td>
                <td>
                    <button class="gold-btn" onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ===============================
// DELETE SINGLE PRODUCT
// ===============================

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    loadAdmin();
    showToast("Deleted");
}

// ===============================
// SMART ACTION: CLEAR ALL STOCK
// ===============================

function clearAllStock() {
    if (confirm("Kya aap sach me poora STOCK KHALI karna chahte hain? Isse saari images aur items hat jayenge!")) {
        products = []; // Poora array empty
        localStorage.setItem("products", JSON.stringify(products)); // Storage saaf
        loadAdmin();
        showToast("All Stock Cleared!");
    }
}

// ===============================
// BRAND CHANGE & TOAST
// ===============================

function saveBrand() {
    let name = document.getElementById("brandName").value;
    localStorage.setItem("brand", name);
    showToast("Brand Updated");
}

function showToast(text) {
    let t = document.getElementById("toast");
    if (!t) return;
    t.innerHTML = text;
    t.style.display = "block";
    setTimeout(() => {
        t.style.display = "none";
    }, 2500);
}

// ===============================
// START
// ===============================

window.onload = function() {
    loadProducts();
    loadAdmin();

    let loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    }
}
