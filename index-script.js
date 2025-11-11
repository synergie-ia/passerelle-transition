/* 
  Script pour copier les résultats
*/

document.addEventListener('DOMContentLoaded', function() {
  
  const btnCopy = document.getElementById('btnCopyResults');
  
  if(btnCopy){
    btnCopy.addEventListener('click', function(){
      
      // Récupérer les données du localStorage
      const answers = localStorage.getItem('questionnaire_answers');
      const selectedUnivers = localStorage.getItem('selectedUnivers');
      const situationData = localStorage.getItem('situation_data');
      
      if(!answers && !selectedUnivers && !situationData){
        alert("❌ Aucune donnée à copier. Complétez d'abord le questionnaire et/ou votre bilan de situation.");
        return;
      }
      
      // Construire le texte à copier
      let textToCopy = "=== MES DONNÉES RECONVERSION 360 IA ===\n\n";
      
      // Ajouter les réponses du questionnaire
      if(answers){
        textToCopy += "📊 PROFIL D'INTÉRÊTS\n";
        textToCopy += "Questionnaire complété\n\n";
      }
      
      // Ajouter les univers sélectionnés
      if(selectedUnivers){
        const univers = JSON.parse(selectedUnivers);
        textToCopy += "🌍 UNIVERS MÉTIERS SÉLECTIONNÉS\n";
        textToCopy += `${univers.length} univers choisis\n\n`;
      }
      
      // Ajouter les données de situation
      if(situationData){
        try {
          const situation = JSON.parse(situationData);
          textToCopy += "📋 BILAN DE SITUATION\n";
          
          if(situation.nom) textToCopy += `Nom: ${situation.nom}\n`;
          if(situation.age) textToCopy += `Âge: ${situation.age}\n`;
          if(situation.situation) textToCopy += `Situation: ${situation.situation}\n`;
          if(situation.experience) textToCopy += `Expérience: ${situation.experience}\n`;
          if(situation.formation) textToCopy += `Formation: ${situation.formation}\n`;
          if(situation.competences) textToCopy += `Compétences: ${situation.competences}\n`;
          if(situation.motivations) textToCopy += `Motivations: ${situation.motivations}\n`;
          if(situation.contraintes) textToCopy += `Contraintes: ${situation.contraintes}\n`;
          
          textToCopy += "\n";
        } catch(e) {
          console.error("Erreur parsing situation:", e);
        }
      }
      
      textToCopy += "=== FIN DES DONNÉES ===\n";
      textToCopy += "Généré par Reconversion 360 IA - Synergie IA";
      
      // Copier dans le presse-papier
      navigator.clipboard.writeText(textToCopy).then(() => {
        // Feedback visuel
        const originalText = btnCopy.innerHTML;
        btnCopy.innerHTML = '<span style="color:#22c55e">✓ Copié !</span>';
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
  
});
