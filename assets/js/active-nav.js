<script>
/* active-nav.js */
(function(){
  const STORAGE_KEY = "quoteCart";

  function getPathFile(){
    try {
      const p = location.pathname.split("/").pop();
      return p || "index.html";
    } catch { return "index.html"; }
  }

  function activateCurrentTab(){
    const file = getPathFile();
    document.querySelectorAll(".tabs .tab").forEach(a => {
      const href = a.getAttribute("href") || "";
      a.classList.toggle("active", href.endsWith(file));
    });
  }

  function readCart(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  }

  function countItems(){
    return readCart().reduce((n, it) => n + (it.qty || 0), 0);
  }

  function refreshQuoteBadge(){
    const el = document.getElementById("nav-quote-count");
    if (!el) return;
    const total = countItems();
    if (total > 0) {
      el.textContent = total;
      el.style.display = "inline-flex";
      el.setAttribute("aria-hidden","false");
    } else {
      el.textContent = "";
      el.style.display = "none";
      el.setAttribute("aria-hidden","true");
    }
  }

  /* Re-run when the page focuses, when storage changes in other tabs,
     and whenever `quoteCart` is updated in this tab. */
  window.addEventListener("focus", refreshQuoteBadge);
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) refreshQuoteBadge();
  });

  try {
    const _setItem = localStorage.setItem;
    localStorage.setItem = function(k, v){
      _setItem.apply(this, arguments);
      if (k === STORAGE_KEY) refreshQuoteBadge();
    };
  } catch {}

  document.addEventListener("DOMContentLoaded", () => {
    activateCurrentTab();
    refreshQuoteBadge();
  });
})();
</script>
