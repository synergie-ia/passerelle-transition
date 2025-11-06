// Les 12 intérêts dans l'ordre de la matrice Excel
const interests = [
    {
        id: 1, 
        icon: '🏃',
        title: 'Activités physiques & nature', 
        description: "Bouger, faire des activités en extérieur, être actif physiquement et explorer la nature"
    },
    {
        id: 2,
        icon: '🔧',
        title: 'Manuel & technique', 
        description: "Fabriquer ou réparer des objets avec vos mains, utiliser des outils et réaliser des tâches concrètes"
    },
    {
        id: 3,
        icon: '🔍',
        title: 'Investigation & information', 
        description: "Chercher des informations, enquêter, faire des recherches et approfondir vos connaissances"
    },
    {
        id: 4,
        icon: '🧪',
        title: 'Sciences & technologies', 
        description: "Faire des expériences, tester de nouvelles technologies, comprendre comment les choses fonctionnent"
    },
    {
        id: 5,
        icon: '🎨',
        title: 'Arts & expression', 
        description: "Créer des choses artistiques, exprimer votre créativité, jouer avec les formes et les couleurs"
    },
    {
        id: 6,
        icon: '💡',
        title: 'Idées & conception', 
        description: "Imaginer de nouvelles idées, concevoir des solutions innovantes, structurer des projets et inventer"
    },
    {
        id: 7,
        icon: '🤝',
        title: 'Aide & accompagnement', 
        description: "Aider les autres, les accompagner dans leurs progrès, les écouter et les soutenir"
    },
    {
        id: 8,
        icon: '👥',
        title: 'Relations & sociabilité', 
        description: "Échanger avec les autres, travailler en équipe, communiquer et créer des liens"
    },
    {
        id: 9,
        icon: '👑',
        title: 'Leadership & stratégie', 
        description: "Diriger une équipe, prendre des décisions stratégiques, avoir une vision d'ensemble et motiver les autres"
    },
    {
        id: 10,
        icon: '⚡',
        title: 'Action & initiative', 
        description: "Prendre des initiatives, lancer de nouveaux projets, saisir les opportunités et relever des défis"
    },
    {
        id: 11,
        icon: '📋',
        title: 'Règles & méthodes', 
        description: "Suivre des procédures précises, appliquer des règles strictes, vérifier la conformité et organiser méthodiquement"
    },
    {
        id: 12,
        icon: '📊',
        title: 'Données & chiffres', 
        description: "Travailler avec des chiffres, analyser des données, créer des tableaux et interpréter des statistiques"
    }
];

// Les 21 univers professionnels avec la MATRICE OPTIMISÉE (depuis Excel)
// Ordre des poids: [Activités physiques, Manuel, Investigation, Sciences, Arts, Idées, Aide, Relations, Leadership, Action, Règles, Données]
const universes = [
    {
        id: 1,
        icon: '🌾',
        name: 'Agriculture, Nature & Animaux', 
        weights: [3, 3, 2, 2, 0, 1, 1, 1, 1, 2, 1, 1]
    },
    {
        id: 2,
        icon: '🎨',
        name: 'Arts, Design & Création', 
        weights: [0, 2, 1, 0, 3, 3, 0, 1, 1, 1, 0, 0]
    },
    {
        id: 3,
        icon: '🛒',
        name: 'Commerce, Marketing & Vente', 
        weights: [0, 0, 2, 0, 0, 2, 1, 3, 2, 3, 1, 3]
    },
    {
        id: 4,
        icon: '📺',
        name: 'Communication, Médias & Culture', 
        weights: [0, 0, 2, 0, 3, 3, 1, 3, 1, 2, 1, 1]
    },
    {
        id: 5,
        icon: '🏗️',
        name: 'Construction, BTP & Habitat', 
        weights: [2, 3, 1, 2, 0, 2, 0, 1, 1, 1, 3, 1]
    },
    {
        id: 6,
        icon: '⚖️',
        name: 'Droit, Administration & Politique', 
        weights: [0, 0, 3, 0, 0, 2, 1, 2, 2, 1, 3, 2]
    },
    {
        id: 7,
        icon: '📚',
        name: 'Éducation, Formation & Apprentissage', 
        weights: [0, 0, 2, 0, 1, 3, 3, 3, 2, 1, 1, 1]
    },
    {
        id: 8,
        icon: '🌍',
        name: 'Environnement, Climat & Énergies', 
        weights: [3, 2, 3, 3, 0, 2, 1, 1, 1, 1, 1, 2]
    },
    {
        id: 9,
        icon: '💼',
        name: 'Gestion, Finance & Comptabilité', 
        weights: [0, 0, 2, 1, 0, 2, 1, 1, 2, 1, 3, 3]
    },
    {
        id: 10,
        icon: '🏨',
        name: 'Hôtellerie, Restauration & Tourisme', 
        weights: [1, 2, 1, 0, 1, 1, 2, 3, 1, 2, 2, 1]
    },
    {
        id: 11,
        icon: '🏠',
        name: 'Immobilier & Patrimoine', 
        weights: [0, 1, 2, 1, 0, 1, 1, 3, 2, 3, 2, 3]
    },
    {
        id: 12,
        icon: '🏭',
        name: 'Industrie, Fabrication & Production', 
        weights: [1, 3, 2, 3, 0, 1, 0, 0, 1, 1, 3, 2]
    },
    {
        id: 13,
        icon: '🚚',
        name: 'Logistique, Transport & Mobilité', 
        weights: [2, 2, 1, 1, 0, 1, 0, 1, 1, 3, 3, 2]
    },
    {
        id: 14,
        icon: '📈',
        name: 'Management, Entrepreneuriat & Stratégie', 
        weights: [0, 0, 2, 1, 0, 3, 1, 3, 3, 3, 1, 2]
    },
    {
        id: 15,
        icon: '💻',
        name: 'Numérique, Informatique & Data', 
        weights: [0, 0, 3, 3, 0, 3, 0, 0, 1, 1, 1, 3]
    },
    {
        id: 16,
        icon: '🏥',
        name: 'Santé, Bien-être & Médical', 
        weights: [0, 1, 2, 3, 0, 1, 3, 2, 1, 1, 3, 1]
    },
    {
        id: 17,
        icon: '🔬',
        name: 'Sciences, Recherche & Innovation', 
        weights: [0, 0, 3, 3, 0, 3, 0, 0, 1, 1, 2, 2]
    },
    {
        id: 18,
        icon: '🚨',
        name: 'Sécurité, Défense & Urgence', 
        weights: [2, 1, 2, 1, 0, 1, 1, 1, 2, 3, 3, 1]
    },
    {
        id: 19,
        icon: '❤️',
        name: 'Social, Aide & Solidarité', 
        weights: [0, 0, 1, 0, 0, 1, 3, 3, 1, 1, 2, 0]
    },
    {
        id: 20,
        icon: '⚽',
        name: 'Sport, Loisirs & Vie active', 
        weights: [3, 1, 1, 0, 1, 1, 3, 3, 1, 2, 1, 0]
    },
    {
        id: 21,
        icon: '🚀',
        name: 'Technologies émergentes & Futur du travail', 
        weights: [0, 0, 3, 3, 0, 3, 0, 1, 3, 3, 1, 3]
    }
];
