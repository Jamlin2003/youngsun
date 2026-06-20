const glow=document.querySelector('.cursor-glow');
window.addEventListener('mousemove',e=>{ if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}});
const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>links.classList.toggle('open'));}
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');}})},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
