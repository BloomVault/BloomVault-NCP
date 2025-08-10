
import { addItem } from './cart.js';

const wrap = document.getElementById('catalog');

const DEFAULT_STRAINS = [{"id": 1, "name": "Placeholder Strain #1", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_1.jpg"}, {"id": 2, "name": "Placeholder Strain #2", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_2.jpg"}, {"id": 3, "name": "Placeholder Strain #3", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_3.jpg"}, {"id": 4, "name": "Placeholder Strain #4", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_4.jpg"}, {"id": 5, "name": "Placeholder Strain #5", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_5.jpg"}, {"id": 6, "name": "Placeholder Strain #6", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_6.jpg"}, {"id": 7, "name": "Placeholder Strain #7", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_7.jpg"}, {"id": 8, "name": "Placeholder Strain #8", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_8.jpg"}, {"id": 9, "name": "Placeholder Strain #9", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_9.jpg"}, {"id": 10, "name": "Placeholder Strain #10", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_10.jpg"}, {"id": 11, "name": "Placeholder Strain #11", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_11.jpg"}, {"id": 12, "name": "Placeholder Strain #12", "type": "Placeholder", "thc": "THC%-placeholder", "cbd": "CBD%-placeholder", "flowering": "Placeholder weeks", "vigor": "Placeholder", "yield": "Placeholder", "terpenes": "Terpene profile: placeholder", "moq": "MOQ: placeholder", "lead": "Lead time: placeholder days", "compliance": "Compliance: placeholder", "image": "assets/img/strain_12.jpg"}];

async function loadStrains() {
  // 1) Inline window.__STRAINS from HTML (if present)
  if (Array.isArray(window.__STRAINS) && window.__STRAINS.length) return window.__STRAINS;
  // 2) Try to fetch the JSON bundle
  try {
    const res = await fetch('assets/js/strains.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    if (Array.isArray(data) && data.length) return data;
  } catch (err) {
    console.warn('Falling back to built-in placeholder strains.', err);
  }
  // 3) Final fallback: built-in defaults so the grid always renders
  return DEFAULT_STRAINS;
}

function render(strains) {
  if (!wrap) return;
  wrap.innerHTML = strains.map(s => `
    <div class="card">
      <img class="card-img" src="${s.image}" alt="${s.name}" onerror="this.style.opacity=.3">
      <h3>${s.name}</h3>
      <div class="actions">
        <a class="btn" href="strain.html?id=${s.id}">Details</a>
        <button class="btn" data-id="${s.id}">Add to Quote</button>
        <input type="range" min="1" max="20" value="1" class="qty" data-for="${s.id}">
      </div>
      <div class="small">Qty = multiples of 50 plants</div>
    </div>
  `).join('');

  wrap.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = Number(e.currentTarget.getAttribute('data-id'));
      const s = strains.find(x => x.id === id);
      const slider = wrap.querySelector(`input[data-for="${id}"]`);
      const qty = Number(slider?.value || 1);
      addItem(id, s.name, qty);
    });
  });
}

loadStrains().then(render);
