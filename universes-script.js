// Stockage des univers sélectionnés (maximum 5)
let selectedUniverses = new Set();
const MAX_SELECTIONS = 5;

// Charger les sélections sauvegardées
function loadSavedSelections() {
    try {
        const saved = localStorage.getItem('reconversion360_selected_universes');
        if (saved) {
            const savedArray = JSON.parse(saved);
            // Limiter à 5 même si plus sont sauvegardés
            selectedUniverses = new Set(savedArray.slice(0, MAX_SELECTIONS));
        }
    } catch (e) {
        console.log('Impossible de charger les sélections:', e);
    }
}

// Sauvegarder les sélections
function saveSelections() {
    try {
        localStorage.setItem('reconversion360_selected_universes', JSON.stringify([...selectedUniverses]));
    } catch (e) {
        console.log('Impossible de sauvegarder les sélections:', e);
    }
}

// Fonction pour générer les cartes d'univers
function renderUniverses() {
    const grid = document.getElementById('universesGrid');
    
    grid.innerHTML = universesData.map(universe => `
        <div class="universe-card ${selectedUniverses.has(universe.id) ? 'selected' : ''}" 
             data-universe-id="${universe.id}">
            <button class="view-details-btn" onclick="event.stopPropagation(); openModal(${universe.id})" title="Voir les sous-univers">
                🔍
            </button>
            <div class="selection-checkbox" onclick="event.stopPropagation(); toggleSelection(${universe.id})">
                ${selectedUniverses.has(universe.id) ? '✓' : ''}
            </div>
            <div class="universe-image">
                ${universe.icon}
            </div>
            <div class="universe-content">
                <div class="universe-name">${universe.name}</div>
                <div class="universe-description">${universe.description}</div>
            </div>
        </div>
    `).join('');
    
    updateSelectionInfo();
}

// Fonction pour basculer la sélection
function toggleSelection(universeId) {
    if (selectedUniverses.has(universeId)) {
        selectedUniverses.delete(universeId);
    } else {
        // Vérifier la limite
        if (selectedUniverses.size >= MAX_SELECTIONS) {
            showNotification('⚠️ Vous pouvez sélectionner au maximum ' + MAX_SELECTIONS + ' univers professionnels.', 'warning');
            return;
        }
        selectedUniverses.add(universeId);
    }
    
    saveSelections();
    renderUniverses();
}

// Mettre à jour les informations de sélection
function updateSelectionInfo() {
    const count = selectedUniverses.size;
    document.getElementById('selectionCount').textContent = `${count} univers sélectionné${count > 1 ? 's' : ''}`;
    
    const limitElement = document.getElementById('selectionLimit');
    if (count >= MAX_SELECTIONS) {
        limitElement.style.display = 'inline';
    } else {
        limitElement.style.display = 'none';
    }
}

// Fonction pour ouvrir le modal avec les sous-univers
function openModal(universeId) {
    const universe = universesData.find(u => u.id === universeId);
    if (!universe) return;
    
    const modal = document.getElementById('subUniversesModal');
    const modalTitle = document.getElementById('modalTitle');
    const subUniversesList = document.getElementById('subUniversesList');
    
    modalTitle.textContent = universe.icon + ' ' + universe.name;
    
    subUniversesList.innerHTML = universe.subUniverses.map(sub => `
        <div class="sub-universe-card">
            <div class="sub-universe-header">
                <div class="sub-universe-icon">${sub.icon}</div>
                <div class="sub-universe-name">${sub.name}</div>
            </div>
            <div class="sub-universe-description">${sub.description}</div>
        </div>
    `).join('');
    
    modal.style.display = 'block';
}

// Fonction pour fermer le modal
function closeModal() {
    document.getElementById('subUniversesModal').style.display = 'none';
}

// Gérer la touche Echap
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Fermer le modal si on clique en dehors
window.onclick = function(event) {
    const modal = document.getElementById('subUniversesModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Fonction pour afficher une notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    
    const backgroundColor = type === 'success' ? '#27ae60' : '#e74c3c';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: bold;
        max-width: 400px;
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
    loadSavedSelections();
    renderUniverses();
});
