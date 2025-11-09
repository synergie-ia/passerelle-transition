// 12 Dimensions d'intérêts professionnels (Questionnaire adulte)
const interests = [
  {
    id: 1,
    code: "MO",
    name: "Méthode & organisation",
    question: "Quand vous travaillez sur quelque chose d'important :",
    statements: [
      "Vous ressentez le besoin de tout planifier dans les détails avant de commencer",
      "Vous préférez suivre une méthode éprouvée plutôt que d'improviser",
      "Vous êtes mal à l'aise si les choses ne sont pas clairement cadrées dès le départ",
      "Vous trouvez rassurant d'avoir des procédures à suivre, même si elles peuvent sembler rigides"
    ]
  },
  {
    id: 2,
    code: "PT",
    name: "Pratique & technique",
    question: "Face à un problème concret :",
    statements: [
      "Votre premier réflexe est de manipuler, tester, bricoler pour comprendre",
      "Vous apprenez mieux en 'faisant' qu'en lisant des explications théoriques",
      "Vous pouvez passer des heures à perfectionner un geste ou régler finement quelque chose",
      "Vous vous sentez plus compétent avec des outils dans les mains que dans des discussions abstraites"
    ]
  },
  {
    id: 3,
    code: "AL",
    name: "Analyse & logique",
    question: "Quand un problème se présente :",
    statements: [
      "Vous avez tendance à vouloir décortiquer tous les aspects avant de proposer une solution",
      "Vous êtes frustré si on vous demande d'agir sans avoir d'abord tout analysé",
      "Vous préférez prendre le temps de comprendre en profondeur plutôt que d'avoir une réponse rapide",
      "Vous êtes agacé par les raisonnements approximatifs ou les affirmations non vérifiées"
    ]
  },
  {
    id: 4,
    code: "SI",
    name: "Sciences & innovation",
    question: "Face à l'inconnu ou à un défi technique :",
    statements: [
      "Vous êtes stimulé par ce qui n'a jamais été fait ou ce qui semble impossible",
      "Vous acceptez facilement que vos tentatives échouent si cela fait avancer la compréhension",
      "Vous préférez expérimenter de nouvelles approches plutôt qu'appliquer des solutions connues",
      "Vous supportez bien l'incertitude et l'absence de garantie de résultat"
    ]
  },
  {
    id: 5,
    code: "EC",
    name: "Conception & structuration d'idées",
    question: "Avant de passer à l'action :",
    statements: [
      "Vous avez besoin de visualiser mentalement l'ensemble du projet dans ses moindres détails",
      "Vous passez beaucoup de temps à organiser vos idées en schémas ou plans structurés",
      "Vous êtes mal à l'aise si vous devez commencer sans avoir une vision claire de l'architecture globale",
      "Vous préférez concevoir le cadre général que vous laisser à d'autres, plutôt qu'exécuter vous-même"
    ]
  },
  {
    id: 6,
    code: "EX",
    name: "Expression & création",
    question: "Dans vos productions (travaux, projets, créations) :",
    statements: [
      "Vous ressentez le besoin impérieux d'y mettre votre 'patte' personnelle",
      "Vous êtes frustré quand vous devez strictement suivre des consignes sans marge de créativité",
      "Vous assumez de faire des choix originaux même s'ils peuvent être critiqués",
      "Vous préférez créer quelque chose d'imparfait mais personnel qu'une copie parfaite d'un modèle"
    ]
  },
  {
    id: 7,
    code: "MV",
    name: "Mouvement & plein air",
    question: "Dans votre quotidien :",
    statements: [
      "Vous ressentez un vrai inconfort physique si vous devez rester assis longtemps au même endroit",
      "Vous avez besoin de bouger, de vous déplacer pour maintenir votre concentration",
      "Vous êtes nettement plus énergique et efficace en extérieur ou dans un environnement changeant",
      "Les espaces fermés et statiques vous donnent une sensation d'enfermement"
    ]
  },
  {
    id: 8,
    code: "CP",
    name: "Coordination & pilotage",
    question: "Dans une dynamique de groupe :",
    statements: [
      "Vous voyez naturellement qui fait quoi et comment mieux organiser l'ensemble",
      "Vous êtes à l'aise pour répartir les rôles et arbitrer quand il y a désaccord",
      "Vous préférez avoir une vue d'ensemble et coordonner plutôt que vous concentrer sur une seule tâche",
      "Vous supportez bien la pression de devoir maintenir la cohésion et l'avancement global"
    ]
  },
  {
    id: 9,
    code: "IP",
    name: "Initiative & projet",
    question: "Face à une situation établie :",
    statements: [
      "Vous voyez rapidement ce qui pourrait être amélioré ou fait différemment",
      "Vous ressentez de la frustration quand 'on a toujours fait comme ça' sans questionner",
      "Vous préférez créer quelque chose de nouveau plutôt qu'optimiser l'existant",
      "Vous êtes prêt à prendre des risques et essayer même sans garantie de succès"
    ]
  },
  {
    id: 10,
    code: "AT",
    name: "Attention & transmission",
    question: "Dans vos interactions avec les autres :",
    statements: [
      "Vous ressentez une réelle satisfaction quand quelqu'un comprend grâce à vous",
      "Vous êtes patient face aux difficultés d'apprentissage des autres",
      "Vous prenez plaisir à adapter vos explications jusqu'à trouver la bonne approche",
      "Vous trouvez gratifiant de voir quelqu'un devenir autonome grâce à votre accompagnement"
    ]
  },
  {
    id: 11,
    code: "TP",
    name: "Travail de proximité",
    question: "Dans votre façon de travailler :",
    statements: [
      "Vous avez besoin de voir rapidement le résultat concret de vos actions",
      "Vous êtes à l'aise dans l'urgence et les situations qui demandent une réaction immédiate",
      "Vous préférez résoudre plusieurs petits problèmes concrets qu'un seul gros projet théorique",
      "Vous êtes frustré par les projets à très long terme où l'impact n'est pas visible avant des mois"
    ]
  },
  {
    id: 12,
    code: "RI",
    name: "Relationnel & influence",
    question: "Dans vos échanges avec les autres :",
    statements: [
      "Vous percevez intuitivement les dynamiques relationnelles et les non-dits",
      "Vous adaptez spontanément votre communication selon votre interlocuteur",
      "Vous êtes à l'aise pour convaincre ou faire évoluer le point de vue de quelqu'un",
      "Vous considérez la qualité de la relation comme un outil de travail, pas seulement un contexte agréable"
    ]
  }
];

// 21 Univers avec leurs matrices de corrélation (coefficients 0, 1, 3, 6)
const universes = [
  { id: 1, name: "Agriculture, nature & animaux", icon: "🌾", 
    weights: [3, 6, 0, 1, 0, 0, 6, 0, 3, 0, 6, 0] },
  { id: 2, name: "Arts, design & création", icon: "🎨", 
    weights: [0, 3, 0, 0, 6, 6, 0, 0, 3, 0, 0, 1] },
  { id: 3, name: "Commerce, marketing & vente", icon: "🛒", 
    weights: [0, 0, 0, 0, 0, 0, 0, 3, 1, 3, 6, 6] },
  { id: 4, name: "Communication, médias & culture", icon: "📺", 
    weights: [0, 0, 0, 0, 3, 6, 0, 0, 1, 0, 1, 6] },
  { id: 5, name: "Construction, BTP & habitat", icon: "🏗️", 
    weights: [1, 6, 0, 0, 0, 0, 6, 3, 0, 0, 6, 0] },
  { id: 6, name: "Droit, administration & politique publique", icon: "⚖️", 
    weights: [6, 0, 6, 0, 0, 0, 0, 0, 0, 0, 3, 1] },
  { id: 7, name: "Éducation, formation & apprentissage", icon: "🎓", 
    weights: [0, 0, 0, 0, 1, 3, 0, 0, 0, 6, 6, 6] },
  { id: 8, name: "Environnement, climat & énergies", icon: "🌍", 
    weights: [0, 0, 6, 6, 1, 0, 3, 3, 1, 0, 0, 0] },
  { id: 9, name: "Gestion, finance & comptabilité", icon: "💰", 
    weights: [6, 0, 6, 0, 0, 0, 0, 3, 0, 0, 0, 1] },
  { id: 10, name: "Hôtellerie, restauration & tourisme", icon: "🏨", 
    weights: [0, 0, 0, 0, 0, 1, 0, 0, 6, 0, 3, 6] },
  { id: 11, name: "Immobilier & patrimoine", icon: "🏠", 
    weights: [1, 0, 3, 0, 0, 0, 0, 0, 6, 0, 0, 6] },
  { id: 12, name: "Industrie, fabrication & production", icon: "⚙️", 
    weights: [6, 6, 3, 0, 0, 0, 0, 1, 3, 1, 0, 0] },
  { id: 13, name: "Logistique, transport & mobilité", icon: "🚚", 
    weights: [6, 3, 0, 0, 0, 0, 0, 6, 3, 1, 0, 0] },
  { id: 14, name: "Management, entrepreneuriat & stratégie", icon: "📊", 
    weights: [0, 0, 3, 0, 0, 0, 0, 6, 6, 0, 0, 1] },
  { id: 15, name: "Numérique, informatique & data", icon: "💻", 
    weights: [0, 1, 6, 3, 6, 0, 0, 0, 0, 1, 0, 0] },
  { id: 16, name: "Santé, bien-être & médical", icon: "⚕️", 
    weights: [0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 6, 1] },
  { id: 17, name: "Sciences, recherche & innovation", icon: "🔬", 
    weights: [1, 0, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0] },
  { id: 18, name: "Sécurité, défense & urgence", icon: "🚨", 
    weights: [1, 0, 0, 0, 0, 0, 0, 6, 3, 6, 6, 0] },
  { id: 19, name: "Social, aide & solidarité", icon: "❤️", 
    weights: [0, 0, 1, 0, 0, 3, 0, 0, 0, 6, 6, 6] },
  { id: 20, name: "Sport, loisirs & vie active", icon: "⚽", 
    weights: [0, 0, 0, 0, 0, 3, 6, 0, 0, 0, 6, 1] },
  { id: 21, name: "Technologies émergentes & futur du travail", icon: "🚀", 
    weights: [0, 0, 1, 6, 6, 0, 0, 0, 6, 0, 0, 0] }
];
