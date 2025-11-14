/* 
  ============================================
  RECONVERSION 360 IA - PAGE D'ACCUEIL
  ============================================
  VERSION CORRIGÉE COMPLÈTE
  
  CORRECTIONS :
  ✅ Lecture correcte des univers sélectionnés
  ✅ Blocage de la copie si données incomplètes
  ✅ Blocage de "Construire son projet" si copie non faite
  ✅ Indicateurs visuels de progression
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== VÉRIFICATION DE LA COMPLÉTION =====
  
  function checkDataCompletion() {
    const profile = localStorage.getItem('profile_percentages');
    const selectedUnivers = localStorage.getItem('selected_univers_details');
    const situation = localStorage.getItem('situation_data');
    
    const hasProfile = profile && JSON.parse(profile) && Object.keys(JSON.parse(profile)).length > 0;
    const hasUnivers = selectedUnivers && JSON.parse(selectedUnivers) && Object.keys(JSON.parse(selectedUnivers)).length >= 3;
    const hasSituation = situation && JSON.parse(situation) && Object.keys(JSON.parse(situation)).length >= 21;
    
    return {
      hasProfile,
      hasUnivers,
      hasSituation,
      isComplete: hasProfile && hasUnivers && hasSituation
    };
  }
  
  function checkCopyDone() {
    return localStorage.getItem('copy_done') === 'true';
  }
  
  function updateUIIndicators() {
    const status = checkDataCompletion();
    const copyDone = checkCopyDone();
    
    // Mettre à jour les cartes avec des indicateurs visuels
    const cards = document.querySelectorAll('.action-card');
    
    // Carte 1 : Questionnaire
    if (cards[0] && status.hasProfile) {
      cards[0].style.borderLeft = '5px solid #22c55e';
      const badge = cards[0].querySelector('.completion-badge') || document.createElement('div');
      badge.className = 'completion-badge';
      badge.textContent = '✓ Complété';
      badge.style.cssText = 'background:#22c55e;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-top:10px;display:inline-block;';
      if (!cards[0].querySelector('.completion-badge')) {
        cards[0].querySelector('.card-desc').after(badge);
      }
    }
    
    // Carte 2 : Bilan de situation
    if (cards[1] && status.hasSituation) {
      cards[1].style.borderLeft = '5px solid #22c55e';
      const badge = cards[1].querySelector('.completion-badge') || document.createElement('div');
      badge.className = 'completion-badge';
      badge.textContent = '✓ Complété';
      badge.style.cssText = 'background:#22c55e;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-top:10px;display:inline-block;';
      if (!cards[1].querySelector('.completion-badge')) {
        cards[1].querySelector('.card-desc').after(badge);
      }
    }
    
    // Carte 3 : Construire son projet
    const card3Btn = cards[2]?.querySelector('.card-btn');
    if (card3Btn) {
      if (copyDone) {
        card3Btn.disabled = false;
        card3Btn.style.opacity = '1';
        card3Btn.style.cursor = 'pointer';
        cards[2].style.borderLeft = '5px solid #22c55e';
        const badge = cards[2].querySelector('.completion-badge') || document.createElement('div');
        badge.className = 'completion-badge';
        badge.textContent = '✓ Prêt';
        badge.style.cssText = 'background:#22c55e;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-top:10px;display:inline-block;';
        if (!cards[2].querySelector('.completion-badge')) {
          cards[2].querySelector('.card-desc').after(badge);
        }
      } else {
        card3Btn.disabled = true;
        card3Btn.style.opacity = '0.5';
        card3Btn.style.cursor = 'not-allowed';
        cards[2].style.borderLeft = '5px solid #9ca3af';
        const badge = cards[2].querySelector('.completion-badge') || document.createElement('div');
        badge.className = 'completion-badge';
        badge.textContent = '🔒 Copie requise';
        badge.style.cssText = 'background:#ef4444;color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin-top:10px;display:inline-block;';
        if (!cards[2].querySelector('.completion-badge')) {
          cards[2].querySelector('.card-desc').after(badge);
        }
        
        card3Btn.onclick = (e) => {
          e.preventDefault();
          alert('⚠️ Action requise\n\nPour construire votre projet, vous devez d\'abord :\n\n1. Compléter le questionnaire d\'intérêts\n2. Sélectionner au moins 3 univers\n3. Remplir votre bilan de situation\n4. Copier vos résultats pour l\'IA\n\nCliquez sur "Copier mes résultats pour l\'IA" pour débloquer cette étape.');
        };
      }
    }
  }
  
  // ===== BOUTON RÉINITIALISATION =====
  const btnReset = document.getElementById('btnResetData');
  if(btnReset){
    btnReset.addEventListener('click', function(){
      const confirm = window.confirm(
        "⚠️ ATTENTION ⚠️\n\n" +
        "Êtes-vous sûr de vouloir supprimer TOUTES vos données ?\n\n" +
        "Cette action est IRRÉVERSIBLE et effacera :\n" +
        "• Vos réponses au questionnaire d'intérêts\n" +
        "• Vos univers sélectionnés\n" +
        "• Votre bilan de situation\n" +
        "• Votre copie de données\n\n" +
        "Cliquez sur OK pour confirmer la suppression."
      );
      
      if(confirm){
        try {
          const keys = [
            'questionnaire_answers',
            'selectedUnivers',
            'univers_percentages',
            'selected_univers_details',
            'situation_data',
            'profile_percentages',
            'univers_details',
            'copy_done'
          ];
          
          keys.forEach(key => {
            localStorage.removeItem(key);
          });
          
          console.log('✅ Toutes les données ont été supprimées');
          
          alert("✅ Toutes vos données ont été supprimées avec succès !\n\nVous pouvez recommencer depuis le début.");
          
          location.reload();
          
        } catch(error) {
          console.error('❌ Erreur lors de la suppression:', error);
          alert("❌ Une erreur s'est produite lors de la suppression des données.");
        }
      }
    });
  }
  
  // ===== BOUTON COPIE DES RÉSULTATS =====
  const btnCopy = document.getElementById('btnCopyResults');
  if(btnCopy){
    btnCopy.addEventListener('click', function(){
      
      // Vérifier la complétion des données
      const status = checkDataCompletion();
      
      // Construire le message d'erreur si incomplet
      let errorMessage = '';
      const missing = [];
      
      if (!status.hasProfile) {
        missing.push('❌ Questionnaire d\'intérêts non complété');
      }
      
      if (!status.hasUnivers) {
        const selectedCount = localStorage.getItem('selected_univers_details');
        const count = selectedCount ? Object.keys(JSON.parse(selectedCount)).length : 0;
        missing.push(`❌ Univers non sélectionnés (${count}/3 minimum requis)`);
      }
      
      if (!status.hasSituation) {
        const situationData = localStorage.getItem('situation_data');
        const count = situationData ? Object.keys(JSON.parse(situationData)).length : 0;
        missing.push(`❌ Bilan de situation incomplet (${count}/21 champs requis)`);
      }
      
      // Si des données manquent, bloquer et afficher le message
      if (!status.isComplete) {
        errorMessage = '⚠️ DONNÉES INCOMPLÈTES\n\n' +
                      'Pour copier vos résultats, vous devez d\'abord compléter :\n\n' +
                      missing.join('\n') + '\n\n' +
                      '📝 Étapes à suivre :\n\n';
        
        if (!status.hasProfile) {
          errorMessage += '1️⃣ Cliquez sur "Démarrer le questionnaire" pour identifier votre profil d\'intérêts\n\n';
        }
        
        if (!status.hasUnivers) {
          errorMessage += '2️⃣ Après le questionnaire, sélectionnez au moins 3 univers-métiers qui vous intéressent et validez votre sélection\n\n';
        }
        
        if (!status.hasSituation) {
          errorMessage += '3️⃣ Cliquez sur "Compléter mon bilan" et remplissez tous les champs du formulaire\n\n';
        }
        
        errorMessage += 'Une fois ces étapes complétées, vous pourrez copier vos résultats pour l\'IA.';
        
        alert(errorMessage);
        return;
      }
      
      // Si tout est complet, procéder à la copie
      try {
        let output = "=== MES DONNÉES RECONVERSION 360 IA ===\n\n";
        
        // 1. PROFIL D'INTÉRÊTS
        const profileData = localStorage.getItem('profile_percentages');
        
        if(profileData){
          const profile = JSON.parse(profileData);
          output += "📊 PROFIL D'INTÉRÊTS\n";
          
          const sortedProfile = Object.entries(profile)
            .map(([code, data]) => ({ code, ...data }))
            .sort((a, b) => b.pct - a.pct);
          
          sortedProfile.forEach(dim => {
            output += `${dim.name} ${dim.pct}%\n`;
          });
          
          output += "\n";
        }
        
        // 2. UNIVERS SÉLECTIONNÉS
        const selectedUniversData = localStorage.getItem('selected_univers_details');
        
        if(selectedUniversData){
          const selectedUnivers = JSON.parse(selectedUniversData);
          const nbUnivers = Object.keys(selectedUnivers).length;
          
          output += "🌍 UNIVERS-MÉTIERS SÉLECTIONNÉS\n";
          
          if(nbUnivers > 0){
            const sortedUnivers = Object.entries(selectedUnivers)
              .map(([id, data]) => ({ id: parseInt(id), ...data }))
              .sort((a, b) => b.pct - a.pct);
            
            sortedUnivers.forEach(univers => {
              output += `${univers.stars} ${univers.name} - ${univers.level}\n`;
            });
          }
          
          output += "\n";
        }
        
        // 3. BILAN DE SITUATION
        const situationData = localStorage.getItem('situation_data');
        
        if(situationData){
          const situation = JSON.parse(situationData);
          const nbChamps = Object.keys(situation).length;
          
          output += "📋 BILAN DE SITUATION\n";
          output += `✅ Complété (${nbChamps} champs remplis)\n\n`;
          
          if(situation.prenom){
            output += `Prénom : ${situation.prenom}\n`;
          }
          if(situation.age){
            output += `Âge : ${situation.age} ans\n\n`;
          }
          
          if(situation.q1){
            output += "🎯 OBJECTIF PROFESSIONNEL\n";
            output += `${situation.q1}\n\n`;
          }
          
          if(situation.q2){
            output += "💼 STATUT ACTUEL\n";
            output += `${situation.q2}\n\n`;
          }
          
          if(situation.q3){
            output += "🎓 NIVEAU DE FORMATION\n";
            output += `${situation.q3}\n\n`;
          }
          
          if(situation.q6){
            output += "🔧 COMPÉTENCES À RÉUTILISER\n";
            output += `${situation.q6}\n\n`;
          }
          
          if(situation.q9){
            output += "⭐ VALEURS ESSENTIELLES\n";
            output += `${situation.q9}\n\n`;
          }
          
          if(situation.q11){
            output += "📍 MOBILITÉ GÉOGRAPHIQUE\n";
            output += `${situation.q11}\n\n`;
          }
          
          if(situation.q15){
            output += "💰 RÉMUNÉRATION MINIMALE SOUHAITÉE\n";
            output += `${situation.q15}\n\n`;
          }
          
          if(situation.q18){
            output += "📚 FORMATION ENVISAGÉE\n";
            output += `${situation.q18}\n\n`;
          }
        }
        
        output += "===================================\n";
        output += "📅 Date d'export : " + new Date().toLocaleDateString('fr-FR') + "\n";
        output += "🤖 Reconversion 360 IA - Synergie IA\n";
        
        // Copier dans le presse-papier
        navigator.clipboard.writeText(output).then(() => {
          console.log('✅ Données copiées dans le presse-papier');
          
          // Marquer la copie comme effectuée
          localStorage.setItem('copy_done', 'true');
          
          // Feedback visuel
          const originalText = btnCopy.innerHTML;
          btnCopy.innerHTML = '<svg class="btn-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg><span>✅ Copié !</span>';
          btnCopy.style.background = '#22c55e';
          btnCopy.style.color = '#fff';
          
          setTimeout(() => {
            btnCopy.innerHTML = originalText;
            btnCopy.style.background = '';
            btnCopy.style.color = '';
            updateUIIndicators(); // Mettre à jour l'interface
          }, 3000);
          
          alert(
            "✅ Vos données ont été copiées !\n\n" +
            "Vous pouvez maintenant les coller dans une conversation avec l'IA de votre choix.\n\n" +
            "🎯 L'accès à 'Construire mon projet' est maintenant débloqué !"
          );
          
        }).catch(err => {
          console.error('❌ Erreur copie:', err);
          
          const win = window.open('', '_blank');
          win.document.write('<pre style="font-family: monospace; white-space: pre-wrap; padding: 20px;">' + output + '</pre>');
          win.document.title = 'Mes données Reconversion 360 IA';
          
          // Marquer quand même comme copié si ouvert dans nouvelle fenêtre
          localStorage.setItem('copy_done', 'true');
          updateUIIndicators();
          
          alert(
            "📋 Vos données ont été ouvertes dans une nouvelle fenêtre.\n\n" +
            "Copiez-les manuellement (Ctrl+A puis Ctrl+C) pour les utiliser avec l'IA.\n\n" +
            "🎯 L'accès à 'Construire mon projet' est maintenant débloqué !"
          );
        });
        
      } catch(error) {
        console.error('❌ Erreur lors de la copie:', error);
        alert("❌ Une erreur s'est produite lors de la copie des données.");
      }
      
    });
  }
  
  // ===== INITIALISATION =====
  updateUIIndicators();
  
});
