
import { addItem } from './cart.js';

const DEFAULT_STRAINS = [{"id": 1, "name": "Placeholder Strain #1", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_1.jpg"}, {"id": 2, "name": "Placeholder Strain #2", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_2.jpg"}, {"id": 3, "name": "Placeholder Strain #3", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_3.jpg"}, {"id": 4, "name": "Placeholder Strain #4", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_4.jpg"}, {"id": 5, "name": "Placeholder Strain #5", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_5.jpg"}, {"id": 6, "name": "Placeholder Strain #6", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_6.jpg"}, {"id": 7, "name": "Placeholder Strain #7", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_7.jpg"}, {"id": 8, "name": "Placeholder Strain #8", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_8.jpg"}, {"id": 9, "name": "Placeholder Strain #9", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_9.jpg"}, {"id": 10, "name": "Placeholder Strain #10", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_10.jpg"}, {"id": 11, "name": "Placeholder Strain #11", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_11.jpg"}, {"id": 12, "name": "Placeholder Strain #12", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_12.jpg"}];

async function loadStrains() {
  if (Array.isArray(window.__STRAINS) && window.__STRAINS.length) return window.__STRAINS;
  try {
    const res = await fetch('assets/js/strains.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (Array.isArray(data) && data.length) return data;
  } catch (err) {
    console.warn('Falling back to built-in placeholder strains.', err);
  }
  return DEFAULT_STRAINS;
}

function renderStrain(s) {
  const el = document.getElementById('strain');
  if (!el) return;
  el.innerHTML = `
    <section class="card">
      <h1>${s.name}</h1>
      <div class="grid">
        <div class="card">
          <img class="card-img" style="height:220px" src="${s.image}" alt="${s.name}" onerror="this.style.opacity=.3">
          <div class="actions" style="margin-top:10px">
            <label class="small">Qty</label>
            <input id="qty" type="range" min="1" max="20" value="1">
            <button class="btn" id="add">Add to Quote</button>
          </div>
        </div>
        <div class="card">
          <h3>Specs</h3>
          <table class="table">
            <tr><th>Type</th><td>${s.type}</td></tr>
            <tr><th>THC%</th><td>${s.thc}</td></tr>
            <tr><th>CBD%</th><td>${s.cbd}</td></tr>
            <tr><th>Flowering</th><td>${s.flowering}</td></tr>
            <tr><th>Vigor</th><td>${s.vigor}</td></tr>
            <tr><th>Yield</th><td>${s.yield}</td></tr>
            <tr><th>Terpenes</th><td>${s.terpenes}</td></tr>
            <tr><th>MOQ</th><td>${s.moq}</td></tr>
            <tr><th>Lead Time</th><td>${s.lead}</td></tr>
            <tr><th>Compliance</th><td>${s.compliance}</td></tr>
          </table>
        </div>
      </div>
    </section>
  `;

  document.getElementById('add').addEventListener('click', () => {
    const qty = Number(document.getElementById('qty').value || 1);
    addItem(s.id, s.name, qty);
  });
}

loadStrains().then(strains => {
  const id = Number(new URLSearchParams(location.search).get('id') || '1');
  const s = strains.find(x => x.id === id) || strains[0];
  renderStrain(s);
});
