
import { getCart } from './cart.js';
function encode(data){ return Object.keys(data).map(k=>encodeURIComponent(k)+'='+encodeURIComponent(data[k])).join('&'); }
document.getElementById('quote-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const lines = getCart();
  if(!lines.length){ alert('Your cart is empty. Add strains from the catalog.'); return; }
  const quoteId='BV-'+Date.now();
  try{
    const r = await fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: encode({'form-name':'quote', quoteId, ...data, lines: JSON.stringify(lines)}) });
    if(r.ok){ document.getElementById('quote-result').textContent='Thanks! Your quote was submitted. Quote ID: '+quoteId; e.target.reset(); return; }
  }catch(_){}
  const body = `Quote ID: ${quoteId}%0D%0ACompany: ${data.businessName}%0D%0AContact: ${data.contactName}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0AAddress: ${data.street}, ${data.city}, ${data.state} ${data.zip}%0D%0ALicense: ${data.license}%0D%0ANotes: ${data.notes||''}%0D%0A%0D%0AItems:%0D%0A` + lines.map(l=>`- ${l.name}: ${l.qty} (${l.qty*50} plants)`).join('%0D%0A');
  window.location.href = `mailto:BloomVaultFarms@gmail.com?subject=${encodeURIComponent('Quote request '+quoteId)}&body=${body}`;
});
