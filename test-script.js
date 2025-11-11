/***********************************
 *  TEST SCRIPT – Questionnaire IA360
 ***********************************/

// stockage des réponses : { "QID-DIM": value }
let answers = JSON.parse(localStorage.getItem("ia360_answers")) || {};

const questionsContainer = document.getElementById("questionsContainer");
const calculateBtn = document.getElementById("calculateBtn");
const recalculateBtn = document.getElementById("recalculateBtn");
const profileSection = document.getElementById("profileSection");
const profileResults = document.getElementById("profileResults");
const goUniversesBtn = document.getElementById("goUniversesBtn");

// Palette de couleurs (score 0 → 4)
const SCORE_COLORS = {
  0: "#d8d8d8", // gris clair
  1: "#f4c542", // jaune
  2: "#ff9f2a", // orange
  3: "#4aa3ff", // bleu
  4: "#4caf50"  // vert
};


/* --------- RENDU DU QUESTIONNAIRE --------- */
function renderQuestions() {
  questionsContainer.innerHTML = QUESTIONS.map(q => `
    <div class="question-block">
      <div class="question-title">${q.title}</div>

      ${q.options.map(opt => {
        const storedValue = answers[`${q.id}-${opt.dim}`];
        return `
          <div class="option-row">
            <div class="option-text">${opt.text}</div>

            <div class="rating-buttons">
              ${[0,1,2,3,4].map(v => `
                <div class="rate-circle"
                  data-q="${q.id}"
                  data-dim="${opt.dim}"
                  data-value="${v}"
                  style="background:${storedValue === v ? SCORE_COLORS[v] : "#ffffff"};
                         border:1px solid #ccc;">
                </div>
              `).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");

  // Ajout des listeners
  document.querySelectorAll(".rate-circle").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.q;
      const dim = btn.dataset.dim;
      const value = Number(btn.dataset.value);

      answers[`${q}-${dim}`] = value;
      localStorage.setItem("ia360_answers", JSON.stringify(answers));

      // Réaffiche question pour actualiser les ronds
      renderQuestions();

      // Passe en mode "Recalculer" si profil déjà calculé
      if (!calculateBtn.classList.contains("hidden")) return;
      recalculateBtn.classList.remove("hidden");
      calculateBtn.classList.add("hidden");
    });
  });
}

renderQuestions();


/* --------- CALCUL DU PROFIL --------- */
function computeProfile() {
  let scores = {};
  DIMENSIONS.forEach(d => scores[d.code] = 0);

  Object.entries(answers).forEach(([key, value]) => {
    const dim = key.split("-")[1];
    scores[dim] += value;
  });

  localStorage.setItem("ia360_profile", JSON.stringify(scores));
  return scores;
}


/* --------- AFFICHER LE PROFIL --------- */
function displayProfile() {
  const scores = computeProfile();
  profileResults.innerHTML = DIMENSIONS.map(dim => {
    const max = 4 * 4; // 4 occurrences × score max 4
    const pct = Math.round((scores[dim.code] / max) * 100);

    return `
      <div class="profile-row">
        <div class="profile-label">${dim.name}</div>
        <div class="profile-bar">
          <div class="profile-fill" style="width:${pct}%;"></div>
        </div>
        <div class="profile-value">${pct}%</div>
      </div>
    `;
  }).join("");

  profileSection.classList.remove("hidden");
}


/* --------- BOUTONS --------- */
calculateBtn.addEventListener("click", () => {
  calculateBtn.classList.add("hidden");
  recalculateBtn.classList.remove("hidden");
  displayProfile();
});

recalculateBtn.addEventListener("click", () => {
  displayProfile();
});

goUniversesBtn.addEventListener("click", () => {
  window.location.href = "universes.html";
});


/* --------- RESTAURATION AUTOMATIQUE --------- */
if (localStorage.getItem("ia360_profile")) {
  calculateBtn.classList.add("hidden");
  recalculateBtn.classList.remove("hidden");
  displayProfile();
}
