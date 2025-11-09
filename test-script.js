// Stockage des réponses
let ratings = {};

// Fonction pour calculer la moyenne des réponses pour chaque intérêt
function calculateInterestAverages() {
  const averages = {};
  
  interests.forEach(interest => {
    let sum = 0;
    let count = 0;
    
    for (let i = 0; i < interest.statements.length; i++) {
      const key = `${interest.id}-${i}`;
      if (ratings[key] !== undefined) {
        sum += ratings[key];
        count++;
      }
    }
    
    averages[interest.id] = count > 0 ? sum / count : 0;
  });
  
  return averages;
}

// Fonction pour générer les cartes de questions
function renderInterests() {
  const container = document.getElementById('interestsList');
  
  container.innerHTML = interests.map(interest => `
    <div class="interest-card" id="interest-${interest.id}">
      <div class="interest-header">
        <div class="interest-question">${interest.question}</div>
      </div>
      <div class="statements">
        ${interest.statements.map((statement, index) => `
          <div class="statement">
            <div class="statement-text">${statement}</div>
            <div class="rating-buttons">
              ${[0, 1, 2, 3, 4].map(value => `
                <button class="rating-btn" 
                        data-interest="${interest.id}" 
                        data-statement="${index}"
                        data-value="${value}"
                        onclick="setRating(${interest.id}, ${index}, ${value})">
                  ${value}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  
  updateProgress();
}

// Fonction pour enregistrer une note
function setRating(interestId, statementIndex, value) {
  const key = `${interestId}-${statementIndex}`;
  ratings[key] = value;
  
  // Mettre à jour visuellement
  const buttons = document.querySelectorAll(
    `button[data-interest="${interestId}"][data-statement="${statementIndex}"]`
  );
  
  buttons.forEach(btn => {
    if (parseInt(btn.dataset.value) === value) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
  
  updateProgress();
  
  // Sauvegarder dans localStorage
  try {
    localStorage.setItem('reconversion360_test_ratings', JSON.stringify(ratings));
  } catch (e) {
    console.log('Impossible de sauvegarder:', e);
  }
}

// Mettre à jour la barre de progression
function updateProgress() {
  const totalQuestions = interests.reduce((sum, interest) => sum + interest.statements.length, 0);
  const answeredQuestions = Object.keys(ratings).length;
  const percentage = (answeredQuestions / totalQuestions) * 100;
  
  document.getElementById('progressBar').style.width = percentage + '%';
}

// Fonction principale de calcul des résultats
function calculateResults() {
  // Vérifier que toutes les questions ont été répondues
  const totalQuestions = interests.reduce((sum, interest) => sum + interest.statements.length, 0);
  
  if (Object.keys(ratings).length < totalQuestions) {
    alert('⚠️ Veuillez répondre à toutes les questions avant de calculer vos résultats.');
    return;
  }

  // Calculer les moyennes par intérêt
  const interestAverages = calculateInterestAverages();
  
  // Créer le profil d'intérêts
  const interestProfile = interests.map(interest => ({
    id: interest.id,
    name: interest.name,
    code: interest.code,
    score: interestAverages[interest.id],
    percentage: Math.round((interestAverages[interest.id] / 4) * 100)
  })).sort((a, b) => b.percentage - a.percentage);
  
  // Calcul du score pour chaque univers
  const universeResults = universes.map(universe => {
    let score = 0;
    let maxScore = 0;
    
    // Pour chaque intérêt (12 au total)
    universe.weights.forEach((weight, index) => {
      const interestId = index + 1;
      const userAverage = interestAverages[interestId] || 0;
      
      // Score = somme des (note moyenne utilisateur × poids univers)
      score += userAverage * weight;
      
      // Score max = somme des poids × 4 (note max possible)
      maxScore += weight * 4;
    });
    
    // Calcul du pourcentage de compatibilité
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    
    return {
      id: universe.id,
      name: universe.name,
      icon: universe.icon,
      score: score,
      percentage: percentage
    };
  });

  // Trier par pourcentage décroissant
  universeResults.sort((a, b) => b.percentage - a.percentage);
  
  // Sauvegarder les résultats
  try {
    localStorage.setItem('reconversion360_interest_profile', JSON.stringify(interestProfile));
    localStorage.setItem('reconversion360_test_results', JSON.stringify(universeResults));
  } catch (e) {
    console.log('Impossible de sauvegarder les résultats:', e);
  }
  
  // Afficher le profil d'intérêts d'abord
  displayInterestProfile(interestProfile, universeResults);
}

// Fonction d'affichage du profil d'intérêts
function displayInterestProfile(interestProfile, universeResults) {
  const container = document.getElementById('resultsList');
  
  if (!container) {
    console.error('resultsList container not found');
    return;
  }
  
  let html = '<h2 style="text-align: center; color: #333; font-size: 2em; margin-bottom: 30px;">📊 Votre profil d\'intérêts</h2>';
  
  html += interestProfile.map((interest, index) => `
    <div class="result-card">
      <div class="result-info">
        <div class="result-title">#${index + 1} ${interest.name}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${interest.percentage}%"></div>
        </div>
      </div>
      <div class="result-actions">
        <div class="result-score">${interest.percentage}%</div>
      </div>
    </div>
  `).join('');

  html += `
    <div style="text-align: center; margin-top: 30px;">
      <button onclick="displayUniverseResults()" class="calculate-btn">
        🌐 Découvrez les univers professionnels qui vous correspondent
      </button>
    </div>
  `;

  container.innerHTML = html;

  // Sauvegarder les résultats d'univers pour l'affichage suivant
  window.universeResultsData = universeResults;

  // Affichage de la section résultats avec animation
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fonction pour afficher les résultats des univers
function displayUniverseResults() {
  const container = document.getElementById('resultsList');
  const universeResults = window.universeResultsData;
  
  if (!universeResults) {
    console.error('No universe results found');
    return;
  }
  
  let html = '<h2 style="text-align: center; color: #333; font-size: 2em; margin-bottom: 30px;">🌐 Vos univers professionnels</h2>';
  
  html += universeResults.map((result, index) => `
    <div class="result-card">
      <div class="result-info">
        <div class="result-title">${result.icon} #${index + 1} ${result.name}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${result.percentage}%"></div>
        </div>
      </div>
      <div class="result-actions">
        <div class="result-score">${result.percentage}%</div>
        <button class="view-universe-btn-small" onclick="viewUniverseDetails(${result.id})" title="Voir les sous-univers">
          🔍
        </button>
      </div>
    </div>
  `).join('');

  html += `
    <div style="text-align: center; margin-top: 30px;">
      <button onclick="window.history.back()" class="show-more-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">← Retour</button>
    </div>
  `;

  container.innerHTML = html;
  
  // Scroll vers le haut des résultats
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fonction pour voir les détails d'un univers
function viewUniverseDetails(universeId) {
  // Rediriger vers la page des univers avec l'univers sélectionné
  window.location.href = `universes.html#universe-${universeId}`;
}

// Charger les réponses sauvegardées au chargement
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier que les données sont bien chargées
  if (typeof interests === 'undefined' || typeof universes === 'undefined') {
    console.error('Erreur: Les données (interests ou universes) ne sont pas chargées!');
    alert('Erreur de chargement des données. Veuillez recharger la page.');
    return;
  }
  
  console.log('Données chargées:', interests.length, 'intérêts et', universes.length, 'univers');
  
  // Charger les réponses sauvegardées
  try {
    const saved = localStorage.getItem('reconversion360_test_ratings');
    if (saved) {
      ratings = JSON.parse(saved);
    }
  } catch (e) {
    console.log('Impossible de charger les réponses:', e);
  }
  
  // Générer les questions
  renderInterests();
  
  // Restaurer les sélections visuelles
  Object.keys(ratings).forEach(key => {
    const [interestId, statementIndex] = key.split('-').map(Number);
    const value = ratings[key];
    
    const button = document.querySelector(
      `button[data-interest="${interestId}"][data-statement="${statementIndex}"][data-value="${value}"]`
    );
    
    if (button) {
      button.classList.add('selected');
    }
  });
});
