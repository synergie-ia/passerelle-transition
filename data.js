// Les 12 intérêts avec leurs descriptions
const interests = [
    {
        id: 1, 
        icon: '🏃', 
        title: 'Activités physiques & nature', 
        verbs: 'Bouger, respirer, explorer, agir', 
        description: "Je me vois plutôt dans un métier où je pourrai être en mouvement, vivre dehors et sentir l'énergie du corps."
    },
    {
        id: 2, 
        icon: '🔧', 
        title: 'Manuel & technique', 
        verbs: 'Fabriquer, réparer, construire, ajuster', 
        description: "Je me vois plutôt dans un métier où je pourrai créer ou réparer avec mes mains et voir le résultat concret de mon travail."
    },
    {
        id: 3, 
        icon: '🔍', 
        title: 'Investigation & information', 
        verbs: 'Observer, comprendre, apprendre', 
        description: "Je me vois plutôt dans un métier où je pourrai chercher à comprendre comment les choses fonctionnent et approfondir mes connaissances."
    },
    {
        id: 4, 
        icon: '🧪', 
        title: 'Sciences & technologies', 
        verbs: 'Tester, modéliser, programmer, innover', 
        description: "Je me vois plutôt dans un métier où je pourrai expérimenter, utiliser des technologies et résoudre des problèmes complexes."
    },
    {
        id: 5, 
        icon: '🎨', 
        title: 'Arts & expression', 
        verbs: 'Imaginer, exprimer, créer, interpréter', 
        description: "Je me vois plutôt dans un métier où je pourrai créer des œuvres originales et m'exprimer à travers l'art et la créativité."
    },
    {
        id: 6, 
        icon: '💡', 
        title: 'Idées & conception', 
        verbs: 'Concevoir, structurer, inventer, organiser', 
        description: "Je me vois plutôt dans un métier où je pourrai imaginer de nouveaux concepts et organiser des idées de manière innovante."
    },
    {
        id: 7, 
        icon: '🤝', 
        title: 'Aide & accompagnement', 
        verbs: 'Soutenir, écouter, former, accompagner', 
        description: "Je me vois plutôt dans un métier où je pourrai aider les autres à progresser et les accompagner dans leurs difficultés."
    },
    {
        id: 8, 
        icon: '👥', 
        title: 'Relations & sociabilité', 
        verbs: 'Communiquer, relier, partager, coopérer', 
        description: "Je me vois plutôt dans un métier où je pourrai échanger avec les autres, créer du lien et travailler en équipe."
    },
    {
        id: 9, 
        icon: '⚡', 
        title: 'Action & initiative', 
        verbs: 'Agir, entreprendre, dynamiser, décider', 
        description: "Je me vois plutôt dans un métier où je pourrai prendre des initiatives, lancer des projets et passer à l'action rapidement."
    },
    {
        id: 10, 
        icon: '👔', 
        title: 'Leadership & stratégie', 
        verbs: 'Motiver, diriger, influencer, décider', 
        description: "Je me vois plutôt dans un métier où je pourrai guider les autres, prendre des décisions importantes et définir une vision."
    },
    {
        id: 11, 
        icon: '📊', 
        title: 'Données & chiffres', 
        verbs: 'Calculer, comparer, interpréter, vérifier', 
        description: "Je me vois plutôt dans un métier où je pourrai travailler avec des données chiffrées et analyser des informations précises."
    },
    {
        id: 12, 
        icon: '📋', 
        title: 'Règles & méthodes', 
        verbs: 'Contrôler, sécuriser, appliquer, structurer', 
        description: "Je me vois plutôt dans un métier où je pourrai suivre des procédures rigoureuses et m'assurer que tout est en ordre."
    }
];

// Les 21 univers professionnels avec leurs poids (matrice corrigée)
// Chaque tableau de poids correspond aux 12 intérêts dans l'ordre
const universes = [
    {
        name: '🌾 Agriculture, nature & animaux', 
        weights: [3, 3, 1, 1, 0, 0, 1, 0, 2, 0, 0, 1]
    },
    {
        name: '🎨 Arts, design & création', 
        weights: [0, 1, 1, 0, 3, 3, 0, 1, 0, 0, 0, 0]
    },
    {
        name: '🛒 Commerce, marketing & vente', 
        weights: [0, 0, 0, 0, 1, 1, 1, 3, 2, 3, 1, 0]
    },
    {
        name: '🎙️ Communication, médias & culture', 
        weights: [0, 0, 1, 0, 3, 3, 1, 3, 1, 2, 0, 0]
    },
    {
        name: '🏗️ Construction, BTP & habitat', 
        weights: [2, 3, 0, 1, 0, 1, 0, 0, 2, 0, 1, 3]
    },
    {
        name: '⚖️ Droit, administration & politique publique', 
        weights: [0, 0, 2, 1, 0, 2, 1, 1, 1, 2, 3, 3]
    },
    {
        name: '🎓 Éducation, formation & apprentissage', 
        weights: [0, 0, 3, 1, 1, 1, 2, 3, 0, 0, 0, 0]
    },
    {
        name: '🌍 Environnement, climat & énergies', 
        weights: [3, 2, 1, 2, 0, 1, 1, 0, 1, 0, 0, 0]
    },
    {
        name: '💶 Gestion, finance & comptabilité', 
        weights: [0, 1, 1, 1, 0, 1, 0, 0, 1, 2, 3, 3]
    },
    {
        name: '🍽️ Hôtellerie, restauration & tourisme', 
        weights: [2, 0, 0, 0, 0, 1, 2, 3, 2, 1, 0, 0]
    },
    {
        name: '⚙️ Industrie, fabrication & production', 
        weights: [1, 3, 1, 3, 0, 1, 0, 0, 1, 1, 1, 2]
    },
    {
        name: '🚚 Logistique, transport & mobilité', 
        weights: [3, 3, 0, 1, 0, 1, 0, 0, 2, 1, 1, 2]
    },
    {
        name: '💼 Management, entrepreneuriat & stratégie', 
        weights: [0, 0, 1, 1, 0, 1, 0, 2, 3, 3, 2, 1]
    },
    {
        name: '💻 Numérique, informatique & data', 
        weights: [0, 1, 1, 3, 0, 2, 0, 0, 1, 2, 3, 1]
    },
    {
        name: '⚕️ Santé, bien-être & médical', 
        weights: [1, 1, 3, 1, 0, 0, 3, 2, 0, 0, 1, 0]
    },
    {
        name: '🔬 Sciences, recherche & innovation', 
        weights: [0, 0, 3, 3, 1, 3, 0, 0, 0, 0, 2, 1]
    },
    {
        name: '🛡️ Sécurité, défense & urgence', 
        weights: [3, 2, 1, 1, 0, 1, 0, 0, 3, 2, 0, 2]
    },
    {
        name: '❤️ Social, aide & solidarité', 
        weights: [0, 0, 1, 0, 0, 0, 3, 3, 1, 0, 0, 0]
    },
    {
        name: '⚽ Sport, loisirs & vie active', 
        weights: [3, 1, 1, 0, 1, 0, 1, 3, 3, 1, 0, 0]
    },
    {
        name: '🚀 Technologies émergentes & futur du travail', 
        weights: [1, 1, 2, 3, 1, 2, 0, 0, 2, 2, 3, 1]
    },
    {
        name: '🏠 Immobilier & patrimoine', 
        weights: [1, 1, 1, 1, 0, 1, 0, 0, 2, 3, 2, 3]
    }
];
