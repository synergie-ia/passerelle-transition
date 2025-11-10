// Stockage des réponses de l'utilisateur
let ratings = {};
let currentResults = [];

// Charger les réponses sauvegardées au démarrage
function loadSavedRatings() {
  try {
    const saved = localStorage.getItem('reconversion360_ratings');
    if (saved) {
      ratings = JSON.parse(saved);
    }
  } catch (e) {
    console.log('Impossible de charger les données sauvegardées:', e);
    ratings = {};
  }
}

// Sauvegarder les réponses
function saveRatings() {
  try {
    localStorage.setItem('reconversion360_ratings', JSON.stringify(ratings));
  } catch (e) {
    console.log('Impossible de sauvegarder les données:', e);
  }
}

// Fonction d'initialisation au chargement de la page
function renderInterests() {
  const container = document.getElementById('interestsList');
  
  if (!container) {
    console.error('Container interestsList not found');
    return;
  }
  
  if (typeof interests === 'undefined' || !interests.length) {
    console.error('interests array not found or empty');
    container.innerHTML = '<p style="color: red; padding: 20px;">Erreur: Les questions ne sont pas chargées. Vérifiez que test-data.js est bien chargé.</p>';
    return;
  }
  
  container.innerHTML = interests.map(interest => `
    <div class="interest-card">
      <div class="interest-question">
        <strong>${interest.title}</strong><br>
        ${interest.description}
      </div>
      <div class="rating-buttons">
        <button class="rating-btn" data-interest="${interest.id}" data-value="0">0</button>
        <button class="rating-btn" data-interest="${interest.id}" data-value="1">1</button>
        <button class="rating-btn" data-interest="${interest.id}" data-value="2">2</button>
        <button class="rating-btn" data-interest="${interest.id}" data-value="3">3</button>
        <button class="rating-btn" data-interest="${interest.id}" data-value="4">4</button>
      </div>
    </div>
  `).join('');

  // Ajouter les event listeners
  document.querySelectorAll('.rating-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const interestId = parseInt(this.getAttribute('data-interest'));
      const value = parseInt(this.getAttribute('data-value'));
      
      ratings[interestId] = value;
      
      // Sauvegarder dans localStorage
      saveRatings();
      
      // Mettre à jour visuellement
      const card = this.closest('.interest-card');
      card.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      
      // Mettre à jour la barre de progression
      updateProgress();
    });
  });

  // Restaurer les sélections
  Object.keys(ratings).forEach(interestId => {
    const value = ratings[interestId];
    const btn = document.querySelector(`.rating-btn[data-interest="${interestId}"][data-value="${value}"]`);
    if (btn) {
      btn.classList.add('selected');
    }
  });

  // Mettre à jour la progression
  updateProgress();
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
  const totalAnswered = Object.keys(ratings).length;
  const percentage = (totalAnswered / interests.length) * 100;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = percentage + '%';
  }
}

// Fonction principale de calcul des résultats
function calculateResults() {
  // Vérifier que toutes les questions ont été répondues
  if (Object.keys(ratings).length < interests.length) {
    alert('Veuillez répondre à toutes les questions avant de calculer vos résultats.');
    return;
  }

  // Vérifier que universes existe
  if (typeof universes === 'undefined' || !universes.length) {
    alert('Erreur: Les univers professionnels ne sont pas chargés.');
    return;
  }

  // Calcul du score pour chaque univers
  const results = universes.map(universe => {
    let score = 0;
    let maxScore = 0;
    
    // Pour chaque intérêt (12 au total)
    universe.weights.forEach((weight, index) => {
      const interestId = index + 1;
      const userRating = ratings[interestId] || 0;
      
      score += userRating * weight;
      maxScore += weight * 4;
    });
    
    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    return {
      id: universe.id,
      name: universe.name,
      icon: universe.icon,
      score: score,
      maxScore: maxScore,
      percentage: percentage
    };
  });

  // Tri des résultats par pourcentage décroissant
  results.sort((a, b) => b.percentage - a.percentage);
  
  currentResults = results;
  
  // Affichage des résultats
  displayResults(currentResults);
}

// Fonction d'affichage des résultats
function displayResults(results) {
  const container = document.getElementById('resultsList');
  
  if (!container) {
    console.error('resultsList container not found');
    return;
  }
  
  const top5 = results.slice(0, 5);
  const remaining = results.slice(5);

  let html = '<h2 style="text-align: center; margin-bottom: 30px; color: #333;">🎯 Vos résultats</h2>';
  
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
      </div>
    </div>
  `).join('');

  if (remaining.length > 0) {
    html += `
      <button class="show-more-btn" onclick="showRemainingUniverses()" id="showMoreBtn">
        👇 Voir les ${remaining.length} univers restants
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
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  html += `
    <div style="text-align: center; margin-top: 30px;">
      <button onclick="window.location.href='index.html'" class="show-more-btn">🏠 Retour à l'accueil</button>
    </div>
  `;

  container.innerHTML = html;

  const resultsSection = document.getElementById('results');
  if (resultsSection) {
    resultsSection.classList.add('show');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Fonction pour afficher les univers restants
function showRemainingUniverses() {
  const remainingDiv = document.getElementById('remainingUniverses');
  const btn = document.getElementById('showMoreBtn');
  
  if (remainingDiv) remainingDiv.style.display = 'block';
  if (btn) btn.style.display = 'none';
}

// Fonction pour afficher une notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #27ae60;
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    font-weight: bold;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Ajout des animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing...');
  loadSavedRatings();
  renderInterests();
});
