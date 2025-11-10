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
  
  // Sauvegarder
  try {
    const saved = JSON.stringify(ratings);
    // Ne pas utiliser localStorage - en mémoire uniquement
  } catch (e) {
    console.log('Sauvegarde en mémoire uniquement');
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
  
  // Calcul du score pour chaque univers
  const results = universes.map(universe => {
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
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    return {
      id: universe.id,
      name: universe.name,
      icon: universe.icon,
      score: score,
      percentage: percentage
    };
  });

  // Trier par pourcentage décroissant
  results.sort((a, b) => b.percentage - a.percentage);
  
  // Afficher les résultats
  displayResults(results, interestAverages);
}

// Fonction d'affichage des résultats
function displayResults(results, interestAverages) {
  const container = document.getElementById('resultsList');
  
  if (!container) {
    console.error('resultsList container not found');
    return;
  }
  
  // Afficher les profils d'intérêts en premier
  let html = '<div class="interest-profile-section">';
  html += '<h2 style="color: #333; margin-bottom: 20px; font-size: 1.8em;">📊 Votre profil d\'intérêts</h2>';
  
  // Trier les intérêts par moyenne décroissante
  const sortedInterests = interests.map(interest => ({
    ...interest,
    average: interestAverages[interest.id]
  })).sort((a, b) => b.average - a.average);
  
  html += '<div class="interests-grid">';
  sortedInterests.forEach(interest => {
    const percentage = (interest.average / 4) * 100;
    html += `
      <div class="interest-profile-card">
        <div class="interest-profile-name">${interest.code} - ${interest.name}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${percentage}%"></div>
        </div>
        <div class="interest-profile-score">${interest.average.toFixed(1)} / 4</div>
      </div>
    `;
  });
  html += '</div></div>';
  
  // Afficher les univers
  html += '<div style="margin-top: 40px;">';
  html += '<h2 style="color: #333; margin-bottom: 20px; font-size: 1.8em;">🎯 Univers professionnels compatibles</h2>';
  
  // Afficher seulement les 5 premiers
  const top5 = results.slice(0, 5);
  const remaining = results.slice(5);

  html += top5.map((result, index) => `
    <div class="result-card">
      <div class="result-info">
        <div class="result-title">${result.icon} #${index + 1} ${result.name}</div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${result.percentage}%"></div>
        </div>
      </div>
      <div class="result-actions">
        <div class="result-score">${Math.round(result.percentage)}%</div>
        <button class="view-universe-btn" onclick="viewUniverseDetails(${result.id})" title="Voir les sous-univers">
          🔍
        </button>
      </div>
    </div>
  `).join('');

  // Ajouter le bouton pour voir les univers restants
  if (remaining.length > 0) {
    html += `
      <button class="show-more-btn" onclick="showRemainingUniverses()" id="showMoreBtn">
        👁️ Voir les ${remaining.length} univers restants
      </button>
      <div id="remainingUniverses" style="display: none;">
        ${remaining.map((result, index) => `
          <div class="result-card">
            <div class="result-info">
              <div class="result-title">${result.icon} #${index + 6} ${result.name}</div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${result.percentage}%"></div>
              </div>
            </div>
            <div class="result-actions">
              <div class="result-score">${Math.round(result.percentage)}%</div>
              <button class="view-universe-btn" onclick="viewUniverseDetails(${result.id})" title="Voir les sous-univers">
                🔍
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  html += '</div>';

  // Ajouter le bouton Retour
  html += `
    <div style="text-align: center; margin-top: 30px;">
      <button onclick="window.history.back()" class="show-more-btn" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none;">← Retour</button>
    </div>
  `;

  container.innerHTML = html;

  // Affichage de la section résultats avec animation
  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    resultsSection.classList.add('show');
    
    // Scroll automatique vers les résultats
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fonction pour afficher les univers restants
function showRemainingUniverses() {
  const remainingDiv = document.getElementById('remainingUniverses');
  const btn = document.getElementById('showMoreBtn');
  
  if (remainingDiv.style.display === 'none') {
    remainingDiv.style.display = 'block';
    btn.textContent = '👁️ Masquer les univers restants';
  } else {
    remainingDiv.style.display = 'none';
    const remaining = document.querySelectorAll('#remainingUniverses .result-card').length;
    btn.textContent = `👁️ Voir les ${remaining} univers restants`;
  }
}

// Fonction pour voir les détails d'un univers
function viewUniverseDetails(universeId) {
  // Rediriger vers la page des univers avec l'univers sélectionné
  window.location.href = `universes.html#universe-${universeId}`;
}

// Charger au démarrage
document.addEventListener('DOMContentLoaded', function() {
  renderInterests();
});
