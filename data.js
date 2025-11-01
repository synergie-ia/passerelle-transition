// Liste des 14 intérêts
const INTERETS = [
  "Bouger, être actif physiquement",
  "Travailler avec tes mains",
  "Enquêter, observer, comprendre",
  "Explorer les sciences ou les technologies",
  "Utiliser des chiffres, calculer, raisonner logiquement",
  "Créer artistiquement, imaginer",
  "Concevoir, résoudre des problèmes, innover",
  "Aider, accompagner, prendre soin",
  "Enseigner, transmettre, expliquer",
  "Communiquer, écrire, t'exprimer",
  "Convaincre, vendre, négocier",
  "Organiser, décider, diriger",
  "Travailler en autonomie",
  "Suivre un cadre structuré"
];

// Liste des univers
const UNIVERS = [
  "🌾 Agriculture, Nature & Animaux",
  "🎨 Arts, Design & Création",
  "🛒 Commerce, Marketing & Vente",
  "🎙️ Communication, Médias & Culture",
  "🏗️ Construction, BTP & Habitat",
  "⚖️ Droit, Administration & Politique",
  "🎓 Éducation, Formation & Apprentissage",
  "🌍 Environnement, Climat & Énergies",
  "💶 Gestion, Finance & Comptabilité",
  "🍽️ Hôtellerie, Restauration & Tourisme",
  "🏠 Immobilier & Patrimoine",
  "⚙️ Industrie, Fabrication & Production",
  "🚚 Logistique, Transport & Mobilité",
  "💼 Management, Entrepreneuriat & Stratégie",
  "💻 Numérique, Informatique & Data",
  "⚕️ Santé, Bien-être & Médical",
  "🔬 Sciences, Recherche & Innovation",
  "🛡️ Sécurité, Défense & Urgence",
  "❤️ Social, Aide & Solidarité",
  "🏋️ Sport, Loisirs & Vie Active",
  "🚀 Technologies Émergentes & Futur du Travail"
];

// Matrice univers × intérêts (10 = structurant, 6 = important, 4 = secondaire, 1 = faible)
const MATRICE_UNIVERS = {
  "🌾 Agriculture, Nature & Animaux":      [10,10,6,4,2,4,6,6,3,2,1,2,8,2],
  "🎨 Arts, Design & Création":            [2,8,4,3,2,10,8,3,4,6,3,3,6,2],
  "🛒 Commerce, Marketing & Vente":        [2,3,3,2,4,4,5,2,5,7,10,8,6,3],
  "🎙️ Communication, Médias & Culture":   [2,2,4,3,3,6,5,3,6,10,8,5,5,3],
  "🏗️ Construction, BTP & Habitat":       [8,9,6,6,5,3,6,3,3,3,2,5,6,4],
  "⚖️ Droit, Administration & Politique": [2,2,6,6,8,3,6,4,5,6,6,10,6,8],
  "🎓 Éducation, Formation & Apprentissage":[2,3,4,5,5,3,5,7,10,6,4,5,6,4],
  "🌍 Environnement, Climat & Énergies":   [5,6,8,8,7,4,7,6,5,5,4,6,7,3],
  "💶 Gestion, Finance & Comptabilité":    [2,2,4,7,10,2,6,3,3,4,5,8,8,7],
  "🍽️ Hôtellerie, Restauration & Tourisme":[8,7,4,4,3,5,5,6,5,7,8,5,5,3],
  "🏠 Immobilier & Patrimoine":            [5,6,4,4,6,3,5,3,3,5,8,8,6,5],
  "⚙️ Industrie, Fabrication & Production":[6,8,6,8,8,4,8,3,3,4,3,6,6,4],
  "🚚 Logistique, Transport & Mobilité":   [9,8,5,6,5,3,5,3,3,3,3,6,7,4],
  "💼 Management, Entrepreneuriat & Stratégie":[3,4,4,6,7,5,8,4,6,6,8,10,9,4],
  "💻 Numérique, Informatique & Data":     [1,2,6,10,8,6,10,2,2,5,4,5,8,4],
  "⚕️ Santé, Bien-être & Médical":         [3,4,6,6,5,3,5,10,7,5,3,5,6,4],
  "🔬 Sciences, Recherche & Innovation":   [2,3,10,10,8,4,9,4,6,4,3,4,7,3],
  "🛡️ Sécurité, Défense & Urgence":       [8,7,6,6,6,2,5,6,3,4,4,8,8,6],
  "❤️ Social, Aide & Solidarité":         [3,3,5,4,3,3,4,10,8,5,3,5,6,3],
  "🏋️ Sport, Loisirs & Vie Active":       [10,8,4,4,3,3,4,5,4,6,5,4,8,3],
  "🚀 Technologies Émergentes & Futur du Travail":[2,3,8,10,8,5,9,3,4,5,5,7,7,4]
};
