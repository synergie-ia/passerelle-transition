let answers = JSON.parse(localStorage.getItem("ia360_answers") || "{}");

/* rendu questionnaire */
function renderQuestions() {
  const root = document.getElementById("questionnaire");
  root.innerHTML = QUESTIONS.map(q => `
    <div class="question-block">
      <div class="question-title">${q.title}</div>
      ${q.options.map(opt => `
        <div class="option-row">
          <div class="option-text">${opt.text}</div>
          <div class="rating-buttons">
            ${[0,1,2,3,4].map(v => `
              <div class="rate-btn ${answers[q.id+"-"+opt.dim]===v?"selected":""}"
                data-q="${q.id}" data-dim="${opt.dim}" data-value="${v}"></div>
            `).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `).join("");

  document.querySelectorAll(".rate-btn").forEach(btn =>
    btn.addEventListener("click", () => {
      const q = btn.dataset.q, dim = btn.dataset.dim, v = Number(btn.dataset.value);
      answers[q+"-"+dim] = v;
      localStorage.setItem("ia360_answers", JSON.stringify(answers));
      document.querySelectorAll(`.rate-btn[data-q='${q}'][data-dim='${dim}']`).forEach(b=>b.classList.remove("selected"));
      btn.classList.add("selected");
    })
  );
}
renderQuestions();

/* calcul profil */
function calcProfile() {
  let scores = Object.fromEntries(DIMENSIONS.map(d => [d.code, 0]));
  Object.keys(answers).forEach(key => {
    const dim = key.split("-")[1];
    scores[dim] += answers[key];
  });
  return scores;
}

/* affichage profil trié ↓ */
document.getElementById("btn-calc-profile").addEventListener("click", () => {
  const scores = calcProfile();
  const sorted = Object.entries(scores)
    .map(([code,val]) => ({code,val}))
    .sort((a,b)=>b.val-a.val);

  const root = document.getElementById("profile-results");
  root.innerHTML = sorted.map(d => {
    const dim = DIMENSIONS.find(x=>x.code===d.code);
    const percent = Math.round(d.val/16*100);
    return `
      <div class="profile-row">
        <div class="profile-label">${dim.name}</div>
        <div class="profile-bar"><div class="profile-fill" style="width:${percent}%"></div></div>
        <div>${percent}%</div>
      </div>
    `;
  }).join("");

  document.getElementById("profile-section").classList.remove("hidden");
  showBackButtons();
});

/* calcul univers */
function calcUnivers() {
  const scores = calcProfile();
  return universes.map(u=>{
    let score=0,max=0;
    u.weights.forEach((w,i)=>{
      const dim = DIMENSIONS[i].code;
      score += scores[dim]*w;
      max += 16*w;
    });
    return {...u, pct:Math.round(score/max*100)};
  }).sort((a,b)=>b.pct-a.pct);
}

/* affichage univers */
document.getElementById("btn-calc-univers").addEventListener("click", () => {
  const list = calcUnivers();
  const root = document.getElementById("univers-results");

  const top5 = list.slice(0,5);
  const rest = list.slice(5);

  root.innerHTML = top5.map(u=>`
    <div class="univers-card"><div>${u.icon} ${u.name}</div><div><strong>${u.pct}%</strong></div></div>
  `).join("");

  const btn = document.getElementById("btn-show-all");
  btn.classList.remove("hidden");
  btn.onclick = () => {
    root.innerHTML += rest.map(u=>`
      <div class="univers-card"><div>${u.icon} ${u.name}</div><div><strong>${u.pct}%</strong></div></div>
    `).join("");
    btn.classList.add("hidden");
  };

  document.getElementById("univers-section").classList.remove("hidden");
  showBackButtons();
});

/* navigation retour */
function showBackButtons() {
  document.getElementById("btn-back-top").classList.remove("hidden");
  document.getElementById("btn-back-bottom").classList.remove("hidden");
}
document.getElementById("btn-back-top").onclick = document.getElementById("btn-back-bottom").onclick = () => window.scrollTo({top:0,behavior:"smooth"});
