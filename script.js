// Stockage des réponses de l'utilisateur
const ratings = {};
let currentResults = [];

// Fonction d'initialisation au chargement de la page
function renderInterests() {
    const container = document.getElementById('interestsList');
    container.innerHTML = interests.map(interest => `
        <div class="interest-card">
            <div class="interest-header">
                <div class="interest-icon">${interest.icon}</div>
                <div class="interest-title">
                    <h3>${interest.title}</h3>
                    <div class="interest-verbs">${interest.verbs}</div>
                </div>
            </div>
            <div class="interest-description">${interest.description}</div>
            <div class="rating-buttons">
                <button class="rating-btn level-0" onclick="setRating(${interest.id}, 0, event)">
                    ❌ Pas du tout moi
                </button>
                <button class="rating-btn level-1" onclick="setRating(${interest.id}, 1, event)">
                    😐 Un peu moi
                </button>
                <button class="rating-btn level-2" onclick="setRating(${interest.id}, 2, event)">
                    👍 Plutôt moi
                </button>
                <button class="rating-btn level-3" onclick="setRating(${interest.id}, 3, event)">
                    ✅ Totalement moi
                </button>
            </div>
        </div>
    `).join('');
}

// Fonction appelée quand l'utilisateur clique sur un bouton de notation
function setRating(interestId, value, event) {
    ratings[interestId] = value;
    
    // Mise à jour visuelle du bouton sélectionné
    const card = event.target.closest('.interest-card');
    const buttons = card.querySelectorAll('.rating-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // Mise à jour de la barre de progression
    updateProgress();
}

// Fonction pour mettre à jour la barre de progression
function updateProgress() {
    const totalAnswered = Object.keys(ratings).length;
    const percentage = (totalAnswered / interests.length) * 100;
    document.getElementById('progressBar').style.width = percentage + '%';
}

// Fonction pour créer le profil utilisateur
function createUserProfile() {
    let profile = "📋 MON PROFIL D'INTÉRÊTS\n";
    profile += "=".repeat(50) + "\n\n";
    
    interests.forEach(interest => {
        const rating = ratings[interest.id] || 0;
        const ratingLabels = ['❌ Pas du tout', '😐 Un peu', '👍 Plutôt', '✅ Totalement'];
        profile += `${interest.icon} ${interest.title}\n`;
        profile += `   → ${ratingLabels[rating]}\n\n`;
    });
    
    return profile;
}

// Fonction principale de calcul des résultats
function calculateResults() {
    // Vérifier que toutes les questions ont été répondues
    if (Object.keys(ratings).length < interests.length) {
        alert('⚠️ Veuillez répondre à toutes les questions avant de calculer vos résultats.');
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
            
            // Score = somme des (note utilisateur × poids univers)
            score += userRating * weight;
            
            // Score max = somme des poids × 3 (note max possible)
            maxScore += weight * 3;
        });
        
        // Calcul du pourcentage de compatibilité
        const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
        
        return {
            name: universe.name,
            score: score,
            maxScore: maxScore,
            percentage: percentage
        };
    });

    // Tri des résultats par pourcentage décroissant
    results.sort((a, b) => b.percentage - a.percentage);

    // Stocker TOUS les résultats globalement
    currentResults = results;

    // Affichage des résultats (la fonction displayResults gère top 5 + reste)
    displayResults(currentResults);
}

// Fonction d'affichage des résultats
function displayResults(results) {
    const container = document.getElementById('resultsList');
    
    // Afficher seulement les 5 premiers
    const top5 = results.slice(0, 5);
    const remaining = results.slice(5);
    
    let html = top5.map((result, index) => `
        <div class="result-card">
            <div class="result-info">
                <div class="result-title">#${index + 1} ${result.name}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${result.percentage}%"></div>
                </div>
            </div>
            <div class="result-score">${Math.round(result.percentage)}%</div>
        </div>
    `).join('');
    
    // Ajouter le bouton pour voir les univers restants
    if (remaining.length > 0) {
        html += `
            <button class="show-more-btn" onclick="showRemainingUniverses()" id="showMoreBtn">
                📊 Voir les ${remaining.length} univers restants
            </button>
            <div id="remainingUniverses" style="display: none;">
                ${remaining.map((result, index) => `
                    <div class="result-card">
                        <div class="result-info">
                            <div class="result-title">#${index + 6} ${result.name}</div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${result.percentage}%"></div>
                            </div>
                        </div>
                        <div class="result-score">${Math.round(result.percentage)}%</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    container.innerHTML = html;

    // Affichage de la section résultats avec animation
    const resultsSection = document.getElementById('results');
    resultsSection.classList.add('show');
    
    // Scroll automatique vers les résultats
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Fonction pour afficher les univers restants
function showRemainingUniverses() {
    const remainingDiv = document.getElementById('remainingUniverses');
    const btn = document.getElementById('showMoreBtn');
    remainingDiv.style.display = 'block';
    btn.style.display = 'none';
}

// Fonction pour télécharger les résultats en PDF
function downloadResults() {
    if (currentResults.length === 0) {
        alert('⚠️ Aucun résultat à télécharger. Veuillez d\'abord passer le test.');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const date = new Date().toLocaleDateString('fr-FR');
    let yPos = 20;
    
    // Titre
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Orientation 360 IA', 105, yPos, { align: 'center' });
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text('Résultats du test d\'orientation', 105, yPos, { align: 'center' });
    yPos += 5;
    doc.text('Date : ' + date, 105, yPos, { align: 'center' });
    yPos += 15;
    
    // Profil d'intérêts
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('MON PROFIL D\'INTÉRÊTS', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    interests.forEach(interest => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        const rating = ratings[interest.id] || 0;
        const ratingLabels = ['Pas du tout', 'Un peu', 'Plutôt', 'Totalement'];
        doc.text(`${interest.title}`, 20, yPos);
        yPos += 5;
        doc.text(`   ${ratingLabels[rating]}`, 20, yPos);
        yPos += 8;
    });
    
    yPos += 10;
    
    // Top 5 des univers
    if (yPos > 200) {
        doc.addPage();
        yPos = 20;
    }
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('TOP 5 DES UNIVERS COMPATIBLES', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    currentResults.slice(0, 5).forEach((result, index) => {
        if (yPos > 270) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFont(undefined, 'bold');
        doc.text(`#${index + 1} ${result.name}`, 20, yPos);
        yPos += 5;
        doc.setFont(undefined, 'normal');
        doc.text(`   Compatibilité : ${Math.round(result.percentage)}%`, 20, yPos);
        yPos += 8;
    });
    
    // Autres univers
    if (currentResults.length > 5) {
        yPos += 5;
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text('AUTRES UNIVERS', 20, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        
        currentResults.slice(5).forEach((result, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`#${index + 6} ${result.name} - ${Math.round(result.percentage)}%`, 20, yPos);
            yPos += 6;
        });
    }
    
    // Sauvegarde
    doc.save(`Orientation360IA_Resultats_${date.replace(/\//g, '-')}.pdf`);
    
    showNotification('✅ PDF téléchargé avec succès !');
}

// Fonction pour copier les résultats
function copyResults() {
    if (currentResults.length === 0) {
        alert('⚠️ Aucun résultat à copier. Veuillez d\'abord passer le test.');
        return;
    }
    
    const date = new Date().toLocaleDateString('fr-FR');
    let content = "📋 IA360 - RÉSULTATS DU TEST D'ORIENTATION\n";
    content += "Date : " + date + "\n";
    content += "=".repeat(60) + "\n\n";
    
    // Ajout du profil
    content += createUserProfile();
    content += "\n" + "=".repeat(60) + "\n\n";
    
    // Ajout des résultats
    content += "🎯 TOP 10 DES UNIVERS COMPATIBLES\n";
    content += "=".repeat(60) + "\n\n";
    
    currentResults.forEach((result, index) => {
        content += `#${index + 1} ${result.name}\n`;
        content += `   Compatibilité : ${result.percentage.toFixed(1)}%\n`;
        content += `   Score : ${result.score}/${result.maxScore}\n\n`;
    });
    
    // Copie dans le presse-papier
    navigator.clipboard.writeText(content).then(() => {
        showNotification('✅ Résultats copiés dans le presse-papier !');
    }).catch(err => {
        alert('❌ Erreur lors de la copie : ' + err);
    });
}

// Fonction pour ouvrir l'assistant virtuel
function openAssistant() {
    if (currentResults.length === 0) {
        alert('⚠️ Veuillez d\'abord passer le test avant de consulter l\'assistant virtuel.');
        return;
    }
    
    // Pour l'instant, afficher un message (sera connecté à un GPT plus tard)
    alert('🧭 Fonctionnalité à venir !\n\nL\'assistant virtuel sera bientôt disponible pour analyser votre profil en détail.');
    
    // TODO: Intégrer avec un GPT pour l'analyse du profil
    // Exemple de données à envoyer au GPT :
    // - Profil complet (ratings)
    // - Top 10 des univers
    // - Scores détaillés
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

// Ajout des animations CSS pour les notifications
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
    renderInterests();
});
