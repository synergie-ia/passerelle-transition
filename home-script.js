function copyData() {
  const profile = localStorage.getItem("profile_scores") || "Aucun profil calculé";
  const univers = localStorage.getItem("selected_universes") || "Aucun univers sélectionné";
  const situation = localStorage.getItem("user_situation") || "Situation non renseignée";

  const exportText = 
`--- PROFIL D'INTÉRÊTS ---
${profile}

--- UNIVERS SÉLECTIONNÉS ---
${univers}

--- SITUATION PROFESSIONNELLE ---
${situation}
`;

  navigator.clipboard.writeText(exportText).then(() => {
    alert("✅ Données copiées !");

    // Activation du bouton coach
    document.getElementById("coachBtn").classList.remove("disabled");
    document.getElementById("coachBtn").onclick = () => location.href="coach.html";
  });
}
