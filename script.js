const products = [

{
id:"@Raj1",
title:"Classic Golden Drop",
price:99,
category:"normal",
variants:{
Default:"images/1.png"
}
},


{
id:"@Raj2",
title:"Elegant Diamond Stud",
price:96,
category:"normal",
variants:{
Default:"images/2.png"
}
},


{
id:"@Raj3",
title:"Royal Jhumka Edition",
price:98,
category:"normal",
variants:{
Default:"images/3.png"
}
},


{
id:"@Raj4",
title:"Stylish Earring",
price:94,
category:"normal",
variants:{
Default:"images/4.png"
}
},


{
id:"@Raj5",
title:"Earring Model 5",
price:97,
category:"normal",
variants:{
White:"images/5.png",
Golden:"images/golden5.png"
}
},


{
id:"@Raj6",
title:"Earring Model 6",
price:87,
category:"normal",
variants:{
Default:"images/6.png"
}
},


{
id:"@Raj7",
title:"Earring Model 7",
price:95,
category:"normal",
variants:{
Silver:"images/7.png",
Golden:"images/8.png"
}
},


{
id:"@Raj8",
title:"Earring Model 8",
price:97,
category:"normal",
variants:{
Default:"images/8.png"
}
},


{
id:"@Raj9",
title:"Earring Model 9",
price:97,
category:"normal",
variants:{
Default:"images/9.png"
}
},


{
id:"@Raj10",
title:"Earring Model 10",
price:99,
category:"normal",
variants:{
Default:"images/10.png"
}
},

{
id:"@Raj11",
title:"Earring Model 11",
price:99,
category:"normal",
variants:{
Default:"images/11.png"
}
},


{
id:"@Raj12",
title:"Earring Model 12",
price:99,
category:"normal",
variants:{
Default:"images/12.png"
}
},


{
id:"@Raj13",
title:"Earring Model 13",
price:92,
category:"normal",
variants:{
Default:"images/13.png"
}
},


{
id:"@Raj14",
title:"Earring Model 14",
price:99,
category:"normal",
variants:{
Default:"images/14.png"
}
},


{
id:"@Raj15",
title:"Earring Model 15",
price:99,
category:"normal",
variants:{
Default:"images/15.png"
}
},


{
id:"@Raj16",
title:"Earring Model 16",
price:99,
category:"normal",
variants:{
Default:"images/16.png"
}
},


{
id:"@Raj17",
title:"Royal Multi-Jhumka",
price:161,
category:"premium",
variants:{
Pink:"images/pink17.png",
Purple:"images/purple17.png",
Black:"images/black17.png"
}
},


{
id:"@Raj18",
title:"Luxury Stone Drop",
price:161,
category:"premium",
variants:{
Silver:"images/18.png",
Black:"images/18black.png",
Blue:"images/18blue.png",
Green:"images/18green.png"
}
},


{
id:"@Raj19",
title:"Elegant Pearl Stud",
price:161,
category:"premium",
variants:{
Green:"images/green19.png",
Pink:"images/pink19.png",
Gold:"images/19gold.png"
}
},


{
id:"@Raj20",
title:"Modern Diamond Hoop",
price:161,
category:"premium",
variants:{
Silver:"images/20silver.png",
Black:"images/20black.png",
Rose:"images/20rose.png"
}
}

];


let selectedProduct = "";
let selectedColor = "Default";
let originalBasePrice = 0;
let finalCalculatedPrice = 0;
let activeCouponApplied = "None";
let cartCount = 0;



function renderProducts(
category="all",
priceRange="all",
search=""
){

const grid = document.getElementById("product-grid");


let filtered = products.filter(p=>{


let cat =
category==="all" || p.category===category;


let price=true;


if(priceRange!=="all"){

let range=priceRange.split("-");

price =
p.price >= Number(range[0]) &&
p.price <= Number(range[1]);

}


let find =
p.title.toLowerCase().includes(search.toLowerCase())
||
p.id.toLowerCase().includes(search.toLowerCase());


return cat && price && find;

});


grid.innerHTML = filtered.map(p=>{


let firstImage =
Object.values(p.variants)[0];


return `

<div class="product-card" data-color="${Object.keys(p.variants)[0]}">

<div class="product-img-container">

<img 
class="main-product-image"
src="${firstImage}"
onerror="this.onerror=null;this.src='images/default.png'">

</div>


<div class="product-info">

<h3 class="product-title">

${p.title}

<small>${p.id}</small>

</h3>


<div class="colors">

${Object.keys(p.variants).map(color=>`

<button onclick="changeColor(this,'${p.variants[color]}','${color}')">

${color}

</button>

`).join("")}

</div>


<p class="product-price">
₹${p.price}
</p>


<button 
class="buy-btn"
onclick="buyProduct('${p.id}','${p.title}',${p.price},this)">

Buy Now

</button>


</div>

</div>

`;

}).join("");

}
function changeColor(btn,img,color){


let card = btn.closest(".product-card");


let image = card.querySelector(".main-product-image");


image.style.opacity="0";


setTimeout(()=>{

image.src=img;

image.style.opacity="1";


},200);



card.dataset.color=color;



card.querySelectorAll(".colors button")
.forEach(b=>b.classList.remove("active"));


btn.classList.add("active");


}





function buyProduct(id,name,price,btn){


let card =
btn.closest(".product-card");


selectedProduct =
id + " - " + name;


selectedColor =
card.dataset.color || "Default";


originalBasePrice = price;


finalCalculatedPrice = price;


activeCouponApplied = "None";


document.getElementById("couponInput").value="";

document.getElementById("couponMsg").style.display="none";


openModal(
name,
price,
selectedColor
);


}





function openModal(name,price,color){


document.getElementById(
"modal-product-display"
).innerHTML = `


${name}

<br>

Color:
<b>${color}</b>

<br>

Price:

<span id="modal-price-tag">
₹${price}
</span>


`;



document.getElementById(
"orderModal"
).style.display="block";


}






function closeModal(){


document.getElementById(
"orderModal"
).style.display="none";



document.getElementById("couponInput").value="";


document.getElementById("couponMsg").style.display="none";


finalCalculatedPrice =
originalBasePrice;


activeCouponApplied="None";


}

function applyCoupon(){


let code =
document.getElementById("couponInput")
.value.trim();



let msg =
document.getElementById("couponMsg");



let price =
document.getElementById("modal-price-tag");




if(code==="RK KUMAR"){


finalCalculatedPrice =
Math.max(originalBasePrice - 20,0);


activeCouponApplied="RK KUMAR";


}


else if(code==="RK_PREMIUM"){


finalCalculatedPrice =
Math.max(originalBasePrice - 25,0);


activeCouponApplied="RK_PREMIUM";


}

else{


msg.innerHTML="❌ Invalid Coupon";

msg.style.display="block";

return;

}



price.innerHTML =
"₹"+finalCalculatedPrice;


msg.innerHTML =
"🎉 Coupon Applied";


msg.style.display="block";


}









function copyCoupon(){


let code =
document.getElementById("couponCode")
.innerText;



navigator.clipboard.writeText(code);



document.getElementById("copyBtnText")
.innerHTML="Copied ✓";


setTimeout(()=>{


document.getElementById("copyBtnText")
.innerHTML="Copy Code";


},2000);


}










function sendOrder(){


let name =
document.getElementById("userName")
.value.trim();


let address =
document.getElementById("userAddress")
.value.trim();


let phone =
document.getElementById("userPhone")
.value.trim();


let social =
document.getElementById("userSocial")
.value.trim();


let agree =
document.getElementById("agreeTerms")
.checked;




if(!name || !address || !phone || !social){


alert("Please fill all details");

return;

}




if(!/^\d{10}$/.test(phone)){


alert("Enter valid 10 digit phone number");

return;

}




if(!agree){


alert("Accept terms first");

return;

}




cartCount++;



document.getElementById("cart-count")
.innerHTML=cartCount;





let message = `

✨ NEW ORDER ✨


Name:
${name}


Phone:
${phone}


Instagram/Email:
${social}


Address:
${address}


Product:
${selectedProduct}


Color:
${selectedColor}


Coupon:
${activeCouponApplied}


Total:
₹${finalCalculatedPrice}


`;




window.open(

"https://wa.me/917507726901?text="+
encodeURIComponent(message),

"_blank"

);



closeModal();


}









document.addEventListener(
"DOMContentLoaded",

()=>{


renderProducts();



let search =
document.getElementById("searchBar");



if(search){


search.addEventListener(
"input",

e=>{


renderProducts(
"all",
"all",
e.target.value
);


});


}


});
