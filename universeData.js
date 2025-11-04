// Données complètes des 21 univers avec leurs sous-univers
const universesData = [
    {
        id: 1,
        icon: '🌾',
        name: 'Agriculture, nature & animaux',
        description: 'Cultivez, élevez, protégez la nature et travaillez avec les animaux dans des métiers en plein air.',
        subUniverses: [
            { icon: '🏭', name: 'Agroalimentaire industriel', description: 'Transformation et production à grande échelle des produits agricoles.' },
            { icon: '🌱', name: 'Production biologique & circuits courts', description: 'Cultures et élevages respectueux de l\'environnement, vente locale.' },
            { icon: '🔬', name: 'Agronomie & recherche appliquée', description: 'Études scientifiques pour améliorer les rendements et la durabilité.' },
            { icon: '🌾', name: 'Cultures céréalières & grandes exploitations', description: 'Gestion de grandes surfaces agricoles mécanisées.' },
            { icon: '🍇', name: 'Viticulture & œnologie', description: 'Culture de la vigne et production du vin.' },
            { icon: '🥕', name: 'Maraîchage & production maraîchère', description: 'Culture de légumes et fruits de saison.' },
            { icon: '🌺', name: 'Horticulture & pépinière', description: 'Production de plantes ornementales et d\'arbustes.' },
            { icon: '🌳', name: 'Paysagisme & aménagement végétal', description: 'Création et entretien d\'espaces verts.' },
            { icon: '🌲', name: 'Forêt & sylviculture durable', description: 'Gestion et exploitation raisonnée des forêts.' },
            { icon: '🐄', name: 'Élevage bovin / ovin / porcin / avicole', description: 'Production animale pour la viande, le lait ou les œufs.' },
            { icon: '🐟', name: 'Aquaculture & pêche durable', description: 'Élevage de poissons et gestion responsable des ressources marines.' },
            { icon: '🐝', name: 'Apiculture & insectes utiles', description: 'Élevage d\'abeilles et valorisation des insectes pollinisateurs.' },
            { icon: '💧', name: 'Gestion de l\'eau, irrigation & bassins versants', description: 'Maîtrise des ressources hydriques pour l\'agriculture.' },
            { icon: '🧀', name: 'Valorisation & transformation des produits agricoles', description: 'Fabrication de produits finis à partir des matières premières.' }
        ]
    },
    {
        id: 2,
        icon: '🎨',
        name: 'Arts, design & création',
        description: 'Créez, dessinez, designez et exprimez votre créativité dans l\'art visuel, graphique ou appliqué.',
        subUniverses: [
            { icon: '🖼️', name: 'Arts visuels & peinture', description: 'Création artistique sur support visuel.' },
            { icon: '🗿', name: 'Sculpture & installations', description: 'Conception d\'œuvres tridimensionnelles.' },
            { icon: '🎨', name: 'Design graphique & communication visuelle', description: 'Création d\'images et supports de communication.' },
            { icon: '📐', name: 'Design produit & industriel', description: 'Conception d\'objets et produits manufacturés.' },
            { icon: '🏠', name: 'Architecture intérieure & décoration', description: 'Aménagement esthétique et fonctionnel des espaces.' },
            { icon: '📸', name: 'Photographie & image numérique', description: 'Prise de vue, retouche et diffusion d\'images.' },
            { icon: '🎬', name: 'Cinéma, audiovisuel & animation', description: 'Production de films et contenus visuels.' },
            { icon: '👗', name: 'Mode, stylisme & textile', description: 'Conception de vêtements et accessoires.' },
            { icon: '🏺', name: 'Artisanat d\'art traditionnel', description: 'Création manuelle de pièces uniques.' },
            { icon: '🎭', name: 'Scénographie & design d\'espace', description: 'Mise en scène d\'expositions ou de spectacles.' },
            { icon: '✏️', name: 'Illustration & bande dessinée', description: 'Narration visuelle et création d\'univers graphiques.' },
            { icon: '🏛️', name: 'Patrimoine, muséographie & restauration d\'art', description: 'Conservation et mise en valeur d\'œuvres anciennes.' },
            { icon: '🎪', name: 'Spectacle vivant & arts de la scène', description: 'Interprétation et production théâtrale ou musicale.' },
            { icon: '💎', name: 'Métiers du luxe & savoir-faire d\'exception', description: 'Création haut de gamme mêlant tradition et innovation.' },
            { icon: '🎛️', name: 'Régie & technique du spectacle', description: 'Gestion des aspects techniques d\'événements artistiques.' }
        ]
    },
    {
        id: 3,
        icon: '🛒',
        name: 'Commerce, marketing & vente',
        description: 'Vendez, négociez, développez des stratégies commerciales et fidélisez les clients.',
        subUniverses: [
            { icon: '🏪', name: 'Commerce de détail & retail', description: 'Vente directe aux consommateurs.' },
            { icon: '🌐', name: 'E-commerce & marketplaces', description: 'Vente en ligne et gestion de plateformes numériques.' },
            { icon: '🤝', name: 'Vente B2B & négociation commerciale', description: 'Relations commerciales entre entreprises.' },
            { icon: '🎯', name: 'Représentation & prospection', description: 'Développement de clientèle sur le terrain.' },
            { icon: '🛍️', name: 'Merchandising & mise en valeur produits', description: 'Optimisation de la présentation des produits.' },
            { icon: '📊', name: 'Marketing stratégique', description: 'Étude de marché et positionnement des offres.' },
            { icon: '📱', name: 'Marketing digital & réseaux sociaux', description: 'Promotion via les outils numériques.' },
            { icon: '📢', name: 'Communication commerciale & influence', description: 'Stratégies de persuasion et fidélisation.' },
            { icon: '📦', name: 'Achats & approvisionnement', description: 'Sélection et négociation avec les fournisseurs.' },
            { icon: '🏬', name: 'Gestion de rayon & management de point de vente', description: 'Pilotage opérationnel des équipes et stocks.' },
            { icon: '🏢', name: 'Immobilier commercial', description: 'Vente et location d\'espaces professionnels.' },
            { icon: '🏦', name: 'Banque & assurance commerciale', description: 'Vente de produits financiers et d\'assurance.' },
            { icon: '💬', name: 'Service client & relation après-vente', description: 'Suivi et satisfaction des clients.' },
            { icon: '💎', name: 'Commerce du luxe & clientèle premium', description: 'Vente haut de gamme et expérience exclusive.' },
            { icon: '🛒', name: 'Vente en ligne & marketplaces spécialisées', description: 'Plateformes ciblées sur des niches de produits.' }
        ]
    },
    {
        id: 4,
        icon: '🎙️',
        name: 'Communication, médias & culture',
        description: 'Informez, divertissez, communiquez à travers les médias, la culture et l\'événementiel.',
        subUniverses: [
            { icon: '📰', name: 'Journalisme & presse écrite', description: 'Recherche, rédaction et diffusion d\'informations vérifiées.' },
            { icon: '📺', name: 'Audiovisuel & production radio/TV', description: 'Réalisation et diffusion d\'émissions ou reportages.' },
            { icon: '🎉', name: 'Relations publiques & événementiel', description: 'Gestion de l\'image d\'une organisation et organisation d\'événements.' },
            { icon: '🏢', name: 'Communication d\'entreprise', description: 'Promotion interne et externe d\'une marque ou institution.' },
            { icon: '🏛️', name: 'Communication publique & politique', description: 'Information et influence dans le secteur public.' },
            { icon: '📚', name: 'Édition & correction', description: 'Relecture, mise en page et diffusion d\'ouvrages.' },
            { icon: '✍️', name: 'Création de contenus numériques', description: 'Production de vidéos, posts, podcasts ou blogs.' },
            { icon: '📣', name: 'Publicité & stratégie de marque', description: 'Création de campagnes pour valoriser des produits ou services.' },
            { icon: '📲', name: 'Influence, réseaux & storytelling', description: 'Construction d\'une image de marque par la narration et les médias sociaux.' },
            { icon: '🌍', name: 'Traduction & interprétation', description: 'Passage fidèle d\'un message d\'une langue à une autre.' },
            { icon: '🎭', name: 'Médiation culturelle & animation de projets', description: 'Transmission de la culture au grand public.' },
            { icon: '🎙️', name: 'Podcasting & création audio', description: 'Production de formats audio indépendants.' }
        ]
    },
    {
        id: 5,
        icon: '🏗️',
        name: 'Construction, BTP & habitat',
        description: 'Construisez, rénovez, aménagez des bâtiments et infrastructures pour façonner nos villes.',
        subUniverses: [
            { icon: '🏛️', name: 'Architecture & conception', description: 'Création de bâtiments et espaces de vie.' },
            { icon: '🧱', name: 'Gros œuvre & maçonnerie', description: 'Construction des structures principales.' },
            { icon: '🎨', name: 'Second œuvre & finitions', description: 'Travaux de finition intérieure et extérieure.' },
            { icon: '🪵', name: 'Menuiserie & charpente bois', description: 'Fabrication et pose d\'éléments en bois.' },
            { icon: '🚿', name: 'Plomberie, chauffage & climatisation', description: 'Installation et entretien des réseaux techniques.' },
            { icon: '⚡', name: 'Électricité & domotique', description: 'Réseaux électriques et automatismes du bâtiment.' },
            { icon: '🛣️', name: 'Travaux publics & voirie', description: 'Infrastructures routières, ponts, réseaux.' },
            { icon: '🌉', name: 'Génie civil & infrastructures', description: 'Conception et réalisation d\'ouvrages complexes.' },
            { icon: '♻️', name: 'Rénovation énergétique & éco-bâtiment', description: 'Travaux visant la performance énergétique.' },
            { icon: '📐', name: 'Études techniques & dessin bâtiment', description: 'Plans, modélisation et conception technique.' },
            { icon: '👷', name: 'Coordination & conduite de chantier', description: 'Organisation et suivi des travaux.' },
            { icon: '🏢', name: 'Gestion immobilière & copropriétés', description: 'Suivi administratif et technique des biens.' },
            { icon: '🏙️', name: 'Aménagement urbain & espaces publics', description: 'Planification et mise en valeur des villes.' }
        ]
    },
    {
        id: 6,
        icon: '⚖️',
        name: 'Droit, administration & politique publique',
        description: 'Défendez, régulez, administrez dans les domaines juridique et des services publics.',
        subUniverses: [
            { icon: '👨‍⚖️', name: 'Droit privé & judiciaire', description: 'Défense des droits des particuliers.' },
            { icon: '💼', name: 'Droit des affaires & fiscalité', description: 'Conseil juridique aux entreprises.' },
            { icon: '🤝', name: 'Droit social & du travail', description: 'Relations employeurs-salariés et protection sociale.' },
            { icon: '🏛️', name: 'Droit public & institutions', description: 'Encadrement des collectivités et politiques publiques.' },
            { icon: '🏢', name: 'Administration publique', description: 'Gestion courante des services de l\'État.' },
            { icon: '👥', name: 'Ressources humaines & médiation', description: 'Recrutement, dialogue social et accompagnement.' },
            { icon: '🏘️', name: 'Gouvernance territoriale & collectivités locales', description: 'Gestion des politiques locales.' },
            { icon: '🌍', name: 'Diplomatie & relations internationales', description: 'Représentation et négociation entre États.' },
            { icon: '📋', name: 'Gestion des marchés publics', description: 'Commandes et appels d\'offres publics.' },
            { icon: '🔍', name: 'Intelligence juridique & conformité', description: 'Veille réglementaire et prévention des risques.' },
            { icon: '📜', name: 'Notariat & professions réglementées', description: 'Sécurisation des actes et transactions.' }
        ]
    },
    {
        id: 7,
        icon: '🎓',
        name: 'Éducation, formation & apprentissage',
        description: 'Enseignez, formez, transmettez vos connaissances et accompagnez l\'apprentissage.',
        subUniverses: [
            { icon: '🧒', name: 'Enseignement primaire', description: 'Transmission des savoirs fondamentaux.' },
            { icon: '🎒', name: 'Enseignement secondaire', description: 'Encadrement des adolescents et préparation aux examens.' },
            { icon: '🎓', name: 'Enseignement supérieur', description: 'Formation et recherche à l\'université ou en école.' },
            { icon: '💼', name: 'Formation professionnelle & continue', description: 'Apprentissage pour adultes et salariés.' },
            { icon: '🧭', name: 'Orientation & accompagnement', description: 'Aide à la construction de parcours individuels.' },
            { icon: '🤝', name: 'Coaching & développement personnel', description: 'Accompagnement du changement et de la motivation.' },
            { icon: '📚', name: 'Ingénierie pédagogique', description: 'Conception de programmes et supports de formation.' },
            { icon: '👥', name: 'Éducation spécialisée & médiation éducative', description: 'Soutien aux publics fragiles.' },
            { icon: '🔬', name: 'Recherche en sciences de l\'éducation', description: 'Études sur les méthodes d\'apprentissage.' },
            { icon: '🎪', name: 'Animation socioculturelle', description: 'Activités éducatives et sociales collectives.' }
        ]
    },
    {
        id: 8,
        icon: '🌍',
        name: 'Environnement, climat & énergies',
        description: 'Protégez la planète, développez les énergies renouvelables et luttez contre le changement climatique.',
        subUniverses: [
            { icon: '♻️', name: 'Gestion des déchets & recyclage', description: 'Valorisation des matières usées.' },
            { icon: '💧', name: 'Traitement de l\'eau & dépollution', description: 'Purification et gestion des eaux usées.' },
            { icon: '☀️', name: 'Énergies renouvelables', description: 'Production d\'énergie verte (solaire, éolien…).' },
            { icon: '⚡', name: 'Hydrogène & stockage d\'énergie', description: 'Développement des nouvelles filières énergétiques.' },
            { icon: '☢️', name: 'Énergie nucléaire & sûreté', description: 'Production d\'électricité et sécurité des installations.' },
            { icon: '🌡️', name: 'Génie climatique & efficacité énergétique', description: 'Optimisation de la consommation d\'énergie.' },
            { icon: '🌍', name: 'Adaptation au changement climatique', description: 'Stratégies pour limiter les impacts climatiques.' },
            { icon: '📊', name: 'Bilan carbone & comptabilité environnementale', description: 'Mesure et réduction des émissions.' },
            { icon: '🔄', name: 'Écoconception & économie circulaire', description: 'Conception durable des produits.' },
            { icon: '🏙️', name: 'Aménagement durable des territoires', description: 'Urbanisme écoresponsable.' },
            { icon: '🔧', name: 'Ingénierie environnementale', description: 'Études techniques et solutions écologiques.' },
            { icon: '🦋', name: 'Protection de la biodiversité & conservation', description: 'Sauvegarde des écosystèmes.' },
            { icon: '🌿', name: 'Restauration écologique & gestion des milieux naturels', description: 'Réhabilitation d\'espaces dégradés.' },
            { icon: '🚇', name: 'Mobilité durable & transports propres', description: 'Solutions de déplacement bas carbone.' },
            { icon: '🌾', name: 'Agriculture régénératrice & sols vivants', description: 'Pratiques agricoles restauratrices.' },
            { icon: '⚠️', name: 'Gestion des risques naturels & résilience', description: 'Prévention et préparation face aux aléas.' }
        ]
    },
    {
        id: 9,
        icon: '💶',
        name: 'Gestion, finance & comptabilité',
        description: 'Gérez, analysez, optimisez les ressources financières et comptables des organisations.',
        subUniverses: [
            { icon: '📊', name: 'Comptabilité & fiscalité', description: 'Suivi des comptes et déclarations fiscales.' },
            { icon: '🔍', name: 'Audit & contrôle de gestion', description: 'Vérification de la performance financière.' },
            { icon: '💰', name: 'Trésorerie & financement', description: 'Gestion des flux et besoins de liquidités.' },
            { icon: '🏦', name: 'Banque & assurance', description: 'Services financiers aux particuliers et entreprises.' },
            { icon: '💎', name: 'Conseil en gestion de patrimoine', description: 'Optimisation de l\'épargne et des placements.' },
            { icon: '📈', name: 'Gestion d\'entreprise & administration', description: 'Pilotage global d\'une organisation.' },
            { icon: '🌱', name: 'Finance durable & investissement responsable', description: 'Financement éthique et vert.' },
            { icon: '📋', name: 'Gestion de projets financiers', description: 'Conception et suivi d\'opérations budgétaires.' },
            { icon: '💳', name: 'Fintech & services financiers numériques', description: 'Innovation dans les paiements et crédits.' },
            { icon: '🏛️', name: 'Gestion budgétaire publique', description: 'Comptabilité et contrôle des finances de l\'État.' },
            { icon: '✅', name: 'Contrôle interne & conformité', description: 'Sécurité et fiabilité des procédures financières.' }
        ]
    },
    {
        id: 10,
        icon: '🍽️',
        name: 'Hôtellerie, restauration & tourisme',
        description: 'Accueillez, servez, cuisinez et faites découvrir des destinations dans l\'hospitalité.',
        subUniverses: [
            { icon: '👨‍🍳', name: 'Cuisine gastronomique', description: 'Création culinaire haut de gamme.' },
            { icon: '🍴', name: 'Restauration collective', description: 'Préparation de repas pour groupes.' },
            { icon: '🍷', name: 'Service & sommellerie', description: 'Accueil et conseil en salle.' },
            { icon: '🏨', name: 'Hôtellerie & hébergement', description: 'Gestion de séjours et services associés.' },
            { icon: '🛎️', name: 'Accueil & réception', description: 'Premier contact et assistance clients.' },
            { icon: '🏞️', name: 'Tourisme local & culturel', description: 'Valorisation du patrimoine et des territoires.' },
            { icon: '✈️', name: 'Tourisme international', description: 'Accueil et accompagnement de visiteurs étrangers.' },
            { icon: '🎤', name: 'Événementiel & congrès', description: 'Organisation d\'événements professionnels.' },
            { icon: '📊', name: 'Management hôtelier', description: 'Pilotage d\'établissements touristiques.' },
            { icon: '🍇', name: 'Œnotourisme & terroir', description: 'Découverte du vin et de la gastronomie locale.' },
            { icon: '🌿', name: 'Gestion durable du tourisme', description: 'Tourisme responsable et respectueux des ressources.' }
        ]
    },
    {
        id: 11,
        icon: '🏠',
        name: 'Immobilier & patrimoine',
        description: 'Conseillez, gérez, valorisez les biens immobiliers et le patrimoine.',
        subUniverses: [
            { icon: '🏡', name: 'Transaction immobilière résidentielle', description: 'Achat et vente de logements.' },
            { icon: '🏢', name: 'Transaction immobilière d\'entreprise & commerces', description: 'Négociation de biens professionnels.' },
            { icon: '🏗️', name: 'Promotion & développement immobilier', description: 'Construction et valorisation de projets.' },
            { icon: '🔑', name: 'Gestion locative & syndic de copropriété', description: 'Administration de biens et copropriétés.' },
            { icon: '📐', name: 'Expertise & évaluation immobilière', description: 'Analyse de la valeur d\'un bien.' },
            { icon: '💰', name: 'Investissement & conseil patrimonial immobilier', description: 'Stratégies d\'achat et de placement.' },
            { icon: '🗺️', name: 'Aménagement foncier & urbanisme opérationnel', description: 'Planification et gestion du sol.' },
            { icon: '🏘️', name: 'Immobilier social & logement accompagné', description: 'Gestion de l\'habitat pour publics fragiles.' },
            { icon: '🛠️', name: 'Facility management & gestion technique', description: 'Maintenance et services aux bâtiments.' },
            { icon: '💎', name: 'Immobilier de luxe & biens d\'exception', description: 'Gestion d\'actifs haut de gamme.' }
        ]
    },
    {
        id: 12,
        icon: '⚙️',
        name: 'Industrie, fabrication & production',
        description: 'Produisez, assemblez, automatisez dans les usines et chaînes de production modernes.',
        subUniverses: [
            { icon: '🏭', name: 'Production industrielle', description: 'Fabrication en série de biens et produits finis.' },
            { icon: '🔧', name: 'Maintenance & SAV', description: 'Entretien et réparation des équipements.' },
            { icon: '⚙️', name: 'Mécanique & usinage', description: 'Conception et transformation de pièces métalliques.' },
            { icon: '⚡', name: 'Électrotechnique & automatisme', description: 'Commande et automatisation des systèmes électriques.' },
            { icon: '🤖', name: 'Robotique & cobotique', description: 'Collaboration homme-machine dans la production.' },
            { icon: '🧪', name: 'Chimie & matériaux', description: 'Transformation de la matière et création de composés.' },
            { icon: '✈️', name: 'Aéronautique & spatial', description: 'Conception et maintenance d\'aéronefs et satellites.' },
            { icon: '⚒️', name: 'Métallurgie & sidérurgie', description: 'Transformation des métaux et alliages.' },
            { icon: '💊', name: 'Industrie pharmaceutique', description: 'Fabrication de médicaments et vaccins.' },
            { icon: '🔬', name: 'Plasturgie & composites', description: 'Conception d\'objets en polymères et matériaux innovants.' },
            { icon: '✅', name: 'Qualité, sécurité & environnement industriel', description: 'Contrôle des normes et prévention des risques.' },
            { icon: '📦', name: 'Supply chain industrielle', description: 'Coordination logistique de la production.' },
            { icon: '🖨️', name: 'Fabrication additive & impression 3D', description: 'Production par couches successives.' },
            { icon: '👕', name: 'Industrie textile & habillement', description: 'Confection et transformation des tissus.' },
            { icon: '💻', name: 'Micro-électronique & semi-conducteurs', description: 'Production de circuits et composants électroniques.' },
            { icon: '⛏️', name: 'Industries extractives & carrières', description: 'Exploitation des ressources naturelles.' },
            { icon: '🚢', name: 'Construction & maintenance navale', description: 'Bâtiment et entretien de navires.' }
        ]
    },
    {
        id: 13,
        icon: '🚚',
        name: 'Logistique, transport & mobilité',
        description: 'Transportez, organisez, gérez les flux de marchandises et les déplacements.',
        subUniverses: [
            { icon: '📦', name: 'Logistique & entreposage', description: 'Gestion des flux et stockage des marchandises.' },
            { icon: '🔄', name: 'Supply chain management', description: 'Pilotage global des chaînes d\'approvisionnement.' },
            { icon: '🛃', name: 'Douanes & commerce international', description: 'Gestion des échanges transfrontaliers.' },
            { icon: '🚛', name: 'Transport routier & livraison', description: 'Acheminement terrestre de marchandises.' },
            { icon: '🚂', name: 'Transport ferroviaire', description: 'Exploitation et maintenance des réseaux de trains.' },
            { icon: '✈️', name: 'Transport aérien', description: 'Exploitation et organisation du trafic aérien.' },
            { icon: '🚢', name: 'Transport maritime & fluvial', description: 'Navigation commerciale et logistique portuaire.' },
            { icon: '🚇', name: 'Mobilité urbaine & transports publics', description: 'Déplacements collectifs en ville.' },
            { icon: '🚗', name: 'Gestion de flotte & maintenance', description: 'Suivi et entretien de véhicules.' },
            { icon: '📍', name: 'Logistique urbaine & dernier kilomètre', description: 'Livraison locale et circuits courts.' },
            { icon: '⚓', name: 'Activités portuaires & maritimes', description: 'Gestion et exploitation des infrastructures portuaires.' },
            { icon: '🤖', name: 'Mobilité autonome & véhicules intelligents', description: 'Conception et exploitation de transports automatisés.' }
        ]
    },
    {
        id: 14,
        icon: '💼',
        name: 'Management, entrepreneuriat & stratégie',
        description: 'Dirigez, entreprenez, élaborez des stratégies et pilotez des équipes vers le succès.',
        subUniverses: [
            { icon: '🚀', name: 'Création d\'entreprise & start-up', description: 'Lancement et développement d\'activités innovantes.' },
            { icon: '📊', name: 'Gestion de projets', description: 'Organisation et suivi d\'objectifs collectifs.' },
            { icon: '💡', name: 'Innovation & transformation digitale', description: 'Intégration de nouvelles technologies.' },
            { icon: '👥', name: 'Management d\'équipe', description: 'Encadrement et motivation des collaborateurs.' },
            { icon: '🌱', name: 'RSE & développement durable', description: 'Intégration des enjeux sociaux et environnementaux.' },
            { icon: '🎯', name: 'Stratégie d\'entreprise', description: 'Planification des orientations à long terme.' },
            { icon: '🏢', name: 'Pilotage de structures publiques ou privées', description: 'Gouvernance et performance organisationnelle.' },
            { icon: '🌍', name: 'Management interculturel', description: 'Coordination d\'équipes internationales.' },
            { icon: '💼', name: 'Conseil & accompagnement stratégique', description: 'Analyse et recommandation pour les dirigeants.' },
            { icon: '⚖️', name: 'Gouvernance & leadership éthique', description: 'Prise de décision responsable et inspirante.' }
        ]
    },
    {
        id: 15,
        icon: '💻',
        name: 'Numérique, informatique & data',
        description: 'Codez, développez, analysez les données et créez les technologies de demain.',
        subUniverses: [
            { icon: '🌐', name: 'Développement web & mobile', description: 'Création d\'applications et de sites internet.' },
            { icon: '☁️', name: 'DevOps & cloud computing', description: 'Automatisation et hébergement de systèmes informatiques.' },
            { icon: '🔒', name: 'Cybersécurité', description: 'Protection des réseaux et données.' },
            { icon: '🖧', name: 'Réseaux & systèmes', description: 'Installation et maintenance des infrastructures informatiques.' },
            { icon: '🤖', name: 'Intelligence artificielle & machine learning', description: 'Conception d\'algorithmes d\'apprentissage.' },
            { icon: '📊', name: 'Data science & big data', description: 'Analyse et valorisation de grandes bases de données.' },
            { icon: '🥽', name: 'Réalité augmentée & métavers', description: 'Expériences numériques immersives.' },
            { icon: '🎨', name: 'UX/UI design', description: 'Conception d\'interfaces centrées sur l\'utilisateur.' },
            { icon: '📡', name: 'Informatique industrielle & IoT', description: 'Objets connectés et automatisation des processus.' },
            { icon: '💼', name: 'Logiciels métiers & ERP', description: 'Outils de gestion pour entreprises.' },
            { icon: '⚡', name: 'No-code & automation', description: 'Création d\'applications sans programmation.' },
            { icon: '🎬', name: 'Design numérique & multimédia', description: 'Graphisme et création d\'environnements digitaux.' },
            { icon: '⛓️', name: 'Blockchain & web3', description: 'Technologies décentralisées et sécurisées.' },
            { icon: '🌱', name: 'Informatique durable & sobriété numérique', description: 'Réduction de l\'empreinte écologique du numérique.' },
            { icon: '🎮', name: 'Gaming, jeux vidéo & développement ludique', description: 'Conception de jeux interactifs.' },
            { icon: '🎯', name: 'E-sport, streaming & création de contenu gaming', description: 'Compétition et diffusion de jeux vidéo.' }
        ]
    },
    {
        id: 16,
        icon: '⚕️',
        name: 'Santé, bien-être & médical',
        description: 'Soignez, accompagnez, prévenez dans les métiers de la santé et du bien-être.',
        subUniverses: [
            { icon: '🩺', name: 'Médecine générale', description: 'Soins courants et prévention.' },
            { icon: '🏥', name: 'Chirurgie & spécialités hospitalières', description: 'Interventions et soins techniques.' },
            { icon: '📷', name: 'Radiologie & imagerie médicale', description: 'Diagnostic par l\'image.' },
            { icon: '🔬', name: 'Biologie & analyses médicales', description: 'Études de prélèvements biologiques.' },
            { icon: '💊', name: 'Pharmacie & biotechnologies', description: 'Développement et distribution de traitements.' },
            { icon: '👨‍⚕️', name: 'Infirmier & soins paramédicaux', description: 'Accompagnement des patients au quotidien.' },
            { icon: '🏃', name: 'Rééducation & kinésithérapie', description: 'Restauration des capacités physiques.' },
            { icon: '🧠', name: 'Santé mentale & psychologie', description: 'Prise en charge des troubles psychiques.' },
            { icon: '🥗', name: 'Nutrition & diététique', description: 'Équilibre alimentaire et santé.' },
            { icon: '🏛️', name: 'Santé publique & prévention', description: 'Promotion du bien-être collectif.' },
            { icon: '👴', name: 'Accompagnement des personnes âgées', description: 'Soins et assistance en gérontologie.' },
            { icon: '⚽', name: 'Médecine du sport', description: 'Prévention et suivi des sportifs.' },
            { icon: '📱', name: 'Médecine connectée & télésanté', description: 'Soins à distance et outils numériques.' }
        ]
    },
    {
        id: 17,
        icon: '🔬',
        name: 'Sciences, recherche & innovation',
        description: 'Cherchez, expérimentez, innovez pour faire avancer les connaissances scientifiques.',
        subUniverses: [
            { icon: '⚛️', name: 'Physique & astrophysique', description: 'Étude des lois de l\'univers et de la matière.' },
            { icon: '📐', name: 'Mathématiques & statistiques', description: 'Modélisation et analyse quantitative.' },
            { icon: '🧪', name: 'Chimie & matériaux', description: 'Recherche sur les réactions et nouveaux matériaux.' },
            { icon: '🧬', name: 'Biotechnologies', description: 'Innovation à partir du vivant.' },
            { icon: '🌍', name: 'Géosciences & climatologie', description: 'Étude de la Terre et des phénomènes climatiques.' },
            { icon: '🧠', name: 'Neurosciences & cognition', description: 'Exploration du cerveau et du comportement.' },
            { icon: '📚', name: 'Sciences humaines & sociales', description: 'Analyse des sociétés et comportements humains.' },
            { icon: '🎓', name: 'Recherche en éducation', description: 'Étude des processus d\'apprentissage.' },
            { icon: '🔄', name: 'Recherche appliquée & transfert technologique', description: 'Passage de la science au produit.' },
            { icon: '🏢', name: 'R&D en entreprise', description: 'Innovation intégrée à la production.' },
            { icon: '💼', name: 'Études et consulting scientifique', description: 'Expertise et accompagnement de projets techniques.' }
        ]
    },
    {
        id: 18,
        icon: '🛡️',
        name: 'Sécurité, défense & urgence',
        description: 'Protégez, intervenez, sécurisez les personnes et les biens au quotidien.',
        subUniverses: [
            { icon: '👮', name: 'Police & gendarmerie', description: 'Maintien de l\'ordre et protection des citoyens.' },
            { icon: '🚒', name: 'Pompiers & secours', description: 'Interventions d\'urgence et sauvetage.' },
            { icon: '🔐', name: 'Sécurité privée & surveillance', description: 'Protection des biens et des personnes.' },
            { icon: '🆘', name: 'Protection civile', description: 'Organisation des secours en cas de catastrophe.' },
            { icon: '🪖', name: 'Défense & armée', description: 'Sécurité nationale et opérations extérieures.' },
            { icon: '🕵️', name: 'Renseignement & sécurité stratégique', description: 'Collecte et analyse d\'informations sensibles.' },
            { icon: '🔒', name: 'Sécurité informatique & cyberdéfense', description: 'Prévention des attaques numériques.' },
            { icon: '⚡', name: 'Sécurité des infrastructures critiques', description: 'Protection des réseaux essentiels (énergie, transport…).' },
            { icon: '🆘', name: 'Gestion de crise & résilience territoriale', description: 'Coordination des réponses aux urgences.' },
            { icon: '⚠️', name: 'Prévention des risques & sûreté publique', description: 'Surveillance et évaluation des menaces.' },
            { icon: '⚔️', name: 'Industrie de défense & armement', description: 'Conception d\'équipements militaires.' }
        ]
    },
    {
        id: 19,
        icon: '❤️',
        name: 'Social, aide & solidarité',
        description: 'Aidez, accompagnez, soutenez les personnes en difficulté ou en situation de vulnérabilité.',
        subUniverses: [
            { icon: '🏠', name: 'Aide à domicile', description: 'Soutien aux personnes dépendantes.' },
            { icon: '🤝', name: 'Travail social & insertion', description: 'Accompagnement vers l\'autonomie et l\'emploi.' },
            { icon: '👶', name: 'Enfance & jeunesse', description: 'Protection et éducation des jeunes publics.' },
            { icon: '♿', name: 'Handicap & inclusion', description: 'Soutien à la participation sociale des personnes handicapées.' },
            { icon: '🧠', name: 'Santé mentale & accompagnement', description: 'Suivi social et psychologique.' },
            { icon: '🎪', name: 'Animation & médiation sociale', description: 'Création de lien et d\'activités collectives.' },
            { icon: '🛡️', name: 'Protection de l\'enfance', description: 'Défense des droits et sécurité des mineurs.' },
            { icon: '🌱', name: 'Économie sociale & solidaire', description: 'Entreprises à finalité sociale et collective.' },
            { icon: '🤲', name: 'Bénévolat & engagement citoyen', description: 'Actions solidaires et collectives.' },
            { icon: '🏥', name: 'Gestion d\'établissements médico-sociaux', description: 'Pilotage de structures d\'accueil.' },
            { icon: '👨‍👩‍👧', name: 'Médiation familiale', description: 'Résolution de conflits familiaux.' },
            { icon: '👵', name: 'Services à la personne & assistance familiale', description: 'Soutien à domicile et accompagnement quotidien.' },
            { icon: '🕊️', name: 'Accompagnement funéraire & thanatologie', description: 'Soutien aux familles et organisation des rites.' }
        ]
    },
    {
        id: 20,
        icon: '⚽',
        name: 'Sport, loisirs & vie active',
        description: 'Entraînez, animez, organisez des activités sportives et de loisirs pour tous.',
        subUniverses: [
            { icon: '🏋️', name: 'Coaching sportif', description: 'Entraînement personnalisé et motivation.' },
            { icon: '🎪', name: 'Animation & loisirs', description: 'Encadrement d\'activités de détente.' },
            { icon: '🎓', name: 'Éducation physique & enseignement du sport', description: 'Formation sportive en milieu scolaire.' },
            { icon: '⚽', name: 'Encadrement sportif & fédérations', description: 'Organisation et arbitrage des pratiques.' },
            { icon: '🏟️', name: 'Gestion d\'équipements sportifs', description: 'Direction d\'installations ou clubs.' },
            { icon: '🤝', name: 'Médiation par le sport', description: 'Utilisation du sport à des fins sociales ou éducatives.' },
            { icon: '🥗', name: 'Nutrition & bien-être', description: 'Équilibre alimentaire et hygiène de vie.' },
            { icon: '💪', name: 'Sport santé & réathlétisation', description: 'Activité physique adaptée à la santé.' },
            { icon: '🎉', name: 'Organisation d\'événements sportifs', description: 'Planification et logistique de compétitions.' },
            { icon: '🏔️', name: 'Tourisme sportif', description: 'Voyages et séjours autour du sport.' },
            { icon: '🎮', name: 'E-sport & compétition numérique', description: 'Compétition professionnelle de jeux vidéo.' }
        ]
    },
    {
        id: 21,
        icon: '🚀',
        name: 'Technologies émergentes & futur du travail',
        description: 'Explorez l\'IA, la robotique, le métavers et les nouvelles formes de travail.',
        subUniverses: [
            { icon: '🤖', name: 'Robotique humanoïde avancée', description: 'Conception de robots capables d\'interagir naturellement.' },
            { icon: '🥽', name: 'Technologies immersives nouvelle génération (XR, haptique)', description: 'Interfaces sensorielles et réalités augmentées.' },
            { icon: '🧬', name: 'Biotechnologies avancées & bio-ingénierie', description: 'Innovation à l\'échelle du vivant.' },
            { icon: '🌾', name: 'AgroTech & FoodTech', description: 'Nouvelles technologies pour l\'agriculture et l\'alimentation.' },
            { icon: '🌱', name: 'CleanTech & GreenTech', description: 'Solutions technologiques pour réduire l\'impact écologique.' },
            { icon: '💊', name: 'HealthTech & MedTech', description: 'Dispositifs connectés et innovations médicales.' },
            { icon: '🛸', name: 'SpaceTech & exploration spatiale', description: 'Technologies dédiées à l\'espace et aux satellites.' },
            { icon: '💼', name: 'Économie créative & travail numérique indépendant', description: 'Nouvelles formes de métiers autonomes et digitaux.' }
        ]
    }
];
