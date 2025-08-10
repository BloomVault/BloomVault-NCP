// Robust strain detail loader using fetch()
import { addItem } from './cart.js';

const el = document.getElementById('strain');

async function load(){
  try{
    const res = await fetch('assets/js/strains.json', {cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const strains = await res.json();
    const id = Number(new URLSearchParams(location.search).get('id')||'1');
    const s = strains.find(x=>x.id===id) || strains[0];
    render(s);
  }catch(err){
    console.error('Failed to load strains.json', err);
    el.innerHTML = '<div class="card small">Could not load strain details right now.</div>';
  }
}

function render(s){
  el.innerHTML = `
    <section class="card">
      <h1>${s.name}</h1>
      <div class="grid">
        <div class="card">
          <img class="card-img" style="height:220px" src="${s.image}" alt="${s.name}">
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

  document.getElementById('add').addEventListener('click', ()=>{
    const qty = Number(document.getElementById('qty').value||1);
    addItem(s.id, s.name, qty);
  });
}

load();
