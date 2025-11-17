/* 
  ============================================
  RECONVERSION 360 IA - QUESTIONNAIRE PROFIL
  ============================================
  VERSION AVEC HIÉRARCHISATION OBLIGATOIRE
  Novembre 2025
  
  FONCTIONNALITÉ :
  ✅ Chaque note (0-4) ne peut être utilisée qu'une seule fois par question
  ✅ Validation en temps réel des doublons
  ✅ Feedback visuel sur les notes disponibles/indisponibles
  
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

/* ===== VALIDATION HIÉRARCHIE ===== */

// Vérifie si une valeur est déjà utilisée dans une question
function isValueUsedInQuestion(questionId, value){
  const question = QUESTIONS.find(q => q.id === questionId);
  if(!question) return false;
  
  for(const opt of question.options){
    const key = `${questionId}-${opt.dim}`;
    if(answers[key] === value){
      return true;
    }
  }
  return false;
}

// Récupère les valeurs disponibles pour une question
function getAvailableValuesForQuestion(questionId){
  const available = [0, 1, 2, 3, 4]; // Toutes les valeurs possibles
  const used = new Set();
  
  const question = QUESTIONS.find(q => q.id === questionId);
  if(!question) return available;
  
  // Parcourir toutes les options de cette question
  question.options.forEach(opt => {
    const key = `${questionId}-${opt.dim}`;
    const value = answers[key];
    if(value !== undefined){
      used.add(value);
    }
  });
  
  return available.filter(v => !used.has(v));
}

// Met à jour l'état visuel des boutons d'une question
function updateButtonStatesForQuestion(questionId){
  const availableValues = getAvailableValuesForQuestion(questionId);
  
  // Mettre à jour tous les boutons de cette question
  document.querySelectorAll(`.rate-btn[data-q='${questionId}']`).forEach(btn => {
    const value = Number(btn.dataset.val);
    const dim = btn.dataset.dim;
    const key = `${questionId}-${dim}`;
    const isSelected = answers[key] === value;
    
    // Si le bouton est sélectionné, le garder actif
    if(isSelected){
      btn.classList.remove('disabled');
      return;
    }
    
    // Sinon, vérifier si la valeur est disponible
    if(availableValues.includes(value)){
      btn.classList.remove('disabled');
    } else {
      btn.classList.add('disabled');
    }
  });
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

  // Restaurer les sélections
  Object.keys(answers).forEach(key=>{
    const [q, dim] = key.split("-");
    const v = answers[key];
    const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}'][data-val='${v}']`;
    const btn = document.querySelector(selector);
    if(btn){
      btn.classList.add("selected", `v${v}`);
    }
  });

  // Mettre à jour l'état des boutons pour chaque question
  QUESTIONS.forEach(q => {
    updateButtonStatesForQuestion(q.id);
  });

  attachRatingEvents();
}

function attachRatingEvents(){
  document.querySelectorAll(".rate-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      // Ne pas permettre de cliquer sur un bouton désactivé
      if(btn.classList.contains('disabled')){
        // Feedback visuel
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 100);
        return;
      }

      const q = btn.dataset.q;
      const dim = btn.dataset.dim;
      const v = Number(btn.dataset.val);
      const key = `${q}-${dim}`;
      
      // Si on clique sur la même valeur, on la désélectionne
      if(answers[key] === v){
        delete answers[key];
      } else {
        // Vérifier que la valeur n'est pas déjà utilisée
        if(isValueUsedInQuestion(q, v)){
          alert("⚠️ Cette note est déjà utilisée pour une autre option de cette question.\n\nChaque note de 0 à 4 ne peut être attribuée qu'une seule fois par question.");
          return;
        }
        
        answers[key] = v;
      }
      
      saveAnswers();

      // Réinitialiser les styles de tous les boutons de cette option
      const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}']`;
      document.querySelectorAll(selector).forEach(b=>{
        b.classList.remove("selected","v0","v1","v2","v3","v4");
      });
      
      // Appliquer le style au bouton sélectionné
      if(answers[key] !== undefined){
        btn.classList.add("selected", `v${answers[key]}`);
      }

      // Mettre à jour l'état de tous les boutons de la question
      updateButtonStatesForQuestion(q);

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
  CALCUL DU PROFIL - VERSION DEBUGGÉE
  ============================================
*/
function calcProfile(){
  const scores = Object.fromEntries(DIMENSIONS.map(d => [d.code, 0]));
  
  // Somme simple des valeurs (0-4)
  Object.keys(answers).forEach(key => {
    const [, dim] = key.split("-");
    const val = answers[key];
    scores[dim] += val;
  });
  
  console.log("📊 Scores bruts par dimension:");
  DIMENSIONS.forEach(d => {
    console.log(`   ${d.code} (${d.name}): ${scores[d.code]}`);
  });
  
  return scores;
}

/* 
  ============================================
  EXTRACTION DES DIMENSIONS PRINCIPALES
  VERSION DEBUGGÉE
  ============================================
*/
function extractMainDimensions(scores){
  // Tri décroissant
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1]);
  
  console.log("🔍 Toutes dimensions triées:");
  sorted.forEach(([code, value], index) => {
    const dimName = DIMENSIONS.find(d => d.code === code)?.name || code;
    console.log(`   ${index + 1}. ${code} (${dimName}): ${value}`);
  });
  
  // Top 3
  const mainDims = sorted.slice(0, 3).map(([code]) => code);
  
  // Valeur de la 3ème dimension
  const thirdValue = sorted[2][1];
  const threshold = thirdValue * 0.9; // 10% de tolérance
  
  console.log(`📏 Seuil d'égalité: ${threshold.toFixed(1)} (90% de ${thirdValue})`);
  
  // Ajout des dimensions proches (écart ≤ 10%)
  for(let i = 3; i < sorted.length; i++){
    const [code, value] = sorted[i];
    if(value >= threshold){
      console.log(`   ✓ ${code} ajouté (${value} >= ${threshold.toFixed(1)})`);
      mainDims.push(code);
    } else {
      console.log(`   ✗ ${code} exclu (${value} < ${threshold.toFixed(1)})`);
    }
  }
  
  console.log("🎯 Dimensions principales finales:", mainDims);
  
  return mainDims;
}

/* 
  ============================================
  CALCUL DES UNIVERS - VERSION DEBUGGÉE
  ============================================
*/
function calcUnivers(){
  const scores = calcProfile();
  const mainDims = extractMainDimensions(scores);
  
  if(typeof universesData === 'undefined' || typeof UNIVERS_WEIGHTS === 'undefined'){
    console.error("❌ Données univers non chargées");
    return [];
  }
  
  console.log("\n🔬 CALCUL DÉTAILLÉ DES UNIVERS");
  console.log("================================");
  
  const universAvecScores = universesData.map(univers => {
    const universWeights = UNIVERS_WEIGHTS.find(uw => uw.id === univers.id);
    
    if(!universWeights || !universWeights.weights){
      console.log(`⚠️ ${univers.name}: Pas de poids trouvés`);
      return {...univers, score: 0};
    }
    
    let score = 0;
    const details = [];
    
    // Pour chaque dimension de l'univers
    universWeights.weights.forEach((coeff, index) => {
      if(index < DIMENSIONS.length){
        const dimCode = DIMENSIONS[index].code;
        const dimName = DIMENSIONS[index].name;
        
        // Si la dimension est dans les principales de la personne
        if(mainDims.includes(dimCode) && coeff > 0){
          score += coeff;
          details.push(`${dimCode}(${coeff})`);
        }
      }
    });
    
    if(score > 0){
      console.log(`${univers.name}: ${score} pts [${details.join(' + ')}]`);
    }
    
    return {...univers, score: score};
  });
  
  // Tri par score décroissant
  const universTries = universAvecScores.sort((a, b) => b.score - a.score);
  
  console.log("\n🏆 TOP 10 UNIVERS:");
  console.log("==================");
  universTries.slice(0, 10).forEach((u, i) => {
    console.log(`${i+1}. ${u.name}: ${u.score} pts`);
  });
  
  const ecartTop1Top5 = universTries[0].score - universTries[4].score;
  console.log(`\n📊 Écart Top1-Top5 : ${ecartTop1Top5} pts`);
  
  return universTries;
}

/* 
  ============================================
  ÉCHELLE DE COMPATIBILITÉ
  ============================================
*/
function getCompatibilityLevel(score){
  if(score >= 14){
    return {
      level: "très compatible",
      color: "#047857",
      class: "level-5"
    };
  } else if(score >= 10){
    return {
      level: "compatible",
      color: "#10b981",
      class: "level-4"
    };
  } else if(score >= 7){
    return {
      level: "moyennement compatible",
      color: "#d1d5db",
      class: "level-3"
    };
  } else if(score >= 4){
    return {
      level: "peu compatible",
      color: "#f97316",
      class: "level-2"
    };
  } else {
    return {
      level: "pas compatible",
      color: "#dc2626",
      class: "level-1"
    };
  }
}

/* 
  ============================================
  AFFICHAGE DU PROFIL
  ============================================
*/
function displayProfile(){
  const scores = calcProfile();
  const root = document.getElementById("profileResults");
  
  const MAX_SCORE = 12; // 3 questions max par dimension × 4 points max
  
  const dimensionsAvecScores = DIMENSIONS.map(dim => ({
    ...dim,
    score: scores[dim.code],
    pct: Math.round((scores[dim.code] / MAX_SCORE) * 100)
  }));
  
  dimensionsAvecScores.sort((a, b) => b.score - a.score);
  
  console.log("\n👤 PROFIL UTILISATEUR :");
  console.log("======================");
  dimensionsAvecScores.forEach(dim => {
    console.log(`${dim.name}: ${dim.pct}% (${dim.score}/${MAX_SCORE})`);
  });
  
  // Sauvegarde du profil
  const profilePercentages = {};
  dimensionsAvecScores.forEach(dim => {
    profilePercentages[dim.code] = {
      name: dim.name,
      pct: dim.pct,
      score: dim.score
    };
  });
  localStorage.setItem('profile_percentages', JSON.stringify(profilePercentages));
  console.log('✅ Profil sauvegardé');
  
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
  
  const compatibility = getCompatibilityLevel(u.score);
  
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
  console.log("\n🚀 LANCEMENT CALCUL UNIVERS");
  console.log("============================\n");
  
  try {
    const list = calcUnivers();
    console.log(`\n✅ ${list.length} univers calculés avec succès`);
    
    if(list.length === 0){
      alert("Erreur : Aucun univers calculé.");
      return;
    }
    
    // Sauvegarde complète des univers
    const universDetails = {};
    list.forEach(u => {
      const compatibility = getCompatibilityLevel(u.score);
      universDetails[u.id] = {
        name: u.name,
        score: u.score,
        level: compatibility.level,
        color: compatibility.color
      };
    });
    localStorage.setItem('univers_details', JSON.stringify(universDetails));
    console.log('✅ Détails univers sauvegardés\n');
    
    const root = document.getElementById("univers-results");
    const top10 = list.slice(0, 10);

    const legendHTML = `
      <div class="stars-legend">
        <div class="legend-title">📊 Échelle de compatibilité</div>
        <div class="legend-items">
          <div class="legend-item"><span class="dot" style="background:#047857;width:12px;height:12px;"></span> très compatible</div>
          <div class="legend-item"><span class="dot" style="background:#10b981;width:12px;height:12px;"></span> compatible</div>
          <div class="legend-item"><span class="dot" style="background:#d1d5db;width:12px;height:12px;"></span> moyennement</div>
          <div class="legend-item"><span class="dot" style="background:#f97316;width:12px;height:12px;"></span> peu compatible</div>
          <div class="legend-item"><span class="dot" style="background:#dc2626;width:12px;height:12px;"></span> pas compatible</div>
        </div>
      </div>
    `;

    root.innerHTML = legendHTML + top10.map(u => renderUniversCard(u)).join("");
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
    console.error("❌ ERREUR:", error);
    alert("Erreur : " + error.message);
  }
}

/* ===== INITIALISATION ===== */

document.addEventListener('DOMContentLoaded', function() {
  
  console.log("🔧 INITIALISATION DU SYSTÈME");
  console.log("=============================\n");
  
  if(typeof QUESTIONS === 'undefined'){
    console.error("❌ QUESTIONS non défini");
    alert("Erreur : QUESTIONS non chargé.");
    return;
  }
  
  if(typeof DIMENSIONS === 'undefined'){
    console.error("❌ DIMENSIONS non défini");
    alert("Erreur : DIMENSIONS non chargé.");
    return;
  }
  
  if(typeof universesData === 'undefined'){
    console.error("❌ universesData non défini");
    alert("Erreur : universesData non chargé.");
    return;
  }
  
  if(typeof UNIVERS_WEIGHTS === 'undefined'){
    console.error("❌ UNIVERS_WEIGHTS non défini");
    alert("Erreur : UNIVERS_WEIGHTS non chargé.");
    return;
  }
  
  console.log("✅ Toutes les données chargées");
  console.log(`📋 ${QUESTIONS.length} questions`);
  console.log(`🎯 ${DIMENSIONS.length} dimensions`);
  console.log(`🌍 ${universesData.length} univers`);
  console.log(`⚙️ ${UNIVERS_WEIGHTS.length} matrices\n`);
  
  // Vérification de l'ordre des dimensions
  console.log("🔍 Ordre des dimensions:");
  DIMENSIONS.forEach((d, i) => {
    console.log(`   ${i}. ${d.code} - ${d.name}`);
  });
  console.log("");
  
  loadSelections();
  loadAnswers();
  
  totalQuestions = countTotalQuestions();
  console.log(`Total questions: ${totalQuestions}\n`);
  
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
        const universDetailsAll = JSON.parse(localStorage.getItem('univers_details') || '{}');
        const selectedUniversDetails = {};
        
        selectedUnivers.forEach(id => {
          if(universDetailsAll[id]){
            selectedUniversDetails[id] = universDetailsAll[id];
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
