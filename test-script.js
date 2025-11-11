/* 
  Script questionnaire + calculs
  Ne modifie PAS test-data.js
*/

let answers = {};        // clé "QID-DIM" -> 0..4
let profileComputed = false;

/* ----- RENDU DES QUESTIONS ----- */
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

  // Gestion clics sur ronds
  document.querySelectorAll(".rate-btn").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const q   = btn.dataset.q;
      const dim = btn.dataset.dim;
      const v   = Number(btn.dataset.val);

      const key = `${q}-${dim}`;
      answers[key] = v;

      // Retire sélection sur les 5 ronds de cette option
      const selector = `.rate-btn[data-q='${q}'][data-dim='${dim}']`;
      document.querySelectorAll(selector).forEach(b=>{
        b.classList.remove("selected","v0","v1","v2","v3","v4");
      });
      // Applique sélection + couleur
      btn.classList.add("selected", `v${v}`);

      // Si le profil a déjà été calculé une 1ère fois, propose REcalculer
      if(profileComputed){
        const btnCalc = document.getElementById("calculateBtn");
        btnCalc.textContent = "🔁 Recalculer mon profil";
      }
    });
  });
}

renderQuestions();

/* ----- CALCUL PROFIL (12 dimensions) ----- */
function calcProfile(){
  const scores = Object.fromEntries(DIMENSIONS.map(d=>[d.code,0]));
  Object.keys(answers).forEach(key=>{
    const [,dim] = key.split("-");
    const val = answers[key]; // 0..4
    scores[dim] += val;
  });
  return scores;
}

/* ----- AFFICHAGE PROFIL ----- */
function percentFromSum(sum){
  // 4 occurrences par dimension × max 4 = 16
  return Math.round((sum/16)*100);
}

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  
  const btnCalc = document.getElementById("calculateBtn");
  if (btnCalc) {
    btnCalc.addEventListener("click", ()=>{
      const scores = calcProfile();
      const root = document.getElementById("profileResults");

      root.innerHTML = DIMENSIONS.map(dim=>{
        const sum = scores[dim.code];
        const pct = percentFromSum(sum);
        return `
          <div class="profile-row">
            <div class="profile-label">${dim.name}</div>
            <div class="profile-bar"><div class="profile-fill" style="width:${pct}%"></div></div>
            <div><strong>${pct}%</strong></div>
          </div>
        `;
      }).join("");

      document.getElementById("profileSection").classList.remove("hidden");

      // Première fois -> texte devient "Recalculer"
      btnCalc.textContent = "🔁 Recalculer mon profil";
      profileComputed = true;
    });
  }

  /* ----- CALCUL UNIVERS ----- */
  function calcUnivers(){
    const s = calcProfile();
    return universes.map(u=>{
      let score=0, max=0;
      u.weights.forEach((w,i)=>{
        const dimCode = DIMENSIONS[i].code;
        score += s[dimCode]*w;      // somme pondérée
        max   += 16 * w;            // max possible
      });
      const pct = Math.round((score/max)*100);
      return {...u, pct};
    }).sort((a,b)=>b.pct-a.pct);
  }

  /* ----- AFFICHAGE UNIVERS ----- */
  const btnUnivers = document.getElementById("goUniversesBtn");
  if (btnUnivers) {
    btnUnivers.addEventListener("click", ()=>{
      // Cette partie nécessite d'ajouter les éléments dans le HTML
      console.log("Calcul des univers:", calcUnivers());
      alert("Fonctionnalité univers à venir - vérifiez la console pour les résultats");
    });
  }
});
