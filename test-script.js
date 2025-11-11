let answers = {}; // { QID-OPTION : value }

/* ----- RENDU DU QUESTIONNAIRE ----- */
function renderQuestions() {
  const root = document.getElementById("questionnaire");

  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block">
      <div class="question-title">${q.title}</div>
      ${q.options.map((opt, idx) => `
        <div class="option-row">
          <div class="option-text">${opt.text}</div>
          <div class="rating-buttons">
            ${[0,1,2,3,4].map(v => `
              <div class="rate-btn" data-q="${q.id}" data-dim="${opt.dim}" data-value="${v}">${v}</div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `).join("");

  document.querySelectorAll(".rate-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      const q = btn.dataset.q;
      const dim = btn.dataset.dim;
      const v = Number(btn.dataset.value);
      answers[q + "-" + dim] = v;

      document.querySelectorAll(`.rate-btn[data-q='${q}'][data-dim='${dim}']`)
        .forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
    })
  );
}

renderQuestions();

/* ----- CALCUL PROFIL (12 dimensions) ----- */
function calcProfile() {
  let scores = Object.fromEntries(DIMENSIONS.map(d => [d.code, 0]));

  Object.keys(answers).forEach(key => {
    const dim = key.split("-")[1];
    scores[dim] += answers[key];
  });

  return scores;
}

/* ----- AFFICHAGE PROFIL ----- */
document.getElementById("btn-calc-profile").addEventListener("click", () => {
  const scores = calcProfile();
  const root = document.getElementById("profile-results");

  root.innerHTML = DIMENSIONS.map(dim => {
    const val = scores[dim.code];
    const percent = Math.round((val / 16) * 100); // 4 items × 4 max = 16
    return `
      <div class="profile-row">
        <div class="profile-label">${dim.name}</div>
        <div class="profile-bar"><div class="profile-fill" style="width:${percent}%"></div></div>
        <div>${percent}%</div>
      </div>
    `;
  }).join("");

  document.getElementById("profile-section").classList.remove("hidden");
});

/* ----- CALCUL UNIVERS ----- */
function calcUnivers() {
  const scores = calcProfile();
  return universes.map(u => {
    let score = 0, max = 0;
    u.weights.forEach((w, i) => {
      const dimCode = DIMENSIONS[i].code;
      score += scores[dimCode] * w;
      max += 16 * w; // dim max possible (16) × poids
    });
    return {...u, pct: Math.round((score / max)*100)};
  }).sort((a,b)=>b.pct-a.pct);
}

/* ----- AFFICHAGE UNIVERS ----- */
document.getElementById("btn-calc-univers").addEventListener("click", () => {
  const list = calcUnivers();
  const root = document.getElementById("univers-results");

  const top5 = list.slice(0,5);
  const others = list.slice(5);

  root.innerHTML = top5.map(u => `
    <div class="univers-card">
      <div>${u.icon} ${u.name}</div>
      <div><strong>${u.pct}%</strong></div>
    </div>
  `).join("");

  const btnShow = document.getElementById("btn-show-all");
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

  document.getElementById("univers-section").classList.remove("hidden");
});
