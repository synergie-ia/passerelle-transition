// ============================================
// RECONVERSION 360 IA - DONNÉES COMPLÈTES
// ============================================

// ===== DIMENSIONS =====
const DIMENSIONS = [
  { code: "MO", name: "Méthode & organisation" },
  { code: "PT", name: "Pratique & technique" },
  { code: "AL", name: "Analyse & logique" },
  { code: "SI", name: "Sciences & innovation" },
  { code: "CS", name: "Conception & structuration d'idées" },
  { code: "EC", name: "Expression & création" },
  { code: "CP", name: "Coordination & pilotage" },
  { code: "IP", name: "Initiative & projet" },
  { code: "MP", name: "Mouvement & plein air" },
  { code: "AE", name: "Action & efficacité terrain" },
  { code: "AA", name: "Aide & Accompagnement" },
  { code: "RI", name: "Relation & influence" }
];

// ===== QUESTIONS DU QUESTIONNAIRE =====
const QUESTIONS = [
  {
    id: "q1",
    title: "SITUATION 1 — Découvrir un nouveau sujet",
    options: [
      { text: "J’ai besoin de mettre de l’ordre dans les informations (étapes, catégories, priorités) pour commencer à être à l’aise.", dim: "MO" },
      { text: "J’ai envie de manipuler concrètement quelque chose en lien avec le sujet (objet, outil, support, dispositif) pour mieux le comprendre.", dim: "PT" },
      { text: "Je cherche spontanément à observer, comparer et analyser pour comprendre les causes et les conséquences.", dim: "AL" },
      { text: "Ce qui m’attire le plus, c’est d’explorer des idées, des hypothèses ou des découvertes liées à ce sujet.", dim: "SI" }
    ]
  },

  {
    id: "q2",
    title: "SITUATION 2 — Contribuer à un projet",
    options: [
      { text: "J’aime concevoir la structure globale du projet : l’architecture, les grands axes, le “scénario” d’ensemble.", dim: "CS" },
      { text: "Je prends plaisir à imaginer et produire des contenus créatifs (idées visuelles, textes, ambiances, mises en forme).", dim: "EC" },
      { text: "Je suis naturellement porté(e) vers le fait de superviser, planifier et gérer les priorités pour que le projet avance.", dim: "CP" },
      { text: "Je me reconnais dans le fait de lancer, entreprendre, oser : proposer de nouveaux projets, prendre l’initiative, démarrer quelque chose.", dim: "IP" }
    ]
  },

  {
    id: "q3",
    title: "SITUATION 3 — Agir avec et pour les autres",
    options: [
      { text: "J’aime quand une activité me permet de bouger, me déplacer, être physiquement actif(ve) plutôt que de rester toujours au même endroit.", dim: "MP" },
      { text: "Je suis à l’aise quand il faut intervenir vite, passer à l’action et être efficace sur le terrain.", dim: "AE" },
      { text: "Je me retrouve bien dans le fait de soutenir, écouter, former ou prendre soin des autres.", dim: "AA" },
      { text: "Je me sens dans mon élément lorsque je peux convaincre, négocier, influencer ou représenter un groupe, une idée, une position.", dim: "RI" }
    ]
  },

  {
    id: "q4",
    title: "SITUATION 4 — Porter une responsabilité ou un dossier",
    options: [
      { text: "Je veille naturellement à structurer le travail : procédures, méthodes, outils d’organisation, suivi rigoureux.", dim: "MO" },
      { text: "Je me vois bien dans un rôle où je supervise, coordonne et ajuste le travail des autres au fil du temps.", dim: "CP" },
      { text: "Ce qui me correspond, c’est de prendre des initiatives, proposer des projets, ouvrir des pistes nouvelles plutôt que d’attendre qu’on me dise quoi faire.", dim: "IP" },
      { text: "J’accorde une place importante au fait de accompagner les personnes, les soutenir, les rassurer, les aider à progresser.", dim: "AA" }
    ]
  },

  {
    id: "q5",
    title: "SITUATION 5 — Résoudre un problème concret",
    options: [
      { text: "J’aime être en lien avec la dimension pratique ou technique : manipuler, ajuster, bricoler, faire fonctionner un dispositif ou un outil.", dim: "PT" },
      { text: "Mon premier réflexe est souvent d’analyser calmement la situation : observer, poser un “diagnostic”, comprendre ce qui cloche.", dim: "AL" },
      { text: "Je prends plaisir à formuler des hypothèses, à tester des pistes, à chercher des explications “scientifiques” ou rationnelles.", dim: "SI" },
      { text: "Ce qui m’attire, c’est de passer rapidement à l’action pour tester une solution concrète et voir si elle fonctionne.", dim: "AE" }
    ]
  },

  {
    id: "q6",
    title: "SITUATION 6 — Activités qui vous nourrissent vraiment",
    options: [
      { text: "Je suis stimulé(e) par le fait de concevoir des idées structurées, des concepts, des scénarios, des plans d’ensemble.", dim: "CS" },
      { text: "Je ressens un vrai plaisir à créer : écrire, dessiner, imaginer des univers, produire des choses expressives ou artistiques.", dim: "EC" },
      { text: "J’aime que mon activité me permette d’être en mouvement, de changer de lieu, d’avoir une part physique ou “plein air”.", dim: "MP" },
      { text: "Je me sens vivant(e) quand je peux parler, argumenter, influencer, créer un lien fort par la parole ou la présence.", dim: "RI" }
    ]
  },

  {
    id: "q7",
    title: "SITUATION 7 — Une journée de travail variée",
    options: [
      { text: "J’apprécie les moments où je peux organiser : préparer un planning, structurer des dossiers, clarifier les priorités.", dim: "MO" },
      { text: "J’aime aussi les moments où je peux faire quelque chose de concret avec mes mains : assembler, installer, ajuster, manipuler des outils ou du matériel.", dim: "PT" },
      { text: "Je suis à l’aise dès que mon activité me permet de bouger, d’alterner les lieux ou les postures, de ne pas rester figé.", dim: "MP" },
      { text: "Je me retrouve bien dans des tâches où il faut agir efficacement, aller au résultat, être utile de façon très pratique.", dim: "AE" }
    ]
  },

  {
    id: "q8",
    title: "SITUATION 8 — Réfléchir à une décision importante",
    options: [
      { text: "Je prends le temps d’observer la situation sous plusieurs angles, d’identifier les signaux faibles, les risques, les effets possibles.", dim: "AL" },
      { text: "Je cherche à m’appuyer sur des principes généraux, des connaissances, des explications solides pour orienter mon choix.", dim: "SI" },
      { text: "Je pense naturellement à la répartition des rôles, au calendrier, aux priorités, comme si j’organisais un petit système.", dim: "CP" },
      { text: "Je tiens compte de la façon dont je pourrai expliquer, défendre et faire accepter cette décision aux autres.", dim: "RI" }
    ]
  },

  {
    id: "q9",
    title: "SITUATION 9 — Imaginer un projet qui a du sens pour vous",
    options: [
      { text: "J’aimerais pouvoir concevoir la logique d’ensemble d’un projet : son concept, son architecture, la façon dont tout s’articule.", dim: "CS" },
      { text: "J’aimerais aussi que ce projet laisse de la place à l’expression, la créativité, la production de contenus originaux.", dim: "EC" },
      { text: "Il serait important pour moi que ce projet me permette d’accompagner, former, soutenir ou prendre soin d’autres personnes.", dim: "AA" },
      { text: "Je me vois bien dans un projet que je pourrais lancer moi-même, faire évoluer, développer avec une part de prise de risque ou d’innovation.", dim: "IP" }
    ]
  }
];

// ===== MATRICES DE CORRÉLATION =====
// Ordre : MO, PT, AL, SI, CS, EC, CP, IP, MP, AE, AA, RI
const universes = [
  { id: 1, weights: [4, 10, 4, 5, 3, 2, 4, 4, 9, 8, 3, 2] },
  { id: 2, weights: [3, 3, 2, 2, 10, 10, 4, 9, 2, 2, 3, 5] },
  { id: 3, weights: [4, 1, 3, 2, 6, 4, 6, 9, 3, 5, 4, 10] },
  { id: 4, weights: [4, 2, 4, 3, 9, 9, 5, 9, 1, 3, 3, 8] },
  { id: 5, weights: [5, 10, 4, 5, 4, 1, 4, 3, 8, 9, 1, 2] },
  { id: 6, weights: [9, 0, 10, 2, 8, 1, 5, 4, 0, 2, 3, 6] },
  { id: 7, weights: [5, 2, 4, 2, 4, 3, 8, 5, 2, 3, 10, 8] },
  { id: 8, weights: [5, 6, 8, 10, 7, 2, 5, 9, 4, 5, 3, 4] },
  { id: 9, weights: [10, 0, 10, 2, 4, 0, 6, 3, 0, 1, 1, 3] },
  { id: 10, weights: [7, 5, 3, 2, 4, 3, 7, 5, 4, 8, 8, 8] },
  { id: 11, weights: [7, 5, 5, 3, 6, 2, 6, 8, 2, 4, 3, 9] },
  { id: 12, weights: [7, 10, 7, 8, 5, 0, 6, 4, 1, 5, 1, 2] },
  { id: 13, weights: [9, 6, 5, 3, 3, 0, 8, 4, 6, 9, 2, 3] },
  { id: 14, weights: [6, 1, 6, 4, 9, 2, 10, 10, 1, 3, 3, 9] },
  { id: 15, weights: [5, 6, 9, 10, 7, 2, 4, 7, 0, 2, 1, 3] },
  { id: 16, weights: [6, 6, 8, 9, 4, 1, 5, 4, 3, 5, 10, 4] },
  { id: 17, weights: [5, 3, 9, 10, 8, 1, 4, 8, 0, 1, 1, 3] },
  { id: 18, weights: [5, 5, 4, 2, 2, 0, 7, 4, 8, 10, 6, 5] },
  { id: 19, weights: [5, 2, 4, 2, 4, 3, 8, 5, 2, 3, 10, 8] },
  { id: 20, weights: [3, 3, 2, 2, 3, 2, 4, 4, 10, 8, 6, 6] },
  { id: 21, weights: [3, 2, 7, 10, 9, 3, 5, 10, 1, 2, 1, 5] }
];

// ===== DONNÉES DES UNIVERS =====
const universesData = [
  {
    id: 1,
    name: "Agriculture, nature & animaux",
    icon: "🌾",
    description: "Cultivez, élevez, protégez la nature et travaillez avec les animaux dans des métiers en plein air.",
    subUniverses: [
      { icon: "🏭", name: "Agroalimentaire industriel", description: "Transformation et production à grande échelle des produits agricoles." },
      { icon: "🌱", name: "Production biologique & circuits courts", description: "Cultures et élevages respectueux de l'environnement, vente locale." },
      { icon: "🔬", name: "Agronomie & recherche appliquée", description: "Études scientifiques pour améliorer les rendements et la durabilité." },
      { icon: "🌾", name: "Cultures céréalières & grandes exploitations", description: "Gestion de grandes surfaces agricoles mécanisées." },
      { icon: "🍇", name: "Viticulture & œnologie", description: "Culture de la vigne et production du vin." },
      { icon: "🥕", name: "Maraîchage & production maraîchère", description: "Culture de légumes et fruits de saison." },
      { icon: "🌺", name: "Horticulture & pépinière", description: "Production de plantes ornementales et d'arbustes." },
      { icon: "🌳", name: "Paysagisme & aménagement végétal", description: "Création et entretien d'espaces verts." },
      { icon: "🌲", name: "Forêt & sylviculture durable", description: "Gestion et exploitation raisonnée des forêts." },
      { icon: "🐄", name: "Élevage bovin / ovin / porcin / avicole", description: "Production animale pour la viande, le lait ou les œufs." },
      { icon: "🐟", name: "Aquaculture & pêche durable", description: "Élevage de poissons et gestion responsable des ressources marines." },
      { icon: "🐝", name: "Apiculture & insectes utiles", description: "Élevage d'abeilles et valorisation des insectes pollinisateurs." },
      { icon: "💧", name: "Gestion de l'eau, irrigation & bassins versants", description: "Maîtrise des ressources hydriques pour l'agriculture." },
      { icon: "🏭", name: "Valorisation & transformation des produits agricoles", description: "Fabrication de produits finis à partir des matières premières." },
      { icon: "🐕", name: "Soins & services aux animaux domestiques", description: "Cheval, chien, chat et toilettage." }
    ]
  },
  {
    id: 2,
    name: "Arts, design & création",
    icon: "🎨",
    description: "Créez, dessinez, designez et exprimez votre créativité dans l'art visuel, graphique ou appliqué.",
    subUniverses: [
      { icon: "🎨", name: "Arts visuels & peinture", description: "Création artistique sur support visuel." },
      { icon: "🗿", name: "Sculpture & installations", description: "Conception d'œuvres tridimensionnelles." },
      { icon: "💻", name: "Design graphique & communication visuelle", description: "Création d'images et supports de communication." },
      { icon: "🛋️", name: "Design produit & industriel", description: "Conception d'objets et produits manufacturés." },
      { icon: "🏠", name: "Architecture intérieure & décoration", description: "Aménagement esthétique et fonctionnel des espaces." },
      { icon: "📷", name: "Photographie & image numérique", description: "Prise de vue, retouche et diffusion d'images." },
      { icon: "🎬", name: "Cinéma, audiovisuel & animation", description: "Production de films et contenus visuels." },
      { icon: "👗", name: "Mode, stylisme & textile", description: "Conception de vêtements et accessoires." },
      { icon: "✋", name: "Artisanat d'art traditionnel", description: "Création manuelle de pièces uniques." },
      { icon: "🎭", name: "Scénographie & design d'espace", description: "Mise en scène d'expositions ou de spectacles." },
      { icon: "✏️", name: "Illustration & bande dessinée", description: "Narration visuelle et création d'univers graphiques." },
      { icon: "🏛️", name: "Patrimoine, muséographie & restauration d'art", description: "Conservation et mise en valeur d'œuvres anciennes." },
      { icon: "🎭", name: "Spectacle vivant & arts de la scène", description: "Interprétation et production théâtrale ou musicale." },
      { icon: "💎", name: "Métiers du luxe & savoir-faire d'exception", description: "Création haut de gamme mêlant tradition et innovation." },
      { icon: "🎪", name: "Régie & technique du spectacle", description: "Gestion des aspects techniques d'événements artistiques." }
    ]
  },
  {
    id: 3,
    name: "Commerce, marketing & vente",
    icon: "🛒",
    description: "Vendez, négociez, développez des stratégies commerciales et fidélisez les clients.",
    subUniverses: [
      { icon: "🏪", name: "Commerce de détail & retail", description: "Vente directe aux consommateurs." },
      { icon: "💻", name: "E-commerce & marketplaces", description: "Vente en ligne et gestion de plateformes numériques." },
      { icon: "🤝", name: "Vente B2B & négociation commerciale", description: "Relations commerciales entre entreprises." },
      { icon: "🚪", name: "Représentation & prospection", description: "Développement de clientèle sur le terrain." },
      { icon: "📦", name: "Merchandising & mise en valeur produits", description: "Optimisation de la présentation des produits." },
      { icon: "📊", name: "Marketing stratégique", description: "Étude de marché et positionnement des offres." },
      { icon: "📱", name: "Marketing digital & réseaux sociaux", description: "Promotion via les outils numériques." },
      { icon: "🎤", name: "Communication commerciale & influence", description: "Stratégies de persuasion et fidélisation." },
      { icon: "🛍️", name: "Achats & approvisionnement", description: "Sélection et négociation avec les fournisseurs." },
      { icon: "📈", name: "Gestion de rayon & management de point de vente", description: "Pilotage opérationnel des équipes et stocks." },
      { icon: "🏢", name: "Immobilier commercial", description: "Vente et location d'espaces professionnels." },
      { icon: "🏦", name: "Banque & assurance commerciale", description: "Vente de produits financiers et d'assurance." },
      { icon: "😊", name: "Service client & relation après-vente", description: "Suivi et satisfaction des clients." },
      { icon: "💎", name: "Commerce du luxe & clientèle premium", description: "Vente haut de gamme et expérience exclusive." },
      { icon: "🛒", name: "Vente en ligne & marketplaces spécialisées", description: "Plateformes ciblées sur des niches de produits." }
    ]
  },
  {
    id: 4,
    name: "Communication, médias & culture",
    icon: "📺",
    description: "Informez, divertissez, communiquez à travers les médias, la culture et l'événementiel.",
    subUniverses: [
      { icon: "📰", name: "Journalisme & presse écrite", description: "Recherche, rédaction et diffusion d'informations vérifiées." },
      { icon: "📻", name: "Audiovisuel & production radio/TV", description: "Réalisation et diffusion d'émissions ou reportages." },
      { icon: "🎉", name: "Relations publiques & événementiel", description: "Gestion de l'image d'une organisation et organisation d'événements." },
      { icon: "🏢", name: "Communication d'entreprise", description: "Promotion interne et externe d'une marque ou institution." },
      { icon: "🏛️", name: "Communication publique & politique", description: "Information et influence dans le secteur public." },
      { icon: "📖", name: "Édition & correction", description: "Relecture, mise en page et diffusion d'ouvrages." },
      { icon: "🎥", name: "Création de contenus numériques", description: "Production de vidéos, posts, podcasts ou blogs." },
      { icon: "📢", name: "Publicité & stratégie de marque", description: "Création de campagnes pour valoriser des produits ou services." },
      { icon: "📱", name: "Influence, réseaux & storytelling", description: "Construction d'une image de marque par la narration et les médias sociaux." },
      { icon: "🌍", name: "Traduction & interprétation", description: "Passage fidèle d'un message d'une langue à une autre." },
      { icon: "🎭", name: "Médiation culturelle & animation de projets", description: "Transmission de la culture au grand public." },
      { icon: "🎙️", name: "Podcasting & création audio", description: "Production de formats audio indépendants." }
    ]
  },
  {
    id: 5,
    name: "Construction, BTP & habitat",
    icon: "🏗️",
    description: "Construisez, rénovez, aménagez des bâtiments et des infrastructures.",
    subUniverses: [
      { icon: "📐", name: "Architecture & conception", description: "Création de bâtiments et espaces de vie." },
      { icon: "🧱", name: "Gros œuvre & maçonnerie", description: "Construction des structures principales." },
      { icon: "🎨", name: "Second œuvre & finitions", description: "Travaux de finition intérieure et extérieure." },
      { icon: "🪵", name: "Menuiserie & charpente bois", description: "Fabrication et pose d'éléments en bois." },
      { icon: "🔧", name: "Plomberie, chauffage & climatisation", description: "Installation et entretien des réseaux techniques." },
      { icon: "⚡", name: "Électricité & domotique", description: "Réseaux électriques et automatismes du bâtiment." },
      { icon: "🛣️", name: "Travaux publics & voirie", description: "Infrastructures routières, ponts, réseaux." },
      { icon: "🏗️", name: "Génie civil & infrastructures", description: "Conception et réalisation d'ouvrages complexes." },
      { icon: "🌿", name: "Rénovation énergétique & éco-bâtiment", description: "Travaux visant la performance énergétique." },
      { icon: "📋", name: "Études techniques & dessin bâtiment", description: "Plans, modélisation et conception technique." },
      { icon: "👷", name: "Coordination & conduite de chantier", description: "Organisation et suivi des travaux." },
      { icon: "🏢", name: "Gestion immobilière & copropriétés", description: "Suivi administratif et technique des biens." },
      { icon: "🏙️", name: "Aménagement urbain & espaces publics", description: "Planification et mise en valeur des villes." }
    ]
  },
  {
    id: 6,
    name: "Droit, administration & politique publique",
    icon: "⚖️",
    description: "Appliquez les lois, gérez l'administration et contribuez à la politique publique.",
    subUniverses: [
      { icon: "⚖️", name: "Droit privé & judiciaire", description: "Défense des droits des particuliers." },
      { icon: "💼", name: "Droit des affaires & fiscalité", description: "Conseil juridique aux entreprises." },
      { icon: "🤝", name: "Droit social & du travail", description: "Relations employeurs-salariés et protection sociale." },
      { icon: "🏛️", name: "Droit public & institutions", description: "Encadrement des collectivités et politiques publiques." },
      { icon: "📋", name: "Administration publique", description: "Gestion courante des services de l'État." },
      { icon: "👥", name: "Ressources humaines & médiation", description: "Recrutement, dialogue social et accompagnement." },
      { icon: "🗺️", name: "Gouvernance territoriale & collectivités locales", description: "Gestion des politiques locales." },
      { icon: "🌍", name: "Diplomatie & relations internationales", description: "Représentation et négociation entre États." },
      { icon: "📝", name: "Gestion des marchés publics", description: "Commandes et appels d'offres publics." },
      { icon: "⚖️", name: "Intelligence juridique & conformité", description: "Veille réglementaire et prévention des risques." },
      { icon: "📜", name: "Notariat & professions réglementées", description: "Sécurisation des actes et transactions." }
    ]
  },
  {
    id: 7,
    name: "Éducation, formation & apprentissage",
    icon: "🎓",
    description: "Enseignez, formez et accompagnez les apprenants de tous âges.",
    subUniverses: [
      { icon: "📚", name: "Enseignement primaire", description: "Transmission des savoirs fondamentaux." },
      { icon: "🏫", name: "Enseignement secondaire", description: "Encadrement des adolescents et préparation aux examens." },
      { icon: "🎓", name: "Enseignement supérieur", description: "Formation et recherche à l'université ou en école." },
      { icon: "💼", name: "Formation professionnelle & continue", description: "Apprentissage pour adultes et salariés." },
      { icon: "🧭", name: "Orientation & accompagnement", description: "Aide à la construction de parcours individuels." },
      { icon: "📈", name: "Coaching & développement personnel", description: "Accompagnement du changement et de la motivation." },
      { icon: "📖", name: "Ingénierie pédagogique", description: "Conception de programmes et supports de formation." },
      { icon: "♿", name: "Éducation spécialisée & médiation éducative", description: "Soutien aux publics fragiles." },
      { icon: "🔬", name: "Recherche en sciences de l'éducation", description: "Études sur les méthodes d'apprentissage." },
      { icon: "🎉", name: "Animation socioculturelle", description: "Activités éducatives et sociales collectives." }
    ]
  },
  {
    id: 8,
    name: "Environnement, climat & énergies",
    icon: "🌍",
    description: "Protégez l'environnement et développez les énergies renouvelables.",
    subUniverses: [
      { icon: "♻️", name: "Gestion des déchets & recyclage", description: "Valorisation des matières usées." },
      { icon: "💧", name: "Traitement de l'eau & dépollution", description: "Purification et gestion des eaux usées." },
      { icon: "☀️", name: "Énergies renouvelables", description: "Production d'énergie verte (solaire, éolien...)." },
      { icon: "⚡", name: "Hydrogène & stockage d'énergie", description: "Développement des nouvelles filières énergétiques." },
      { icon: "☢️", name: "Énergie nucléaire & sûreté", description: "Production d'électricité et sécurité des installations." },
      { icon: "🌡️", name: "Génie climatique & efficacité énergétique", description: "Optimisation de la consommation d'énergie." },
      { icon: "🌦️", name: "Adaptation au changement climatique", description: "Stratégies pour limiter les impacts climatiques." },
      { icon: "📊", name: "Bilan carbone & comptabilité environnementale", description: "Mesure et réduction des émissions." },
      { icon: "♻️", name: "Écoconception & économie circulaire", description: "Conception durable des produits." },
      { icon: "🏙️", name: "Aménagement durable des territoires", description: "Urbanisme écoresponsable." },
      { icon: "🔧", name: "Ingénierie environnementale", description: "Études techniques et solutions écologiques." },
      { icon: "🌿", name: "Protection de la biodiversité & conservation", description: "Sauvegarde des écosystèmes." },
      { icon: "🌳", name: "Restauration écologique & gestion des milieux naturels", description: "Réhabilitation d'espaces dégradés." },
      { icon: "🚗", name: "Mobilité durable & transports propres", description: "Solutions de déplacement bas carbone." },
      { icon: "🌾", name: "Agriculture régénératrice & sols vivants", description: "Pratiques agricoles restauratrices." },
      { icon: "⚠️", name: "Gestion des risques naturels & résilience", description: "Prévention et préparation face aux aléas." }
    ]
  },
  {
    id: 9,
    name: "Gestion, finance & comptabilité",
    icon: "💰",
    description: "Gérez les finances, tenez la comptabilité et conseillez en gestion.",
    subUniverses: [
      { icon: "📊", name: "Comptabilité & fiscalité", description: "Suivi des comptes et déclarations fiscales." },
      { icon: "🔍", name: "Audit & contrôle de gestion", description: "Vérification de la performance financière." },
      { icon: "💵", name: "Trésorerie & financement", description: "Gestion des flux et besoins de liquidités." },
      { icon: "🏦", name: "Banque & assurance", description: "Services financiers aux particuliers et entreprises." },
      { icon: "💼", name: "Conseil en gestion de patrimoine", description: "Optimisation de l'épargne et des placements." },
      { icon: "🏢", name: "Gestion d'entreprise & administration", description: "Pilotage global d'une organisation." },
      { icon: "🌱", name: "Finance durable & investissement responsable", description: "Financement éthique et vert." },
      { icon: "📈", name: "Gestion de projets financiers", description: "Conception et suivi d'opérations budgétaires." },
      { icon: "💳", name: "Fintech & services financiers numériques", description: "Innovation dans les paiements et crédits." },
      { icon: "🏛️", name: "Gestion budgétaire publique", description: "Comptabilité et contrôle des finances de l'État." },
      { icon: "🔒", name: "Contrôle interne & conformité", description: "Sécurité et fiabilité des procédures financières." }
    ]
  },
  {
    id: 10,
    name: "Hôtellerie, restauration & tourisme",
    icon: "🏨",
    description: "Accueillez, cuisinez, servez et faites découvrir des destinations.",
    subUniverses: [
      { icon: "👨‍🍳", name: "Cuisine gastronomique", description: "Création culinaire haut de gamme." },
      { icon: "🍽️", name: "Restauration collective", description: "Préparation de repas pour groupes." },
      { icon: "🛎️", name: "Service & sommellerie", description: "Accueil et conseil en salle." },
      { icon: "🏨", name: "Hôtellerie & hébergement", description: "Gestion de séjours et services associés." },
      { icon: "🙋", name: "Accueil & réception", description: "Premier contact et assistance clients." },
      { icon: "🗺️", name: "Tourisme local & culturel", description: "Valorisation du patrimoine et des territoires." },
      { icon: "✈️", name: "Tourisme international", description: "Accueil et accompagnement de visiteurs étrangers." },
      { icon: "🎪", name: "Événementiel & congrès", description: "Organisation d'événements professionnels." },
      { icon: "🏨", name: "Management hôtelier", description: "Pilotage d'établissements touristiques." },
      { icon: "🍷", name: "Œnotourisme & terroir", description: "Découverte du vin et de la gastronomie locale." },
      { icon: "♻️", name: "Gestion durable du tourisme", description: "Tourisme responsable et respectueux des ressources." }
    ]
  },
  {
    id: 11,
    name: "Immobilier & patrimoine",
    icon: "🏠",
    description: "Vendez, louez, gérez et valorisez des biens immobiliers.",
    subUniverses: [
      { icon: "🏡", name: "Transaction immobilière résidentielle", description: "Achat et vente de logements." },
      { icon: "🏢", name: "Transaction immobilière d'entreprise & commerces", description: "Négociation de biens professionnels." },
      { icon: "🏗️", name: "Promotion & développement immobilier", description: "Construction et valorisation de projets." },
      { icon: "🔑", name: "Gestion locative & syndic de copropriété", description: "Administration de biens et copropriétés." },
      { icon: "💰", name: "Expertise & évaluation immobilière", description: "Analyse de la valeur d'un bien." },
      { icon: "📈", name: "Investissement & conseil patrimonial immobilier", description: "Stratégies d'achat et de placement." },
      { icon: "🏙️", name: "Aménagement foncier & urbanisme opérationnel", description: "Planification et gestion du sol." },
      { icon: "🏘️", name: "Immobilier social & logement accompagné", description: "Gestion de l'habitat pour publics fragiles." },
      { icon: "🔧", name: "Facility management & gestion technique", description: "Maintenance et services aux bâtiments." },
      { icon: "💎", name: "Immobilier de luxe & biens d'exception", description: "Gestion d'actifs haut de gamme." }
    ]
  },
  {
    id: 12,
    name: "Industrie, fabrication & production",
    icon: "⚙️",
    description: "Produisez, assemblez, contrôlez et optimisez la fabrication industrielle.",
    subUniverses: [
      { icon: "🏭", name: "Production industrielle", description: "Fabrication en série de biens et produits finis." },
      { icon: "🔧", name: "Maintenance & SAV", description: "Entretien et réparation des équipements." },
      { icon: "🔩", name: "Mécanique & usinage", description: "Conception et transformation de pièces métalliques." },
      { icon: "⚡", name: "Électrotechnique & automatisme", description: "Commande et automatisation des systèmes électriques." },
      { icon: "🤖", name: "Robotique & cobotique", description: "Collaboration homme-machine dans la production." },
      { icon: "⚗️", name: "Chimie & matériaux", description: "Transformation de la matière et création de composés." },
      { icon: "✈️", name: "Aéronautique & spatial", description: "Conception et maintenance d'aéronefs et satellites." },
      { icon: "🔥", name: "Métallurgie & sidérurgie", description: "Transformation des métaux et alliages." },
      { icon: "💊", name: "Industrie pharmaceutique", description: "Fabrication de médicaments et vaccins." },
      { icon: "🧪", name: "Plasturgie & composites", description: "Conception d'objets en polymères et matériaux innovants." },
      { icon: "✅", name: "Qualité, sécurité & environnement industriel", description: "Contrôle des normes et prévention des risques." },
      { icon: "📦", name: "Supply chain industrielle", description: "Coordination logistique de la production." },
      { icon: "🖨️", name: "Fabrication additive & impression 3D", description: "Production par couches successives." },
      { icon: "👕", name: "Industrie textile & habillement", description: "Confection et transformation des tissus." },
      { icon: "💻", name: "Micro-électronique & semi-conducteurs", description: "Production de circuits et composants électroniques." },
      { icon: "⛏️", name: "Industries extractives & carrières", description: "Exploitation des ressources naturelles." },
      { icon: "🚢", name: "Construction & maintenance navale", description: "Bâtiment et entretien de navires." }
    ]
  },
  {
    id: 13,
    name: "Logistique, transport & mobilité",
    icon: "🚚",
    description: "Organisez, transportez et gérez les flux de marchandises et de personnes.",
    subUniverses: [
      { icon: "📦", name: "Logistique & entreposage", description: "Gestion des flux et stockage des marchandises." },
      { icon: "🔗", name: "Supply chain management", description: "Pilotage global des chaînes d'approvisionnement." },
      { icon: "🌍", name: "Douanes & commerce international", description: "Gestion des échanges transfrontaliers." },
      { icon: "🚛", name: "Transport routier & livraison", description: "Acheminement terrestre de marchandises." },
      { icon: "🚆", name: "Transport ferroviaire", description: "Exploitation et maintenance des réseaux de trains." },
      { icon: "✈️", name: "Transport aérien", description: "Exploitation et organisation du trafic aérien." },
      { icon: "🚢", name: "Transport maritime & fluvial", description: "Navigation commerciale et logistique portuaire." },
      { icon: "🚌", name: "Mobilité urbaine & transports publics", description: "Déplacements collectifs en ville." },
      { icon: "🚗", name: "Gestion de flotte & maintenance", description: "Suivi et entretien de véhicules." },
      { icon: "🚴", name: "Logistique urbaine & dernier kilomètre", description: "Livraison locale et circuits courts." },
      { icon: "⚓", name: "Activités portuaires & maritimes", description: "Gestion et exploitation des infrastructures portuaires." },
      { icon: "🚙", name: "Mobilité autonome & véhicules intelligents", description: "Conception et exploitation de transports automatisés." }
    ]
  },
  {
    id: 14,
    name: "Management, entrepreneuriat & stratégie",
    icon: "📊",
    description: "Dirigez, entreprenez, définissez des stratégies et managez des équipes.",
    subUniverses: [
      { icon: "🚀", name: "Création d'entreprise & start-up", description: "Lancement et développement d'activités innovantes." },
      { icon: "📋", name: "Gestion de projets", description: "Organisation et suivi d'objectifs collectifs." },
      { icon: "💡", name: "Innovation & transformation digitale", description: "Intégration de nouvelles technologies." },
      { icon: "👥", name: "Management d'équipe", description: "Encadrement et motivation des collaborateurs." },
      { icon: "🌱", name: "RSE & développement durable", description: "Intégration des enjeux sociaux et environnementaux." },
      { icon: "🎯", name: "Stratégie d'entreprise", description: "Planification des orientations à long terme." },
      { icon: "🏛️", name: "Pilotage de structures publiques ou privées", description: "Gouvernance et performance organisationnelle." },
      { icon: "🌍", name: "Management interculturel", description: "Coordination d'équipes internationales." },
      { icon: "💼", name: "Conseil & accompagnement stratégique", description: "Analyse et recommandation pour les dirigeants." },
      { icon: "⚖️", name: "Gouvernance & leadership éthique", description: "Prise de décision responsable et inspirante." }
    ]
  },
  {
    id: 15,
    name: "Numérique, informatique & data",
    icon: "💻",
    description: "Développez, analysez, sécurisez et gérez les systèmes et données numériques.",
    subUniverses: [
      { icon: "🌐", name: "Développement web & mobile", description: "Création d'applications et de sites internet." },
      { icon: "☁️", name: "DevOps & cloud computing", description: "Automatisation et hébergement de systèmes informatiques." },
      { icon: "🔐", name: "Cybersécurité", description: "Protection des réseaux et données." },
      { icon: "🖥️", name: "Réseaux & systèmes", description: "Installation et maintenance des infrastructures informatiques." },
      { icon: "🤖", name: "Intelligence artificielle & machine learning", description: "Conception d'algorithmes d'apprentissage." },
      { icon: "📊", name: "Data science & big data", description: "Analyse et valorisation de grandes bases de données." },
      { icon: "🥽", name: "Réalité augmentée & métavers", description: "Expériences numériques immersives." },
      { icon: "🎨", name: "UX/UI design", description: "Conception d'interfaces centrées sur l'utilisateur." },
      { icon: "🏭", name: "Informatique industrielle & IoT", description: "Objets connectés et automatisation des processus." },
      { icon: "🧩", name: "Logiciels métiers & ERP", description: "Outils de gestion pour entreprises." },
      { icon: "⚙️", name: "No-code & automation", description: "Création d'applications sans programmation." },
      { icon: "🎨", name: "Design numérique & multimédia", description: "Graphisme et création d'environnements digitaux." },
      { icon: "⛓️", name: "Blockchain & web3", description: "Technologies décentralisées et sécurisées." },
      { icon: "♻️", name: "Informatique durable & sobriété numérique", description: "Réduction de l'empreinte écologique du numérique." },
      { icon: "🎮", name: "Gaming, jeux vidéo & développement ludique", description: "Conception de jeux interactifs." },
      { icon: "🏆", name: "E-sport, streaming & création de contenu gaming", description: "Compétition et diffusion de jeux vidéo." }
    ]
  },
  {
    id: 16,
    name: "Santé, bien-être & médical",
    icon: "⚕️",
    description: "Soignez, diagnostiquez, accompagnez et promouvez la santé.",
    subUniverses: [
      { icon: "🩺", name: "Médecine générale", description: "Soins courants et prévention." },
      { icon: "🏥", name: "Chirurgie & spécialités hospitalières", description: "Interventions et soins techniques." },
      { icon: "📷", name: "Radiologie & imagerie médicale", description: "Diagnostic par l'image." },
      { icon: "🔬", name: "Biologie & analyses médicales", description: "Études de prélèvements biologiques." },
      { icon: "💊", name: "Pharmacie & biotechnologies", description: "Développement et distribution de traitements." },
      { icon: "🩹", name: "Infirmier & soins paramédicaux", description: "Accompagnement des patients au quotidien." },
      { icon: "🦵", name: "Rééducation & kinésithérapie", description: "Restauration des capacités physiques." },
      { icon: "🧠", name: "Santé mentale & psychologie", description: "Prise en charge des troubles psychiques." },
      { icon: "🥗", name: "Nutrition & diététique", description: "Équilibre alimentaire et santé." },
      { icon: "🏥", name: "Santé publique & prévention", description: "Promotion du bien-être collectif." },
      { icon: "👵", name: "Accompagnement des personnes âgées", description: "Soins et assistance en gérontologie." },
      { icon: "⚽", name: "Médecine du sport", description: "Prévention et suivi des sportifs." },
      { icon: "💻", name: "Médecine connectée & télésanté", description: "Soins à distance et outils numériques." }
    ]
  },
  {
    id: 17,
    name: "Sciences, recherche & innovation",
    icon: "🔬",
    description: "Cherchez, expérimentez, découvrez et innovez dans les sciences.",
    subUniverses: [
      { icon: "🌌", name: "Physique & astrophysique", description: "Étude des lois de l'univers et de la matière." },
      { icon: "📐", name: "Mathématiques & statistiques", description: "Modélisation et analyse quantitative." },
      { icon: "⚗️", name: "Chimie & matériaux", description: "Recherche sur les réactions et nouveaux matériaux." },
      { icon: "🧬", name: "Biotechnologies", description: "Innovation à partir du vivant." },
      { icon: "🌍", name: "Géosciences & climatologie", description: "Étude de la Terre et des phénomènes climatiques." },
      { icon: "🧠", name: "Neurosciences & cognition", description: "Exploration du cerveau et du comportement." },
      { icon: "👥", name: "Sciences humaines & sociales", description: "Analyse des sociétés et comportements humains." },
      { icon: "📚", name: "Recherche en éducation", description: "Étude des processus d'apprentissage." },
      { icon: "🔬", name: "Recherche appliquée & transfert technologique", description: "Passage de la science au produit." },
      { icon: "🏢", name: "R&D en entreprise", description: "Innovation intégrée à la production." },
      { icon: "📊", name: "Études et consulting scientifique", description: "Expertise et accompagnement de projets techniques." }
    ]
  },
  {
    id: 18,
    name: "Sécurité, défense & urgence",
    icon: "🚨",
    description: "Protégez, intervenez, sécurisez les personnes et les biens au quotidien.",
    subUniverses: [
      { icon: "👮", name: "Police & gendarmerie", description: "Maintien de l'ordre et protection des citoyens." },
      { icon: "🚒", name: "Pompiers & secours", description: "Interventions d'urgence et sauvetage." },
      { icon: "🛡️", name: "Sécurité privée & surveillance", description: "Protection des biens et des personnes." },
      { icon: "🌪️", name: "Protection civile", description: "Organisation des secours en cas de catastrophe." },
      { icon: "⚔️", name: "Défense & armée", description: "Sécurité nationale et opérations extérieures." },
      { icon: "🕵️", name: "Renseignement & sécurité stratégique", description: "Collecte d'informations sensibles et analyse de menaces." }
    ]
  },
  {
    id: 19,
    name: "Social, aide & solidarité",
    icon: "❤️",
    description: "Aidez, accompagnez, soutenez les personnes en difficulté ou en situation de vulnérabilité.",
    subUniverses: [
      { icon: "👨‍👩‍👧", name: "Travail social & action sociale", description: "Accompagnement social et insertion." },
      { icon: "🏠", name: "Hébergement & logement d'urgence", description: "Accueil de personnes en précarité." },
      { icon: "🍽️", name: "Aide alimentaire & distributions", description: "Lutte contre la faim et l'insécurité alimentaire." },
      { icon: "🤝", name: "Médiation sociale & résolution de conflits", description: "Facilitation du dialogue et prévention." },
      { icon: "🌍", name: "Action humanitaire & ONG", description: "Interventions solidaires en France ou à l'étranger." },
      { icon: "👶", name: "Petite enfance & crèches", description: "Accueil et éveil des jeunes enfants." },
      { icon: "👦", name: "Protection de l'enfance", description: "Accompagnement et sécurisation des mineurs en danger." },
      { icon: "♿", name: "Accompagnement du handicap", description: "Soutien aux personnes en situation de handicap." },
      { icon: "💪", name: "Insertion professionnelle & formation", description: "Retour à l'emploi pour publics éloignés." },
      { icon: "🗣️", name: "Prévention & éducation populaire", description: "Sensibilisation et citoyenneté." },
      { icon: "🏡", name: "Services à la personne", description: "Aide à domicile et accompagnement du quotidien." },
      { icon: "🤲", name: "Bénévolat & engagement citoyen", description: "Actions solidaires et vie associative." },
      { icon: "🧑‍⚖️", name: "Accès aux droits & lutte contre les discriminations", description: "Défense et promotion de l'égalité." }
    ]
  },
  {
    id: 20,
    name: "Sport, loisirs & vie active",
    icon: "⚽",
    description: "Entraînez, animez, organisez des activités sportives et de loisirs pour tous.",
    subUniverses: [
      { icon: "🏃", name: "Éducation sportive & encadrement", description: "Enseignement et animation sportive." },
      { icon: "🏋️", name: "Entraînement & préparation physique", description: "Optimisation des performances." },
      { icon: "🏆", name: "Sport de haut niveau & compétition", description: "Pratique professionnelle et excellence." },
      { icon: "🏢", name: "Management d'équipements sportifs", description: "Gestion de salles, stades, piscines." },
      { icon: "📺", name: "Événementiel sportif", description: "Organisation de compétitions et manifestations." },
      { icon: "🎭", name: "Loisirs & animation socioculturelle", description: "Activités récréatives et vie associative." },
      { icon: "🏕️", name: "Tourisme sportif & plein air", description: "Activités nature et découverte." },
      { icon: "🎮", name: "E-sport & gaming professionnel", description: "Compétition et coaching sur jeux vidéo." },
      { icon: "🧘", name: "Bien-être & activités douces", description: "Yoga, pilates, relaxation." },
      { icon: "🛍️", name: "Industrie & commerce du sport", description: "Vente et distribution d'articles sportifs." },
      { icon: "🎨", name: "Création de contenus sportifs & médias", description: "Journalisme et production autour du sport." }
    ]
  },
  {
    id: 21,
    name: "Technologies émergentes & futur du travail",
    icon: "🚀",
    description: "Explorez l'IA, la robotique, le métavers et les nouvelles formes de travail.",
    subUniverses: [
      { icon: "🤖", name: "Intelligence artificielle générative", description: "Création de contenus par l'IA (texte, image, code)." },
      { icon: "🧠", name: "IA éthique & gouvernance algorithmique", description: "Encadrement responsable des systèmes intelligents." },
      { icon: "🦾", name: "Robotique humanoïde & collaborative", description: "Robots pour assistance et interaction." },
      { icon: "🧬", name: "Biotechnologies avancées & biohacking", description: "Ingénierie du vivant et optimisation humaine." },
      { icon: "🌌", name: "Exploration spatiale & NewSpace", description: "Satellites, lanceurs, tourisme spatial." },
      { icon: "⚛️", name: "Technologies quantiques", description: "Calcul et communication quantiques." },
      { icon: "🏠", name: "Travail hybride & télétravail", description: "Nouvelles organisations du travail." },
      { icon: "🌐", name: "Économie collaborative & plateformes", description: "Partage, freelance, gig economy." }
    ]
  }
];
