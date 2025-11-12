/* 
  Script pour la page d'accueil avec validation
*/

document.addEventListener('DOMContentLoaded', function() {
  
  const btnCopy = document.getElementById('btnCopyResults');
  const btnProject = document.getElementById('btnProject');
  
  // Vérifier si toutes les données nécessaires sont présentes
  function checkDataComplete(){
    const answers = localStorage.getItem('questionnaire_answers');
    const selectedUnivers = localStorage.getItem('selectedUnivers');
    const situationData = localStorage.getItem('situation_data');
    
    return {
      hasAnswers: !!answers,
      hasUnivers: !!selectedUnivers && JSON.parse(selectedUnivers).length > 0,
      hasSituation: !!situationData,
      allComplete: !!answers && !!selectedUnivers && JSON.parse(selectedUnivers).length > 0 && !!situationData
    };
  }
  
  // Vérifier si les données ont été copiées
  function hasBeenCopied(){
    return localStorage.getItem('data_copied') === 'true';
  }
  
  /* ===== BOUTON COPIER ===== */
  if(btnCopy){
    btnCopy.addEventListener('click', function(){
      
      const status = checkDataComplete();
      
      // Vérifier que TOUT est complet
      if(!status.allComplete){
        let message = "❌ Données incomplètes. Vous devez compléter :\n\n";
        
        if(!status.hasAnswers){
          message += "• Le questionnaire de profil\n";
        }
        if(!status.hasUnivers){
          message += "• La sélection des univers-métiers\n";
        }
        if(!status.hasSituation){
          message += "• Le bilan de situation\n";
        }
        
        alert(message);
        return;
      }
      
      // Récupérer toutes les données
      const answers = localStorage.getItem('questionnaire_answers');
      const selectedUnivers = localStorage.getItem('selectedUnivers');
      const situationData = localStorage.getItem('situation_data');
      
      // Construire le texte à copier
      let textToCopy = "=== MES DONNÉES RECONVERSION 360 IA ===\n\n";
      
      if(answers){
        textToCopy += "📊 PROFIL D'INTÉRÊTS\n";
        textToCopy += "Questionnaire complété\n\n";
      }
      
      if(selectedUnivers){
        const univers = JSON.parse(selectedUnivers);
        textToCopy += "🌍 UNIVERS-MÉTIERS SÉLECTIONNÉS\n";
        textToCopy += `${univers.length} univers choisis\n\n`;
      }
      
      if(situationData){
        try {
          const situation = JSON.parse(situationData);
          textToCopy += "📋 BILAN DE SITUATION\n\n";
          
          if(situation.prenom) textToCopy += `Prénom: ${situation.prenom}\n`;
          if(situation.age) textToCopy += `Âge: ${situation.age}\n\n`;
          
          textToCopy += "=== SITUATION & PARCOURS ===\n";
          if(situation.q1) textToCopy += `Objectif professionnel: ${situation.q1}\n`;
          if(situation.q2) textToCopy += `Statut actuel: ${situation.q2}\n`;
          if(situation.q3) textToCopy += `Niveau de formation: ${situation.q3}\n`;
          if(situation.q4) textToCopy += `Certifications: ${situation.q4}\n\n`;
          
          textToCopy += "=== RESSOURCES & COMPÉTENCES ===\n";
          if(situation.q5) textToCopy += `Compétences techniques: ${situation.q5}\n`;
          if(situation.q6) textToCopy += `Compétences à réutiliser: ${situation.q6}\n`;
          if(situation.q7) textToCopy += `Compétences relationnelles: ${situation.q7}\n`;
          if(situation.q8) textToCopy += `Expériences marquantes: ${situation.q8}\n\n`;
          
          textToCopy += "=== VALEURS & SENS ===\n";
          if(situation.q9) textToCopy += `Valeurs essentielles: ${situation.q9}\n`;
          if(situation.q10) textToCopy += `Secteurs à éviter: ${situation.q10}\n\n`;
          
          textToCopy += "=== CONTRAINTES & CONDITIONS ===\n";
          if(situation.q11) textToCopy += `Mobilité: ${situation.q11}\n`;
          if(situation.q12) textToCopy += `Conditions de travail: ${situation.q12}\n`;
          if(situation.q13) textToCopy += `Horaires: ${situation.q13}\n`;
          if(situation.q14) textToCopy += `Limitations: ${situation.q14}\n`;
          if(situation.q15) textToCopy += `Rémunération souhaitée: ${situation.q15}\n`;
          if(situation.q16) textToCopy += `Situations à éviter: ${situation.q16}\n`;
          if(situation.q17) textToCopy += `Environnement idéal: ${situation.q17}\n\n`;
          
          textToCopy += "=== FORMATION ===\n";
          if(situation.q18) textToCopy += `Formation envisagée: ${situation.q18}\n\n`;
          
          if(situation.q19) {
            textToCopy += "=== INFORMATIONS COMPLÉMENTAIRES ===\n";
            textToCopy += `${situation.q19}\n\n`;
          }
          
        } catch(e) {
          console.error("Erreur parsing situation:", e);
        }
      }
      
      textToCopy += "=== FIN DES DONNÉES ===\n";
      textToCopy += "Généré par Reconversion 360 IA - Synergie IA";
      
      // Copier dans le presse-papier
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Marquer comme copié
        localStorage.setItem('data_copied', 'true');
        
        // Feedback visuel
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = '<span style="color:#22c55e">✓ Données copiées !</span>';
        btnCopy.style.borderColor = '#22c55e';
        
        setTimeout(() => {
          btnCopy.innerHTML = originalText;
          btnCopy.style.borderColor = '';
        }, 2000);
        
      }).catch(err => {
        alert("❌ Erreur lors de la copie. Veuillez réessayer.");
        console.error('Erreur copie:', err);
      });
      
    });
  }
  
  /* ===== BOUTON CONSTRUIRE MON PROJET ===== */
  if(btnProject){
    btnProject.addEventListener('click', function(e){
      
      if(!hasBeenCopied()){
        e.preventDefault();
        alert("⚠️ Vous devez d'abord copier vos données avant d'accéder à cette section.\n\nCliquez sur le bouton 'Copier mes résultats pour l'IA' ci-dessous.");
        return;
      }
      
      // Si copié, rediriger
      window.location.href = 'project.html';
    });
  }
  
});
