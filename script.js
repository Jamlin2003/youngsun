const DATA = {};
async function loadJSON(path){ const r=await fetch(path); if(!r.ok) throw new Error(path); return r.json(); }
async function init(){
  DATA.site = await loadJSON('data/site.json');
  renderNav();
  setupCursor();
  setupReveal();
  const page = document.body.dataset.page;
  if(page==='home') renderHome();
  if(page==='about') renderAbout();
  if(page==='lol') { DATA.lol=await loadJSON('data/lol.json'); renderLol(); }
  if(page==='courses') { DATA.courses=await loadJSON('data/courses.json'); renderCourses(); }
  if(page==='join') renderJoin();
}
function renderNav(){
  const b=DATA.site.brand, nav=DATA.site.nav;
  document.querySelector('#navbar').innerHTML = `<a class="brand" href="index.html"><strong>${b.name}</strong><span>${b.subtitle}</span></a><div class="nav-links">${nav.map(n=>`<a href="${n.href}" class="${location.pathname.endsWith(n.href)|| (location.pathname.endsWith('/')&&n.href==='index.html')?'active':''}">${n.label}</a>`).join('')}</div><a class="ig-btn" href="${b.instagramUrl}" target="_blank">追蹤 IG</a><button class="menu-btn" aria-label="menu">☰</button>`;
  document.querySelector('.menu-btn').onclick=()=>document.querySelector('#navbar').classList.toggle('mobile-open');
}
function setupCursor(){
  const glow=document.querySelector('.cursor-glow');
  window.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
}
function setupReveal(){
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
function renderHome(){
  const h=DATA.site.home;
  document.querySelector('#app').innerHTML = `<section class="hero"><div class="hero-grid"><div class="reveal"><div class="eyebrow">${h.heroEyebrow}</div><h1><span class="hero-title-line">在大學，</span><span class="hero-title-line rotating">不只是讀書。</span></h1><p>${h.heroSubtitle}</p><div class="hero-actions"><a class="btn" href="about.html">探索揚生</a><a class="btn secondary" href="lol.html">了解 LOL</a></div></div><div class="mosaic reveal">${h.heroImages.map(src=>`<img src="${src}" alt="YoungSun image">`).join('')}</div></div><div class="scroll-hint">SCROLL ↓</div></section><section class="section"><div class="container reveal"><h2 class="section-title">四大核心價值</h2><p class="section-sub">目標、學習、自律、成長，讓想變好的念頭不只停在腦中。</p><div class="cards">${h.values.map(v=>`<div class="card"><div class="icon">${v.icon}</div><h3>${v.title}</h3><small>${v.en}</small><p>${v.text}</p></div>`).join('')}</div></div></section><section class="section dark"><div class="container split reveal"><div><div class="eyebrow">ABOUT YOUNGSUN</div><h2 class="section-title">我們除了加入環境，也可以創造環境。</h2><p class="section-sub">YoungSun 是一個陪伴大學生建立目標、自律習慣與自主學習能力的青年成長社群。</p><a class="btn" href="about.html">關於揚生</a></div><div class="photo-panel"></div></div></section><section class="section"><div class="container reveal"><div class="eyebrow">LETTER OF LIFE</div><h2 class="section-title">LOL，把夢想轉化為行動。</h2><p class="section-sub">透過目標、時間、具體方法、成果、檢視點與價值，建立自己的成長系統。</p><a class="btn" href="lol.html">了解 LOL生命契約</a></div></section><section class="section"><div class="container reveal"><h2 class="section-title">課程與活動</h2><p class="section-sub">每一次課程、訓練與成果發表，都是把行動累積成改變的現場。</p><a class="btn" href="courses.html">查看課程活動</a></div></section><section class="section dark"><div class="container reveal"><h2 class="section-title">下一個改變的人，可能就是你。</h2><p class="section-sub">不必等到變得優秀，才開始成長。成長的開始，本身就是一種優秀。</p><a class="btn" href="join.html">加入揚生</a></div></section>`;
  let i=0; const words=h.rotatingWords; setInterval(()=>{document.querySelector('.rotating').textContent=words[i++%words.length]},2600);
  setupReveal();
}
function renderAbout(){
 const a=DATA.site.about;
 document.querySelector('#app').innerHTML=`<section class="page-hero"><div class="container reveal"><div class="eyebrow">ABOUT</div><h1>${a.heroTitle}</h1><p class="lead">${a.heroSubtitle}</p></div></section><section class="section"><div class="container split reveal"><div><h2 class="section-title">揚生青年是什麼？</h2><p class="section-sub">${a.intro}</p></div><div class="photo-panel"></div></div></section><section class="section dark"><div class="container reveal"><div class="eyebrow">WE BELIEVE</div>${a.beliefs.map(x=>`<div class="belief">${x}</div>`).join('')}</div></section><section class="section"><div class="container reveal"><h2 class="section-title">揚生的核心原則</h2><div class="cards" style="grid-template-columns:repeat(2,1fr)">${a.principles.map(p=>`<div class="card"><h3>${p.title}</h3><p>${p.text}</p></div>`).join('')}</div></div></section><section class="section dark"><div class="container reveal"><h2 class="section-title">成長，不只是等待機會。</h2><p class="section-sub">而是主動創造機會。</p><a class="btn" href="lol.html">探索 LOL</a></div></section>`; setupReveal();
}
function renderLol(){
 const l=DATA.lol;
 document.querySelector('#app').innerHTML=`<section class="page-hero"><div class="container reveal"><div class="eyebrow">LETTER OF LIFE</div><h1>${l.hero.title}</h1><p class="lead">${l.hero.subtitle}｜${l.hero.description}</p></div></section><section class="section"><div class="container reveal"><h2 class="section-title">什麼是 LOL？</h2><p class="section-sub">${l.intro}</p></div></section><section class="section dark"><div class="container reveal"><h2 class="section-title">LOL 六角核心圖</h2><div class="hex-wrap">${l.elements.map((e,idx)=>`<div class="hex-node glass" data-idx="${idx}"><div class="icon">${e.icon}</div><h3>${e.title}</h3><small>${e.en}</small></div>`).join('')}<div class="hex-center"><strong>LOL</strong><span>Letter Of Life</span></div></div></div></section><section class="section"><div class="container reveal"><h2 class="section-title">SMART 原則</h2><div class="cards">${l.smart.map(s=>`<div class="card"><div class="icon">${s.letter}</div><h3>${s.word}</h3><p>${s.text}</p></div>`).join('')}</div></div></section><section class="section dark"><div class="container reveal"><h2 class="section-title">${l.compensation.title}</h2><p class="section-sub">${l.compensation.text}</p></div></section><section class="section"><div class="container reveal"><h2 class="section-title">一份 LOL 長什麼樣？</h2><div class="glass"><h3>${l.example.title}</h3>${l.example.items.map(x=>`<p><strong>${x.label}：</strong>${x.value}</p>`).join('')}</div></div></section>`;
 document.querySelectorAll('.hex-node').forEach(n=>n.onclick=()=>openLolModal(l.elements[n.dataset.idx])); setupReveal();
}
function openLolModal(e){
 const m=document.querySelector('#modal'); m.innerHTML=`<div class="modal-box"><button class="modal-close">關閉</button><div class="icon">${e.icon}</div><h2>${e.title} <small>${e.en}</small></h2><p><strong>${e.summary}</strong></p><p>${e.detail}</p></div>`; m.classList.add('show'); m.querySelector('button').onclick=()=>m.classList.remove('show');
}
function renderCourses(){
 const c=DATA.courses;
 document.querySelector('#app').innerHTML=`<section class="page-hero"><div class="container reveal"><div class="eyebrow">COURSES</div><h1>${c.hero.title}</h1><p class="lead">${c.hero.subtitle}</p></div></section><section class="section"><div class="container reveal"><h2 class="section-title">本學期課程</h2><div class="course-grid">${c.semesterCourses.map(x=>`<div class="card course-card"><img src="${x.image}" alt="${x.title}"><div class="course-body"><h3>${x.title}</h3><p>${x.date}｜${x.time}</p><p>${x.speaker}｜${x.location}</p>${x.link?`<a class="btn" href="${x.link}">報名</a>`:''}</div></div>`).join('')}</div></div></section><section class="section"><div class="container reveal"><h2 class="section-title">自學小組</h2><div class="course-grid">${c.studyGroups.map(x=>`<div class="card course-card"><img src="${x.image}"><div class="course-body"><h3>${x.title}</h3></div></div>`).join('')}</div></div></section><section class="section dark"><div class="container reveal"><h2 class="section-title">歷年活動</h2><div class="album-grid">${c.albums.map(a=>`<div class="album"><img src="${a.images[0]}"><span>${a.title}</span></div>`).join('')}</div></div></section>`; setupReveal();
}
function renderJoin(){
 const j=DATA.site.join, b=DATA.site.brand;
 document.querySelector('#app').innerHTML=`<section class="page-hero"><div class="container reveal"><div class="eyebrow">JOIN US</div><h1>${j.heroTitle}</h1><p class="lead">${j.heroSubtitle}</p><div class="hero-actions"><a class="btn" href="${b.instagramUrl}" target="_blank">追蹤 Instagram</a></div></div></section><section class="section"><div class="container reveal"><h2 class="section-title">誰適合加入？</h2><div class="cards">${j.fitCards.map(x=>`<div class="card"><h3>${x}</h3></div>`).join('')}</div></div></section><section class="section"><div class="container reveal"><h2 class="section-title">常見問題</h2><div class="faq">${j.faq.map(f=>`<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</div></div></section><section class="section dark"><div class="container reveal"><h2 class="section-title">追蹤我們</h2><p class="section-sub">掌握最新課程、活動與成長故事。</p><a class="btn" href="${b.instagramUrl}" target="_blank">${b.instagramHandle}</a></div></section>`; setupReveal();
}
init().catch(err=>{document.querySelector('#app').innerHTML='<section class="section"><div class="container"><h1>資料載入失敗</h1><p>'+err.message+'</p></div></section>'});
