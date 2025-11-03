// ======================================================
// IA360 — DATA UNIFIÉE (intérêts, univers, sous-univers, scoring)
// ======================================================

// 1) INTÉRÊTS (12)
const interests = [
  { id: 1,  icon: "🏃", title: "Activités physiques & nature",  verbs: "Bouger, respirer, explorer, agir", description: "Je me vois plutôt dans un métier où je pourrai être en mouvement, vivre dehors et sentir l'énergie du corps." },
  { id: 2,  icon: "🔧", title: "Manuel & technique",             verbs: "Fabriquer, réparer, construire, ajuster", description: "Je me vois plutôt dans un métier où je pourrai créer ou réparer avec mes mains et voir le résultat concret de mon travail." },
  { id: 3,  icon: "🔍", title: "Investigation & information",    verbs: "Observer, comprendre, apprendre", description: "Je me vois plutôt dans un métier où je pourrai chercher à comprendre comment les choses fonctionnent et approfondir mes connaissances." },
  { id: 4,  icon: "💻", title: "Sciences & technologies",         verbs: "Tester, modéliser, programmer, innover", description: "Je me vois plutôt dans un métier où je pourrai expérimenter, utiliser des technologies et résoudre des problèmes complexes." },
  { id: 5,  icon: "🎨", title: "Arts & expression",               verbs: "Imaginer, exprimer, créer, interpréter", description: "Je me vois plutôt dans un métier où je pourrai créer des œuvres originales et m'exprimer à travers l'art et la créativité." },
  { id: 6,  icon: "💡", title: "Idées & conception",              verbs: "Concevoir, structurer, inventer, organiser", description: "Je me vois plutôt dans un métier où je pourrai imaginer de nouveaux concepts et organiser des idées de manière innovante." },
  { id: 7,  icon: "🤝", title: "Aide & accompagnement",           verbs: "Soutenir, écouter, former, accompagner", description: "Je me vois plutôt dans un métier où je pourrai aider les autres à progresser et les accompagner dans leurs difficultés." },
  { id: 8,  icon: "👥", title: "Relations & sociabilité",         verbs: "Communiquer, relier, partager, coopérer", description: "Je me vois plutôt dans un métier où je pourrai échanger avec les autres, créer du lien et travailler en équipe." },
  { id: 9,  icon: "⚡", title: "Action & initiative",             verbs: "Agir, entreprendre, dynamiser, décider", description: "Je me vois plutôt dans un métier où je pourrai prendre des initiatives, lancer des projets et passer à l'action rapidement." },
  { id: 10, icon: "👑", title: "Leadership & stratégie",          verbs: "Motiver, diriger, influencer, décider", description: "Je me vois plutôt dans un métier où je pourrai guider les autres, prendre des décisions importantes et définir une vision." },
  { id: 11, icon: "📊", title: "Données & chiffres",              verbs: "Calculer, comparer, interpréter, vérifier", description: "Je me vois plutôt dans un métier où je pourrai travailler avec des données chiffrées et analyser des informations précises." },
  { id: 12, icon: "📋", title: "Règles & méthodes",               verbs: "Contrôler, sécuriser, appliquer, structurer", description: "Je me vois plutôt dans un métier où je pourrai suivre des procédures rigoureuses et m'assurer que tout est en ordre." }
];

// 2) DÉFINITIONS DES SOUS-UNIVERS (dictionnaire)
const subUniverseDefinitions = {
  "Agroalimentaire industriel": "Transformation et production à grande échelle des produits agricoles.",
  "Production biologique & circuits courts": "Cultures et élevages respectueux de l'environnement, vente locale.",
  "Agronomie & recherche appliquée": "Études scientifiques pour améliorer les rendements et la durabilité.",
  "Cultures céréalières & grandes exploitations": "Gestion de grandes surfaces agricoles mécanisées.",
  "Viticulture & œnologie": "Culture de la vigne et production du vin.",
  "Maraîchage & production maraîchère": "Culture de légumes et fruits de saison.",
  "Horticulture & pépinière": "Production de plantes ornementales et d'arbustes.",
  "Paysagisme & aménagement végétal": "Création et entretien d'espaces verts.",
  "Forêt & sylviculture durable": "Gestion et exploitation raisonnée des forêts.",
  "Élevage bovin / ovin / porcin / avicole": "Production animale pour la viande, le lait ou les œufs.",
  "Aquaculture & pêche durable": "Élevage de poissons et gestion responsable des ressources marines.",
  "Apiculture & insectes utiles": "Élevage d'abeilles et valorisation des insectes pollinisateurs.",
  "Gestion de l eau, irrigation & bassins versants": "Maîtrise des ressources hydriques pour l'agriculture.",
  "Valorisation & transformation des produits agricoles": "Fabrication de produits finis à partir des matières premières.",

  "Arts visuels & peinture": "Création artistique sur support visuel.",
  "Sculpture & installations": "Conception d'œuvres tridimensionnelles.",
  "Design graphique & communication visuelle": "Création d'images et supports de communication.",
  "Design produit & industriel": "Conception d'objets et produits manufacturés.",
  "Architecture intérieure & décoration": "Aménagement esthétique et fonctionnel des espaces.",
  "Photographie & image numérique": "Prise de vue, retouche et diffusion d'images.",
  "Cinéma, audiovisuel & animation": "Production de films et contenus visuels.",
  "Mode, stylisme & textile": "Conception de vêtements et accessoires.",
  "Artisanat d art traditionnel": "Création manuelle de pièces uniques.",
  "Scénographie & design d espace": "Mise en scène d'expositions ou de spectacles.",
  "Illustration & bande dessinée": "Narration visuelle et création d'univers graphiques.",
  "Patrimoine, muséographie & restauration d art": "Conservation et mise en valeur d'œuvres anciennes.",
  "Spectacle vivant & arts de la scène": "Interprétation et production théâtrale ou musicale.",
  "Métiers du luxe & savoir-faire d exception": "Création haut de gamme mêlant tradition et innovation.",
  "Régie & technique du spectacle": "Gestion des aspects techniques d'événements artistiques.",

  "Commerce de détail & retail": "Vente directe aux consommateurs.",
  "E-commerce & marketplaces": "Vente en ligne et gestion de plateformes numériques.",
  "Vente B2B & négociation commerciale": "Relations commerciales entre entreprises.",
  "Représentation & prospection": "Développement de clientèle sur le terrain.",
  "Merchandising & mise en valeur produits": "Optimisation de la présentation des produits.",
  "Marketing stratégique": "Étude de marché et positionnement des offres.",
  "Marketing digital & réseaux sociaux": "Promotion via les outils numériques.",
  "Communication commerciale & influence": "Stratégies de persuasion et fidélisation.",
  "Achats & approvisionnement": "Sélection et négociation avec les fournisseurs.",
  "Gestion de rayon & management de point de vente": "Pilotage opérationnel des équipes et stocks.",
  "Immobilier commercial": "Vente et location d'espaces professionnels.",
  "Banque & assurance commerciale": "Vente de produits financiers et d'assurance.",
  "Service client & relation après-vente": "Suivi et satisfaction des clients.",
  "Commerce du luxe & clientèle premium": "Vente haut de gamme et expérience exclusive.",
  "Vente en ligne & marketplaces spécialisées": "Plateformes ciblées sur des niches de produits.",

  "Journalisme & presse écrite": "Recherche, rédaction et diffusion d'informations vérifiées.",
  "Audiovisuel & production radio/TV": "Réalisation et diffusion d'émissions ou reportages.",
  "Relations publiques & événementiel": "Gestion de l'image d'une organisation et organisation d'événements.",
  "Communication d entreprise": "Promotion interne et externe d'une marque ou institution.",
  "Communication publique & politique": "Information et influence dans le secteur public.",
  "Édition & correction": "Relecture, mise en page et diffusion d'ouvrages.",
  "Création de contenus numériques": "Production de vidéos, posts, podcasts ou blogs.",
  "Publicité & stratégie de marque": "Création de campagnes pour valoriser des produits ou services.",
  "Influence, réseaux & storytelling": "Construction d'une image de marque par la narration et les médias sociaux.",
  "Traduction & interprétation": "Passage fidèle d'un message d'une langue à une autre.",
  "Médiation culturelle & animation de projets": "Transmission de la culture au grand public.",
  "Podcasting & création audio": "Production de formats audio indépendants.",

  "Architecture & conception": "Création de bâtiments et espaces de vie.",
  "Gros œuvre & maçonnerie": "Construction des structures principales.",
  "Second œuvre & finitions": "Travaux de finition intérieure et extérieure.",
  "Menuiserie & charpente bois": "Fabrication et pose d'éléments en bois.",
  "Plomberie, chauffage & climatisation": "Installation et entretien des réseaux techniques.",
  "Électricité & domotique": "Réseaux électriques et automatismes du bâtiment.",
  "Travaux publics & voirie": "Infrastructures routières, ponts, réseaux.",
  "Génie civil & infrastructures": "Conception et réalisation d'ouvrages complexes.",
  "Rénovation énergétique & éco-bâtiment": "Travaux visant la performance énergétique.",
  "Études techniques & dessin bâtiment": "Plans, modélisation et conception technique.",
  "Coordination & conduite de chantier": "Organisation et suivi des travaux.",
  "Gestion immobilière & copropriétés": "Suivi administratif et technique des biens.",
  "Aménagement urbain & espaces publics": "Planification et mise en valeur des villes.",

  "Droit privé & judiciaire": "Défense des droits des particuliers.",
  "Droit des affaires & fiscalité": "Conseil juridique aux entreprises.",
  "Droit social & du travail": "Relations employeurs-salariés et protection sociale.",
  "Droit public & institutions": "Encadrement des collectivités et politiques publiques.",
  "Administration publique": "Gestion courante des services de l'État.",
  "Ressources humaines & médiation": "Recrutement, dialogue social et accompagnement.",
  "Gouvernance territoriale & collectivités locales": "Gestion des politiques locales.",
  "Diplomatie & relations internationales": "Représentation et négociation entre États.",
  "Gestion des marchés publics": "Commandes et appels d'offres publics.",
  "Intelligence juridique & conformité": "Veille réglementaire et prévention des risques.",
  "Notariat & professions réglementées": "Sécurisation des actes et transactions.",

  "Enseignement primaire": "Transmission des savoirs fondamentaux.",
  "Enseignement secondaire": "Encadrement des adolescents et préparation aux examens.",
  "Enseignement supérieur": "Formation et recherche à l'université ou en école.",
  "Formation professionnelle & continue": "Apprentissage pour adultes et salariés.",
  "Orientation & accompagnement": "Aide à la construction de parcours individuels.",
  "Coaching & développement personnel": "Accompagnement du changement et de la motivation.",
  "Ingénierie pédagogique": "Conception de programmes et supports de formation.",
  "Éducation spécialisée & médiation éducative": "Soutien aux publics fragiles.",
  "Recherche en sciences de l éducation": "Études sur les méthodes d'apprentissage.",
  "Animation socioculturelle": "Activités éducatives et sociales collectives.",

  "Gestion des déchets & recyclage": "Valorisation des matières usées.",
  "Traitement de l eau & dépollution": "Purification et gestion des eaux usées.",
  "Énergies renouvelables (solaire, éolien, hydraulique)": "Production d'énergie verte (solaire, éolien...).",
  "Hydrogène & stockage d énergie": "Développement des nouvelles filières énergétiques.",
  "Énergie nucléaire & sûreté": "Production d'électricité et sécurité des installations.",
  "Génie climatique & efficacité énergétique": "Optimisation de la consommation d'énergie.",
  "Adaptation au changement climatique": "Stratégies pour limiter les impacts climatiques.",
  "Bilan carbone & comptabilité environnementale": "Mesure et réduction des émissions.",
  "Écoconception & économie circulaire": "Conception durable des produits.",
  "Aménagement durable des territoires": "Urbanisme écoresponsable.",
  "Ingénierie environnementale": "Études techniques et solutions écologiques.",
  "Protection de la biodiversité & conservation": "Sauvegarde des écosystèmes.",
  "Restauration écologique & gestion des milieux naturels": "Réhabilitation d'espaces dégradés.",
  "Mobilité durable & transports propres": "Solutions de déplacement bas carbone.",
  "Agriculture régénératrice & sols vivants": "Pratiques agricoles restauratrices.",
  "Gestion des risques naturels & résilience": "Prévention et préparation face aux aléas.",

  "Comptabilité & fiscalité": "Suivi des comptes et déclarations fiscales.",
  "Audit & contrôle de gestion": "Vérification de la performance financière.",
  "Trésorerie & financement": "Gestion des flux et besoins de liquidités.",
  "Banque & assurance": "Services financiers aux particuliers et entreprises.",
  "Conseil en gestion de patrimoine": "Optimisation de l'épargne et des placements.",
  "Gestion d entreprise & administration": "Pilotage global d'une organisation.",
  "Finance durable & investissement responsable": "Financement éthique et vert.",
  "Gestion de projets financiers": "Conception et suivi d'opérations budgétaires.",
  "Fintech & services financiers numériques": "Innovation dans les paiements et crédits.",
  "Gestion budgétaire publique": "Comptabilité et contrôle des finances de l'État.",
  "Contrôle interne & conformité": "Sécurité et fiabilité des procédures financières.",

  "Cuisine gastronomique": "Création culinaire haut de gamme.",
  "Restauration collective": "Préparation de repas pour groupes.",
  "Service & sommellerie": "Accueil et conseil en salle.",
  "Hôtellerie & hébergement": "Gestion de séjours et services associés.",
  "Accueil & réception": "Premier contact et assistance clients.",
  "Tourisme local & culturel": "Valorisation du patrimoine et des territoires.",
  "Tourisme international": "Accueil et accompagnement de visiteurs étrangers.",
  "Événementiel & congrès": "Organisation d'événements professionnels.",
  "Management hôtelier": "Pilotage d'établissements touristiques.",
  "Œnotourisme & terroir": "Découverte du vin et de la gastronomie locale.",
  "Gestion durable du tourisme": "Tourisme responsable et respectueux des ressources.",

  "Transaction immobilière résidentielle": "Achat et vente de logements.",
  "Transaction immobilière d entreprise & commerces": "Négociation de biens professionnels.",
  "Promotion & développement immobilier": "Construction et valorisation de projets.",
  "Gestion locative & syndic de copropriété": "Administration de biens et copropriétés.",
  "Expertise & évaluation immobilière": "Analyse de la valeur d'un bien.",
  "Investissement & conseil patrimonial immobilier": "Stratégies d'achat et de placement.",
  "Aménagement foncier & urbanisme opérationnel": "Planification et gestion du sol.",
  "Immobilier social & logement accompagné": "Gestion de l'habitat pour publics fragiles.",
  "Facility management & gestion technique de bâtiments": "Maintenance et services aux bâtiments.",
  "Immobilier de luxe & biens d exception": "Gestion d'actifs haut de gamme.",

  "Production industrielle": "Fabrication en série de biens et produits finis.",
  "Maintenance & SAV": "Entretien et réparation des équipements.",
  "Mécanique & usinage": "Conception et transformation de pièces métalliques.",
  "Électrotechnique & automatisme": "Commande et automatisation des systèmes électriques.",
  "Robotique & cobotique": "Collaboration homme-machine dans la production.",
  "Chimie & matériaux": "Transformation de la matière et création de composés.",
  "Aéronautique & spatial": "Conception et maintenance d'aéronefs et satellites.",
  "Métallurgie & sidérurgie": "Transformation des métaux et alliages.",
  "Industrie pharmaceutique": "Fabrication de médicaments et vaccins.",
  "Plasturgie & composites": "Conception d'objets en polymères et matériaux innovants.",
  "Qualité, sécurité & environnement industriel": "Contrôle des normes et prévention des risques.",
  "Supply chain industrielle": "Coordination logistique de la production.",
  "Fabrication additive & impression 3D": "Production par couches successives.",
  "Industrie textile & habillement": "Confection et transformation des tissus.",
  "Micro-électronique & semi-conducteurs": "Production de circuits et composants électroniques.",
  "Industries extractives & carrières": "Exploitation des ressources naturelles.",
  "Construction & maintenance navale": "Bâtiment et entretien de navires.",

  "Logistique & entreposage": "Gestion des flux et stockage des marchandises.",
  "Supply chain management": "Pilotage global des chaînes d'approvisionnement.",
  "Douanes & commerce international": "Gestion des échanges transfrontaliers.",
  "Transport routier & livraison": "Acheminement terrestre de marchandises.",
  "Transport ferroviaire": "Exploitation et maintenance des réseaux de trains.",
  "Transport aérien": "Exploitation et organisation du trafic aérien.",
  "Transport maritime & fluvial": "Navigation commerciale et logistique portuaire.",
  "Mobilité urbaine & transports publics": "Déplacements collectifs en ville.",
  "Gestion de flotte & maintenance": "Suivi et entretien de véhicules.",
  "Logistique urbaine & dernier kilomètre": "Livraison locale et circuits courts.",
  "Activités portuaires & maritimes": "Gestion et exploitation des infrastructures portuaires.",
  "Mobilité autonome & véhicules intelligents": "Conception et exploitation de transports automatisés.",

  "Création d entreprise & start-up": "Lancement et développement d'activités innovantes.",
  "Gestion de projets": "Organisation et suivi d'objectifs collectifs.",
  "Innovation & transformation digitale": "Intégration de nouvelles technologies.",
  "Management d équipe": "Encadrement et motivation des collaborateurs.",
  "RSE & développement durable": "Intégration des enjeux sociaux et environnementaux.",
  "Stratégie d entreprise": "Planification des orientations à long terme.",
  "Pilotage de structures publiques ou privées": "Gouvernance et performance organisationnelle.",
  "Management interculturel": "Coordination d'équipes internationales.",
  "Conseil & accompagnement stratégique": "Analyse et recommandation pour les dirigeants.",
  "Gouvernance & leadership éthique": "Prise de décision responsable et inspirante.",

  "Développement web & mobile": "Création d'applications et de sites internet.",
  "DevOps & cloud computing": "Automatisation et hébergement de systèmes informatiques.",
  "Cybersécurité": "Protection des réseaux et données.",
  "Réseaux & systèmes": "Installation et maintenance des infrastructures informatiques.",
  "Intelligence artificielle & machine learning": "Conception d'algorithmes d'apprentissage.",
  "Data science & big data": "Analyse et valorisation de grandes bases de données.",
  "Réalité augmentée & métavers": "Expériences numériques immersives.",
  "UX/UI design": "Conception d'interfaces centrées sur l'utilisateur.",
  "Informatique industrielle & IoT": "Objets connectés et automatisation des processus.",
  "Logiciels métiers & ERP": "Outils de gestion pour entreprises.",
  "No-code & automation": "Création d'applications sans programmation.",
  "Design numérique & multimédia": "Graphisme et création d'environnements digitaux.",
  "Blockchain & web3": "Technologies décentralisées et sécurisées.",
  "Informatique durable & sobriété numérique": "Réduction de l'empreinte écologique du numérique.",
  "Gaming, jeux vidéo & développement ludique": "Conception de jeux interactifs.",
  "E-sport, streaming & création de contenu gaming": "Compétition et diffusion de jeux vidéo.",

  "Médecine générale": "Soins courants et prévention.",
  "Chirurgie & spécialités hospitalières": "Interventions et soins techniques.",
  "Radiologie & imagerie médicale": "Diagnostic par l'image.",
  "Biologie & analyses médicales": "Études de prélèvements biologiques.",
  "Pharmacie & biotechnologies": "Développement et distribution de traitements.",
  "Infirmier & soins paramédicaux": "Accompagnement des patients au quotidien.",
  "Rééducation & kinésithérapie": "Restauration des capacités physiques.",
  "Santé mentale & psychologie": "Prise en charge des troubles psychiques.",
  "Nutrition & diététique": "Équilibre alimentaire et santé.",
  "Santé publique & prévention": "Promotion du bien-être collectif.",
  "Accompagnement des personnes âgées": "Soins et assistance en gérontologie.",
  "Médecine du sport": "Prévention et suivi des sportifs.",
  "Médecine connectée & télésanté": "Soins à distance et outils numériques.",

  "Physique & astrophysique": "Étude des lois de l'univers et de la matière.",
  "Mathématiques & statistiques": "Modélisation et analyse quantitative.",
  "Chimie & matériaux": "Recherche sur les réactions et nouveaux matériaux.",
  "Biotechnologies": "Innovation à partir du vivant.",
  "Géosciences & climatologie": "Étude de la Terre et des phénomènes climatiques.",
  "Neurosciences & cognition": "Exploration du cerveau et du comportement.",
  "Sciences humaines & sociales": "Analyse des sociétés et comportements humains.",
  "Recherche en éducation": "Étude des processus d'apprentissage.",
  "Recherche appliquée & transfert technologique": "Passage de la science au produit.",
  "R&D en entreprise": "Innovation intégrée à la production.",
  "Études et consulting scientifique": "Expertise et accompagnement de projets techniques.",

  "Police & gendarmerie": "Maintien de l'ordre et protection des citoyens.",
  "Pompiers & secours": "Interventions d'urgence et sauvetage.",
  "Sécurité privée & surveillance": "Protection des biens et des personnes.",
  "Protection civile": "Organisation des secours en cas de catastrophe.",
  "Défense & armée": "Sécurité nationale et opérations extérieures.",
  "Renseignement & sécurité stratégique": "Collecte et analyse d'informations sensibles.",
  "Sécurité informatique & cyberdéfense": "Prévention des attaques numériques.",
  "Sécurité des infrastructures critiques": "Protection des réseaux essentiels (énergie, transport...).",
  "Gestion de crise & résilience territoriale": "Coordination des réponses aux urgences.",
  "Prévention des risques & sûreté publique": "Surveillance et évaluation des menaces.",
  "Industrie de défense & armement": "Conception d'équipements militaires.",

  "Aide à domicile": "Soutien aux personnes dépendantes.",
  "Travail social & insertion": "Accompagnement vers l'autonomie et l'emploi.",
  "Enfance & jeunesse": "Protection et éducation des jeunes publics.",
  "Handicap & inclusion": "Soutien à la participation sociale des personnes handicapées.",
  "Santé mentale & accompagnement": "Suivi social et psychologique.",
  "Animation & médiation sociale": "Création de lien et d'activités collectives.",
  "Protection de l enfance": "Défense des droits et sécurité des mineurs.",
  "Économie sociale & solidaire": "Entreprises à finalité sociale et collective.",
  "Bénévolat & engagement citoyen": "Actions solidaires et collectives.",
  "Gestion d établissements médico-sociaux": "Pilotage de structures d'accueil.",
  "Médiation familiale": "Résolution de conflits familiaux.",
  "Services à la personne & assistance familiale": "Soutien à domicile et accompagnement quotidien.",
  "Accompagnement funéraire & thanatologie": "Soutien aux familles et organisation des rites.",

  "Coaching sportif": "Entraînement personnalisé et motivation.",
  "Animation & loisirs": "Encadrement d'activités de détente.",
  "Éducation physique & enseignement du sport": "Formation sportive en milieu scolaire.",
  "Encadrement sportif & fédérations": "Organisation et arbitrage des pratiques.",
  "Gestion d équipements sportifs": "Direction d'installations ou clubs.",
  "Médiation par le sport": "Utilisation du sport à des fins sociales ou éducatives.",
  "Nutrition & bien-être": "Équilibre alimentaire et hygiène de vie.",
  "Sport santé & réathlétisation": "Activité physique adaptée à la santé.",
  "Organisation d événements sportifs": "Planification et logistique de compétitions.",
  "Tourisme sportif": "Voyages et séjours autour du sport.",
  "E-sport & compétition numérique": "Compétition professionnelle de jeux vidéo.",

  "Robotique humanoïde avancée": "Conception de robots capables d'interagir naturellement.",
  "Technologies immersives nouvelle génération (XR, haptique)": "Interfaces sensorielles et réalités augmentées.",
  "Biotechnologies avancées & bio-ingénierie": "Innovation à l'échelle du vivant.",
  "AgroTech & FoodTech": "Nouvelles technologies pour l'agriculture et l'alimentation.",
  "CleanTech & GreenTech": "Solutions technologiques pour réduire l'impact écologique.",
  "HealthTech & MedTech": "Dispositifs connectés et innovations médicales.",
  "SpaceTech & exploration spatiale": "Technologies dédiées à l'espace et aux satellites.",
  "Économie créative & travail numérique indépendant": "Nouvelles formes de métiers autonomes et digitaux."
};

// 3) UNIVERS (21) — pondérations = matrices mères (ordre des 12 intérêts)
const universes = [
  // 1
  { id: 1,  name: "🌾 Agriculture, nature & animaux",
    weights: [3,2,2,2,1,2,2,2,3,1,2,3],
    description: "Cultivez, élevez, protégez la nature et travaillez avec les animaux.",
    subUniverses: [
      "Cultures et productions végétales",
      "Élevage et soins animaliers",
      "Gestion et aménagement rural",
      "Recherche et environnement agricole",
      "Agroalimentaire et transformation"
    ]
  },
  // 2
  { id: 2,  name: "🎨 Arts, design & création",
    weights: [1,2,1,1,3,3,1,2,3,2,1,2],
    description: "Créez, dessinez et exprimez votre créativité artistique.",
    subUniverses: [
      "Arts visuels & peinture",
      "Design et conception",
      "Métiers d’art et artisanat",
      "Spectacle vivant et audiovisuel"
    ]
  },
  // 3
  { id: 3,  name: "🛒 Commerce, marketing & vente",
    weights: [1,1,2,2,2,3,2,3,3,2,3,2],
    description: "Vendez, négociez et développez des stratégies commerciales.",
    subUniverses: [
      "Vente et relation client",
      "Marketing et communication",
      "Management commercial",
      "E-commerce et digital"
    ]
  },
  // 4
  { id: 4,  name: "🎙️ Communication, médias & culture",
    weights: [0,1,3,2,3,3,1,3,3,2,2,2],
    description: "Informez, divertissez, communiquez à travers les médias.",
    subUniverses: [
      "Journalisme & presse écrite",
      "Communication d entreprise", // (≈ Communication et marque)
      "Médiation culturelle & animation de projets", // (≈ Culture et médiation)
      "Création de contenus numériques" // (≈ Création numérique et multimédia)
    ]
  },
  // 5
  { id: 5,  name: "🏗️ Construction, BTP & habitat",
    weights: [3,3,2,3,1,2,1,2,3,2,2,3],
    description: "Construisez, rénovez et concevez des espaces de vie et de travail.",
    subUniverses: [
      "Travaux publics & voirie",              // ≈ Travaux et chantier
      "Études techniques & dessin bâtiment",   // ≈ Études et conception
      "Maintenance & SAV",                     // ≈ Maintenance et sécurité (transverse BTP/industrie)
      "Coordination & conduite de chantier"    // ≈ Management et maîtrise d’œuvre
    ]
  },
  // 6
  { id: 6,  name: "🏛️ Droit, administration & politique publique",
    weights: [0,0,3,1,0,2,2,2,1,2,2,3],
    description: "Organisation, règles et intérêt général.",
    subUniverses: [
      "Droit privé & judiciaire",     // ≈ Droit et justice
      "Administration publique",
      "Droit public & institutions"   // ≈ Politiques publiques (proche)
    ]
  },
  // 7
  { id: 7,  name: "🧠 Éducation, formation & apprentissage",
    weights: [1,1,3,2,2,3,3,3,2,2,1,2],
    description: "Transmission et innovation dans l’apprentissage.",
    subUniverses: [
      "Enseignement primaire",
      "Formation professionnelle & continue",
      "Éducation spécialisée & médiation éducative",
      "Ingénierie pédagogique"
    ]
  },
  // 8
  { id: 8,  name: "🌍 Environnement, climat & énergies",
    weights: [3,2,3,3,1,3,2,2,3,2,3,3],
    description: "Transition écologique entre science, terrain et gouvernance.",
    subUniverses: [
      "Restauration écologique & gestion des milieux naturels", // ≈ Milieux naturels
      "Énergies renouvelables (solaire, éolien, hydraulique)",  // ≈ Énergies & génie env.
      "Ingénierie environnementale",                            // ≈ Contrôle & sécurité (qualité/env.)
      "Aménagement durable des territoires",
      "Gestion des risques naturels & résilience",              // ≈ Stratégie & politiques (axe risques)
      "Gestion des déchets & recyclage"                         // ≈ Sensibilisation & accompagnement (proche technique)
    ]
  },
  // 9
  { id: 9,  name: "📈 Gestion, finance & comptabilité",
    weights: [0,1,3,2,1,2,1,2,2,2,3,3],
    description: "Univers rigoureux et analytique axé sur la fiabilité et le pilotage.",
    subUniverses: [
      "Comptabilité & fiscalité",
      "Analyse financière",              // ≈ Audit & contrôle de gestion (proche)
      "Contrôle interne & conformité",   // ≈ Contrôle & audit
      "Gestion d entreprise & administration" // ≈ Gestion stratégique
    ]
  },
  // 10
  { id: 10, name: "🏭 Industrie, fabrication & production",
    weights: [2,3,2,3,1,2,1,2,3,2,3,3],
    description: "Production, maintenance, qualité et conception intégrées dans le cycle industriel.",
    subUniverses: [
      "Production industrielle",
      "Maintenance & SAV",
      "Qualité, sécurité & environnement industriel",
      "Ingénierie environnementale", // ≈ Ingénierie (proche)
      "Supply chain industrielle"    // ≈ Management & logistique
    ]
  },
  // 11
  { id: 11, name: "📊 Management, entrepreneuriat & stratégie",
    weights: [1,1,2,2,2,3,2,3,3,3,3,3],
    description: "Pilotage, leadership et innovation dans la gestion et l’entreprise.",
    subUniverses: [
      "Management d équipe",                    // ≈ Management opérationnel
      "Création d entreprise & start-up",       // ≈ Entrepreneuriat et innovation
      "Ressources humaines & médiation",        // ≈ RH & organisation
      "Stratégie d entreprise"                  // ≈ Stratégie & direction
    ]
  },
  // 12
  { id: 12, name: "💾 Numérique, informatique & data",
    weights: [0,2,3,3,2,3,1,2,3,2,3,3],
    description: "Univers technologique et créatif alliant code, design et stratégie.",
    subUniverses: [
      "Développement web & mobile",
      "Réseaux & systèmes",           // ≈ Systèmes & réseaux
      "Cybersécurité",
      "Data science & big data",      // ≈ Data & IA
      "UX/UI design",                 // ≈ Design numérique & UX
      "No-code & automation"          // ≈ Stratégie digitale & pilotage (proche exécution)
    ]
  },
  // 13
  { id: 13, name: "🏥 Santé, bien-être & médical",
    weights: [2,2,2,3,1,2,3,2,2,2,2,3],
    description: "Univers de soin et de recherche, combinant humanité et rigueur scientifique.",
    subUniverses: [
      "Médecine générale",                     // ≈ Soins médicaux & paramédicaux
      "Santé publique & prévention",
      "Bien-être & accompagnement",            // ≈ Bien-être & accompagnement
      "Recherche en biomédical",               // ≈ Recherche médicale & innovation (proche libellé)
      "Gestion d établissements médico-sociaux"// ≈ Gestion & coordination sanitaire
    ]
  },
  // 14
  { id: 14, name: "🔬 Sciences, recherche & innovation",
    weights: [0,1,3,3,1,3,1,1,2,2,3,3],
    description: "Exploration, expérimentation et création de nouvelles connaissances.",
    subUniverses: [
      "Recherche fondamentale",
      "Recherche appliquée & transfert technologique", // fusion de 2 entrées proches
      "Études et consulting scientifique"              // ≈ Innovation & transfert
    ]
  },
  // 15
  { id: 15, name: "🛡️ Sécurité, défense & urgence",
    weights: [3,2,3,2,0,1,1,2,3,2,2,3],
    description: "Discipline, action et engagement pour la protection des populations.",
    subUniverses: [
      "Police & gendarmerie",        // ≈ Forces de l’ordre
      "Pompiers & secours",          // ≈ Sécurité civile & secours
      "Défense & armée"              // ≈ Défense & armée
    ]
  },
  // 16
  { id: 16, name: "🤲 Social, aide & solidarité",
    weights: [1,0,2,1,1,2,3,3,2,1,1,3],
    description: "Action humaine et collective au service de la cohésion sociale.",
    subUniverses: [
      "Accompagnement social",
      "Aide à domicile",                 // ≈ Aide médico-sociale (proche)
      "Médiation & prévention",          // ≈ Médiation et prévention
      "Développement local & ESS",
      "Coordination sociale"
    ]
  },
  // 17
  { id: 17, name: "🏃‍♂️ Sport, loisirs & vie active",
    weights: [3,2,1,1,2,1,2,3,3,2,1,2],
    description: "Mouvement, énergie et accompagnement dans la pratique physique.",
    subUniverses: [
      "Animation & loisirs",               // ≈ Animation sportive
      "Entraînement & performance",
      "Gestion d équipements sportifs"     // ≈ Gestion & encadrement sportif
    ]
  },
  // 18
  { id: 18, name: "🧭 Technologies émergentes & futur du travail",
    weights: [0,2,3,3,2,3,1,2,3,3,3,3],
    description: "Innovation de rupture et transformation des modèles de travail.",
    subUniverses: [
      "Intelligence artificielle & machine learning", // ≈ IA & robotique (proche IA)
      "Biotechnologies avancées & bio-ingénierie",
      "Mobilité autonome & véhicules intelligents",   // ≈ Mobilité & tech vertes (angle techno)
      "Économie créative & travail numérique indépendant" // ≈ Économie du futur & innovation
    ]
  },
  // 19
  { id: 19, name: "🏨 Tourisme, hôtellerie & loisirs",
    weights: [2,1,2,1,2,1,3,3,3,2,2,2],
    description: "Hospitalité, service et expérience client au cœur des activités.",
    subUniverses: [
      "Accueil & réception",
      "Hôtellerie & hébergement",     // ≈ Hôtellerie & restauration
      "Tourisme local & culturel",    // ≈ Tourisme & animation
      "Management hôtelier"           // ≈ Gestion touristique (proche management)
    ]
  },
  // 20
  { id: 20, name: "🏙️ Urbanisme, aménagement & territoires",
    weights: [1,2,3,2,1,3,1,2,2,3,3,3],
    description: "Planification et durabilité dans la gestion des espaces humains.",
    subUniverses: [
      "Urbanisme & planification",
      "Architecture & conception",          // ≈ Architecture & construction durable
      "Aménagement du territoire",
      "Gouvernance territoriale & collectivités locales" // ≈ Gouvernance locale
    ]
  },
  // 21
  { id: 21, name: "🎭 Arts, culture & patrimoine",
    weights: [1,1,2,1,3,3,2,3,2,2,1,2],
    description: "Création et transmission du patrimoine artistique et culturel.",
    subUniverses: [
      "Médiation culturelle & animation de projets",
      "Gestion culturelle",
      "Patrimoine, muséographie & restauration d art" // ≈ Patrimoine & conservation
    ]
  }
];

// 4) SCORING — calcule un score % par univers à partir d’un profil (12 réponses 0–3)
// Méthode : similarité pondérée par la "force" de l'attente (weight/3), contribution = (3 - |resp - weight|)
function calculateUniverseScores(responses /* array[12] de 0..3 */) {
  if (!Array.isArray(responses) || responses.length !== 12) {
    console.warn("calculateUniverseScores: responses doit être un array de 12 valeurs (0..3).");
    return [];
  }
  const MAX_PER_DIM = 3; // écart max normalisé
  const out = universes.map(u => {
    let num = 0;
    let den = 0;
    for (let i = 0; i < 12; i++) {
      const w = u.weights[i];                // 0..3 (matrice mère)
      const imp = w / 3;                     // importance 0..1
      const contrib = MAX_PER_DIM - Math.abs((responses[i] ?? 0) - w); // 0..3
      num += imp * contrib;
      den += imp * MAX_PER_DIM;
    }
    const pct = den > 0 ? Math.round((num / den) * 100) : 0;
    return { id: u.id, name: u.name, score: pct };
  });
  // tri décroissant
  out.sort((a, b) => b.score - a.score || a.id - b.id);
  return out;
}

// 5) EXPORT GLOBAL
window.dataIA360 = {
  interests,
  subUniverseDefinitions,
  universes,
  calculateUniverseScores
};
