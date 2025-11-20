/* 
  ============================================
  RECONVERSION 360 IA - PAGE D'ACCUEIL
  ============================================
  Gestion des badges de complétion et actions
  VERSION 12 QUESTIONS
  ============================================
*/

document.addEventListener('DOMContentLoaded', function() {
  
  console.log("🏠 PAGE D'ACCUEIL - Initialisation");
  console.log("====================================\n");
  
  updateCompletionBadges();
  
  const btnReset = document.getElementById('btnResetData');
  if(btnReset){
    btnReset.addEventListener('click', confirmReset);
  }
  
  const btnCopy = document.getElementById('btnCopyResults');
  if(btnCopy){
    btnCopy.addEventListener('click', copyResultsToClipboard);
  }
  
  const btnPDF = document.getElementById('btnDownloadPDF');
  if(btnPDF){
    btnPDF.addEventListener('click', downloadPDF);
  }
  
  const btnProject = document.getElementById('btnConstructProject');
  if(btnProject){
    btnProject.addEventListener('click', checkProjectAccess);
  }
});

/* ===== BADGES DE COMPLÉTION ===== */

function updateCompletionBadges() {
  const hasAnswers = localStorage.getItem('questionnaire_answers');
  const hasProfile = localStorage.getItem('profile_percentages');
  const hasUnivers = localStorage.getItem('selected_univers_details');
  
  const cards = document.querySelectorAll('.action-card');
  
  if(cards[0] && (hasAnswers || hasProfile || hasUnivers)){
    const badge = document.createElement('div');
    badge.className = 'completion-badge';
    badge.textContent = '✓ Complété';
    cards[0].appendChild(badge);
    console.log('✅ Badge Questionnaire ajouté');
  }
  
  const hasSituation = localStorage.getItem('situation_data');
  if(cards[1] && hasSituation){
    const badge = document.createElement('div');
    badge.className = 'completion-badge';
    badge.textContent = '✓ Complété';
    cards[1].appendChild(badge);
    console.log('✅ Badge Bilan ajouté');
  }
}

/* ===== RÉINITIALISATION ===== */

function confirmReset() {
  const confirmation = confirm(
    "⚠️ ATTENTION ⚠️\n\n" +
    "Êtes-vous sûr de vouloir SUPPRIMER TOUTES vos données ?\n\n" +
    "Cela inclut :\n" +
    "• Vos réponses au questionnaire (12 questions)\n" +
    "• Votre profil calculé\n" +
    "• Vos univers sélectionnés\n" +
    "• Votre bilan personnel\n\n" +
    "Cette action est IRRÉVERSIBLE."
  );
  
  if(confirmation){
    const secondConfirm = confirm(
      "⚠️ DERNIÈRE CONFIRMATION ⚠️\n\n" +
      "Voulez-vous VRAIMENT tout supprimer ?\n\n" +
      "Cliquez sur OK pour confirmer la suppression définitive."
    );
    
    if(secondConfirm){
      resetAllData();
    }
  }
}

function resetAllData() {
  try {
    const keysToRemove = [
      'questionnaire_answers',
      'profile_percentages',
      'univers_details',
      'selected_univers_details',
      'selectedUnivers',
      'situation_data',
      'data_exported' // Réinitialiser aussi le flag d'export
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Supprimé: ${key}`);
    });
    
    console.log('✅ Toutes les données ont été supprimées');
    
    alert("✅ Toutes vos données ont été supprimées avec succès.\n\nLa page va se recharger.");
    
    location.reload();
    
  } catch(error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
    alert("❌ Une erreur s'est produite lors de la suppression des données.");
  }
}

/* ===== VÉRIFICATION DES DONNÉES REQUISES ===== */

function checkRequiredData() {
  // Vérifier les réponses au questionnaire (12 questions)
  const answersData = localStorage.getItem('questionnaire_answers');
  let hasCompleteQuestionnaire = false;
  
  if(answersData) {
    try {
      const answers = JSON.parse(answersData);
      const answerCount = Object.keys(answers).length;
      hasCompleteQuestionnaire = answerCount === 12;
      console.log(`📋 Questionnaire: ${answerCount}/12 réponses`);
    } catch(e) {
      console.error("❌ Erreur lecture réponses:", e);
    }
  }
  
  // Vérifier la sélection d'univers
  const selectedUniversDetails = localStorage.getItem('selected_univers_details');
  let hasUnivers = false;
  
  if(selectedUniversDetails) {
    try {
      const univers = JSON.parse(selectedUniversDetails);
      const universCount = Object.keys(univers).length;
      hasUnivers = universCount >= 3;
      console.log(`🌍 Univers sélectionnés: ${universCount}`);
    } catch(e) {
      console.error("❌ Erreur lecture univers:", e);
    }
  }
  
  // Vérifier le bilan personnel
  const situationData = localStorage.getItem('situation_data');
  let hasSituation = false;
  
  if(situationData) {
    try {
      const situation = JSON.parse(situationData);
      hasSituation = situation && Object.keys(situation).length > 2;
      console.log(`📋 Bilan: ${hasSituation ? 'Rempli' : 'Incomplet'}`);
    } catch(e) {
      console.error("❌ Erreur lecture bilan:", e);
    }
  }
  
  return { 
    hasCompleteQuestionnaire, 
    hasUnivers, 
    hasSituation 
  };
}

/* ===== COPIE DES RÉSULTATS ===== */

function copyResultsToClipboard() {
  try {
    console.log("📋 Début de la copie des résultats...");
    
    const { hasCompleteQuestionnaire, hasUnivers, hasSituation } = checkRequiredData();
    
    if(!hasCompleteQuestionnaire && !hasUnivers && !hasSituation){
      alert("⚠️ Aucune donnée à copier.\n\nVeuillez d'abord :\n• Compléter le questionnaire (12 questions)\n• Sélectionner au moins 3 univers\n• Compléter votre bilan personnel");
      return;
    }
    
    if(!hasCompleteQuestionnaire){
      alert("⚠️ Questionnaire incomplet.\n\nVeuillez répondre aux 12 questions du questionnaire avant de copier vos résultats.");
      return;
    }
    
    if(!hasUnivers){
      alert("⚠️ Univers non sélectionnés.\n\nVeuillez sélectionner au moins 3 univers dans le questionnaire avant de copier vos résultats.");
      return;
    }
    
    if(!hasSituation){
      alert("⚠️ Bilan personnel non rempli.\n\nVeuillez compléter votre bilan personnel avant de copier vos résultats.");
      return;
    }
    
    const profileData = localStorage.getItem('profile_percentages');
    const universData = localStorage.getItem('selected_univers_details');
    const situationData = localStorage.getItem('situation_data');
    
    let textToCopy = "═══════════════════════════════════════\n";
    textToCopy += "   RECONVERSION 360 IA - MES RÉSULTATS\n";
    textToCopy += "═══════════════════════════════════════\n\n";
    
    // PROFIL
    if(profileData){
      try {
        const profile = JSON.parse(profileData);
        textToCopy += "📊 MON PROFIL D'INTÉRÊT PROFESSIONNEL\n";
        textToCopy += "───────────────────────────────────────\n";
        textToCopy += "(Basé sur 12 questions évaluées)\n\n";
        
        const sortedDims = Object.entries(profile)
          .sort((a, b) => b[1].pct - a[1].pct);
        
        sortedDims.forEach(([code, data]) => {
          textToCopy += `• ${data.name}: ${data.pct}% (${data.score}/4 points)\n`;
        });
        
        textToCopy += "\n";
        console.log("✅ Profil ajouté");
      } catch(e) {
        console.error("❌ Erreur profil:", e);
      }
    }
    
    // UNIVERS SÉLECTIONNÉS
    if(universData){
      try {
        const univers = JSON.parse(universData);
        const universArray = Object.entries(univers);
        
        if(universArray.length > 0){
          textToCopy += "🌍 MES UNIVERS SÉLECTIONNÉS\n";
          textToCopy += "───────────────────────────────────────\n\n";
          
          universArray
            .sort((a, b) => b[1].score - a[1].score)
            .forEach(([id, data]) => {
              const percentage = Math.round((data.score / 12) * 100);
              textToCopy += `• ${data.name}\n`;
              textToCopy += `  Compatibilité: ${percentage}% (${data.level})\n\n`;
            });
          
          console.log("✅ Univers ajoutés");
        }
      } catch(e) {
        console.error("❌ Erreur univers:", e);
      }
    }
    
    // BILAN PERSONNEL
    if(situationData){
      try {
        const situation = JSON.parse(situationData);
        textToCopy += "📋 MON BILAN PERSONNEL\n";
        textToCopy += "───────────────────────────────────────\n\n";
        
        if(situation.prenom){
          textToCopy += `Prénom: ${situation.prenom}\n`;
        }
        if(situation.age){
          textToCopy += `Âge: ${situation.age} ans\n\n`;
        }
        
        textToCopy += "1. SITUATION & PARCOURS\n";
        textToCopy += "─────────────────────────\n";
        if(situation.q1) textToCopy += `Objectif professionnel: ${situation.q1}\n\n`;
        if(situation.q2) textToCopy += `Statut actuel: ${situation.q2}\n\n`;
        if(situation.q3) textToCopy += `Niveau de formation: ${situation.q3}\n\n`;
        if(situation.q4) textToCopy += `Certifications: ${situation.q4}\n\n`;
        
        textToCopy += "2. RESSOURCES & COMPÉTENCES\n";
        textToCopy += "─────────────────────────────\n";
        if(situation.q5) textToCopy += `Compétences techniques: ${situation.q5}\n\n`;
        if(situation.q6) textToCopy += `Compétences à réutiliser: ${situation.q6}\n\n`;
        if(situation.q7) textToCopy += `Compétences relationnelles: ${situation.q7}\n\n`;
        if(situation.q8) textToCopy += `Expériences marquantes: ${situation.q8}\n\n`;
        
        textToCopy += "3. VALEURS & SENS DU TRAVAIL\n";
        textToCopy += "──────────────────────────────\n";
        if(situation.q9) textToCopy += `Valeurs essentielles: ${situation.q9}\n\n`;
        if(situation.q10) textToCopy += `Secteurs à éviter: ${situation.q10}\n\n`;
        
        textToCopy += "4. CONTRAINTES & CONDITIONS\n";
        textToCopy += "─────────────────────────────\n";
        if(situation.q11) textToCopy += `Géographie/Mobilité: ${situation.q11}\n\n`;
        if(situation.q12) textToCopy += `Conditions de travail: ${situation.q12}\n\n`;
        if(situation.q13) textToCopy += `Horaires: ${situation.q13}\n\n`;
        if(situation.q14) textToCopy += `Limitations: ${situation.q14}\n\n`;
        if(situation.q15) textToCopy += `Rémunération minimale: ${situation.q15}\n\n`;
        if(situation.q16) textToCopy += `Situations à éviter: ${situation.q16}\n\n`;
        if(situation.q17) textToCopy += `Environnement idéal: ${situation.q17}\n\n`;
        if(situation.q18) textToCopy += `Échéance du projet: ${situation.q18}\n\n`;
        
        textToCopy += "5. FORMATION\n";
        textToCopy += "─────────────\n";
        if(situation.q19) textToCopy += `Formation envisagée: ${situation.q19}\n\n`;
        
        textToCopy += "6. OUVERTURE\n";
        textToCopy += "─────────────\n";
        if(situation.q20) textToCopy += `Informations complémentaires: ${situation.q20}\n\n`;
        
        console.log("✅ Bilan complet ajouté (20 questions)");
      } catch(e) {
        console.error("❌ Erreur situation:", e);
      }
    }
    
    textToCopy += "═══════════════════════════════════════\n";
    textToCopy += "Généré par Reconversion 360 IA\n";
    textToCopy += new Date().toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + "\n";
    textToCopy += "═══════════════════════════════════════";
    
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log("✅ Texte copié avec succès");
          // Marquer que les données ont été exportées
          localStorage.setItem('data_exported', 'true');
          showCopySuccess();
        })
        .catch(err => {
          console.error("❌ Erreur clipboard API:", err);
          fallbackCopy(textToCopy);
        });
    } else {
      fallbackCopy(textToCopy);
    }
    
  } catch(error) {
    console.error("❌ Erreur générale:", error);
    alert("❌ Une erreur s'est produite lors de la copie.\n\nDétails: " + error.message);
  }
}

/* ===== TÉLÉCHARGEMENT PDF ===== */

function downloadPDF() {
  try {
    console.log("📄 Début de la génération PDF...");
    
    const { hasCompleteQuestionnaire, hasUnivers, hasSituation } = checkRequiredData();
    
    if(!hasCompleteQuestionnaire && !hasUnivers && !hasSituation){
      alert("⚠️ Aucune donnée à télécharger.\n\nVeuillez d'abord :\n• Compléter le questionnaire (12 questions)\n• Sélectionner au moins 3 univers\n• Compléter votre bilan personnel");
      return;
    }
    
    if(!hasCompleteQuestionnaire){
      alert("⚠️ Questionnaire incomplet.\n\nVeuillez répondre aux 12 questions du questionnaire avant de générer le PDF.");
      return;
    }
    
    if(!hasUnivers){
      alert("⚠️ Univers non sélectionnés.\n\nVeuillez sélectionner au moins 3 univers dans le questionnaire avant de générer le PDF.");
      return;
    }
    
    if(!hasSituation){
      alert("⚠️ Bilan personnel non rempli.\n\nVeuillez compléter votre bilan personnel avant de générer le PDF.");
      return;
    }
    
    const profileData = localStorage.getItem('profile_percentages');
    const universData = localStorage.getItem('selected_univers_details');
    const situationData = localStorage.getItem('situation_data');
    
    let pdfContent = "";
    
    pdfContent += "═══════════════════════════════════════════════════════\n";
    pdfContent += "        RECONVERSION 360 IA - MES RÉSULTATS\n";
    pdfContent += "═══════════════════════════════════════════════════════\n\n";
    pdfContent += "Date de génération: " + new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + "\n\n";
    
    if(profileData){
      try {
        const profile = JSON.parse(profileData);
        pdfContent += "───────────────────────────────────────────────────────\n";
        pdfContent += "📊 MON PROFIL D'INTÉRÊT PROFESSIONNEL\n";
        pdfContent += "───────────────────────────────────────────────────────\n";
        pdfContent += "(Basé sur 12 questions évaluées)\n\n";
        
        const sortedDims = Object.entries(profile)
          .sort((a, b) => b[1].pct - a[1].pct);
        
        sortedDims.forEach(([code, data]) => {
          pdfContent += `   ${data.name}\n`;
          pdfContent += `   Score: ${data.pct}% (${data.score}/4 points)\n\n`;
        });
        
        console.log("✅ Profil ajouté au PDF");
      } catch(e) {
        console.error("❌ Erreur profil:", e);
      }
    }
    
    if(universData){
      try {
        const univers = JSON.parse(universData);
        const universArray = Object.entries(univers);
        
        if(universArray.length > 0){
          pdfContent += "───────────────────────────────────────────────────────\n";
          pdfContent += "🌍 MES UNIVERS SÉLECTIONNÉS\n";
          pdfContent += "───────────────────────────────────────────────────────\n\n";
          
          universArray
            .sort((a, b) => b[1].score - a[1].score)
            .forEach(([id, data], index) => {
              const percentage = Math.round((data.score / 12) * 100);
              pdfContent += `${index + 1}. ${data.name}\n`;
              pdfContent += `   Compatibilité: ${percentage}% (${data.level})\n\n`;
            });
          
          console.log("✅ Univers ajoutés au PDF");
        }
      } catch(e) {
        console.error("❌ Erreur univers:", e);
      }
    }
    
    if(situationData){
      try {
        const situation = JSON.parse(situationData);
        pdfContent += "───────────────────────────────────────────────────────\n";
        pdfContent += "📋 MON BILAN PERSONNEL\n";
        pdfContent += "───────────────────────────────────────────────────────\n\n";
        
        if(situation.prenom){
          pdfContent += `Prénom: ${situation.prenom}\n`;
        }
        if(situation.age){
          pdfContent += `Âge: ${situation.age} ans\n\n`;
        }
        
        pdfContent += "1. SITUATION & PARCOURS\n";
        pdfContent += "─────────────────────────\n\n";
        if(situation.q1) pdfContent += `Objectif professionnel:\n${situation.q1}\n\n`;
        if(situation.q2) pdfContent += `Statut actuel:\n${situation.q2}\n\n`;
        if(situation.q3) pdfContent += `Niveau de formation:\n${situation.q3}\n\n`;
        if(situation.q4) pdfContent += `Certifications:\n${situation.q4}\n\n`;
        
        pdfContent += "2. RESSOURCES & COMPÉTENCES\n";
        pdfContent += "─────────────────────────────\n\n";
        if(situation.q5) pdfContent += `Compétences techniques:\n${situation.q5}\n\n`;
        if(situation.q6) pdfContent += `Compétences à réutiliser:\n${situation.q6}\n\n`;
        if(situation.q7) pdfContent += `Compétences relationnelles:\n${situation.q7}\n\n`;
        if(situation.q8) pdfContent += `Expériences marquantes:\n${situation.q8}\n\n`;
        
        pdfContent += "3. VALEURS & SENS DU TRAVAIL\n";
        pdfContent += "──────────────────────────────\n\n";
        if(situation.q9) pdfContent += `Valeurs essentielles:\n${situation.q9}\n\n`;
        if(situation.q10) pdfContent += `Secteurs à éviter:\n${situation.q10}\n\n`;
        
        pdfContent += "4. CONTRAINTES & CONDITIONS\n";
        pdfContent += "─────────────────────────────\n\n";
        if(situation.q11) pdfContent += `Géographie/Mobilité:\n${situation.q11}\n\n`;
        if(situation.q12) pdfContent += `Conditions de travail:\n${situation.q12}\n\n`;
        if(situation.q13) pdfContent += `Horaires:\n${situation.q13}\n\n`;
        if(situation.q14) pdfContent += `Limitations:\n${situation.q14}\n\n`;
        if(situation.q15) pdfContent += `Rémunération minimale:\n${situation.q15}\n\n`;
        if(situation.q16) pdfContent += `Situations à éviter:\n${situation.q16}\n\n`;
        if(situation.q17) pdfContent += `Environnement idéal:\n${situation.q17}\n\n`;
        if(situation.q18) pdfContent += `Échéance du projet:\n${situation.q18}\n\n`;
        
        pdfContent += "5. FORMATION\n";
        pdfContent += "─────────────\n\n";
        if(situation.q19) pdfContent += `Formation envisagée:\n${situation.q19}\n\n`;
        
        pdfContent += "6. OUVERTURE\n";
        pdfContent += "─────────────\n\n";
        if(situation.q20) pdfContent += `Informations complémentaires:\n${situation.q20}\n\n`;
        
        console.log("✅ Bilan complet ajouté au PDF (20 questions)");
      } catch(e) {
        console.error("❌ Erreur situation:", e);
      }
    }
    
    pdfContent += "═══════════════════════════════════════════════════════\n";
    pdfContent += "Document généré par Reconversion 360 IA\n";
    pdfContent += "© 2025 Synergie IA\n";
    pdfContent += "═══════════════════════════════════════════════════════";
    
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const dateStr = new Date().toISOString().split('T')[0];
    a.download = `Reconversion_360_IA_${dateStr}.txt`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Marquer que les données ont été exportées
    localStorage.setItem('data_exported', 'true');
    
    console.log("✅ Fichier téléchargé");
    showDownloadSuccess();
    
  } catch(error) {
    console.error("❌ Erreur génération PDF:", error);
    alert("❌ Une erreur s'est produite lors de la génération du PDF.\n\nDétails: " + error.message);
  }
}

/* ===== VÉRIFICATION ACCÈS PROJET ===== */

function checkProjectAccess() {
  const { hasCompleteQuestionnaire, hasUnivers, hasSituation } = checkRequiredData();
  
  // Vérifier d'abord que toutes les données sont complètes
  if(!hasCompleteQuestionnaire || !hasUnivers || !hasSituation){
    if(!hasCompleteQuestionnaire && !hasUnivers && !hasSituation){
      alert("⚠️ Accès non autorisé\n\nPour construire votre projet, vous devez d'abord :\n\n1. Compléter le questionnaire (12 questions)\n2. Sélectionner au moins 3 univers\n3. Remplir votre bilan personnel");
      return;
    }
    
    if(!hasCompleteQuestionnaire){
      alert("⚠️ Questionnaire incomplet\n\nVeuillez répondre aux 12 questions du questionnaire avant d'accéder à la construction de votre projet.");
      return;
    }
    
    if(!hasUnivers){
      alert("⚠️ Univers non sélectionnés\n\nVeuillez sélectionner au moins 3 univers dans le questionnaire avant d'accéder à la construction de votre projet.");
      return;
    }
    
    if(!hasSituation){
      alert("⚠️ Bilan personnel non rempli\n\nVeuillez compléter votre bilan personnel avant d'accéder à la construction de votre projet.");
      return;
    }
  }
  
  // Vérifier si les données ont été exportées (copiées OU téléchargées)
  const dataExported = localStorage.getItem('data_exported');
  
  if(!dataExported || dataExported !== 'true'){
    alert(
      "⚠️ COPIE OU TÉLÉCHARGEMENT OBLIGATOIRE\n\n" +
      "Avant d'accéder à l'IA, vous devez obligatoirement :\n\n" +
      "➡️ Cliquer sur \"Copier mes résultats pour l'IA\"\n" +
      "      OU\n" +
      "➡️ Cliquer sur \"Télécharger PDF\"\n\n" +
      "Ces données devront être transmises à l'IA pour débuter votre accompagnement.\n\n" +
      "⚠️ Sans cette étape, vous ne pourrez pas construire votre projet."
    );
    return;
  }
  
  // Si tout est OK, afficher le message de rappel et ouvrir l'IA
  alert(
    "✅ Accès autorisé !\n\n" +
    "📋 RAPPEL IMPORTANT :\n\n" +
    "N'oubliez pas de transmettre vos données à l'IA en :\n" +
    "• Collant le texte copié (Ctrl+V ou Cmd+V)\n" +
    "• OU en envoyant le fichier téléchargé\n\n" +
    "La fenêtre de l'IA va s'ouvrir dans 3 secondes..."
  );
  
  // Délai de 3 secondes pour laisser le temps de lire le message
  setTimeout(() => {
    window.open('https://chatgpt.com/g/g-6914f232fb048191b5df9a123ac6af82-reconversion-360-ia', '_blank');
  }, 3000);
}

/* ===== MÉTHODE DE COPIE ALTERNATIVE ===== */

function fallbackCopy(text) {
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if(successful){
      console.log("✅ Copie réussie (méthode alternative)");
      // Marquer que les données ont été exportées
      localStorage.setItem('data_exported', 'true');
      showCopySuccess();
    } else {
      throw new Error("execCommand a échoué");
    }
  } catch(err) {
    console.error("❌ Erreur copie alternative:", err);
    alert("❌ Impossible de copier automatiquement.\n\nVeuillez copier manuellement le texte affiché dans la console (F12).");
    console.log("📋 TEXTE À COPIER:");
    console.log(text);
  }
}

/* ===== FEEDBACK VISUEL ===== */

function showCopySuccess() {
  const btn = document.getElementById('btnCopyResults');
  if(!btn) return;
  
  const originalHTML = btn.innerHTML;
  const originalBg = btn.style.background;
  const originalColor = btn.style.color;
  
  btn.innerHTML = `
    <svg class="btn-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>✅ Copié !</span>
  `;
  btn.style.background = '#10b981';
  btn.style.color = '#ffffff';
  btn.style.borderColor = '#10b981';
  
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = originalBg;
    btn.style.color = originalColor;
    btn.style.borderColor = '';
  }, 3000);
  
  alert(
    "✅ DONNÉES COPIÉES AVEC SUCCÈS !\n\n" +
    "📋 Vos résultats ont été copiés dans le presse-papiers.\n\n" +
    "➡️ Vous pouvez maintenant cliquer sur \"Construire mon projet\"\n" +
    "➡️ Puis coller ces données dans la conversation avec l'IA (Ctrl+V ou Cmd+V)"
  );
}

function showDownloadSuccess() {
  const btn = document.getElementById('btnDownloadPDF');
  if(!btn) return;
  
  const originalHTML = btn.innerHTML;
  const originalBg = btn.style.background;
  const originalColor = btn.style.color;
  
  btn.innerHTML = `
    <svg class="btn-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>✅ Téléchargé !</span>
  `;
  btn.style.background = '#10b981';
  btn.style.color = '#ffffff';
  btn.style.borderColor = '#10b981';
  
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = originalBg;
    btn.style.color = originalColor;
    btn.style.borderColor = '';
  }, 3000);
  
  alert(
    "✅ FICHIER TÉLÉCHARGÉ AVEC SUCCÈS !\n\n" +
    "📄 Votre fichier a été enregistré sur votre ordinateur.\n\n" +
    "➡️ Vous pouvez maintenant cliquer sur \"Construire mon projet\"\n" +
    "➡️ Puis transmettre ce fichier à l'IA dans la conversation"
  );
}
