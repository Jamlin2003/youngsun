const ADMIN_USER='admin';
const ADMIN_PASS='youngsun';
const OWNER='Jamlin2003';
const REPO='youngsun';
const BRANCH='main';
const files=['data/site.json','data/lol.json','data/courses.json','data/quotes.json','data/challenge.json'];
let currentFile=files[0];
const $=id=>document.getElementById(id);
$('loginBtn').onclick=()=>{ if($('user').value===ADMIN_USER && $('pass').value===ADMIN_PASS){$('login').classList.add('hidden');$('admin').classList.remove('hidden');boot();} else $('loginStatus').textContent='帳號或密碼錯誤'; };
async function boot(){ $('token').value=localStorage.getItem('youngsun_github_token')||''; $('fileTabs').innerHTML=files.map(f=>`<button data-file="${f}">${f}</button>`).join(''); document.querySelectorAll('#fileTabs button').forEach(b=>b.onclick=()=>loadFile(b.dataset.file)); $('saveToken').onclick=()=>{localStorage.setItem('youngsun_github_token',$('token').value.trim());msg('Token 已儲存在本機瀏覽器。')}; $('clearToken').onclick=()=>{localStorage.removeItem('youngsun_github_token');$('token').value='';msg('Token 已清除。')}; $('formatBtn').onclick=formatJSON; $('downloadBtn').onclick=downloadJSON; $('publishBtn').onclick=publish; await loadFile(currentFile); }
async function loadFile(file){ currentFile=file; document.querySelectorAll('#fileTabs button').forEach(b=>b.classList.toggle('active',b.dataset.file===file)); $('editorTitle').textContent=file; const r=await fetch('../'+file+'?t='+Date.now()); const json=await r.json(); $('editor').value=JSON.stringify(json,null,2); msg('已載入 '+file); }
function formatJSON(){ try{$('editor').value=JSON.stringify(JSON.parse($('editor').value),null,2);msg('JSON 格式化完成。')}catch(e){msg('JSON 格式錯誤：'+e.message)} }
function downloadJSON(){ const blob=new Blob([$('editor').value],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=currentFile.split('/').pop(); a.click(); }
async function publish(){ let token=$('token').value.trim()||localStorage.getItem('youngsun_github_token'); if(!token){msg('請先輸入 GitHub Token。');return;} let content; try{content=JSON.stringify(JSON.parse($('editor').value),null,2);}catch(e){msg('JSON 格式錯誤：'+e.message);return;} msg('正在取得 GitHub 檔案資訊...'); const api=`https://api.github.com/repos/${OWNER}/${REPO}/contents/${currentFile}`; const get=await fetch(api,{headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json'}}); if(!get.ok){msg('取得檔案失敗：'+await get.text());return;} const info=await get.json(); msg('正在發布到 GitHub...'); const body={message:`Update ${currentFile} from YoungSun Admin`,content:btoa(unescape(encodeURIComponent(content))),sha:info.sha,branch:BRANCH}; const put=await fetch(api,{method:'PUT',headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify(body)}); if(!put.ok){msg('發布失敗：'+await put.text());return;} msg('發布成功！GitHub Pages 約 1–3 分鐘後更新。'); }
function msg(t){$('status').textContent=t;}
