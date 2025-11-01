// 1) Génération des 14 curseurs
const form = document.getElementById("profilForm");
INTERETS.forEach((label, i) => {
  const wrap = document.createElement("div");
  wrap.className = "interet";
  wrap.innerHTML = `
    <label for="i${i}">${i+1}. ${label}</label>
    <div class="rangeRow">
      <input type="range" id="i${i}" min="0" max="10" step="1" value="5" />
      <span class="badge" id="b${i}">5</span>
    </div>
  `;
  form.appendChild(wrap);
});
INTERETS.forEach((_, i) => {
  const r = document.getElementById(`i${i}`);
  const b = document.getElementById(`b${i}`);
  r.addEventListener("input", () => b.textContent = r.value);
});

// 2) Actions
const btnCalc = document.getElementById("calculer");
const btnCopy = document.getElementById("btnCopy");
const btnPdf  = document.getElementById("btnPdf");

btnCalc.addEventListener("click", () => {
  const profil = INTERETS.map((_, i) => parseInt(document.getElementById("i"+i).value,10));
  const scoresOrd = calculerCompatibilite(profil);
  rendreRapport(profil, scoresOrd);
  btnCopy.disabled = false;
  btnPdf.disabled  = false;
});

// 3) Rendu du rapport (profil + univers + payload)
function rendreRapport(profil, scoresOrd){
  const rapport = document.getElementById("rapport");
  const profilList = document.getElementById("profilList");
  const universList = document.getElementById("universList");
  const payloadEl = document.getElementById("payload");

  rapport.hidden = false;
  profilList.innerHTML = "";
  universList.innerHTML = "";

  // Profil : lignes avec barre 0-10
  INTERETS.forEach((lib,i)=>{
    const val = profil[i];
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div class="label">${i+1}. ${lib}</div>
      <div class="bar score" aria-hidden="true"><span style="width:${val*10}%"></span></div>
      <div class="val">${val}/10</div>
    `;
    profilList.appendChild(row);
  });

  // Univers : rang, barre %, score
  scoresOrd.forEach(([univers, pct], idx)=>{
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <div class="label">${idx+1}. ${univers}</div>
      <div class="bar pourcent" aria-hidden="true"><span style="width:${pct}%"></span></div>
      <div class="kpi">${pct}%</div>
    `;
    universList.appendChild(row);
  });

  // Payload unique optimisé ChatGPT (profil + scores)
  const date = new Date().toISOString().slice(0,10);
  const payload = [
    "IA360_PAYLOAD_START",
    `Date: ${date}`,
    "",
    "Profil_Interets_0_10:",
    JSON.stringify(profil),
    "",
    "Univers_Compatibilite_% (classement):",
    ...scoresOrd.map(([u,p],i)=> `${i+1}. ${u} — ${p}%`),
    "IA360_PAYLOAD_END"
  ].join("\n");
  payloadEl.textContent = payload;

  // Copier
  btnCopy.onclick = async ()=>{
    try{
      await navigator.clipboard.writeText(payload);
      btnCopy.textContent = "✅ Copié !";
      setTimeout(()=>btnCopy.textContent="📋 Copier pour ChatGPT",1200);
    }catch(e){
      alert("Impossible de copier automatiquement. Sélectionne le bloc et copie manuellement.");
    }
  };

  // PDF natif (impression)
  btnPdf.onclick = ()=> window.print();
}
