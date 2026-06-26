// ===============================
// ROYAL ATELIER MAIN SCRIPT
// ===============================

// FIX: Pehle check karenge ki LocalStorage me data hai ya nahi. Agar nahi hai, tabhi default data set hoga.
let defaultProducts = [
    {
        id: 1,
        name: "Imperial Diamond Ring",
        price: 125000,
        category: "Ring",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e",
        tag: "Premium"
    },
    {
        id: 2,
        name: "Royal Gold Necklace",
        price: 250000,
        category: "Necklace",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
        tag: "Luxury"
    },
    {
        id: 3,
        name: "Elegant Pearl Earrings",
        price: 75000,
        category: "Earrings",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908",
        tag: "New"
    }
];

let products = JSON.parse(localStorage.getItem("products"));

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
// SEARCH
// ===============================

function searchProduct() {
    let value = document.getElementById("search").value.toLowerCase();
    let result = products.filter(p => p.name.toLowerCase().includes(value));
    loadProducts(result);
}

// ===============================
// CATEGORY FILTER
// ===============================

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
// ADMIN ADD PRODUCT
// ===============================

function addProduct() {
    let name = document.getElementById("pname").value;
    let price = Number(document.getElementById("price").value);
    let category = document.getElementById("ptype").value;
    let image = document.getElementById("image").value.trim();

    if (!name || !price || !image) {
        showToast("Fill all details");
        return;
    }

    // FIX: Agar GitHub ka normal link daala toh usko automatically RAW image link me convert karega takki sabko dikhe
    if (image.includes("github.com") && !image.includes("raw.githubusercontent.com")) {
        if (image.includes("/blob/")) {
            image = image.replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/");
        } else if (!image.includes("?raw=true")) {
            image = image + "?raw=true";
        }
    }

    products.push({
        id: Date.now(),
        name,
        price,
        category,
        image,
        tag: "New"
    });

    localStorage.setItem("products", JSON.stringify(products));
    showToast("Product Added");
    
    // Inputs clear karne ke liye
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
// DELETE
// ===============================

function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(products));
    loadAdmin();
    showToast("Deleted");
}

// ===============================
// BRAND CHANGE
// ===============================

function saveBrand() {
    let name = document.getElementById("brandName").value;
    localStorage.setItem("brand", name);
    showToast("Brand Updated");
}

// ===============================
// TOAST
// ===============================

function showToast(text) {
    let t = document.getElementById("toast");
    if (!t) return;
    t.innerHTML = text;
    t.style.display = "block";
    setTimeout(() => {
        t.style.display = "none";
    }, 2000);
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
