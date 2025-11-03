// ======================================================
// 🌍 IA360 — Données des univers et sous-univers (version test)
// ======================================================

window.subUniverseDefinitions = {
  // === AGRICULTURE, NATURE & ANIMAUX ===
  "Cultures et productions végétales": "Culture de céréales, fruits, légumes ou autres productions agricoles.",
  "Élevage et soins animaliers": "Gestion, reproduction et soins des animaux d’élevage.",
  "Gestion et aménagement rural": "Organisation et valorisation durable des territoires ruraux.",
  "Recherche et environnement agricole": "Innovation et étude scientifique dans le domaine agricole.",
  "Agroalimentaire et transformation": "Transformation industrielle ou artisanale des produits agricoles.",
  // === ARTS, DESIGN & CRÉATION ===
  "Arts visuels et plastiques": "Création artistique sur support visuel (peinture, dessin, sculpture).",
  "Design et conception": "Création de produits, objets ou expériences visuelles et fonctionnelles.",
  "Métiers d’art et artisanat": "Travaux manuels alliant savoir-faire traditionnel et créativité.",
  "Spectacle vivant et audiovisuel": "Production, interprétation ou technique dans les arts de la scène et les médias.",
  "Patrimoine et restauration": "Préservation, rénovation et mise en valeur du patrimoine artistique et culturel.",
  // === COMMERCE, MARKETING & VENTE ===
  "Vente et relation client": "Accueil, conseil et fidélisation de clients particuliers ou professionnels.",
  "Marketing et communication": "Étude, stratégie et promotion de produits ou services.",
  "Management commercial": "Encadrement d’équipes et pilotage des ventes.",
  "E-commerce et digital": "Vente et marketing en ligne, gestion de plateformes et boutiques numériques.",
  "Achats et approvisionnement": "Sélection et négociation avec les fournisseurs.",
  // === COMMUNICATION, MÉDIAS & CULTURE ===
  "Journalisme et information": "Collecte, vérification et diffusion d’informations.",
  "Communication et marque": "Création et gestion d’identité de marque et de messages institutionnels.",
  "Culture et médiation": "Promotion, diffusion et valorisation d’œuvres ou de pratiques culturelles.",
  "Création numérique et multimédia": "Conception de contenus interactifs, visuels ou sonores.",
  "Événementiel et production média": "Organisation et gestion d’événements culturels ou médiatiques.",
  // === CONSTRUCTION, BTP & HABITAT ===
  "Travaux et chantier": "Réalisation concrète de constructions ou rénovations sur le terrain.",
  "Études et conception": "Analyse et préparation technique des projets de construction.",
  "Maintenance et sécurité": "Entretien des bâtiments et prévention des risques techniques.",
  "Management et maîtrise d’œuvre": "Supervision et coordination des travaux du bâtiment.",
  "Éco-construction et habitat durable": "Intégration de matériaux écologiques et d’efficacité énergétique."
};

// ======================================================
// === UNIVERS ===
// ======================================================

window.universesData = [
  {
    id: 1,
    icon: "🌾",
    name: "Agriculture, nature & animaux",
    description: "Cultivez, élevez, protégez la nature et travaillez avec les animaux.",
    subUniverses: [
      { emoji: "🌱", name: "Cultures et productions végétales" },
      { emoji: "🐄", name: "Élevage et soins animaliers" },
      { emoji: "🌍", name: "Gestion et aménagement rural" },
      { emoji: "🔬", name: "Recherche et environnement agricole" },
      { emoji: "🏭", name: "Agroalimentaire et transformation" }
    ]
  },
  {
    id: 2,
    icon: "🎨",
    name: "Arts, design & création",
    description: "Créez, dessinez et exprimez votre créativité artistique.",
    subUniverses: [
      { emoji: "🖼️", name: "Arts visuels et plastiques" },
      { emoji: "💡", name: "Design et conception" },
      { emoji: "🏺", name: "Métiers d’art et artisanat" },
      { emoji: "🎬", name: "Spectacle vivant et audiovisuel" },
      { emoji: "🏛️", name: "Patrimoine et restauration" }
    ]
  },
  {
    id: 3,
    icon: "🛒",
    name: "Commerce, marketing & vente",
    description: "Vendez, négociez et développez des stratégies commerciales.",
    subUniverses: [
      { emoji: "🤝", name: "Vente et relation client" },
      { emoji: "📈", name: "Marketing et communication" },
      { emoji: "💼", name: "Management commercial" },
      { emoji: "💻", name: "E-commerce et digital" },
      { emoji: "📦", name: "Achats et approvisionnement" }
    ]
  },
  {
    id: 4,
    icon: "🎙️",
    name: "Communication, médias & culture",
    description: "Informez, divertissez, communiquez à travers les médias.",
    subUniverses: [
      { emoji: "📰", name: "Journalisme et information" },
      { emoji: "📢", name: "Communication et marque" },
      { emoji: "🏛️", name: "Culture et médiation" },
      { emoji: "💻", name: "Création numérique et multimédia" },
      { emoji: "🎪", name: "Événementiel et production média" }
    ]
  },
  {
    id: 5,
    icon: "🏗️",
    name: "Construction, BTP & habitat",
    description: "Construisez, rénovez et concevez des espaces de vie et de travail.",
    subUniverses: [
      { emoji: "🔨", name: "Travaux et chantier" },
      { emoji: "📐", name: "Études et conception" },
      { emoji: "🧰", name: "Maintenance et sécurité" },
      { emoji: "🏢", name: "Management et maîtrise d’œuvre" },
      { emoji: "🏡", name: "Éco-construction et habitat durable" }
    ]
  }
];
