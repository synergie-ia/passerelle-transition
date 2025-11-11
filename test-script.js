/* 
  Script questionnaire + calculs avec validation complète
*/

let answers = {};
let profileComputed = false;
let selectedUnivers = new Set();
let totalQuestions = 0;

// Charger les sélections depuis localStorage
function loadSelections(){
  const saved = localStorage.getItem('selectedUnivers');
  if(saved){
    selectedUnivers = new Set(JSON.parse(saved));
  }
}

// Sauvegarder les sélections dans localStorage
function saveSelections(){
  localStorage.setItem('selectedUnivers', JSON.stringify([...selectedUnivers]));
}

// Charger les réponses depuis localStorage
function loadAnswers(){
  const saved = localStorage.getItem('questionnaire_answers');
  if(saved){
    answers = JSON.parse(saved);
    return true;
  }
  return false;
}

// Sauvegarder les réponses dans localStorage
function saveAnswers(){
  localStorage.setItem('questionnaire_answers', JSON.stringify(answers));
}

// Compter le nombre total de questions
function countTotalQuestions(){
  let count = 0;
  QUESTIONS.forEach(q => {
    count += q.options.length;
  });
  return count;
}

// Vérifier si toutes les questions ont une réponse
function allQuestionsAnswered(){
  return Object.keys(answers).length === totalQuestions;
}

function renderQuestions(){
  const root = document.getElementById("questionsContainer");
  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block">
      <div class="question-title">${q.title}</div>
      ${q.options.map(opt => `
        <div class="option-row">
          <div class="option-text">${opt.text}</div>
          <div class="rating-buttons">
            ${[0,1,2,3,4].map(v => `
              <div class="rate-btn" data-q="${q.id}" data-dim="${opt.dim}" data-val="${v}">${v}</div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `).join("");

  // Restaurer les sélections si elles existent
  Object.keys(answers).forEach(key=>{
    const [q, dim] = key.split("-");
    const v = answers[key];
    const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}'][data-val='${v}']`;
    const btn = document.querySelector(selector);
    if(btn){
      btn.classList.add("selected", `v${v}`);
    }
  });

  document.querySelectorAll(".rate-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const q = btn.dataset.q;
      const dim = btn.dataset.dim;
      const v = Number(btn.dataset.val);
      const key = `${q}-${dim}`;
      answers[key] = v;
      saveAnswers();

      const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}']`;
      document.querySelectorAll(selector).forEach(b=>{
        b.classList.remove("selected","v0","v1","v2","v3","v4");
      });
      btn.classList.add("selected", `v${v}`);

      // Cacher le message d'erreur si toutes les questions sont répondues
      if(allQuestionsAnswered()){
        document.getElementById("errorMessage").classList.add("hidden");
      }

      if(profileComputed){
        // Si le profil a déjà été calculé, cacher les sections
        document.getElementById("profileSection").classList.add("hidden");
        document.getElementById("univers-section").classList.add("hidden");
        profileComputed = false;
      }
    });
  });
}

function calcProfile(){
  const scores = Object.fromEntries(DIMENSIONS.map(d=>[d.code,0]));
  Object.keys(answers).forEach(key=>{
    const [,dim] = key.split("-");
    scores[dim] += answers[key];
  });
  return scores;
}

function percentFromSum(sum){
  return Math.round((sum/16)*100);
}

function calcUnivers(){
  const s = calcProfile();
  return universesData.map(u=>{
    let score=0, max=0;
    // Utiliser les poids de test-data.js si disponibles
    if(typeof universes !== 'undefined' && universes.length > 0){
      const universMatch = universes.find(uv => uv.id === u.id);
      if(universMatch && universMatch.weights){
        universMatch.weights.forEach((w,i)=>{
          const dimCode = DIMENSIONS[i].code;
          score += s[dimCode]*w;
          max += 16 * w;
        });
      }
    } else {
      // Calcul par défaut
      Object.values(s).forEach(val => {
        score += val;
        max += 16;
      });
    }
    const pct = max > 0 ? Math.round((score/max)*100) : 0;
    return {...u, pct};
  }).sort((a,b)=>b.pct-a.pct);
}

function updateUniversCounter(){
  const counter = document.getElementById("selectedUniversCounter");
  if(!counter) return;
  const n = selectedUnivers.size;
  counter.textContent = n===0
    ? "0 univers sélectionné"
    : n===1
      ? "1 univers sélectionné"
      : `${n} univers sélectionnés`;
}

function renderUniversCard(u){
  const isSelected = selectedUnivers.has(u.id);
  const hasSubUnivers = u.subUniverses && u.subUniverses.length > 0;
  
  const subUniversHTML = hasSubUnivers
    ? `<div class="sub-univers-list" id="sub-${u.id}">
        ${u.subUniverses.map(s => `
          <div class="sub-item">
            <div class="sub-icon">${s.icon || '•'}</div>
            <div>
              <div class="sub-name">${s.name}</div>
              ${s.description ? `<div class="sub-desc">${s.description}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>`
    : '';

  return `
    <div class="univers-card ${isSelected ? 'selected' : ''}" id="card-${u.id}">
      <div class="univers-header">
        <div class="univers-main">
          <div class="univers-icon">${u.icon}</div>
          <div class="univers-name">${u.name}</div>
        </div>
        <div class="univers-right">
          <div class="univers-score">${u.pct}%</div>
          <div class="univers-actions">
            ${hasSubUnivers 
              ? `<button class="btn-toggle-sub" data-id="${u.id}" title="Voir les sous-univers">🔎</button>` 
              : '<div style="width:40px"></div>'}
            <button class="btn-select-univers ${isSelected ? 'selected' : ''}" data-id="${u.id}" title="Sélectionner cet univers">
              <span class="tick">${isSelected ? '✓' : ''}</span>
            </button>
          </div>
        </div>
      </div>
      ${subUniversHTML}
    </div>
  `;
}

function attachUniversEvents(){
  // Toggle sous-univers
  document.querySelectorAll(".btn-toggle-sub").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      const id = btn.dataset.id;
      const subList = document.getElementById(`sub-${id}`);
      
      if(subList){
        const isVisible = subList.classList.contains("visible");
        subList.classList.toggle("visible");
        btn.textContent = isVisible ? "🔎" : "❌";
        btn.title = isVisible ? "Voir les sous-univers" : "Masquer les sous-univers";
      }
    });
  });

  // Sélection univers
  document.querySelectorAll(".btn-select-univers").forEach(btn=>{
    btn.addEventListener("click", (e)=>{
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      const card = document.getElementById(`card-${id}`);
      
      if(selectedUnivers.has(id)){
        selectedUnivers.delete(id);
        card.classList.remove("selected");
        btn.classList.remove("selected");
        btn.querySelector(".tick").textContent = "";
      }else{
        selectedUnivers.add(id);
        card.classList.add("selected");
        btn.classList.add("selected");
        btn.querySelector(".tick").textContent = "✓";
      }
      
      saveSelections();
      updateUniversCounter();
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadSelections();
  loadAnswers();
  
  totalQuestions = countTotalQuestions();
  
  renderQuestions();

  const btnValidate = document.getElementById("validateBtn");
  const errorMessage = document.getElementById("errorMessage");
  
  // Validation de la saisie
  btnValidate.addEventListener("click", ()=>{
    if(!allQuestionsAnswered()){
      errorMessage.classList.remove("hidden");
      errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    errorMessage.classList.add("hidden");
    
    // Calculer et afficher le profil
    const scores = calcProfile();
    const root = document.getElementById("profileResults");
    
    // Créer un tableau avec dimensions et scores pour tri
    const dimensionsWithScores = DIMENSIONS.map(dim => ({
      ...dim,
      sum: scores[dim.code],
      pct: percentFromSum(scores[dim.code])
    }));
    
    // Trier par score décroissant
    dimensionsWithScores.sort((a, b) => b.pct - a.pct);
    
    root.innerHTML = dimensionsWithScores.map(dim => {
      return `
        <div class="profile-row">
          <div class="profile-label">${dim.name}</div>
          <div class="profile-bar"><div class="profile-fill" style="width:${dim.pct}%"></div></div>
          <div><strong>${dim.pct}%</strong></div>
        </div>
      `;
    }).join("");

    document.getElementById("profileSection").classList.remove("hidden");
    profileComputed = true;
    
    // Scroll vers le profil
    setTimeout(() => {
      document.getElementById("profileSection").scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });

  const btnUnivers = document.getElementById("goUniversesBtn");
  btnUnivers.addEventListener("click", ()=>{
    // Recalcule les univers
    const list = calcUnivers();
    const root = document.getElementById("univers-results");
    const top5 = list.slice(0,5);
    const others = list.slice(5);

    // Affiche le top 5
    root.innerHTML = top5.map(u => renderUniversCard(u)).join("");
    attachUniversEvents();
    updateUniversCounter();

    // Gestion du bouton "Voir tous"
    const btnShow = document.getElementById("btn-show-all");
    btnShow.classList.remove("hidden");
    
    // Clone le bouton pour retirer les anciens événements
    const newBtnShow = btnShow.cloneNode(true);
    btnShow.parentNode.replaceChild(newBtnShow, btnShow);
    
    newBtnShow.addEventListener("click", ()=>{
      // Affiche les autres univers
      root.innerHTML += others.map(u => renderUniversCard(u)).join("");
      attachUniversEvents();
      newBtnShow.classList.add("hidden");
    });

    document.getElementById("univers-section").classList.remove("hidden");
    
    setTimeout(() => {
      document.getElementById("univers-section").scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  });

  // Bouton Accueil (retour à index.html)
  const btnAccueilBottom = document.getElementById("btnAccueilBottom");
  if(btnAccueilBottom){
    btnAccueilBottom.addEventListener("click", ()=>{
      window.location.href = 'index.html';
    });
  }
});
