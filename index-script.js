/* 
  ============================================
  RECONVERSION 360 IA - PAGE D'ACCUEIL
  ============================================
  Gestion des badges de complétion et actions
  ============================================
*/

document.addEventListener('DOMContentLoaded', function() {
  
  console.log("🏠 PAGE D'ACCUEIL - Initialisation");
  console.log("====================================\n");
  
  // Vérification des complétions
  updateCompletionBadges();
  
  // Bouton Réinitialiser
  const btnReset = document.getElementById('btnResetData');
  if(btnReset){
    btnReset.addEventListener('click', confirmReset);
  }
  
  // Bouton Copier
  const btnCopy = document.getElementById('btnCopyResults');
  if(btnCopy){
    btnCopy.addEventListener('click', copyResultsToClipboard);
  }
  
  // Bouton Télécharger PDF
  const btnPDF = document.getElementById('btnDownloadPDF');
  if(btnPDF){
    btnPDF.addEventListener('click', downloadPDF);
  }
  
  // Bouton Construire Projet
  const btnProject = document.getElementById('btnConstructProject');
  if(btnProject){
    btnProject.addEventListener('click', checkProjectAccess);
  }
});

/* ===== BADGES DE COMPLÉTION ===== */

function updateCompletionBadges() {
  // Badge Questionnaire
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
  
  // Badge Bilan
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
    "• Vos réponses au questionnaire\n" +
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
    // Liste de toutes les clés localStorage utilisées
    const keysToRemove = [
      'questionnaire_answers',
      'profile_percentages',
      'univers_details',
      'selected_univers_details',
      'selectedUnivers',
      'situation_data'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Supprimé: ${key}`);
    });
    
    console.log('✅ Toutes les données ont été supprimées');
    
    alert("✅ Toutes vos données ont été supprimées avec succès.\n\nLa page va se recharger.");
    
    // Recharger la page
    location.reload();
    
  } catch(error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
    alert("❌ Une erreur s'est produite lors de la suppression des données.");
  }
}

/* ===== VÉRIFICATION DES DONNÉES REQUISES ===== */

function checkRequiredData() {
  const selectedUniversDetails = localStorage.getItem('selected_univers_details');
  const situationData = localStorage.getItem('situation_data');
  
  const hasUnivers = selectedUniversDetails && JSON.parse(selectedUniversDetails) && Object.keys(JSON.parse(selectedUniversDetails)).length > 0;
  const hasSituation = situationData && JSON.parse(situationData);
  
  return { hasUnivers, hasSituation };
}

/* ===== COPIE DES RÉSULTATS ===== */

function copyResultsToClipboard() {
  try {
    console.log("📋 Début de la copie des résultats...");
    
    // Vérification des données requises
    const { hasUnivers, hasSituation } = checkRequiredData();
    
    if(!hasUnivers && !hasSituation){
      alert("⚠️ Aucune donnée à copier.\n\nVeuillez d'abord :\n• Compléter le questionnaire et sélectionner des univers\n• Compléter votre bilan personnel");
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
    
    // Récupération des données
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
        textToCopy += "───────────────────────────────────────\n\n";
        
        const sortedDims = Object.entries(profile)
          .sort((a, b) => b[1].pct - a[1].pct);
        
        sortedDims.forEach(([code, data]) => {
          textToCopy += `• ${data.name}: ${data.pct}% (${data.score} points)\n`;
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
              textToCopy += `• ${data.name}\n`;
              textToCopy += `  Score: ${data.score} points\n`;
              textToCopy += `  Compatibilité: ${data.level}\n\n`;
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
        
        if(situation.situation){
          textToCopy += "Ma situation actuelle:\n";
          textToCopy += situation.situation + "\n\n";
        }
        
        if(situation.competences){
          textToCopy += "Mes compétences:\n";
          textToCopy += situation.competences + "\n\n";
        }
        
        if(situation.parcours){
          textToCopy += "Mon parcours:\n";
          textToCopy += situation.parcours + "\n\n";
        }
        
        if(situation.aspirations){
          textToCopy += "Mes aspirations:\n";
          textToCopy += situation.aspirations + "\n\n";
        }
        
        console.log("✅ Bilan ajouté");
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
    
    // Copie dans le presse-papiers
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log("✅ Texte copié avec succès");
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
    
    // Vérification des données requises
    const { hasUnivers, hasSituation } = checkRequiredData();
    
    if(!hasUnivers && !hasSituation){
      alert("⚠️ Aucune donnée à télécharger.\n\nVeuillez d'abord :\n• Compléter le questionnaire et sélectionner des univers\n• Compléter votre bilan personnel");
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
    
    alert("📄 Génération du PDF en cours...\n\nLe téléchargement va démarrer dans quelques secondes.");
    
    // Récupération des données
    const profileData = localStorage.getItem('profile_percentages');
    const universData = localStorage.getItem('selected_univers_details');
    const situationData = localStorage.getItem('situation_data');
    
    let pdfContent = "";
    
    // En-tête
    pdfContent += "═══════════════════════════════════════════════════════\n";
    pdfContent += "        RECONVERSION 360 IA - MES RÉSULTATS\n";
    pdfContent += "═══════════════════════════════════════════════════════\n\n";
    pdfContent += "Date de génération: " + new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }) + "\n\n";
    
    // PROFIL
    if(profileData){
      try {
        const profile = JSON.parse(profileData);
        pdfContent += "───────────────────────────────────────────────────────\n";
        pdfContent += "📊 MON PROFIL D'INTÉRÊT PROFESSIONNEL\n";
        pdfContent += "───────────────────────────────────────────────────────\n\n";
        
        const sortedDims = Object.entries(profile)
          .sort((a, b) => b[1].pct - a[1].pct);
        
        sortedDims.forEach(([code, data]) => {
          pdfContent += `   ${data.name}\n`;
          pdfContent += `   Score: ${data.pct}% (${data.score} points)\n\n`;
        });
        
        console.log("✅ Profil ajouté au PDF");
      } catch(e) {
        console.error("❌ Erreur profil:", e);
      }
    }
    
    // UNIVERS
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
              pdfContent += `${index + 1}. ${data.name}\n`;
              pdfContent += `   Score: ${data.score} points\n`;
              pdfContent += `   Niveau de compatibilité: ${data.level}\n\n`;
            });
          
          console.log("✅ Univers ajoutés au PDF");
        }
      } catch(e) {
        console.error("❌ Erreur univers:", e);
      }
    }
    
    // BILAN PERSONNEL
    if(situationData){
      try {
        const situation = JSON.parse(situationData);
        pdfContent += "───────────────────────────────────────────────────────\n";
        pdfContent += "📋 MON BILAN PERSONNEL\n";
        pdfContent += "───────────────────────────────────────────────────────\n\n";
        
        if(situation.situation){
          pdfContent += "MA SITUATION ACTUELLE\n\n";
          pdfContent += situation.situation + "\n\n";
        }
        
        if(situation.competences){
          pdfContent += "MES COMPÉTENCES\n\n";
          pdfContent += situation.competences + "\n\n";
        }
        
        if(situation.parcours){
          pdfContent += "MON PARCOURS\n\n";
          pdfContent += situation.parcours + "\n\n";
        }
        
        if(situation.aspirations){
          pdfContent += "MES ASPIRATIONS\n\n";
          pdfContent += situation.aspirations + "\n\n";
        }
        
        console.log("✅ Bilan ajouté au PDF");
      } catch(e) {
        console.error("❌ Erreur situation:", e);
      }
    }
    
    // Pied de page
    pdfContent += "═══════════════════════════════════════════════════════\n";
    pdfContent += "Document généré par Reconversion 360 IA\n";
    pdfContent += "© 2025 Synergie IA\n";
    pdfContent += "═══════════════════════════════════════════════════════";
    
    // Création et téléchargement du fichier
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
    
    console.log("✅ Fichier téléchargé");
    showDownloadSuccess();
    
  } catch(error) {
    console.error("❌ Erreur génération PDF:", error);
    alert("❌ Une erreur s'est produite lors de la génération du PDF.\n\nDétails: " + error.message);
  }
}

/* ===== VÉRIFICATION ACCÈS PROJET ===== */

function checkProjectAccess() {
  const { hasUnivers, hasSituation } = checkRequiredData();
  
  if(!hasUnivers && !hasSituation){
    alert("⚠️ Accès non autorisé\n\nPour construire votre projet, vous devez d'abord :\n\n1. Compléter le questionnaire\n2. Sélectionner au moins 3 univers\n3. Remplir votre bilan personnel");
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
  
  // Accès autorisé
  alert("✅ Accès autorisé !\n\nVous allez être redirigé vers la construction de votre projet professionnel.");
  // TODO: Ajouter la redirection vers la page projet
  // window.location.href = 'projet.html';
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
  
  alert("✅ Vos résultats ont été copiés dans le presse-papiers !\n\nVous pouvez maintenant les coller dans une conversation avec l'IA.");
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
}
