const products = [
  {id:1,cat:"anime",emoji:"🎌",name:"Japanese Anime Mystery Box",price:24.99,tag:"ANIME & JAPAN",checkout:"#"},
  {id:2,cat:"tech",emoji:"🎧",name:"Wireless Gaming Headset",price:34.99,tag:"TECH & ACCESSORIES",checkout:"#"},
  {id:3,cat:"home",emoji:"💡",name:"RGB Ambient Desk Light",price:19.99,tag:"HOME & LIFESTYLE",checkout:"#"},
  {id:4,cat:"anime",emoji:"🗾",name:"Japanese-Inspired Desk Decor",price:16.99,tag:"ANIME & JAPAN",checkout:"#"},
  {id:5,cat:"tech",emoji:"⌨️",name:"Compact RGB Mechanical Keyboard",price:39.99,tag:"TECH & ACCESSORIES",checkout:"#"},
  {id:6,cat:"home",emoji:"🪴",name:"Minimal LED Plant Light",price:21.99,tag:"HOME & LIFESTYLE",checkout:"#"},
  {id:7,cat:"anime",emoji:"🎮",name:"Anime Gaming Controller Grip",price:12.99,tag:"ANIME & JAPAN",checkout:"#"},
  {id:8,cat:"tech",emoji:"📱",name:"Magnetic Phone Stand",price:14.99,tag:"TECH & ACCESSORIES",checkout:"#"}
];

let cart = JSON.parse(localStorage.getItem("tbp-cart") || "[]");
const grid=document.getElementById("productGrid"), category=document.getElementById("category"), search=document.getElementById("search");
function money(n){return "£"+n.toFixed(2)}
function renderProducts(){
  const q=search.value.toLowerCase(), cat=category.value;
  const list=products.filter(p=>(cat==="all"||p.cat===cat)&&p.name.toLowerCase().includes(q));
  grid.innerHTML=list.map(p=>`<article class="card"><div class="product-img">${p.emoji}</div><div class="card-body"><span class="tag">${p.tag}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button onclick="addToCart(${p.id})">Add to cart</button></div></article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);saveCart();openCart()}
function saveCart(){localStorage.setItem("tbp-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
  document.getElementById("cartCount").textContent=cart.length;
  document.getElementById("cartItems").innerHTML=cart.length?cart.map((p,i)=>`<div class="cart-item"><span class="emoji">${p.emoji}</span><div><h4>${p.name}</h4><small>${money(p.price)} · <button onclick="removeItem(${i})" style="background:none;border:0;color:#aaa;cursor:pointer">Remove</button></small></div></div>`).join(""):"<p style='color:#888'>Your cart is empty.</p>";
  document.getElementById("cartTotal").textContent=money(cart.reduce((a,p)=>a+p.price,0));
}
function removeItem(i){cart.splice(i,1);saveCart()}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.add("open")}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("searchBtn").onclick=()=>document.getElementById("searchWrap").classList.toggle("open");
category.onchange=renderProducts;search.oninput=renderProducts;
document.getElementById("checkoutBtn").onclick=()=>alert("Connect each product to its Stripe Payment Link in script.js before accepting real orders.");
renderProducts();renderCart();
