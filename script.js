// ===============================
// ROYAL ATELIER MAIN SCRIPT
// ===============================

// Aapke naye 'images' folder ke mutabik exact paths
const GitHubFallbackPhotos = [
    "./images/1782475435503.png", 
    "./images/1782475940117.png", 
    "./images/1782476323492.png",
    "./images/624746743_18054387368413838_5499993106643338994_n.webp.jpg"
];

// Initial default products agar LocalStorage khali ho toh
const defaultProducts = [
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
    },
    // Aapke folder ki do premium images pehle se store me load kar di hain
    {
        id: 4,
        name: "Premium Earring Edition 1",
        price: 85000,
        category: "Earrings",
        image: GitHubFallbackPhotos[0],
        tag: "Exclusive"
    },
    {
        id: 5,
        name: "Premium Earring Edition 2",
        price: 95000,
        category: "Earrings",
        image: GitHubFallbackPhotos[1],
        tag: "Hot"
    }
];

let products = JSON.parse(localStorage.getItem("products"));

// FIX: Data sirf pehli baar load hoga, baar-baar refresh par overwrite nahi hoga
if (!products || products.length === 0) {
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

    if (!name || !price) {
        showToast("Fill Product Name and Price!");
        return;
    }

    // FIX 1: Agar image field khali hai, toh automatic random local photo lagayega
    if (!image) {
        let randomIndex = Math.floor(Math.random() * GitHubFallbackPhotos.length);
        image = GitHubFallbackPhotos[randomIndex];
    } 
    // FIX 2: Agar user ne sirf filename daala (jaise 'love1.jpg'), toh automatic path lagayega
    else if (!image.startsWith("http://") && !image.startsWith("https://") && !image.startsWith("./")) {
        image = "./images/" + image;
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
