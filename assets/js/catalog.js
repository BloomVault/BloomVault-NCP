import { addItem } from './cart.js';
const wrap=document.getElementById('catalog');
function bindQtyDisplays(scope=document){
  scope.querySelectorAll('input[type="range"].qty').forEach(slider=>{
    const id=slider.getAttribute('data-for')||'';
    let badge=slider.parentElement?.querySelector('.qty-val');
    if(!badge){badge=document.createElement('span');badge.className='qty-val';slider.insertAdjacentElement('afterend',badge)}
    const update=()=>badge.textContent=slider.value; slider.addEventListener('input',update); update();
  });
  scope.querySelectorAll('button[data-id]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=Number(btn.getAttribute('data-id'));
      const name=btn.closest('.card')?.querySelector('h3')?.textContent||'Selected Strain';
      const slider=btn.closest('.card')?.querySelector('.qty');
      const qty=Number(slider?.value||1);
      addItem(id,name,qty);
    });
  });
}
bindQtyDisplays(document);