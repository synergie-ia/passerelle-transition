/* 
  ============================================
  RECONVERSION 360 IA - QUESTIONNAIRE PROFIL
  ============================================
  Algorithme OPTIMISÉ avec moyenne pondérée normalisée
  + Sauvegarde des pourcentages des univers
*/

let answers = {};
let profileComputed = false;
let selectedUnivers = new Set();
let totalQuestions = 0;

/* ===== GESTION DU LOCALSTORAGE ===== */

function loadSelections(){
  const saved = localStorage.getItem('selectedUnivers');
  if(saved){
    selectedUnivers = new Set(JSON.parse(saved));
  }
}

function saveSelections(){
  localStorage.setItem('selectedUnivers', JSON.stringify([...selectedUnivers]));
}

function loadAnswers(){
  const saved = localStorage.getItem('questionnaire_answers');
  if(saved){
    answers = JSON.parse(saved);
    return true;
  }
  return false;
}

function saveAnswers(){
  localStorage.setItem('questionnaire_answers', JSON.stringify(answers));
}

/* ===== UTILITAIRES ===== */

function countTotalQuestions(){
  let count = 0;
  QUESTIONS.forEach(q => {
    count += q.options.length;
  });
  return count;
}

function allQuestionsAnswered(){
  return Object.keys(answers).length === totalQuestions;
}

function getUnansweredQuestions(){
  const unanswered = [];
  
  QUESTIONS.forEach(q => {
    q.options.forEach(opt => {
      const key = `${q.id}-${opt.dim}`;
      if(answers[key] === undefined){
        unanswered.push({
          questionId: q.id,
          questionTitle: q.title,
          optionText: opt.text,
          key: key
        });
      }
    });
  });
  
  return unanswered;
}

function highlightUnansweredQuestions(){
  document.querySelectorAll('.option-row').forEach(row => {
    row.classList.remove('unanswered');
  });
  
  const unanswered = getUnansweredQuestions();
  
  unanswered.forEach(item => {
    const selector = `.option-row[data-key="${item.key}"]`;
    const row = document.querySelector(selector);
    if(row){
      row.classList.add('unanswered');
    }
  });
  
  return unanswered;
}

/* ===== RENDU DES QUESTIONS ===== */

function renderQuestions(){
  const root = document.getElementById("questionsContainer");
  
  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block" id="block-${q.id}">
      <div class="question-title">${q.title}</div>
      ${q.options.map(opt => {
        const key = `${q.id}-${opt.dim}`;
        return `
        <div class="option-row" data-key="${key}">
          <div class="option-text">${opt.text}</div>
          <div class="rating-buttons">
            ${[0,1,2,3,4].map(v => `
              <div class="rate-btn" data-q="${q.id}" data-dim="${opt.dim}" data-val="${v}">${v}</div>
            `).join("")}
          </div>
        </div>
      `}).join("")}
    </div>
  `).join("");

  Object.keys(answers).forEach(key=>{
    const [q, dim] = key.split("-");
    const v = answers[key];
    const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}'][data-val='${v}']`;
    const btn = document.querySelector(selector);
    if(btn){
      btn.classList.add("selected", `v${v}`);
    }
  });

  attachRatingEvents();
}

function attachRatingEvents(){
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

      const row = document.querySelector(`.option-row[data-key="${key}"]`);
      if(row){
        row.classList.remove('unanswered');
      }

      if(allQuestionsAnswered()){
        document.getElementById("errorMessage").classList.add("hidden");
      }

      if(profileComputed){
        document.getElementById("profileSection").classList.add("hidden");
        document.getElementById("univers-section").classList.add("hidden");
        profileComputed = false;
      }
    });
  });
}

/* ===== CALCUL DU PROFIL (QUADRATIQUE) ===== */

function calcProfile(){
  const scores = Object.fromEntries(DIMENSIONS.map(d=>[d.code,0]));
  
  Object.keys(answers).forEach(key=>{
    const [,dim] = key.split("-");
    const val = answers[key];
    scores[dim] += val * val;
  });
  
  return scores;
}

function percentFromSum(sum){
  const maxQuadratique = 64;
  return Math.round((sum / maxQuadratique) * 100);
}

/* ===== CALCUL DES UNIVERS (MOYENNE PONDÉRÉE OPTIMISÉE) ===== */

function calcUnivers(){
  const s = calcProfile();
  
  if(typeof universesData === 'undefined'){
    console.error("universesData n'est pas défini. Vérifiez que universes-data.js est chargé.");
    return [];
  }
  
  return universesData.map(u => {
    let sommePonderee = 0;
    let sommePoids = 0;
    
    if(typeof universes !== 'undefined'){
      const universMatch = universes.find(uv => uv.id === u.id);
      
      if(universMatch && universMatch.weights){
        universMatch.weights.forEach((poids, i) => {
          if(i < DIMENSIONS.length){
            const dimCode = DIMENSIONS[i].code;
            const scoreQuadratique = s[dimCode];
            
            sommePonderee += scoreQuadratique * poids;
            sommePoids += poids;
          }
        });
      } else {
        DIMENSIONS.forEach(dim => {
          sommePonderee += s[dim.code];
          sommePoids += 1;
        });
      }
    } else {
      DIMENSIONS.forEach(dim => {
        sommePonderee += s[dim.code];
        sommePoids += 1;
      });
    }
    
    const moyennePonderee = sommePoids > 0 ? sommePonderee / sommePoids : 0;
    const pourcentage = Math.round((moyennePonderee / 64) * 100);
    
    return {...u, pct: pourcentage};
  }).sort((a, b) => b.pct - a.pct);
}

/* ===== AFFICHAGE DU PROFIL ===== */

function displayProfile(){
  const scores = calcProfile();
  const root = document.getElementById("profileResults");
  
  const dimensionsWithScores = DIMENSIONS.map(dim => ({
    ...dim,
    sum: scores[dim.code],
    pct: percentFromSum(scores[dim.code])
  }));
  
  dimensionsWithScores.sort((a, b) => b.pct - a.pct);
  
  root.innerHTML = dimensionsWithScores.map(dim => `
    <div class="profile-row">
      <div class="profile-label">${dim.name}</div>
      <div class="profile-bar">
        <div class="profile-fill" style="width:${dim.pct}%"></div>
      </div>
      <div><strong>${dim.pct}%</strong></div>
    </div>
  `).join("");

  document.getElementById("profileSection").classList.remove("hidden");
  profileComputed = true;
  
  setTimeout(() => {
    document.getElementById("profileSection").scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, 100);
}

/* ===== COMPTEUR UNIVERS SÉLECTIONNÉS ===== */

function updateUniversCounter(){
  const counter = document.getElementById("selectedUniversCounter");
  if(!counter) return;
  
  const n = selectedUnivers.size;
  counter.textContent = n === 0
    ? "0 univers sélectionné"
    : n === 1
      ? "1 univers sélectionné"
      : `${n} univers sélectionnés`;
}

/* ===== RENDU D'UNE CARTE UNIVERS ===== */

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

/* ===== ÉVÉNEMENTS SUR LES CARTES UNIVERS ===== */

function attachUniversEvents(){
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
      } else {
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

/* ===== AFFICHAGE DES UNIVERS ===== */

function displayUnivers(){
  console.log("Calcul des univers...");
  
  try {
    const list = calcUnivers();
    console.log(`${list.length} univers calculés`);
    
    if(list.length === 0){
      alert("Erreur : Aucun univers n'a pu être calculé. Vérifiez que universes-data.js est bien chargé.");
      return;
    }
    
    // ✨ SAUVEGARDER LES POURCENTAGES DES UNIVERS
    const percentages = {};
    list.forEach(u => {
      percentages[u.id] = u.pct;
    });
    localStorage.setItem('univers_percentages', JSON.stringify(percentages));
    
    const root = document.getElementById("univers-results");
    const top5 = list.slice(0, 5);
    const others = list.slice(5);

    root.innerHTML = top5.map(u => renderUniversCard(u)).join("");
    attachUniversEvents();
    updateUniversCounter();

    const btnShow = document.getElementById("btn-show-all");
    btnShow.classList.remove("hidden");
    
    const newBtnShow = btnShow.cloneNode(true);
    btnShow.parentNode.replaceChild(newBtnShow, btnShow);
    
    newBtnShow.addEventListener("click", ()=>{
      root.innerHTML += others.map(u => renderUniversCard(u)).join("");
      attachUniversEvents();
      newBtnShow.classList.add("hidden");
    });

    document.getElementById("univers-section").classList.remove("hidden");
    
    setTimeout(() => {
      document.getElementById("univers-section").scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
    
  } catch(error) {
    console.error("Erreur lors du calcul des univers:", error);
    alert("Une erreur s'est produite : " + error.message);
  }
}

/* ===== INITIALISATION AU CHARGEMENT DE LA PAGE ===== */

document.addEventListener('DOMContentLoaded', function() {
  
  loadSelections();
  loadAnswers();
  
  totalQuestions = countTotalQuestions();
  
  renderQuestions();

  const btnValidate = document.getElementById("validateBtn");
  const errorMessage = document.getElementById("errorMessage");
  
  btnValidate.addEventListener("click", ()=>{
    if(!allQuestionsAnswered()){
      const unanswered = highlightUnansweredQuestions();
      
      errorMessage.classList.remove("hidden");
      
      if(unanswered.length > 0){
        const firstUnansweredKey = unanswered[0].key;
        const firstUnansweredRow = document.querySelector(`.option-row[data-key="${firstUnansweredKey}"]`);
        
        if(firstUnansweredRow){
          setTimeout(() => {
            firstUnansweredRow.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            });
          }, 100);
        }
      }
      
      return;
    }
    
    errorMessage.classList.add("hidden");
    displayProfile();
  });

  const btnUnivers = document.getElementById("goUniversesBtn");
  btnUnivers.addEventListener("click", displayUnivers);

  const btnAccueilTop = document.getElementById("btnAccueilTop");
  if(btnAccueilTop){
    btnAccueilTop.addEventListener("click", ()=>{
      window.location.href = 'index.html';
    });
  }

  const btnAccueilBottom = document.getElementById("btnAccueilBottom");
  if(btnAccueilBottom){
    btnAccueilBottom.addEventListener("click", ()=>{
      window.location.href = 'index.html';
    });
  }
});
