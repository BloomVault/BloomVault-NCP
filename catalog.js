// Robust catalog loader using fetch (works on GitHub Pages and most hosts)
import { addItem } from './cart.js';

const wrap = document.getElementById('catalog');

async function loadStrains(){
  try{
    const res = await fetch('assets/js/strains.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const strains = await res.json();
    render(strains);
  }catch(err){
    console.error('Failed to load strains.json', err);
    wrap.innerHTML = '<div class="small">Could not load catalog. Please try again in a moment.</div>';
  }
}

function render(strains){
  wrap.innerHTML = strains.map(s=>`
    <div class="card">
      <img class="card-img" src="${s.image}" alt="${s.name}">
      <h3>${s.name}</h3>
      <div class="actions">
        <a class="btn" href="strain.html?id=${s.id}">Details</a>
        <button class="btn" data-id="${s.id}">Add to Quote</button>
        <input type="range" min="1" max="20" value="1" class="qty" data-for="${s.id}">
      </div>
      <div class="small">Qty = multiples of 50 plants</div>
    </div>
  `).join('');

  wrap.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const id = Number(e.currentTarget.getAttribute('data-id'));
      const s = strains.find(x=>x.id===id);
      const slider = wrap.querySelector(\`input[data-for="\${id}"]\`);
      const qty = Number(slider?.value || 1);
      addItem(id, s.name, qty);
    });
  });
}

loadStrains();
