/***************
 * IA360 – TEST
 * Script robuste : délégation d’événements + localStorage
 ***************/
let answers = {};                          // { "Q-DIM": value }
let hasProfileOnce = false;                // a-t-on déjà calculé le profil au moins 1 fois ?
const LS_KEY_ANSWERS = "ia360_answers_v1"; // stockage local

/* ---------- utilitaires ---------- */
function saveAnswers() {
  localStorage.setItem(LS_KEY_ANSWERS, JSON.stringify(answers));
}
function loadAnswers() {
  try {
    const raw = localStorage.getItem(LS_KEY_ANSWERS);
    if (raw) answers = JSON.parse(raw) || {};
  } catch(e) { answers = {}; }
}
function setBtnCalcLabel() {
  const btn = document.getElementById("btn-calc-profile");
  if (!btn) return;
  btn.textContent = hasProfileOnce ? "🔁 Recalculer mon profil" : "✅ Calculer mon profil";
}

/* ---------- rendu questionnaire ---------- */
function renderQuestions() {
  const root = document.getElementById("questionnaire");
  if (!root) return;

  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block" data-q="${q.id}">
      <div class="question-title">${q.title}</div>
      ${q.options.map(opt => {
        // valeur existante (0–4) si déjà répondue
        const k = `${q.id}-${opt.dim}`;
        const current = (answers[k] ?? null);
        return `
          <div class="option-row" data-q="${q.id}" data-dim="${opt.dim}">
            <div class="option-text">${opt.text}</div>
            <div class="rating-buttons">
              ${[0,1,2,3,4].map(v => `
                <button 
                  type="button"
                  class="rate-btn ${current===v ? 'selected v'+v : ''}"
                  data-q="${q.id}" 
                  data-dim="${opt.dim}" 
                  data-value="${v}"
                  aria-pressed="${current===v ? 'true':'false'}"
                  title="${LEVEL_LABELS[v]}"
                >${v}</button>
              `).join("")}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `).join("");

  // 🎯 DÉLÉGATION : un seul listener pour tous les boutons
  root.addEventListener("click", onRateClick);
}

function onRateClick(e) {
  const btn = e.target.closest(".rate-btn");
  if (!btn) return; // pas une pastille

  const q   = btn.dataset.q;
  const dim = btn.dataset.dim;
  const v   = Number(btn.dataset.value);
  const key = `${q}-${dim}`;

  // enregistre
  answers[key] = v;
  saveAnswers();

  // met à jour l’état visuel de la ligne (enlève selected à toutes → met sur celle cliquée)
  const line = btn.closest(".option-row");
  line.querySelectorAll(".rate-btn").forEach(b => {
    b.classList.remove("selected", "v0","v1","v2","v3","v4");
    b.setAttribute("aria-pressed","false");
  });
  btn.classList.add("selected", `v${v}`);
  btn.setAttribute("aria-pressed","true");

  // si un profil a déjà été calculé → proposer “Recalculer mon profil”
  if (hasProfileOnce) setBtnCalcLabel();
}

/* ---------- calcul profil (12 dimensions) ---------- */
function calcProfile() {
  const scores = Object.fromEntries(DIMENSIONS.map(d => [d.code, 0]));
  Object.keys(answers).forEach(key => {
    const dim = key.split("-")[1];
    scores[dim] += answers[key]; // somme des 4 réponses pour la dimension (0–16)
  });
  return scores;
}

/* ---------- affichage profil ---------- */
function renderProfile() {
  const scores = calcProfile();
  const root = document.getElementById("profile-results");
  if (!root) return;

  root.innerHTML = DIMENSIONS.map(dim => {
    const val = scores[dim.code];                // 0–16
    const percent = Math.round((val / 16) * 100);
    return `
      <div class="profile-row">
        <div class="profile-label">${dim.name}</div>
        <div class="profile-bar"><div class="profile-fill" style="width:${percent}%"></div></div>
        <div class="profile-pct">${percent}%</div>
      </div>
    `;
  }).join("");

  document.getElementById("profile-section")?.classList.remove("hidden");
}

/* ---------- calcul univers ---------- */
function calcUnivers() {
  const scores = calcProfile();
  return universes.map(u => {
    let score = 0, max = 0;
    u.weights.forEach((w, i) => {
      const dimCode = DIMENSIONS[i].code;
      score += scores[dimCode] * w; // pondération
      max   += 16 * w;
    });
    const pct = max > 0 ? Math.round((score / max) * 100) : 0;
    return {...u, pct};
  }).sort((a,b) => b.pct - a.pct);
}

/* ---------- affichage univers ---------- */
function renderUnivers() {
  const list = calcUnivers();
  const root = document.getElementById("univers-results");
  if (!root) return;

  const top5   = list.slice(0,5);
  const others = list.slice(5);

  root.innerHTML = top5.map(u => `
    <div class="univers-card">
      <div>${u.icon} ${u.name}</div>
      <div><strong>${u.pct}%</strong></div>
    </div>
  `).join("");

  const btnShow = document.getElementById("btn-show-all");
  if (btnShow) {
    btnShow.classList.remove("hidden");
    btnShow.onclick = () => {
      root.innerHTML += others.map(u => `
        <div class="univers-card">
          <div>${u.icon} ${u.name}</div>
          <div><strong>${u.pct}%</strong></div>
        </div>
      `).join("");
      btnShow.classList.add("hidden");
    };
  }

  document.getElementById("univers-section")?.classList.remove("hidden");
}

/* ---------- actions boutons ---------- */
function wireButtons() {
  const btnProfile = document.getElementById("btn-calc-profile");
  const btnUnivers = document.getElementById("btn-calc-univers");

  if (btnProfile) {
    btnProfile.addEventListener("click", () => {
      renderProfile();
      hasProfileOnce = true;
      setBtnCalcLabel(); // si on reclique après des modifs → “Recalculer”
    });
  }
  if (btnUnivers) {
    btnUnivers.addEventListener("click", () => {
      renderUnivers();
      // une fois affichés, si on modifie des réponses, l’utilisateur verra “🔁 Recalculer mon profil”
    });
  }
}

/* ---------- init ---------- */
(function init() {
  loadAnswers();       // recharge les réponses si présentes
  renderQuestions();   // dessine le questionnaire
  wireButtons();       // attache les actions
  setBtnCalcLabel();   // libellé correct au démarrage

  // si on a déjà des réponses enregistrées, refléter l’état visuel
  if (Object.keys(answers).length) {
    // on force l’affichage des sélections
    document.querySelectorAll(".rate-btn").forEach(btn => {
      const q = btn.dataset.q, dim = btn.dataset.dim, v = Number(btn.dataset.value);
      const key = `${q}-${dim}`;
      if (answers[key] === v) {
        btn.classList.add("selected", `v${v}`);
        btn.setAttribute("aria-pressed","true");
      }
    });
  }
})();
