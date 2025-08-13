/* assets/js/cart.js
   Minimal, sitewide cart: every .add-to-quote adds +1 of that item.
   Uses localStorage key "quoteCart" so the Quote/My Cart page can read it.
*/
(() => {
  const STORAGE_KEY = "quoteCart";

  // --- Storage helpers ---
  function readCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }
  function writeCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  // --- Public-ish API (also exposed to window for other pages if needed) ---
  function addOne(id, name) {
    if (!id || !name) return;
    const cart = readCart();
    const i = cart.findIndex(it => String(it.id) === String(id) && it.name === name);
    if (i >= 0) {
      cart[i].qty = (cart[i].qty || 0) + 1;
    } else {
      cart.push({ id: String(id), name, qty: 1 });
    }
    writeCart(cart);
    // Notify listeners (e.g., a cart UI on quote.html) without forcing any UI here
    document.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart } }));
    return cart;
  }

  // Tiny +1 bubble if page has the CSS (safe to no-op if not)
  function plusOneBubble(btn) {
    try {
      const b = document.createElement("span");
      b.className = "plus-one";
      b.textContent = "+1";
      btn.appendChild(b);
      setTimeout(() => b.remove(), 850);
    } catch {}
  }

  // --- Wire every .add-to-quote button (works across all pages) ---
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-quote");
    if (!btn) return;
    e.preventDefault();
    const { id, name } = btn.dataset;
    addOne(id, name);
    plusOneBubble(btn);
    if (window.showToast) showToast(`Added “${name}” +1`);
  });

  // Expose for other scripts/pages if needed
  window.Cart = { read: readCart, write: writeCart, addOne };
})();
