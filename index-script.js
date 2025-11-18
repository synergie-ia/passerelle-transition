/* 
  ============================================
  RECONVERSION 360 IA - BILAN DE SITUATION
  ============================================
  Sauvegarde complète de toutes les réponses
  ============================================
*/

document.addEventListener('DOMContentLoaded', function() {
  console.log("📋 BILAN DE SITUATION - Initialisation");
  console.log("=======================================\n");
  
  // Chargement des données existantes
  loadSavedData();
  
  // Gestion de la soumission du formulaire
  const form = document.getElementById('situationForm');
  if(form){
    form.addEventListener('submit', handleSubmit);
  }
});

/* ===== CHARGEMENT DES DONNÉES ===== */

function loadSavedData() {
  try {
    const savedData = localStorage.getItem('situation_data');
    
    if(savedData){
      console.log("📂 Données existantes trouvées");
      const data = JSON.parse(savedData);
      
      // Remplir tous les champs du formulaire
      Object.keys(data).forEach(key => {
        const field = document.getElementById(key);
        if(field){
          field.value = data[key];
          console.log(`✅ ${key} restauré`);
        }
      });
      
      console.log("✅ Toutes les données ont été restaurées\n");
    } else {
      console.log("ℹ️ Aucune donnée sauvegardée\n");
    }
  } catch(error) {
    console.error("❌ Erreur chargement:", error);
  }
}

/* ===== SOUMISSION DU FORMULAIRE ===== */

function handleSubmit(e) {
  e.preventDefault();
  
  console.log("💾 Début de l'enregistrement...");
  console.log("================================\n");
  
  try {
    // Récupération de TOUTES les données du formulaire
    const formData = {
      prenom: document.getElementById('prenom').value.trim(),
      age: document.getElementById('age').value.trim(),
      q1: document.getElementById('q1').value.trim(),
      q2: document.getElementById('q2').value.trim(),
      q3: document.getElementById('q3').value.trim(),
      q4: document.getElementById('q4').value.trim(),
      q5: document.getElementById('q5').value.trim(),
      q6: document.getElementById('q6').value.trim(),
      q7: document.getElementById('q7').value.trim(),
      q8: document.getElementById('q8').value.trim(),
      q9: document.getElementById('q9').value.trim(),
      q10: document.getElementById('q10').value.trim(),
      q11: document.getElementById('q11').value.trim(),
      q12: document.getElementById('q12').value.trim(),
      q13: document.getElementById('q13').value.trim(),
      q14: document.getElementById('q14').value.trim(),
      q15: document.getElementById('q15').value.trim(),
      q16: document.getElementById('q16').value.trim(),
      q17: document.getElementById('q17').value.trim(),
      q18: document.getElementById('q18').value.trim(),
      q19: document.getElementById('q19').value.trim(),
      q20: document.getElementById('q20').value.trim()
    };
    
    // Validation - tous les champs doivent être remplis
    const emptyFields = Object.entries(formData).filter(([key, value]) => !value);
    
    if(emptyFields.length > 0){
      console.log("⚠️ Champs vides détectés:");
      emptyFields.forEach(([key]) => {
        console.log(`   - ${key}`);
      });
      alert("⚠️ Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    // Sauvegarde dans localStorage
    localStorage.setItem('situation_data', JSON.stringify(formData));
    
    console.log("✅ Données sauvegardées avec succès:");
    console.log("───────────────────────────────────");
    console.log(`Prénom: ${formData.prenom}`);
    console.log(`Âge: ${formData.age}`);
    console.log(`Total questions: 20`);
    console.log(`Toutes les réponses: ✓`);
    console.log("");
    
    // Feedback visuel
    showSuccessMessage();
    
    // Redirection après 2 secondes
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
    
  } catch(error) {
    console.error("❌ Erreur lors de l'enregistrement:", error);
    alert("❌ Une erreur s'est produite lors de l'enregistrement.\n\nDétails: " + error.message);
  }
}

/* ===== FEEDBACK VISUEL ===== */

function showSuccessMessage() {
  const btn = document.querySelector('.main-btn');
  if(!btn) return;
  
  const originalHTML = btn.innerHTML;
  const originalBg = btn.style.background;
  
  btn.innerHTML = '✅ Bilan enregistré !';
  btn.style.background = '#10b981';
  btn.disabled = true;
  
  // Message de confirmation
  alert("✅ Votre bilan a été enregistré avec succès !\n\nVous allez être redirigé vers l'accueil.");
  
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = originalBg;
    btn.disabled = false;
  }, 2000);
}
