// ==========================================
// FIREBASE CONFIGURATION & INITIALIZATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyB9SeoDcKu1_WhaFIEYXI4IrcMM0mOQiOY",
    authDomain: "earing-bfc75.firebaseapp.com",
    databaseURL: "https://earing-bfc75-default-rtdb.firebaseio.com",
    projectId: "earing-bfc75",
    storageBucket: "earing-bfc75.firebasestorage.app",
    messagingSenderId: "425149311395",
    appId: "1:425149311395:web:c1df82b87dd66d4cf79216",
    measurementId: "G-3Q7LMPM2ZW"
};

// Initialize Firebase using compat SDK
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Global array for live sync data
let products = [];

// Aapke 'images' folder ke exact file names ki validation list
const GitHubFallbackPhotos = [
    "1782475435503.png", 
    "1782475940117.png", 
    "1782476323492.png",
    "624746743_18054387368413838_5499993106643338994_n.webp.jpg"
];

// ==========================================
// REAL-TIME DATABASE SYNC
// ==========================================
database.ref("products").on("value", (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
        products = Object.keys(data).map(key => ({
            dbKey: key, // Live cloud ID for deletion
            ...data[key]
        }));
    } else {
        products = [];
    }

    // Live update triggers automatically on all sessions/tabs
    loadProducts();
    loadAdmin();
});

// ==========================================
// LOAD STORE (CUSTOMER INTERFACE)
// ==========================================
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
                <div class="badge">${p.tag || "New"}</div>
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

// ==========================================
// SEARCH & FILTER
// ==========================================
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

// ==========================================
// WHATSAPP ORDER
// ==========================================
function buyNow(name, price) {
    let number = "919876543210";
    let msg = `Hello, I am interested in ${name}\nPrice ₹${price}`;
    window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(msg));
}

// ==========================================
// ADMIN ADD PRODUCT (SMART FILTER FOR IMAGES FOLDER)
// ==========================================
function addProduct() {
    let name = document.getElementById("pname").value.trim();
    let price = Number(document.getElementById("price").value);
    let category = document.getElementById("ptype").value;
    let imageInput = document.getElementById("image").value.trim();

    if (!name || !price || !imageInput) {
        showToast("Fill all details first!");
        return;
    }

    // STRICT FOLDER CHECK
    if (!GitHubFallbackPhotos.includes(imageInput)) {
        showToast("Error: Invalid Image Name!");
        alert("Bug Prevention: Yeh image folder me nahi hai! Kripya sahi naam dalein.\n\nAvailable files:\n" + GitHubFallbackPhotos.join("\n"));
        return;
    }

    let finalImagePath = "./images/" + imageInput;

    const newProduct = {
        id: Date.now(),
        name: name,
        price: price,
        category: category,
        image: finalImagePath,
        tag: "New"
    };

    // Push to Firebase Cloud
    database.ref("products").push(newProduct)
        .then(() => {
            showToast("Product Added to Cloud Store!");
            document.getElementById("pname").value = "";
            document.getElementById("price").value = "";
            document.getElementById("image").value = "";
        })
        .catch((error) => {
            console.error("Firebase Error: ", error);
            showToast("Cloud connection error!");
        });
}

// ==========================================
// ADMIN TABLE LIVE INVENTORY
// ==========================================
function loadAdmin() {
    let table = document.getElementById("adminList");
    if (!table) return;
    table.innerHTML = "";

    if (products.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#aaa;">Inventory is Empty! All Cloud Stock Cleared.</td></tr>`;
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
                    <button class="gold-btn" onclick="deleteProduct('${p.dbKey}')">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ==========================================
// DELETE SINGLE PRODUCT FROM CLOUD
// ==========================================
function deleteProduct(dbKey) {
    database.ref("products/" + dbKey).remove()
        .then(() => {
            showToast("Item Deleted from Cloud!");
        });
}

// ==========================================
// UTILITY: CLEAR ALL STOCK AT ONCE
// ==========================================
function clearAllStock() {
    if (confirm("Kya aap sach me poora STOCK KHALI karna chahte hain? Isse real-time me har browser aur customer phone se items gayab ho jayenge!")) {
        database.ref("products").remove()
            .then(() => {
                showToast("All Cloud Stock Cleared!");
            });
    }
}

// ==========================================
// BRAND CHANGE & TOAST
// ==========================================
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

// Start Loader Animation
window.onload = function() {
    let loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 1500);
    }
}
