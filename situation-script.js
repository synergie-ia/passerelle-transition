/* 
  ============================================
  RECONVERSION 360 IA - BILAN DE SITUATION
  ============================================
  Script pour sauvegarder et charger les données du formulaire
*/

document.addEventListener('DOMContentLoaded', function() {
  
  const form = document.getElementById('situationForm');
  
  // ===== CHARGEMENT DES DONNÉES EXISTANTES =====
  function loadSavedData(){
    const saved = localStorage.getItem('situation_data');
    if(!saved) return;
    
    try {
      const data = JSON.parse(saved);
      console.log('Données chargées:', data);
      
      // Remplir tous les champs du formulaire
      Object.keys(data).forEach(key => {
        const field = document.getElementById(key);
        if(field && data[key]){
          field.value = data[key];
        }
      });
      
    } catch(e) {
      console.error('Erreur lors du chargement des données:', e);
    }
  }
  
  // ===== SAUVEGARDE AUTOMATIQUE =====
  function autoSave(){
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    localStorage.setItem('situation_data', JSON.stringify(data));
    console.log('Sauvegarde automatique:', data);
  }
  
  // Sauvegarder automatiquement à chaque modification
  form.addEventListener('input', function(){
    autoSave();
  });
  
  // ===== SOUMISSION DU FORMULAIRE =====
  form.addEventListener('submit', function(e){
    e.preventDefault();
    
    // Récupérer toutes les données
    const formData = new FormData(form);
    const data = {};
    
    formData.forEach((value, key) => {
      data[key] = value.trim();
    });
    
    // Vérifier que tous les champs obligatoires sont remplis
    const required = [
      'prenom', 'age', 
      'q1', 'q2', 'q3', 'q4',
      'q5', 'q6', 'q7', 'q8', 
      'q9', 'q10',
      'q11', 'q12', 'q13', 'q14', 'q15', 'q16', 'q17',
      'q18',
      'q19'
    ];
    
    const missing = required.filter(field => !data[field] || data[field] === '');
    
    if(missing.length > 0){
      alert(`⚠️ Veuillez remplir tous les champs obligatoires.\n\nChamps manquants: ${missing.join(', ')}`);
      return;
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('situation_data', JSON.stringify(data));
    
    console.log('✅ Données sauvegardées:', data);
    
    // Message de confirmation
    alert('✅ Votre bilan de situation a été enregistré avec succès !\n\nVous pouvez maintenant retourner à l\'accueil.');
    
    // Rediriger vers l'accueil après 1 seconde
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });
  
  // ===== CHARGER LES DONNÉES AU DÉMARRAGE =====
  loadSavedData();
  
});
