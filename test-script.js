/* 
  ============================================
  RECONVERSION 360 IA - QUESTIONNAIRE PROFIL
  ============================================
  VERSION CORRIGÉE - 14 novembre 2025
  
  CORRECTIONS APPLIQUÉES :
  - Diviseur changé de 64 à 48 (pour 3 occurrences par dimension)
  - Seuils de compatibilité ajustés (40%, 30%, 25%, 20%)
  - Code dimension "PT" (pratique manuelle & technique) vérifié
  
  ALGORITHME DE CALCUL :
  
  ÉTAPE 1 - CALCUL DU PROFIL (Scores quadratiques)
  ------------------------------------------------
  Pour chaque dimension, on additionne le CARRÉ des réponses.
  
  Exemple pour la dimension "CS" avec 9 questions :
  - Réponses : 4, 3, 2 (3 occurrences)
  - Calcul : 4² + 3² + 2² = 16 + 9 + 4 = 29
  - Pourcentage : (29 / 48) × 100 = 60%
  
  Maximum théorique = 3 × 4² = 48
  
  ÉTAPE 2 - CALCUL DES UNIVERS (Moyenne pondérée)
  ------------------------------------------------
  Score_Univers = (Σ Score × Poids) / (Σ Poids) / 48 × 100
  
  ============================================
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
  const currentCount = Object.keys(answers).length;
  console.log(`Réponses: ${currentCount}/${totalQuestions}`);
  return currentCount === totalQuestions;
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

/* 
  ============================================
  CALCUL DU PROFIL (QUADRATIQUE)
  ============================================
*/
function calcProfile(){
  const scores = Object.fromEntries(DIMENSIONS.map(d => [d.code, 0]));
  
  Object.keys(answers).forEach(key => {
    const [, dim] = key.split("-");
    const val = answers[key];
    scores[dim] += val * val;
  });
  
  console.log("📊 Scores quadratiques par dimension:", scores);
  
  return scores;
}

/* 
  CORRECTION : Max = 48 (3 occurrences × 16)
*/
function percentFromSum(sum){
  const MAX_SCORE_QUADRATIQUE = 48;
  return Math.round((sum / MAX_SCORE_QUADRATIQUE) * 100);
}

/* 
  ============================================
  ÉCHELLE DE COMPATIBILITÉ (SEUILS AJUSTÉS)
  ============================================
*/
function getCompatibilityLevel(pct){
  if(pct >= 40){
    return {
      level: "Très compatible",
      stars: "🟢🟢🟢",
      class: "level-5"
    };
  } else if(pct >= 30){
    return {
      level: "Compatible",
      stars: "🔵🔵",
      class: "level-4"
    };
  } else if(pct >= 20){
    return {
      level: "Assez compatible",
      stars: "🟠",
      class: "level-3"
    };
  } else if(pct >= 10){
    return {
      level: "Peu compatible",
      stars: "⚪",
      class: "level-2"
    };
  } else {
    return {
      level: "Très peu compatible",
      stars: "⚫",
      class: "level-1"
    };
  }
}

/* 
  ============================================
  CALCUL DES UNIVERS
  ============================================
*/
function calcUnivers(){
  const scoresQuadratiques = calcProfile();
  
  if(typeof universesData === 'undefined'){
    console.error("❌ universesData non défini");
    return [];
  }
  
  const universAvecScores = universesData.map(univers => {
    let sommePonderee = 0;
    let sommePoids = 0;
    
    if(typeof universes !== 'undefined'){
      const universMatch = universes.find(uv => uv.id === univers.id);
      
      if(universMatch && universMatch.weights){
        universMatch.weights.forEach((poids, index) => {
          if(index < DIMENSIONS.length){
            const dimCode = DIMENSIONS[index].code;
            const scoreQuadratique = scoresQuadratiques[dimCode];
            sommePonderee += scoreQuadratique * poids;
            sommePoids += poids;
          }
        });
      } else {
        DIMENSIONS.forEach(dim => {
          sommePonderee += scoresQuadratiques[dim.code];
          sommePoids += 1;
        });
      }
    } else {
      DIMENSIONS.forEach(dim => {
        sommePonderee += scoresQuadratiques[dim.code];
        sommePoids += 1;
      });
    }
    
    const moyennePonderee = sommePoids > 0 ? sommePonderee / sommePoids : 0;
    const pourcentage = Math.round((moyennePonderee / 48) * 100); // ← CORRECTION : 48
    
    if(univers.id === 1){
      console.log(`
🔬 Calcul pour "${univers.name}" :
   Somme pondérée : ${sommePonderee.toFixed(2)}
   Somme poids : ${sommePoids}
   Moyenne : ${moyennePonderee.toFixed(2)}
   % : ${pourcentage}%
      `);
    }
    
    return {...univers, pct: pourcentage};
  });
  
  const universTries = universAvecScores.sort((a, b) => b.pct - a.pct);
  
  console.log("🏆 Top 5:");
  universTries.slice(0, 5).forEach((u, i) => {
    console.log(`   ${i+1}. ${u.name} : ${u.pct}%`);
  });
  
  return universTries;
}

/* 
  ============================================
  AFFICHAGE DU PROFIL
  ============================================
*/
function displayProfile(){
  const scoresQuadratiques = calcProfile();
  const root = document.getElementById("profileResults");
  
  const dimensionsAvecScores = DIMENSIONS.map(dim => ({
    ...dim,
    scoreQuadratique: scoresQuadratiques[dim.code],
    pct: percentFromSum(scoresQuadratiques[dim.code])
  }));
  
  dimensionsAvecScores.sort((a, b) => b.pct - a.pct);
  
  console.log("👤 Profil utilisateur :");
  dimensionsAvecScores.forEach(dim => {
    console.log(`   ${dim.name} : ${dim.pct}% (quad: ${dim.scoreQuadratique})`);
  });
  
  root.innerHTML = dimensionsAvecScores.map(dim => `
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

/* ===== COMPTEUR UNIVERS ===== */

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

/* ===== CARTE UNIVERS ===== */

function renderUniversCard(u){
  const isSelected = selectedUnivers.has(u.id);
  const hasSubUnivers = u.subUniverses && u.subUniverses.length > 0;
  
  const compatibility = getCompatibilityLevel(u.pct);
  
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
    <div class="univers-card ${isSelected ? 'selected' : ''} ${compatibility.class}" id="card-${u.id}">
      <div class="univers-header">
        <div class="univers-main">
          <div class="univers-icon">${u.icon}</div>
          <div class="univers-name">${u.name}</div>
        </div>
        <div class="univers-right">
          <div class="univers-stars">${compatibility.stars}</div>
          <div class="univers-actions">
            ${hasSubUnivers 
              ? `<button class="btn-toggle-sub" data-id="${u.id}" title="Voir sous-univers">🔎</button>` 
              : '<div style="width:40px"></div>'}
            <button class="btn-select-univers ${isSelected ? 'selected' : ''}" data-id="${u.id}" title="Sélectionner">
              <span class="tick">${isSelected ? '✓' : ''}</span>
            </button>
          </div>
        </div>
      </div>
      ${subUniversHTML}
    </div>
  `;
}

/* ===== ÉVÉNEMENTS UNIVERS ===== */

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
        btn.title = isVisible ? "Voir sous-univers" : "Masquer";
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

/* ===== AFFICHAGE UNIVERS ===== */

function displayUnivers(){
  console.log("Calcul univers...");
  
  try {
    const list = calcUnivers();
    console.log(`${list.length} univers calculés`);
    
    if(list.length === 0){
      alert("Erreur : Aucun univers calculé.");
      return;
    }
    
    const percentages = {};
    list.forEach(u => {
      percentages[u.id] = u.pct;
    });
    localStorage.setItem('univers_percentages', JSON.stringify(percentages));
    
    const root = document.getElementById("univers-results");
    const top5 = list.slice(0, 5);

    const legendHTML = `
      <div class="stars-legend">
        <div class="legend-title">📊 Échelle de compatibilité :</div>
        <div class="legend-items">
          <div class="legend-item">🟢🟢🟢 Très compatible (≥35%)</div>
          <div class="legend-item">🔵🔵 Compatible (30-34%)</div>
          <div class="legend-item">🟠 Assez compatible (25-29%)</div>
          <div class="legend-item">⚪ Peu compatible (20-24%)</div>
          <div class="legend-item">⚫ Très peu compatible (<20%)</div>
        </div>
      </div>
    `;

    root.innerHTML = legendHTML + top5.map(u => renderUniversCard(u)).join("");
    attachUniversEvents();
    updateUniversCounter();

    const btnShow = document.getElementById("btn-show-all");
    btnShow.classList.remove("hidden");
    
    const newBtnShow = btnShow.cloneNode(true);
    btnShow.parentNode.replaceChild(newBtnShow, btnShow);
    
    newBtnShow.addEventListener("click", ()=>{
      root.innerHTML = legendHTML + list.map(u => renderUniversCard(u)).join("");
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
    console.error("Erreur:", error);
    alert("Erreur : " + error.message);
  }
}

/* ===== INITIALISATION ===== */

document.addEventListener('DOMContentLoaded', function() {
  
  if(typeof QUESTIONS === 'undefined'){
    console.error("❌ QUESTIONS non défini");
    alert("Erreur de chargement.");
    return;
  }
  
  if(typeof DIMENSIONS === 'undefined'){
    console.error("❌ DIMENSIONS non défini");
    alert("Erreur de chargement.");
    return;
  }
  
  if(typeof universesData === 'undefined'){
    console.error("❌ universesData non défini");
    alert("Erreur de chargement.");
    return;
  }
  
  console.log("✅ Données chargées");
  console.log(`📋 ${QUESTIONS.length} questions`);
  console.log(`🎯 ${DIMENSIONS.length} dimensions`);
  console.log(`🌍 ${universesData.length} univers`);
  
  loadSelections();
  loadAnswers();
  
  totalQuestions = countTotalQuestions();
  console.log(`Total questions: ${totalQuestions}`);
  
  renderQuestions();

  const btnValidate = document.getElementById("validateBtn");
  const errorMessage = document.getElementById("errorMessage");
  
  btnValidate.addEventListener("click", ()=>{
    loadAnswers();
    
    if(!allQuestionsAnswered()){
      const unanswered = highlightUnansweredQuestions();
      errorMessage.classList.remove("hidden");
      
      if(unanswered.length > 0){
        const firstRow = document.querySelector(`.option-row[data-key="${unanswered[0].key}"]`);
        if(firstRow){
          setTimeout(() => {
            firstRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  const btnValidateSelection = document.getElementById('btnValidateSelection');
  if(btnValidateSelection){
    btnValidateSelection.addEventListener('click', ()=>{
      
      if(selectedUnivers.size < 3){
        alert("⚠️ Minimum 3 univers requis.\n\nActuellement : " + selectedUnivers.size);
        return;
      }
      
      try {
        const allUnivers = calcUnivers();
        const selectedUniversDetails = {};
        
        selectedUnivers.forEach(id => {
          const univers = allUnivers.find(u => u.id === id);
          if(univers){
            const compatibility = getCompatibilityLevel(univers.pct);
            selectedUniversDetails[id] = {
              name: univers.name,
              level: compatibility.level,
              stars: compatibility.stars
            };
          }
        });
        
        localStorage.setItem('selected_univers_details', JSON.stringify(selectedUniversDetails));
        
        console.log('✅ Sélection validée:', selectedUniversDetails);
        
        const originalText = btnValidateSelection.innerHTML;
        btnValidateSelection.innerHTML = '✅ Enregistré !';
        btnValidateSelection.style.background = '#22c55e';
        btnValidateSelection.style.color = '#fff';
        
        setTimeout(() => {
          btnValidateSelection.innerHTML = originalText;
          btnValidateSelection.style.background = '';
          btnValidateSelection.style.color = '';
        }, 3000);
        
        alert("✅ Sélection de " + selectedUnivers.size + " univers enregistrée !\n\nVous pouvez retourner à l'accueil.");
        
      } catch(error) {
        console.error('❌ Erreur:', error);
        alert("❌ Erreur de sauvegarde.");
      }
    });
  }

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
