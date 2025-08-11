import { addItem } from './cart.js';
document.addEventListener('DOMContentLoaded',()=>{
  const slider=document.getElementById('qty');
  if(slider){
    let badge=document.createElement('span');badge.className='qty-val';
    slider.insertAdjacentElement('afterend',badge);
    const update=()=>badge.textContent=slider.value; slider.addEventListener('input',update); update();
  }
  const addBtn=document.getElementById('add');
  if(addBtn){
    addBtn.addEventListener('click',()=>{
      const qty=Number(document.getElementById('qty')?.value||1);
      const name=document.querySelector('h1')?.textContent||'Selected Strain';
      const id=Number(new URLSearchParams(location.search).get('id')||'1');
      addItem(id,name,qty);
    });
  }
});