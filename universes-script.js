// universes-script.js – rendu de la page des univers

const grid = document.getElementById('universesGrid');
const toggleBtn = document.getElementById('toggleAllBtn');

function renderUniverses(){
  grid.innerHTML = (window.universesData || []).map(u=>`
    <div class="universe-card">
      <div class="universe-head">
        <div class="universe-name">${u.icon ?? ''} ${u.name}</div>
        <div class="universe-description">${u.description ?? ''}</div>
      </div>
      <div class="sub-universes open">
        <div class="sub-universes-content">
          ${u.subUniverses.map(su=>`
            <div class="sub-universe-item" data-name="${su.name}">
              <span>${su.emoji ?? ''}</span><span>${su.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function toggleAll(){
  const all = Array.from(document.querySelectorAll('.sub-universes'));
  const willOpen = toggleBtn.dataset.state !== 'open';
  all.forEach(el => el.classList.toggle('open', willOpen));
  toggleBtn.textContent = willOpen ? 'Masquer tous les univers' : 'Afficher tous les univers';
  toggleBtn.dataset.state = willOpen ? 'open' : 'closed';
}

function handleClick(e){
  const item = e.target.closest('.sub-universe-item');
  if(!item) return;
  const name = item.dataset.name;
  const defs = window.subUniverseDefinitions || {};
  const text = defs[name] || "Définition à venir pour ce sous-univers.";
  openModal(name, text);
}

// --- Modale ---
const modal = document.getElementById('defModal');
const closeModalBtn = document.getElementById('closeModal');
function openModal(title, text){
  document.getElementById('defTitle').textContent = title;
  document.getElementById('defText').textContent = text;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}
modal.addEventListener('click', (e)=>{ if(e.target === modal) closeModal(); });
closeModalBtn.addEventListener('click', closeModal);

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  renderUniverses();
  grid.addEventListener('click', handleClick);
  toggleBtn.addEventListener('click', toggleAll);
});
