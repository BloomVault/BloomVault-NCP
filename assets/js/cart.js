
export const CART_KEY = 'bv_cart';
export function getCart(){ try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch(_){return[]} }
export function saveCart(items){ localStorage.setItem(CART_KEY, JSON.stringify(items)); renderCartTable?.(); }
export function addItem(id,name,qty){ const items=getCart(); const i=items.find(x=>x.id===id); if(i){ i.qty+=qty; } else { items.push({id,name,qty}); } saveCart(items); }
export function removeItem(id){ const items=getCart().filter(x=>x.id!==id); saveCart(items); }
window.addToQuote = (id, name, qty=1)=> addItem(id,name,qty);
export function renderCartTable(){
  const tbl = document.querySelector('#cart-table tbody');
  if(!tbl) return;
  const items=getCart();
  tbl.innerHTML = items.map(x=>`<tr><td>${x.name}</td><td>${x.qty}</td><td><button class="btn" onclick="window.removeFromCart(${x.id})">Remove</button></td></tr>`).join('') || '<tr><td colspan="3" class="small">Cart is empty.</td></tr>';
}
window.removeFromCart = (id)=> removeItem(id);
renderCartTable();
