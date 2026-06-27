// ==========================================
// 1. FIREBASE CONFIGURATION (Yahan apni details daalein)
// ==========================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL", // Yeh zaroori hai Realtime DB ke liye
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase safely
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
} catch (e) {
    console.error("Firebase initialization failed:", e);
    alert("Firebase Init Fail ho gaya! Check your credentials.");
}

let products = [];

// Real-time Database se listener connect karna
try {
    firebase.database().ref('products').on('value', (snapshot) => {
        products = [];
        snapshot.forEach((childSnapshot) => {
            let data = childSnapshot.val();
            data.dbKey = childSnapshot.key; // Auto delete key generation
            products.push(data);
        });
        
        // Dono interfaces (User View & Admin View) ko live update fail karna
        if (document.getElementById("products")) {
            displayProducts(products);
        }
        if (document.getElementById("adminList")) {
            loadAdmin();
        }
    }, (error) => {
        console.error("Database listener error:", error);
    });
} catch (err) {
    console.error("Database binding error:", err);
}

// ==========================================
// 2. ADD PRODUCT TO FIREBASE
// ==========================================
function addProduct() {
    console.log("Button clicked! addProduct execution started...");

    let nameElement = document.getElementById("pname");
    let priceElement = document.getElementById("price");
    let categoryElement = document.getElementById("ptype");
    let filenameElement = document.getElementById("imageFilename");

    if (!nameElement || !priceElement || !filenameElement) {
        alert("CRITICAL ERROR: HTML Elements missing inside script!");
        return;
    }

    let name = nameElement.value.trim();
    let price = priceElement.value.trim();
    let category = categoryElement.value;
    let filename = filenameElement.value.trim();

    // Basic Validation
    if (!name || !price || !filename) {
        if(typeof showToast === "function") showToast("Please fill all fields! ❌");
        alert("Saare boxes bharna zaroori hai!");
        return;
    }

    // Dynamic Directory Routing
    let finalImagePath = "./images/" + filename;

    let newProduct = {
        name: name,
        price: Number(price),
        category: category,
        image: finalImagePath
    };

    console.log("Pushing data to Firebase:", newProduct);

    // DIRECT CLOUD PUSH
    firebase.database().ref('products').push(newProduct)
        .then(() => {
            alert("Product Linked Successfully! ✅ Data sent to Firebase.");
            if(typeof showToast === "function") showToast("Product Linked Successfully! ✅");
            
            // Clear inputs automatically after success
            document.getElementById("pname").value = "";
            document.getElementById("price").value = "";
            document.getElementById("imageFilename").value = "";
        })
        .catch((error) => {
            console.error("Firebase Storage Error:", error);
            alert("Firebase Error: " + error.message);
        });
}

// ==========================================
// 3. DISPLAY PRODUCTS IN USER PLATFORM (index.html)
// ==========================================
function displayProducts(productsList) {
    let grid = document.getElementById("products");
    if (!grid) return;
    grid.innerHTML = "";

    if (productsList.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #bbb;">No products available in this showcase.</p>`;
        return;
    }

    productsList.forEach(p => {
        grid.innerHTML += `
            <div class="card">
                <img src="${p.image}" alt="${p.name}" onerror="this.src='./images/fallback-default.png'">
                <div class="card-info">
                    <h3>${p.name}</h3>
                    <p class="price">₹${p.price.toLocaleString("en-IN")}</p>
                    <span class="tag">${p.category}</span>
                </div>
            </div>
        `;
    });
}

// ==========================================
// 4. LOAD ADMIN DASHBOARD UTILITIES (admin.html)
// ==========================================
function loadAdmin() {
    let table = document.getElementById("adminList");
    let totalItemsEl = document.getElementById("statTotalItems");
    let totalValueEl = document.getElementById("statTotalValue");
    let activeCatsEl = document.getElementById("statActiveCats");

    if (!table) return;
    table.innerHTML = "";

    if (products.length === 0) {
        table.innerHTML = `<tr><td colspan="5" style="text-align:center; color:#aaa;">Inventory is Empty! All Cloud Stock Cleared.</td></tr>`;
        if(totalItemsEl) totalItemsEl.innerText = "0";
        if(totalValueEl) totalValueEl.innerText = "₹0";
        if(activeCatsEl) activeCatsEl.innerText = "0";
        return;
    }

    let totalValue = 0;
    let categoriesSet = new Set();

    products.forEach(p => {
        totalValue += Number(p.price) || 0;
        categoriesSet.add(p.category);

        table.innerHTML += `
            <tr>
                <td><img src="${p.image}" width="60" style="object-fit: cover; height: 60px; border-radius: 4px; border: 1px solid rgba(212,175,55,.3);" onerror="this.src='./images/fallback-default.png'"></td>
                <td style="font-weight:600; color:#fff;">${p.name}</td>
                <td style="color:#d4af37;">₹${p.price.toLocaleString("en-IN")}</td>
                <td><span style="background:#222; color:#bbb; padding:4px 10px; border-radius:12px; font-size:12px;">${p.category}</span></td>
                <td style="text-align: right;">
                    <button class="gold-btn" style="width:auto; padding:6px 15px; font-size:12px; border-color:#ff4444; color:#ff4444;" onclick="deleteProduct('${p.dbKey}')">Delete</button>
                </td>
            </tr>
        `;
    });

    if(totalItemsEl) totalItemsEl.innerText = products.length;
    if(totalValueEl) totalValueEl.innerText = "₹" + totalValue.toLocaleString("en-IN");
    if(activeCatsEl) activeCatsEl.innerText = categoriesSet.size;
}

// ==========================================
// 5. DELETE & CLEANUP UTILITIES
// ==========================================
function deleteProduct(key) {
    if(confirm("Remove this masterpiece from showcase?")) {
        firebase.database().ref('products/' + key).remove()
            .then(() => showToast("Product Deleted"))
            .catch((err) => console.log(err));
    }
}

function clearAllStock() {
    if (confirm("🚨 DANGER: Are you absolutely sure you want to WIPE out all stock from the cloud database?")) {
        firebase.database().ref('products').remove()
            .then(() => {
                showToast("Database Formatted!");
            });
    }
}

function saveBrand() {
    let name = document.getElementById("brandName").value.trim();
    if(name) {
        showToast("Brand Name Updated: " + name);
    }
}

function showToast(msg) {
    let t = document.getElementById("toast");
    if(t) {
        t.innerText = msg;
        t.classList.add("show");
        setTimeout(() => t.classList.remove("show"), 2500);
    }
}

function searchProduct() {
    let query = document.getElementById("search").value.toLowerCase();
    let filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

function filterCategory() {
    let cat = document.getElementById("category").value;
    if(cat === "all") {
        displayProducts(products);
    } else {
        let filtered = products.filter(p => p.category === cat);
        displayProducts(filtered);
    }
}
