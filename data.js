// Les 12 intérêts - VERSION V3
const interests = [
    {
        id: 1, 
        icon: '📋',
        title: 'Méthode & organisation', 
        description: "Structurer une activité dans le temps : planifier, ordonner les tâches, suivre des procédures, assurer une exécution cohérente et stable"
    },
    {
        id: 2,
        icon: '🔧',
        title: 'Pratique & technique', 
        description: "Utiliser ses mains, des outils ou des machines : ajuster, manipuler, assembler, entretenir, répéter des gestes maîtrisés"
    },
    {
        id: 3,
        icon: '🔍',
        title: 'Analyse & logique', 
        description: "Observer et diagnostiquer des situations : comparer, interpréter des informations, repérer des anomalies, tirer des conclusions structurées"
    },
    {
        id: 4,
        icon: '🧪',
        title: 'Sciences & innovation', 
        description: "Chercher, tester, modéliser, expérimenter : comprendre des systèmes complexes et concevoir des solutions nouvelles ou améliorées"
    },
    {
        id: 5,
        icon: '💡',
        title: 'Conception & structuration d\'idées', 
        description: "Imaginer, organiser ou architecturer une idée, un projet ou une forme avant réalisation : vision, cadrage, structuration"
    },
    {
        id: 6,
        icon: '🎨',
        title: 'Expression & création', 
        description: "Produire une forme personnelle (visuelle, sonore, corporelle ou narrative) exprimant une intention, une sensibilité ou une identité"
    },
    {
        id: 7,
        icon: '🏃',
        title: 'Mouvement & plein air', 
        description: "Travailler en mouvement, debout, en déplacement ou en extérieur, avec une implication corporelle visible"
    },
    {
        id: 8,
        icon: '🎯',
        title: 'Coordination & pilotage', 
        description: "Organiser l'action collective : répartir les rôles, superviser, synchroniser les étapes, assurer le lien entre acteurs"
    },
    {
        id: 9,
        icon: '🚀',
        title: 'Initiative & projet', 
        description: "Proposer, lancer ou transformer une idée, un service ou une organisation ; être moteur dans le changement"
    },
    {
        id: 10,
        icon: '🤝',
        title: 'Attention & transmission', 
        description: "Accompagner, former, prendre soin ou transmettre : attention aux besoins d'autrui, pédagogie, écoute active"
    },
    {
        id: 11,
        icon: '👥',
        title: 'Travail de proximité', 
        description: "Être en contact direct, physique ou relationnel rapproché avec des personnes ou des groupes dans une dimension de service ou d'accompagnement"
    },
    {
        id: 12,
        icon: '💬',
        title: 'Relationnel & influence', 
        description: "Convaincre, négocier, créer du lien, influencer des décisions ou des comportements par la communication et l'interaction sociale"
    }
];

// Les 21 univers professionnels avec la MATRICE V3
// Ordre des poids: [MO, PT, AL, SI, CS, EC, MP, CP, IP, AT, TP, RI]
// Coefficients: 6 (Essentiel) / 3 (Important) / 1 (Utile) / 0 (Non déterminant)
const universes = [
    {
        id: 1,
        icon: '🌾',
        name: 'Agriculture, Nature & Animaux', 
        weights: [0, 6, 3, 0, 0, 0, 6, 0, 0, 0, 1, 0]
    },
    {
        id: 2,
        icon: '🎨',
        name: 'Arts, Design & Création', 
        weights: [0, 3, 0, 0, 6, 6, 0, 0, 0, 0, 0, 1]
    },
    {
        id: 3,
        icon: '🛒',
        name: 'Commerce, Marketing & Vente', 
        weights: [0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 6, 6]
    },
    {
        id: 4,
        icon: '📺',
        name: 'Communication, Médias & Culture', 
        weights: [0, 0, 0, 0, 3, 6, 0, 0, 0, 0, 1, 6]
    },
    {
        id: 5,
        icon: '🏗️',
        name: 'Construction, BTP & Habitat', 
        weights: [1, 6, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0]
    },
    {
        id: 6,
        icon: '⚖️',
        name: 'Droit, Administration & Politique Publique', 
        weights: [6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 3, 1]
    },
    {
        id: 7,
        icon: '📚',
        name: 'Éducation, Formation & Apprentissage', 
        weights: [0, 0, 0, 0, 1, 6, 0, 0, 0, 0, 6, 3]
    },
    {
        id: 8,
        icon: '🌍',
        name: 'Environnement, Climat & Énergies', 
        weights: [0, 0, 6, 6, 1, 0, 3, 0, 0, 0, 0, 0]
    },
    {
        id: 9,
        icon: '💼',
        name: 'Gestion, Finance & Comptabilité', 
        weights: [6, 0, 6, 0, 0, 0, 0, 3, 0, 0, 0, 1]
    },
    {
        id: 10,
        icon: '🏨',
        name: 'Hôtellerie, Restauration & Tourisme', 
        weights: [0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 6, 6]
    },
    {
        id: 11,
        icon: '🏠',
        name: 'Immobilier & Patrimoine', 
        weights: [1, 0, 3, 0, 0, 0, 0, 6, 0, 0, 0, 6]
    },
    {
        id: 12,
        icon: '🏭',
        name: 'Industrie, Fabrication & Production', 
        weights: [6, 6, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0]
    },
    {
        id: 13,
        icon: '🚚',
        name: 'Logistique, Transport & Mobilité', 
        weights: [6, 3, 0, 0, 0, 0, 0, 6, 0, 1, 0, 0]
    },
    {
        id: 14,
        icon: '📈',
        name: 'Management, Entrepreneuriat & Stratégie', 
        weights: [0, 0, 3, 0, 0, 0, 0, 6, 6, 0, 0, 1]
    },
    {
        id: 15,
        icon: '💻',
        name: 'Numérique, Informatique & Data', 
        weights: [0, 1, 6, 3, 6, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 16,
        icon: '🏥',
        name: 'Santé, Bien-être & Médical', 
        weights: [0, 0, 3, 0, 0, 0, 0, 0, 0, 6, 6, 1]
    },
    {
        id: 17,
        icon: '🔬',
        name: 'Sciences, Recherche & Innovation', 
        weights: [1, 0, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        id: 18,
        icon: '🚨',
        name: 'Sécurité, Défense & Urgence', 
        weights: [1, 0, 0, 0, 0, 0, 6, 3, 0, 6, 0, 0]
    },
    {
        id: 19,
        icon: '❤️',
        name: 'Social, Aide & Solidarité', 
        weights: [0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 6, 6]
    },
    {
        id: 20,
        icon: '⚽',
        name: 'Sport, Loisirs & Vie Active', 
        weights: [0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 6, 1]
    },
    {
        id: 21,
        icon: '🚀',
        name: 'Technologies émergentes & Futur du travail', 
        weights: [0, 0, 1, 6, 6, 0, 0, 0, 3, 0, 0, 0]
    }
];
