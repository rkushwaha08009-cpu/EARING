// TODO: Aapka Firebase Config yahan sabse upar paste karein:
// const firebaseConfig = { ... };
// firebase.initializeApp(firebaseConfig);

let products = [];

// Real-time Database se listener connect karna
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
});

// 1. ADD PRODUCT WITH AUTOMATIC LOCAL FOLDER ROUTING
function addProduct() {
    let name = document.getElementById("pname").value.trim();
    let price = document.getElementById("price").value.trim();
    let category = document.getElementById("ptype").value;
    let filename = document.getElementById("imageFilename").value.trim();

    if (!name || !price || !filename) {
        showToast("Please fill all fields!");
        return;
    }

    // STYLING DIRECTORY RESOLVER
    // Agar aapne "love.png" daala, toh ye automatic use "./images/love.png" bana dega
    let finalImagePath = "./images/" + filename;

    let newProduct = {
        name: name,
        price: Number(price),
        category: category,
        image: finalImagePath
    };

    // Firebase database push setup
    firebase.database().ref('products').push(newProduct)
        .then(() => {
            showToast("Product Linked Successfully! ✅");
            // Clear inputs
            document.getElementById("pname").value = "";
            document.getElementById("price").value = "";
            document.getElementById("imageFilename").value = "";
        })
        .catch((error) => console.error("Database Error:", error));
}

// 2. DISPLAY PRODUCTS IN USER PLATFORM (index.html)
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
                <!-- Direct folder image injection -->
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

// 3. LOAD ADMIN DASHBOARD UTILITIES (admin.html)
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

    // Update Dashboard Stats Counters
    if(totalItemsEl) totalItemsEl.innerText = products.length;
    if(totalValueEl) totalValueEl.innerText = "₹" + totalValue.toLocaleString("en-IN");
    if(activeCatsEl) activeCatsEl.innerText = categoriesSet.size;
}

// 4. DELETE SINGLE MASTERPIECE
function deleteProduct(key) {
    if(confirm("Remove this masterpiece from showcase?")) {
        firebase.database().ref('products/' + key).remove()
            .then(() => showToast("Product Deleted"))
            .catch((err) => console.log(err));
    }
}

// 5. EMERGENCY WIPE ALL INVENTORY
function clearAllStock() {
    if (confirm("🚨 DANGER: Are you absolutely sure you want to WIPE out all stock from the cloud database?")) {
        firebase.database().ref('products').remove()
            .then(() => {
                showToast("Database Formatted!");
            });
    }
}

// 6. BRAND MANAGER UTILITY
function saveBrand() {
    let name = document.getElementById("brandName").value.trim();
    if(name) {
        showToast("Brand Name Updated: " + name);
    }
}

// TOAST TRIGGER
function showToast(msg) {
    let t = document.getElementById("toast");
    if(t) {
        t.innerText = msg;
        t.classList.add("show");
        setTimeout(() => t.classList.remove("show"), 2500);
    }
}

// USER SEARCH & FILTER CONTROLS (Bypass routing)
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
