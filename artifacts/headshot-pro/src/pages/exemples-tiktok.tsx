import { useRoute, Link } from "wouter";

type Experience = {
  period: string;
  title: string;
  company: string;
  bullets: string[];
};

type Persona = {
  id: string;
  lang?: "fr" | "en";
  photoId?: string;
  name: string;
  age: number;
  role: string;
  city: string;
  email: string;
  phone: string;
  address: string;
  caption: string;
  cv: {
    title: string;
    summary: string;
    realisations: string[];
    experiences: Experience[];
    education: { period: string; title: string; school: string; detail?: string };
    skills: string[];
    qualities: string[];
    languages: { name: string; level: string }[];
    interests: string[];
    availability: string[];
  };
};

const PERSONAS: Persona[] = [
  {
    id: "lea",
    name: "Léa Marchand",
    age: 22,
    role: "Étudiante en alternance Marketing",
    city: "Paris",
    email: "lea.marchand@gmail.com",
    phone: "06 12 34 56 78",
    address: "rue de Belleville, Paris 20e",
    caption: "Avant : selfie pris dans ma chambre. Après : photo qui pourrait sortir d'un studio. 4,99 € en tout. #cv #linkedin",
    cv: {
      title: "Étudiante en Marketing · Alternance",
      summary: "Étudiante en Master 1 Marketing, en alternance dans une agence digitale parisienne. Curieuse, organisée, à l'aise sur les réseaux sociaux et avec les outils data, je cherche à transformer chaque campagne en levier mesurable.",
      realisations: [
        "Pilotage d'une campagne Meta Ads à 8K€ de budget, ROAS 4,2 sur 3 mois.",
        "Refonte du calendrier éditorial Instagram : +38 % de portée organique en un trimestre.",
        "Mise en place d'un dashboard Notion suivi par 4 chefs de projet de l'agence.",
      ],
      experiences: [
        {
          period: "sept 2024 — présent",
          title: "Alternante Marketing Digital",
          company: "Agence Comète · Paris",
          bullets: [
            "Création et optimisation de campagnes Meta & Google Ads pour 6 clients PME.",
            "Production de contenus (carrousels, reels) et reporting hebdomadaire client.",
            "Veille tendances réseaux sociaux et benchmark concurrentiel mensuel.",
          ],
        },
        {
          period: "été 2023",
          title: "Stagiaire Communication",
          company: "Maison Pernoud · Reims",
          bullets: [
            "Animation du compte Instagram (passage de 2,1k à 3,4k abonnés).",
            "Coordination du shooting de la collection printemps avec 2 prestataires.",
          ],
        },
      ],
      education: {
        period: "2023 — 2025",
        title: "Master Marketing & Communication",
        school: "Sorbonne Business School",
        detail: "Spécialisation Brand Strategy & Data Marketing ; mémoire sur le retail media.",
      },
      skills: ["Meta Ads", "Google Ads", "GA4", "Notion", "Canva", "Figma", "Excel avancé"],
      qualities: ["Curieuse", "Organisée", "Esprit d'équipe", "Adaptable", "Force de proposition"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "B2 — courant" },
        { name: "Espagnol", level: "B1 — intermédiaire" },
      ],
      interests: [
        "Podcasts marketing (GMB, Marketing Mania)",
        "Course à pied (semi-marathon 2024)",
        "Photographie argentique",
      ],
      availability: ["Alternance 3 sem. / 1 sem. école", "Mobile Île-de-France"],
    },
  },
  {
    id: "karim",
    name: "Karim Saïdi",
    age: 28,
    role: "Développeur full-stack freelance",
    city: "Nantes",
    email: "karim.saidi@gmail.com",
    phone: "06 23 45 67 89",
    address: "quai de la Fosse, Nantes",
    caption: "Je perds plus mon temps à harceler un photographe. Selfie → photo studio → CV PDF. 4,99 €. #freelance #dev",
    cv: {
      title: "Développeur Full-Stack · Freelance",
      summary: "8 ans d'expérience en développement web et mobile. Spécialisé React, Node.js et TypeScript, j'interviens pour des startups et PME sur du build from scratch comme sur des refontes, en posant des bases techniques solides et testées.",
      realisations: [
        "Refonte SaaS B2B (50k utilisateurs) : -62 % de temps de chargement, +14 % de rétention.",
        "Mise en production d'une API GraphQL pour une fintech, scalée à 1,2M req/jour.",
        "Mentor de 4 développeurs juniors sur 2 ans, deux d'entre eux passés lead dev.",
      ],
      experiences: [
        {
          period: "2021 — présent",
          title: "Développeur Full-Stack Freelance",
          company: "Indépendant · Nantes",
          bullets: [
            "Conception et développement d'applications web (Next.js, Node, Postgres) pour 11 clients.",
            "Mise en place CI/CD, monitoring, tests E2E ; revue de code et accompagnement équipe.",
            "Cadrage produit avec les fondateurs, chiffrage et planning trimestriel.",
          ],
        },
        {
          period: "2018 — 2021",
          title: "Lead Developer",
          company: "Hopstack · Paris",
          bullets: [
            "Encadrement d'une équipe de 5 développeurs sur la plateforme principale.",
            "Migration monolithe → micro-services, réduction des coûts AWS de 35 %.",
          ],
        },
      ],
      education: {
        period: "2014 — 2017",
        title: "Master Informatique",
        school: "Université de Nantes",
        detail: "Parcours génie logiciel ; projet de fin d'études primé (compilateur DSL).",
      },
      skills: ["React", "Node.js", "TypeScript", "Postgres", "GraphQL", "AWS", "Docker", "Tests E2E"],
      qualities: ["Rigoureux", "Pédagogue", "Autonome", "Pragmatique", "Orienté impact"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "C1 — fluent (tech)" },
        { name: "Arabe", level: "B2 — courant" },
      ],
      interests: [
        "Contributions open-source (React, tRPC)",
        "Veille IA appliquée au dev",
        "Course à pied & escalade",
      ],
      availability: ["Freelance 4 j/sem.", "Remote France / déplacements ponctuels"],
    },
  },
  {
    id: "sofia",
    name: "Sofia Mendes",
    age: 34,
    role: "Consultante RH senior",
    city: "Bordeaux",
    email: "sofia.mendes@gmail.com",
    phone: "06 34 56 78 90",
    address: "cours de l'Intendance, Bordeaux",
    caption: "Réponse : sur mon canapé, avec un selfie. 4,99 €, 5 minutes, photo + CV. C'est ridicule comparé au prix d'un shooting. #rh #carriere",
    cv: {
      title: "Consultante RH · Talent & Culture",
      summary: "10 ans dans les RH dont 6 en cabinet de conseil. Recrutement cadres, conduite du changement, marque employeur : j'aide les dirigeants à structurer leur organisation et à fidéliser leurs équipes clés.",
      realisations: [
        "Recrutement de 38 cadres dirigeants sur 3 ans, taux de rétention à 24 mois de 89 %.",
        "Conduite du changement post-fusion (220 collaborateurs) sans rupture d'activité.",
        "Refonte de la marque employeur d'une scale-up : +210 % de candidatures spontanées.",
      ],
      experiences: [
        {
          period: "2020 — présent",
          title: "Consultante Senior RH",
          company: "Talenteo · Bordeaux",
          bullets: [
            "Pilotage de missions de recrutement cadres et de transformation pour 14 clients PME / ETI.",
            "Animation d'ateliers culture, co-construction des plans de développement managérial.",
            "Encadrement de 2 consultants juniors et d'une chargée de recherche.",
          ],
        },
        {
          period: "2016 — 2020",
          title: "Chargée de recrutement",
          company: "Sogeris · Toulouse",
          bullets: [
            "Sourcing et qualification de profils techniques (industrie, énergie).",
            "Mise en place d'un ATS et de process d'entretien structurés.",
          ],
        },
      ],
      education: {
        period: "2012 — 2014",
        title: "Master Gestion des Ressources Humaines",
        school: "IAE Bordeaux",
        detail: "Mémoire de fin d'études : engagement post-télétravail dans les ETI familiales.",
      },
      skills: ["Recrutement cadres", "Conduite du changement", "Marque employeur", "SIRH", "Assessment", "Coaching"],
      qualities: ["Écoute active", "Diplomate", "Structurée", "Engagée", "Fiable"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Portugais", level: "Bilingue" },
        { name: "Anglais", level: "C1 — courant" },
      ],
      interests: [
        "Podcasts RH (Le Lab RH)",
        "Bénévolat Pro Bono",
        "Randonnée pyrénéenne",
      ],
      availability: ["Disponible sous 1 mois", "Bordeaux + déplacements Sud-Ouest"],
    },
  },
  {
    id: "marc",
    name: "Marc Pottier",
    age: 41,
    role: "Commercial grands comptes B2B",
    city: "Lille",
    email: "marc.pottier@gmail.com",
    phone: "06 45 67 89 01",
    address: "avenue de la République, Lille",
    caption: "Quand tu vends à des CAC 40, ta photo ne peut pas être un truc flou de vacances. 4,99 € pour avoir l'air pro. #vente #b2b",
    cv: {
      title: "Key Account Manager · Industrie B2B",
      summary: "15 ans en vente B2B dans l'industrie. Gestion d'un portefeuille de grands comptes (CA 8 M€), négociation de contrats-cadres et animation d'équipe commerciale. Profil chasseur autant qu'éleveur, à l'aise avec les cycles de vente longs.",
      realisations: [
        "Croissance du portefeuille de 4,2 à 8 M€ de CA en 4 ans (+90 %).",
        "Signature d'un contrat-cadre 3 ans avec un acteur du CAC 40 (5,4 M€).",
        "Mise en place d'une démarche grands comptes adoptée par 12 KAM du groupe.",
      ],
      experiences: [
        {
          period: "2019 — présent",
          title: "Key Account Manager",
          company: "Schneider Electric · Lille",
          bullets: [
            "Pilotage de 6 comptes stratégiques, négociation de contrats-cadres pluriannuels.",
            "Coordination avant-vente, projet, juridique et finance sur des deals 7 chiffres.",
            "Encadrement fonctionnel de 3 ingénieurs commerciaux régionaux.",
          ],
        },
        {
          period: "2013 — 2019",
          title: "Ingénieur commercial",
          company: "Legrand · Limoges",
          bullets: [
            "Développement du portefeuille Nord-Est, 110 % d'objectif en moyenne.",
            "Animation du réseau distributeurs (32 partenaires).",
          ],
        },
      ],
      education: {
        period: "2006 — 2008",
        title: "Master Management Commercial",
        school: "EDHEC Business School",
        detail: "Majeure Sales Performance ; mémoire sur la vente complexe industrielle.",
      },
      skills: ["Négociation", "Vente complexe", "CRM Salesforce", "Forecasting", "Account planning", "Closing"],
      qualities: ["Tenace", "À l'écoute", "Sens du résultat", "Esprit d'équipe", "Intègre"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "C1 — négociation" },
        { name: "Allemand", level: "B2 — courant" },
      ],
      interests: [
        "Vélo route (300 km / mois)",
        "Coaching équipe U15 football",
        "Lecture biographies dirigeants",
      ],
      availability: ["Disponible sous 3 mois", "Hauts-de-France + déplacements Europe"],
    },
  },
  {
    id: "naima",
    name: "Naïma Fadel",
    age: 30,
    role: "Sage-femme libérale",
    city: "Strasbourg",
    email: "naima.fadel@gmail.com",
    phone: "06 56 78 90 12",
    address: "rue de la Krutenau, Strasbourg",
    caption: "En tant que sage-femme, mon visage compte autant que mon diplôme. Là j'ai enfin une vraie photo pro. 4,99 €. #santé #sagefemme",
    cv: {
      title: "Sage-femme · Cabinet libéral",
      summary: "Sage-femme diplômée d'État, 7 ans d'expérience dont 4 en libéral. Suivi de grossesse, préparation à la naissance, rééducation périnéale. Patientèle fidélisée, approche bienveillante et pédagogique.",
      realisations: [
        "Création et développement d'un cabinet libéral : 320 patientes actives en 3 ans.",
        "Mise en place d'ateliers de préparation à la naissance en duo (couples) : taux de remplissage 95 %.",
        "Formation continue échographie obstétricale, intégration au cabinet en 2024.",
      ],
      experiences: [
        {
          period: "2021 — présent",
          title: "Sage-femme libérale",
          company: "Cabinet Naissance · Strasbourg",
          bullets: [
            "Suivi global de grossesse et de post-partum, consultations gynéco de prévention.",
            "Préparation à la naissance, rééducation périnéale, accompagnement allaitement.",
            "Coordination avec gynécologues, pédiatres et PMI du secteur.",
          ],
        },
        {
          period: "2018 — 2021",
          title: "Sage-femme hospitalière",
          company: "CHU de Strasbourg · maternité niveau 3",
          bullets: [
            "Accueil, surveillance et accouchement physiologique en salle de naissance.",
            "Tutorat d'étudiants sages-femmes (4e et 5e années).",
          ],
        },
      ],
      education: {
        period: "2013 — 2018",
        title: "Diplôme d'État de sage-femme",
        school: "École de sages-femmes de Strasbourg",
        detail: "Mémoire sur le vécu du post-partum en sortie précoce.",
      },
      skills: ["Suivi grossesse", "Échographie obstétricale", "Rééducation périnéale", "Allaitement", "Consultation gynéco"],
      qualities: ["Bienveillante", "Calme", "Pédagogue", "Rigoureuse", "Empathique"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Arabe", level: "Bilingue" },
        { name: "Anglais", level: "B2 — courant" },
      ],
      interests: [
        "Yoga prénatal (formation 2023)",
        "Randonnée Vosges",
        "Bénévolat planning familial",
      ],
      availability: ["Cabinet ouvert lun-ven", "Astreintes week-end 1/4"],
    },
  },
  {
    id: "elodie",
    name: "Élodie Vasseur",
    age: 36,
    role: "Architecte d'intérieur indépendante",
    city: "Nice",
    email: "elodie.vasseur@gmail.com",
    phone: "06 67 89 01 23",
    address: "promenade des Anglais, Nice",
    caption: "Quand tu vends de la déco, ton CV ne peut pas être moche. Là c'est sobre, élégant, ça parle pour moi. 4,99 €. #archi #design",
    cv: {
      title: "Architecte d'intérieur · Indépendante",
      summary: "12 ans à dessiner des intérieurs résidentiels et commerciaux haut de gamme sur la Côte d'Azur. Projets de la villa privée à la boutique de luxe, avec un goût marqué pour les matériaux nobles et la lumière naturelle.",
      realisations: [
        "Livraison de 22 projets résidentiels haut de gamme (>300k€ travaux).",
        "Aménagement d'une boutique de joaillerie cannoise primée Design Awards 2023.",
        "Constitution d'un réseau de 14 artisans partenaires (menuisiers, marbriers, peintres).",
      ],
      experiences: [
        {
          period: "2018 — présent",
          title: "Architecte d'intérieur indépendante",
          company: "Studio Vasseur · Nice",
          bullets: [
            "Conception et suivi de chantier de villas, appartements et boutiques (50 à 800 m²).",
            "Pilotage du planning, des coûts et de la coordination des corps d'état.",
            "Présentation client : moodboards, 3D, échantillonnage matériaux.",
          ],
        },
        {
          period: "2013 — 2018",
          title: "Architecte d'intérieur",
          company: "Agence Pinto · Cannes",
          bullets: [
            "Projets résidentiels haut de gamme pour clients internationaux.",
            "Dessins d'exécution, plans techniques et chiffrage entreprises.",
          ],
        },
      ],
      education: {
        period: "2008 — 2013",
        title: "DSAA Design d'espace",
        school: "Camondo Méditerranée",
        detail: "Diplômée avec mention ; projet de fin d'études sur l'habitat méditerranéen.",
      },
      skills: ["AutoCAD", "SketchUp", "3DS Max", "V-Ray", "Direction de chantier", "Chiffrage"],
      qualities: ["Créative", "Précise", "Sens du détail", "Diplomate", "Fiable"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Italien", level: "Bilingue" },
        { name: "Anglais", level: "B2 — courant" },
      ],
      interests: [
        "Voyages design (Milan, Lisbonne)",
        "Céramique contemporaine",
        "Yoga & marche en bord de mer",
      ],
      availability: ["Carnet ouvert pour 2026", "Côte d'Azur + Monaco"],
    },
  },
  {
    id: "pierre",
    name: "Pierre Aubert",
    age: 47,
    role: "Manager opérationnel en reconversion",
    city: "Bordeaux",
    email: "pierre.aubert@gmail.com",
    phone: "06 78 90 12 34",
    address: "rue Sainte-Catherine, Bordeaux",
    caption: "Je ne voulais pas poser devant un photographe. Là j'ai fait ma photo et mon CV depuis mon salon. 4,99 €, deux rendez-vous calés. #reconversion",
    cv: {
      title: "Manager opérationnel · Reconversion",
      summary: "20 ans de gestion d'un restaurant indépendant (équipe de 12, 800 couverts/semaine). En reconversion vers des fonctions de management opérationnel dans le retail ou la restauration de chaîne, j'apporte un terrain solide et le goût du résultat.",
      realisations: [
        "Restaurant repris à 24 ans, rentabilité maintenue 20 années consécutives.",
        "Constitution et fidélisation d'une équipe de 12 personnes, turnover < 10 %.",
        "Pilotage d'une rénovation complète sans fermeture (planning travaux nuit).",
      ],
      experiences: [
        {
          period: "2005 — 2024",
          title: "Gérant restaurant",
          company: "La Table d'Aubert · Bordeaux",
          bullets: [
            "Management d'une équipe de 12 personnes (salle + cuisine).",
            "Suivi P&L, achats, marges, négociation fournisseurs.",
            "Relation client, gestion des avis et fidélisation patientèle locale.",
          ],
        },
        {
          period: "2001 — 2005",
          title: "Chef de salle",
          company: "Le Pressoir d'Argent · Bordeaux",
          bullets: [
            "Service en salle dans un restaurant gastronomique (1 étoile).",
            "Formation de 3 promotions de commis et chefs de rang.",
          ],
        },
      ],
      education: {
        period: "2024 — 2025",
        title: "Bachelor Management Opérationnel",
        school: "CNAM Nouvelle-Aquitaine",
        detail: "Formation continue ; modules pilotage, finance, RH.",
      },
      skills: ["Management d'équipe", "Gestion P&L", "Relation client", "Recrutement", "Achats", "Hygiène HACCP"],
      qualities: ["Terrain", "Résilient", "Fiable", "Bon communicant", "Décideur"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "B2 — opérationnel" },
        { name: "Espagnol", level: "A2 — notions" },
      ],
      interests: [
        "Œnologie (WSET 2 obtenu)",
        "Course à pied (10 km en 48 min)",
        "Coaching jeunes restaurateurs",
      ],
      availability: ["Disponible immédiatement", "Bordeaux + Nouvelle-Aquitaine"],
    },
  },
  {
    id: "hugo",
    name: "Hugo Mercier",
    age: 19,
    role: "Étudiant école de commerce",
    city: "Lille",
    email: "hugo.mercier@gmail.com",
    phone: "06 89 01 23 45",
    address: "rue Solférino, Lille",
    caption: "À 19 ans t'as pas l'argent d'un studio photo. Là pour 4,99 € j'ai un CV qui ressemble à quelque chose. Stage signé. #etudiant #stage",
    cv: {
      title: "Étudiant · École de commerce",
      summary: "Étudiant en deuxième année à EDHEC Lille, ouvert sur l'international (Erasmus prévu en 2026). Bénévole associatif et opérationnel terrain en restauration, je cherche une alternance marketing ou business development.",
      realisations: [
        "VP Communication du BDE EDHEC : +45 % de portée Instagram sur l'année.",
        "Organisation d'une soirée caritative (320 invités, 4 200 € reversés).",
        "Mention bien au baccalauréat (spé Maths / SES).",
      ],
      experiences: [
        {
          period: "été 2024",
          title: "Équipier polyvalent",
          company: "Big Fernand · Lille",
          bullets: [
            "Service en salle et préparation produits sur shift en rush.",
            "Formation de 2 nouveaux équipiers à l'arrivée en rentrée.",
          ],
        },
        {
          period: "2023 — 2024",
          title: "VP Communication BDE",
          company: "BDE EDHEC · Lille",
          bullets: [
            "Animation des comptes Instagram et TikTok du BDE (3,2k abonnés).",
            "Coordination d'une équipe de 6 bénévoles sur les événements campus.",
          ],
        },
      ],
      education: {
        period: "2023 — 2027",
        title: "Programme Grande École",
        school: "EDHEC Business School · Lille",
        detail: "Bachelor 2e année ; double diplôme envisagé en M1.",
      },
      skills: ["Pack Office", "Canva", "Notion", "CapCut", "Prise de parole", "Veille marketing"],
      qualities: ["Énergique", "Curieux", "Esprit d'équipe", "Fiable", "Sens du collectif"],
      languages: [
        { name: "Français", level: "Langue maternelle" },
        { name: "Anglais", level: "C1 — courant" },
        { name: "Espagnol", level: "B2 — courant" },
      ],
      interests: [
        "Football (capitaine équipe école)",
        "Podcasts business (GDIY)",
        "Voyages sac à dos",
      ],
      availability: ["Stage 4 mois à partir d'avril 2026", "Lille / Paris / Bruxelles"],
    },
  },
];

const EN_PERSONAS: Persona[] = [
  {
    id: "emma",
    lang: "en",
    photoId: "lea",
    name: "Emma Whitfield",
    age: 22,
    role: "Marketing student · Placement year",
    city: "London",
    email: "emma.whitfield@gmail.com",
    phone: "+44 7700 900123",
    address: "Bethnal Green, London E2",
    caption: "Before: a selfie in my bedroom. After: a portrait that could've come out of a studio. £4.99 total. #cv #linkedin",
    cv: {
      title: "Marketing Student · Placement Year",
      summary: "Final-year MSc Marketing student on placement at a London digital agency. Curious, organised, comfortable with social platforms and analytics — I turn campaigns into measurable outcomes.",
      realisations: [
        "Ran a £7K Meta Ads campaign, 4.2 ROAS over three months.",
        "Rebuilt the Instagram content calendar: +38% organic reach in one quarter.",
        "Shipped a Notion reporting dashboard used by 4 project managers across the agency.",
      ],
      experiences: [
        {
          period: "Sept 2024 — present",
          title: "Digital Marketing Placement",
          company: "Comet Agency · London",
          bullets: [
            "Built and optimised Meta & Google Ads campaigns for 6 SME clients.",
            "Produced content (carousels, reels) and weekly client reporting.",
            "Monthly competitive benchmark and social trend monitoring.",
          ],
        },
        {
          period: "Summer 2023",
          title: "Communications Intern",
          company: "Maison Pernoud · Reims",
          bullets: [
            "Grew the Instagram account from 2.1k to 3.4k followers.",
            "Coordinated the spring collection shoot with 2 external suppliers.",
          ],
        },
      ],
      education: {
        period: "2023 — 2025",
        title: "MSc Marketing & Communication",
        school: "King's Business School, London",
        detail: "Specialisation in Brand Strategy & Data Marketing; dissertation on retail media.",
      },
      skills: ["Meta Ads", "Google Ads", "GA4", "Notion", "Canva", "Figma", "Advanced Excel"],
      qualities: ["Curious", "Organised", "Team player", "Adaptable", "Proactive"],
      languages: [
        { name: "English", level: "Native" },
        { name: "French", level: "B2 — fluent" },
        { name: "Spanish", level: "B1 — intermediate" },
      ],
      interests: [
        "Marketing podcasts (How I Built This)",
        "Running (half-marathon, 2024)",
        "Film photography",
      ],
      availability: ["Placement 3 weeks on / 1 week class", "Mobile across Greater London"],
    },
  },
  {
    id: "aarav",
    lang: "en",
    photoId: "karim",
    name: "Aarav Patel",
    age: 28,
    role: "Freelance full-stack developer",
    city: "Manchester",
    email: "aarav.patel@gmail.com",
    phone: "+44 7700 900234",
    address: "Northern Quarter, Manchester",
    caption: "I'm not chasing photographers anymore. Selfie → studio shot → PDF CV. £4.99. #freelance #dev",
    cv: {
      title: "Full-Stack Developer · Freelance",
      summary: "8 years building web and mobile products. Specialised in React, Node.js and TypeScript, I work with startups and SMEs on greenfield builds and rebuilds, laying down solid, tested foundations.",
      realisations: [
        "Rebuilt a B2B SaaS (50k users): -62% load time, +14% retention.",
        "Shipped a GraphQL API for a fintech, scaled to 1.2M req/day.",
        "Mentored 4 junior developers over 2 years — two became lead devs.",
      ],
      experiences: [
        {
          period: "2021 — present",
          title: "Freelance Full-Stack Developer",
          company: "Independent · Manchester",
          bullets: [
            "Designed and built web apps (Next.js, Node, Postgres) for 11 clients.",
            "Set up CI/CD, monitoring, E2E testing; ran code reviews and team coaching.",
            "Product scoping with founders, quarterly estimates and roadmap.",
          ],
        },
        {
          period: "2018 — 2021",
          title: "Lead Developer",
          company: "Hopstack · London",
          bullets: [
            "Led a team of 5 engineers on the core platform.",
            "Monolith → microservices migration, 35% AWS cost reduction.",
          ],
        },
      ],
      education: {
        period: "2014 — 2017",
        title: "MSc Computer Science",
        school: "University of Manchester",
        detail: "Software engineering track; award-winning final project (DSL compiler).",
      },
      skills: ["React", "Node.js", "TypeScript", "Postgres", "GraphQL", "AWS", "Docker", "E2E testing"],
      qualities: ["Rigorous", "Mentoring mindset", "Independent", "Pragmatic", "Impact-driven"],
      languages: [
        { name: "English", level: "Native" },
        { name: "Hindi", level: "Bilingual" },
        { name: "French", level: "B1 — conversational" },
      ],
      interests: [
        "Open-source contributions (React, tRPC)",
        "Applied-AI research watch",
        "Running & bouldering",
      ],
      availability: ["Freelance 4 days/week", "Remote UK / occasional travel"],
    },
  },
  {
    id: "sarah",
    lang: "en",
    photoId: "sofia",
    name: "Sarah O'Connor",
    age: 34,
    role: "Senior HR consultant",
    city: "Dublin",
    email: "sarah.oconnor@gmail.com",
    phone: "+353 87 123 4567",
    address: "Ranelagh, Dublin 6",
    caption: "Answer: on my sofa, with a selfie. €4.99, 5 minutes, photo + CV. Beats a studio shoot. #hr #careers",
    cv: {
      title: "HR Consultant · Talent & Culture",
      summary: "10 years in HR including 6 in consulting. Executive search, change management, employer brand — I help leadership teams structure their organisation and retain key talent.",
      realisations: [
        "Placed 38 senior executives in 3 years; 24-month retention rate of 89%.",
        "Led post-merger change for 220 employees with no business disruption.",
        "Rebuilt a scale-up's employer brand: +210% inbound applications.",
      ],
      experiences: [
        {
          period: "2020 — present",
          title: "Senior HR Consultant",
          company: "Talenteo · Dublin",
          bullets: [
            "Ran executive search and transformation engagements for 14 SME/mid-market clients.",
            "Facilitated culture workshops and co-built leadership development plans.",
            "Coached 2 junior consultants and a research lead.",
          ],
        },
        {
          period: "2016 — 2020",
          title: "Recruitment Officer",
          company: "Sogeris · Cork",
          bullets: [
            "Sourced and qualified technical profiles (industry, energy).",
            "Rolled out an ATS and structured interview process.",
          ],
        },
      ],
      education: {
        period: "2012 — 2014",
        title: "MSc Human Resource Management",
        school: "Trinity College Dublin",
        detail: "Dissertation: post-remote engagement in family-owned mid-market firms.",
      },
      skills: ["Executive search", "Change management", "Employer brand", "HRIS", "Assessment", "Coaching"],
      qualities: ["Active listener", "Diplomatic", "Structured", "Committed", "Reliable"],
      languages: [
        { name: "English", level: "Native" },
        { name: "Irish", level: "Conversational" },
        { name: "French", level: "C1 — fluent" },
      ],
      interests: [
        "HR podcasts (Redefining Work)",
        "Pro bono volunteering",
        "Hiking in Wicklow",
      ],
      availability: ["Available within 1 month", "Dublin + Leinster travel"],
    },
  },
  {
    id: "mark",
    lang: "en",
    photoId: "marc",
    name: "Mark Holloway",
    age: 41,
    role: "B2B key account manager",
    city: "Birmingham",
    email: "mark.holloway@gmail.com",
    phone: "+44 7700 900345",
    address: "Edgbaston, Birmingham",
    caption: "When you sell to FTSE 100 clients, your photo can't be a blurry holiday shot. £4.99 to look the part. #sales #b2b",
    cv: {
      title: "Key Account Manager · B2B Industry",
      summary: "15 years in B2B industrial sales. Managing a £6M strategic-accounts portfolio, negotiating framework contracts and leading a regional sales team. Hunter and farmer alike, comfortable with long sales cycles.",
      realisations: [
        "Grew the portfolio from £3.2M to £6M revenue in 4 years (+88%).",
        "Signed a 3-year framework contract with a FTSE 100 buyer (£4M).",
        "Built a strategic-accounts playbook adopted by 12 KAMs across the group.",
      ],
      experiences: [
        {
          period: "2019 — present",
          title: "Key Account Manager",
          company: "Schneider Electric · Birmingham",
          bullets: [
            "Owned 6 strategic accounts, negotiating multi-year framework contracts.",
            "Coordinated pre-sales, project, legal and finance on 7-figure deals.",
            "Functional management of 3 regional sales engineers.",
          ],
        },
        {
          period: "2013 — 2019",
          title: "Sales Engineer",
          company: "Legrand UK · Birmingham",
          bullets: [
            "Grew the Midlands & North-East territory at 110% of target on average.",
            "Managed the distributor network (32 partners).",
          ],
        },
      ],
      education: {
        period: "2006 — 2008",
        title: "MSc Sales & Account Management",
        school: "Warwick Business School",
        detail: "Sales Performance major; dissertation on complex industrial selling.",
      },
      skills: ["Negotiation", "Complex selling", "Salesforce CRM", "Forecasting", "Account planning", "Closing"],
      qualities: ["Tenacious", "Good listener", "Results-driven", "Team player", "Honest"],
      languages: [
        { name: "English", level: "Native" },
        { name: "French", level: "C1 — negotiation" },
        { name: "German", level: "B2 — fluent" },
      ],
      interests: [
        "Road cycling (300 km / month)",
        "U15 football coaching",
        "Leadership biographies",
      ],
      availability: ["Available in 3 months", "Midlands + European travel"],
    },
  },
  {
    id: "aisha",
    lang: "en",
    photoId: "naima",
    name: "Aisha Rahman",
    age: 30,
    role: "Private practice midwife",
    city: "Edinburgh",
    email: "aisha.rahman@gmail.com",
    phone: "+44 7700 900456",
    address: "Marchmont, Edinburgh",
    caption: "As a midwife, my face matters as much as my degree. Now I finally have a proper professional photo. £4.99. #healthcare #midwife",
    cv: {
      title: "Midwife · Private Practice",
      summary: "Registered midwife with 7 years of experience including 4 in private practice. Pregnancy care, antenatal classes, postnatal pelvic-floor recovery. Loyal patient base, calm and educational approach.",
      realisations: [
        "Set up and grew a private practice: 320 active patients in 3 years.",
        "Launched couple-based antenatal classes: 95% fill rate.",
        "Completed obstetric ultrasound CPD, now integrated into the practice (2024).",
      ],
      experiences: [
        {
          period: "2021 — present",
          title: "Private Practice Midwife",
          company: "Marchmont Birth Clinic · Edinburgh",
          bullets: [
            "Full pregnancy and postnatal care, preventive gynaecology consults.",
            "Antenatal classes, pelvic-floor recovery, breastfeeding support.",
            "Coordination with gynaecologists, paediatricians and local NHS teams.",
          ],
        },
        {
          period: "2018 — 2021",
          title: "Hospital Midwife",
          company: "Edinburgh Royal Infirmary · Level 3 maternity",
          bullets: [
            "Welcomed, monitored and supported physiological births in the labour ward.",
            "Mentored midwifery students (years 4 and 5).",
          ],
        },
      ],
      education: {
        period: "2013 — 2018",
        title: "BSc (Hons) Midwifery",
        school: "University of Edinburgh",
        detail: "Dissertation on early-discharge postnatal experience.",
      },
      skills: ["Pregnancy care", "Obstetric ultrasound", "Pelvic-floor rehab", "Breastfeeding", "Gynae consults"],
      qualities: ["Caring", "Calm", "Educational", "Rigorous", "Empathetic"],
      languages: [
        { name: "English", level: "Native" },
        { name: "Bengali", level: "Bilingual" },
        { name: "French", level: "B2 — fluent" },
      ],
      interests: [
        "Prenatal yoga (trained 2023)",
        "Hillwalking in the Pentlands",
        "Volunteering with family planning",
      ],
      availability: ["Clinic open Mon-Fri", "Weekend on-call 1 in 4"],
    },
  },
  {
    id: "ellie",
    lang: "en",
    photoId: "elodie",
    name: "Ellie Hartwell",
    age: 36,
    role: "Independent interior designer",
    city: "Brighton",
    email: "ellie.hartwell@gmail.com",
    phone: "+44 7700 900567",
    address: "Kemptown, Brighton",
    caption: "When you sell design, your CV can't look ugly. This is clean, elegant — it speaks for me. £4.99. #design #interiors",
    cv: {
      title: "Interior Designer · Independent",
      summary: "12 years designing high-end residential and commercial interiors along the south coast. From private homes to luxury boutiques, with a strong preference for noble materials and natural light.",
      realisations: [
        "Delivered 22 high-end residential projects (>£250k works).",
        "Designed a Brighton jewellery boutique, winner Design Awards 2023.",
        "Built a network of 14 craft partners (joiners, marble workers, painters).",
      ],
      experiences: [
        {
          period: "2018 — present",
          title: "Independent Interior Designer",
          company: "Studio Hartwell · Brighton",
          bullets: [
            "Designed and supervised builds for villas, flats and boutiques (50–800 m²).",
            "Owned planning, costing and trades coordination.",
            "Client presentations: moodboards, 3D, material sampling.",
          ],
        },
        {
          period: "2013 — 2018",
          title: "Interior Designer",
          company: "Pinto Studio · London",
          bullets: [
            "High-end residential projects for international clients.",
            "Construction drawings, technical plans and contractor pricing.",
          ],
        },
      ],
      education: {
        period: "2008 — 2013",
        title: "BA (Hons) Interior Architecture",
        school: "Central Saint Martins, London",
        detail: "Graduated with distinction; final project on Mediterranean dwelling.",
      },
      skills: ["AutoCAD", "SketchUp", "3DS Max", "V-Ray", "Site supervision", "Costing"],
      qualities: ["Creative", "Precise", "Eye for detail", "Diplomatic", "Reliable"],
      languages: [
        { name: "English", level: "Native" },
        { name: "Italian", level: "Bilingual" },
        { name: "French", level: "B2 — fluent" },
      ],
      interests: [
        "Design travel (Milan, Lisbon)",
        "Contemporary ceramics",
        "Yoga & seafront walks",
      ],
      availability: ["Booking 2026 projects", "South coast + London"],
    },
  },
  {
    id: "peter",
    lang: "en",
    photoId: "pierre",
    name: "Peter Ashworth",
    age: 47,
    role: "Operations manager · Career change",
    city: "Bristol",
    email: "peter.ashworth@gmail.com",
    phone: "+44 7700 900678",
    address: "Clifton, Bristol",
    caption: "I didn't want to stand in front of a photographer. Did my photo and my CV from the sofa. £4.99, two interviews booked. #careerchange",
    cv: {
      title: "Operations Manager · Career Change",
      summary: "20 years running an independent restaurant (team of 12, 800 covers/week). Now moving into operations management in retail or chain hospitality, bringing solid floor experience and a results-first mindset.",
      realisations: [
        "Took over the restaurant at 24; held profitability for 20 consecutive years.",
        "Built and retained a 12-strong team, turnover under 10%.",
        "Ran a full refurbishment with no closure (overnight works planning).",
      ],
      experiences: [
        {
          period: "2005 — 2024",
          title: "Restaurant Owner-Manager",
          company: "The Ashworth Table · Bristol",
          bullets: [
            "Managed a 12-person team (front of house + kitchen).",
            "Owned P&L, purchasing, margins and supplier negotiation.",
            "Customer relations, review management, local loyalty programme.",
          ],
        },
        {
          period: "2001 — 2005",
          title: "Head Waiter",
          company: "The Silver Press · Bristol",
          bullets: [
            "Floor service in a Michelin-starred restaurant.",
            "Trained 3 intakes of commis and section waiters.",
          ],
        },
      ],
      education: {
        period: "2024 — 2025",
        title: "Diploma in Operations Management",
        school: "Open University · UK",
        detail: "Part-time programme; modules in operations, finance, HR.",
      },
      skills: ["Team management", "P&L ownership", "Customer relations", "Recruitment", "Purchasing", "HACCP food safety"],
      qualities: ["Hands-on", "Resilient", "Reliable", "Strong communicator", "Decisive"],
      languages: [
        { name: "English", level: "Native" },
        { name: "French", level: "B2 — operational" },
        { name: "Spanish", level: "A2 — basics" },
      ],
      interests: [
        "Wine (WSET Level 2)",
        "Running (10k in 48 min)",
        "Mentoring young restaurateurs",
      ],
      availability: ["Available immediately", "Bristol + South-West"],
    },
  },
  {
    id: "henry",
    lang: "en",
    photoId: "hugo",
    name: "Henry Caldwell",
    age: 19,
    role: "Business school student",
    city: "London",
    email: "henry.caldwell@gmail.com",
    phone: "+44 7700 900789",
    address: "Bloomsbury, London",
    caption: "At 19 you can't afford a photo studio. £4.99 and I've got a CV that actually looks the part. Internship landed. #student #internship",
    cv: {
      title: "Student · Business School",
      summary: "Second-year student at LSE, international outlook (Erasmus planned for 2026). Charity volunteer and floor-experienced in hospitality, currently looking for a marketing or business development placement.",
      realisations: [
        "VP Communications, Student Union: +45% Instagram reach over the year.",
        "Organised a charity night (320 guests, £3,600 raised).",
        "A-Levels: A*AB (Maths / Economics / History).",
      ],
      experiences: [
        {
          period: "Summer 2024",
          title: "Front of House Crew",
          company: "Honest Burgers · London",
          bullets: [
            "Floor service and prep during rush shifts.",
            "Trained 2 new crew members at the start of term.",
          ],
        },
        {
          period: "2023 — 2024",
          title: "VP Communications · Student Union",
          company: "LSE SU · London",
          bullets: [
            "Ran the SU Instagram and TikTok accounts (3.2k followers).",
            "Coordinated a team of 6 volunteers across campus events.",
          ],
        },
      ],
      education: {
        period: "2023 — 2027",
        title: "BSc Management",
        school: "London School of Economics",
        detail: "Year 2; planning a dual-degree exchange in M1.",
      },
      skills: ["MS Office", "Canva", "Notion", "CapCut", "Public speaking", "Marketing research"],
      qualities: ["Energetic", "Curious", "Team player", "Reliable", "Collaborative"],
      languages: [
        { name: "English", level: "Native" },
        { name: "French", level: "C1 — fluent" },
        { name: "Spanish", level: "B2 — fluent" },
      ],
      interests: [
        "Football (school team captain)",
        "Business podcasts (How I Built This)",
        "Backpacking trips",
      ],
      availability: ["4-month placement from April 2026", "London / Paris / Brussels"],
    },
  },
  {
    id: "grace",
    lang: "en",
    name: "Grace Whitman",
    age: 29,
    role: "Secondary school teacher · English & Literature",
    city: "Bristol",
    email: "grace.whitman@gmail.com",
    phone: "+44 7700 900890",
    address: "Bedminster, Bristol BS3",
    caption: "Headteachers Google you. Now my staff photo actually looks like a real teacher, not a holiday snap. £4.99. #teaching #ukteacher",
    cv: {
      title: "English & Literature Teacher · Secondary",
      summary: "Qualified secondary teacher (QTS) with 6 years of classroom experience across Years 7–13. Form tutor, KS4 lead in English, examiner for a major board. Calm, clear and student-first — I lift attainment without burning the team out.",
      realisations: [
        "Lifted GCSE English Language grade 5+ from 64% to 81% over 3 cohorts.",
        "Designed a whole-school KS3 reading intervention used by 4 departments.",
        "AQA examiner for GCSE English Literature (Paper 2) since 2022.",
      ],
      experiences: [
        {
          period: "2021 — present",
          title: "Teacher of English · KS4 Lead",
          company: "Bristol Cathedral Choir School",
          bullets: [
            "Teaching KS3, KS4 and A-Level English Language & Literature.",
            "Led KS4 curriculum redesign aligned to new AQA spec; ran department CPD.",
            "Form tutor (Year 10), safeguarding lead in absence of DSL.",
          ],
        },
        {
          period: "2019 — 2021",
          title: "Newly Qualified Teacher (NQT) · English",
          company: "Ashton Park School · Bristol",
          bullets: [
            "Full timetable across KS3 and KS4 from year 1.",
            "Set up the school's debate club (32 active members by end of year).",
          ],
        },
      ],
      education: {
        period: "2018 — 2019",
        title: "PGCE Secondary English",
        school: "University of Bristol",
        detail: "Distinction; Schools Direct route, placements in two contrasting comprehensives.",
      },
      skills: ["KS3–KS5 English", "Curriculum design", "Exam marking (AQA)", "Form tutoring", "Safeguarding L2", "EAL adaptation"],
      qualities: ["Calm", "Organised", "Clear communicator", "Empathetic", "Reliable"],
      languages: [
        { name: "English", level: "Native" },
        { name: "French", level: "B2 — fluent" },
        { name: "Welsh", level: "A2 — basics" },
      ],
      interests: [
        "Book club host (modern fiction)",
        "Sea swimming (year round)",
        "Volunteering with the Reading Agency",
      ],
      availability: ["Available from September 2026", "Bristol + South-West"],
    },
  },
  {
    id: "daniel",
    lang: "en",
    name: "Daniel Okafor",
    age: 27,
    role: "Junior product manager · SaaS",
    city: "London",
    email: "daniel.okafor@gmail.com",
    phone: "+44 7700 900901",
    address: "Hackney, London E8",
    caption: "Recruiter said \"nice CV, who took your photo?\". Said: my phone, £4.99 and an AI. He laughed. Got the interview. #productmanager #saas",
    cv: {
      title: "Junior Product Manager · B2B SaaS",
      summary: "Product manager with 3 years in early-stage B2B SaaS. Comfortable shipping iteratively, talking to users weekly and turning messy feedback into a prioritised roadmap. Engineering background, so I write tight specs.",
      realisations: [
        "Shipped the onboarding flow rebuild: activation rate 41% → 63% in one quarter.",
        "Ran 60+ user interviews in 12 months; built the JTBD doc still used by the team.",
        "Cut weekly bug backlog by 38% via a triage ritual adopted by 3 squads.",
      ],
      experiences: [
        {
          period: "2023 — present",
          title: "Associate Product Manager",
          company: "Flowdesk · London",
          bullets: [
            "Owned the activation & onboarding surface across web and mobile.",
            "Wrote PRDs, ran discovery, partnered with design and 4 engineers.",
            "Weekly metric reviews; quarterly OKR planning with the leadership team.",
          ],
        },
        {
          period: "2021 — 2023",
          title: "Software Engineer",
          company: "Monzo · London",
          bullets: [
            "Backend engineer on the payments squad (Go, Postgres).",
            "Rotated into the product guild — first exposure to discovery work.",
          ],
        },
      ],
      education: {
        period: "2017 — 2021",
        title: "BSc Computer Science",
        school: "University College London (UCL)",
        detail: "First-class honours; dissertation on recommendation systems.",
      },
      skills: ["Product discovery", "User interviews", "Roadmapping", "SQL", "Mixpanel / Amplitude", "Figma", "Linear"],
      qualities: ["Curious", "Structured", "User-driven", "Pragmatic", "Calm under pressure"],
      languages: [
        { name: "English", level: "Native" },
        { name: "Igbo", level: "Conversational" },
        { name: "French", level: "B1 — intermediate" },
      ],
      interests: [
        "Product podcasts (Lenny's, Mind the Product)",
        "5-a-side football (weekly)",
        "Cooking West-African food",
      ],
      availability: ["Open to PM roles within 2 months", "London + hybrid"],
    },
  },
  {
    id: "mei",
    lang: "en",
    name: "Mei-Lin Chen",
    age: 31,
    role: "Senior data analyst · E-commerce",
    city: "Amsterdam",
    email: "meilin.chen@gmail.com",
    phone: "+31 6 1234 5678",
    address: "De Pijp, Amsterdam",
    caption: "Data people aren't supposed to care about photos. Turns out hiring managers do. €4.99, done in 5 minutes. #data #analytics",
    cv: {
      title: "Senior Data Analyst · E-commerce",
      summary: "Data analyst with 7 years across e-commerce and consumer apps. I turn messy event data into trustworthy dashboards and ship experiments end-to-end. SQL-first, comfortable in dbt, Looker, and Python notebooks.",
      realisations: [
        "Rebuilt the marketing attribution model: +12% in correctly-attributed paid revenue.",
        "Designed and ran 28 A/B tests in 18 months; 6 winning shipped to production.",
        "Cut the daily ETL runtime from 4h 20m to 47m via dbt incremental models.",
      ],
      experiences: [
        {
          period: "2022 — present",
          title: "Senior Data Analyst",
          company: "Picnic · Amsterdam",
          bullets: [
            "Lead analyst for the growth pod (acquisition, activation, retention).",
            "Owned the experimentation platform reviews; mentored 2 junior analysts.",
            "Built leadership dashboards in Looker used weekly by the C-level.",
          ],
        },
        {
          period: "2019 — 2022",
          title: "Data Analyst",
          company: "ASOS · London",
          bullets: [
            "Funnel analysis across web and iOS; weekly merchandising reviews.",
            "Migrated legacy SQL reporting into dbt (220+ models).",
          ],
        },
      ],
      education: {
        period: "2014 — 2018",
        title: "BSc Statistics & Economics",
        school: "London School of Economics (LSE)",
        detail: "Upper second-class honours; dissertation on consumer churn modelling.",
      },
      skills: ["SQL", "dbt", "Python (pandas)", "Looker", "Experimentation", "GA4", "Snowflake", "Git"],
      qualities: ["Rigorous", "Curious", "Clear communicator", "Pragmatic", "Detail-oriented"],
      languages: [
        { name: "English", level: "Native" },
        { name: "Mandarin", level: "Bilingual" },
        { name: "Dutch", level: "B1 — intermediate" },
      ],
      interests: [
        "Board games (modern Eurogames)",
        "Bouldering",
        "Data journalism (Pudding, FT Visual)",
      ],
      availability: ["Open to lead-analyst roles in EU", "Amsterdam / remote EU"],
    },
  },
  {
    id: "liam",
    lang: "en",
    name: "Liam O'Sullivan",
    age: 38,
    role: "Independent graphic designer",
    city: "Dublin",
    email: "liam.osullivan@gmail.com",
    phone: "+353 86 234 5678",
    address: "Stoneybatter, Dublin 7",
    caption: "If a designer's CV photo looks bad, the case is closed. £4.99, problem solved. #design #branding",
    cv: {
      title: "Graphic Designer · Branding & Editorial",
      summary: "Independent designer with 14 years of experience in brand identity, packaging and editorial. Worked with cultural institutions, indie food brands and B2B scale-ups. Considered, typographic, never trendy for the sake of it.",
      realisations: [
        "Rebrand of the Irish Film Institute (visual system, signage, print).",
        "Packaging system for 3 product lines of an Irish craft distillery (38 SKUs).",
        "Designed and produced an editorial magazine, 4 issues, distributed in 12 cities.",
      ],
      experiences: [
        {
          period: "2017 — present",
          title: "Independent Designer",
          company: "Studio O'Sullivan · Dublin",
          bullets: [
            "Brand identity, packaging, editorial design for 40+ clients.",
            "End-to-end project ownership: discovery, design, print supervision.",
            "Long-term partnerships with 2 cultural institutions (3+ years).",
          ],
        },
        {
          period: "2012 — 2017",
          title: "Senior Designer",
          company: "Atelier & Co · Dublin",
          bullets: [
            "Brand identity work for hospitality and retail clients.",
            "Mentored 3 junior designers across the design system practice.",
          ],
        },
      ],
      education: {
        period: "2008 — 2012",
        title: "BA (Hons) Visual Communication",
        school: "National College of Art and Design (NCAD), Dublin",
        detail: "First-class honours; graduate show featured in Design Week.",
      },
      skills: ["Brand identity", "Typography", "Packaging", "Editorial", "Print production", "Figma", "Adobe CC"],
      qualities: ["Considered", "Curious", "Craft-focused", "Reliable", "Honest"],
      languages: [
        { name: "English", level: "Native" },
        { name: "Irish", level: "Conversational" },
        { name: "French", level: "B1 — intermediate" },
      ],
      interests: [
        "Letterpress workshops",
        "Independent magazines (Eye, Apartamento)",
        "Sea swimming at Forty Foot",
      ],
      availability: ["Booking projects Q3 2026 onwards", "Dublin + Ireland-wide travel"],
    },
  },
];

function Section({ title, children, dark = false }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mb-[3.5cqw]">
      <div
        className={dark ? "text-amber-700 font-bold" : "text-amber-800 font-bold"}
        style={{ fontSize: "2.2cqw", letterSpacing: "0.45cqw", marginBottom: "1.5cqw" }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      className="inline-block bg-white border border-stone-300 text-slate-800 rounded-[0.4cqw]"
      style={{ fontSize: "1.7cqw", padding: "0.7cqw 1.3cqw", margin: "0 0.6cqw 0.7cqw 0" }}
    >
      {label}
    </span>
  );
}

const LABELS = {
  fr: {
    skills: "COMPÉTENCES",
    qualities: "QUALITÉS",
    languages: "LANGUES",
    interests: "INTÉRÊTS",
    availability: "DISPONIBILITÉ",
    profile: "PROFIL",
    achievements: "RÉALISATIONS CLÉS",
    experience: "EXPÉRIENCE PROFESSIONNELLE",
    education: "FORMATION",
    header: "CURRICULUM VITÆ",
  },
  en: {
    skills: "SKILLS",
    qualities: "QUALITIES",
    languages: "LANGUAGES",
    interests: "INTERESTS",
    availability: "AVAILABILITY",
    profile: "PROFILE",
    achievements: "KEY ACHIEVEMENTS",
    experience: "WORK EXPERIENCE",
    education: "EDUCATION",
    header: "CURRICULUM VITAE",
  },
} as const;

function MiniCV({ p }: { p: Persona }) {
  const L = LABELS[p.lang ?? "fr"];
  const photoId = p.photoId ?? p.id;
  return (
    <div className="bg-white text-slate-900 w-full h-full flex flex-col font-serif">
      {/* Top header */}
      <div className="flex items-start justify-between" style={{ padding: "4cqw 4.5cqw 2cqw" }}>
        <div className="flex-1 min-w-0">
          <div className="text-stone-500 font-sans font-semibold" style={{ fontSize: "1.6cqw", letterSpacing: "0.7cqw" }}>
            {L.header}
          </div>
          <div className="text-slate-900 leading-tight" style={{ fontSize: "5.5cqw", marginTop: "1.2cqw" }}>
            {p.name.toLowerCase()}
          </div>
          <div className="italic text-stone-700" style={{ fontSize: "2.1cqw", marginTop: "0.6cqw" }}>
            {p.cv.title}
          </div>
        </div>
        <div className="shrink-0 bg-stone-200 overflow-hidden rounded-[0.5cqw]" style={{ width: "16cqw", height: "20cqw", marginLeft: "3cqw" }}>
          <img src={`${import.meta.env.BASE_URL}exemples/${photoId}.png`} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Contact bar */}
      <div
        className="flex items-center justify-around text-white font-sans"
        style={{ background: "#a98c5a", padding: "1.6cqw 4.5cqw", fontSize: "1.8cqw", letterSpacing: "0.05cqw" }}
      >
        <span>· {p.email}</span>
        <span>· {p.phone}</span>
        <span>· {p.address}</span>
      </div>

      {/* Body: sidebar + main */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="bg-stone-100" style={{ width: "32%", padding: "3cqw 3cqw" }}>
          <Section title={L.skills}>
            <div>
              {p.cv.skills.map(s => <Chip key={s} label={s} />)}
            </div>
          </Section>

          <Section title={L.qualities}>
            <div>
              {p.cv.qualities.map(q => <Chip key={q} label={q} />)}
            </div>
          </Section>

          <Section title={L.languages}>
            <div className="font-sans" style={{ fontSize: "1.8cqw" }}>
              {p.cv.languages.map(l => (
                <div key={l.name} className="flex justify-between items-baseline" style={{ marginBottom: "0.8cqw" }}>
                  <span className="font-bold text-slate-900">{l.name}</span>
                  <span className="italic text-stone-600" style={{ fontSize: "1.6cqw" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title={L.interests}>
            <ul className="font-sans text-slate-800 list-none" style={{ fontSize: "1.75cqw", lineHeight: 1.45 }}>
              {p.cv.interests.map(i => (
                <li key={i} className="flex gap-[1cqw]" style={{ marginBottom: "0.8cqw" }}>
                  <span className="text-amber-700">›</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={L.availability}>
            <ul className="font-sans text-slate-800 list-none" style={{ fontSize: "1.75cqw", lineHeight: 1.45 }}>
              {p.cv.availability.map(a => (
                <li key={a} className="flex gap-[1cqw]" style={{ marginBottom: "0.6cqw" }}>
                  <span className="text-amber-700">›</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Section>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0" style={{ padding: "3cqw 4cqw" }}>
          <Section title={L.profile}>
            <p className="italic text-stone-700 leading-relaxed" style={{ fontSize: "1.9cqw" }}>
              {p.cv.summary}
            </p>
          </Section>

          <Section title={L.achievements}>
            <ul className="list-none text-slate-800" style={{ fontSize: "1.9cqw", lineHeight: 1.45 }}>
              {p.cv.realisations.map(r => (
                <li key={r} className="flex gap-[1cqw]" style={{ marginBottom: "0.9cqw" }}>
                  <span className="text-amber-700 mt-[0.2cqw]">›</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title={L.experience}>
            <div>
              {p.cv.experiences.map((e, i) => (
                <div key={i} style={{ marginBottom: "2.5cqw" }}>
                  <div className="flex justify-between items-baseline gap-[1cqw]">
                    <div className="font-bold text-slate-900" style={{ fontSize: "2.1cqw" }}>{e.title}</div>
                    <div className="text-amber-700 font-bold shrink-0 font-sans" style={{ fontSize: "1.7cqw" }}>{e.period}</div>
                  </div>
                  <div className="italic text-stone-600" style={{ fontSize: "1.85cqw", marginTop: "0.3cqw" }}>{e.company}</div>
                  <ul className="list-none text-slate-800 mt-[0.8cqw]" style={{ fontSize: "1.75cqw", lineHeight: 1.4 }}>
                    {e.bullets.map(b => (
                      <li key={b} className="flex gap-[1cqw]" style={{ marginBottom: "0.4cqw" }}>
                        <span className="text-amber-700 mt-[0.2cqw]">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title={L.education}>
            <div>
              <div className="flex justify-between items-baseline gap-[1cqw]">
                <div className="font-bold text-slate-900" style={{ fontSize: "2.1cqw" }}>{p.cv.education.title}</div>
                <div className="text-amber-700 font-bold shrink-0 font-sans" style={{ fontSize: "1.7cqw" }}>{p.cv.education.period}</div>
              </div>
              <div className="italic text-stone-600" style={{ fontSize: "1.85cqw", marginTop: "0.3cqw" }}>{p.cv.education.school}</div>
              {p.cv.education.detail && (
                <div className="text-slate-700 mt-[0.6cqw]" style={{ fontSize: "1.75cqw", lineHeight: 1.4 }}>
                  {p.cv.education.detail}
                </div>
              )}
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

function TikTokCard({ p }: { p: Persona }) {
  return (
    <div
      className="relative overflow-hidden bg-white"
      style={{
        width: "100%",
        aspectRatio: "9 / 16",
        containerType: "inline-size",
      }}
    >
      <MiniCV p={p} />
    </div>
  );
}

function Gallery({
  personas,
  lang,
  basePath,
}: {
  personas: Persona[];
  lang: "fr" | "en";
  basePath: "/exemples-tiktok" | "/exemples-tiktok-en";
}) {
  const count = personas.length;
  const T = lang === "fr"
    ? {
        back: "← Retour",
        title: "Visuels TikTok prêts à poster",
        intro:
          `${count} cartes au format 9:16 (1080×1920). Cliquez sur une carte pour l'ouvrir en plein écran, puis capturez l'écran ou utilisez « Enregistrer l'image ». La légende suggérée est sous chaque carte.`,
        caption: "Légende suggérée",
        switchTo: "🇬🇧 English version →",
        switchHref: "/exemples-tiktok-en",
      }
    : {
        back: "← Back",
        title: "TikTok-ready CV visuals",
        intro:
          `${count} cards in 9:16 (1080×1920). Click a card to open it full-screen, then screenshot it or use "Save image". The suggested caption sits below each card.`,
        caption: "Suggested caption",
        switchTo: "🇫🇷 Version française →",
        switchHref: "/exemples-tiktok",
      };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900">{T.back}</Link>
          <div className="flex items-start justify-between gap-4 mt-3 mb-2 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold font-serif">{T.title}</h1>
            <Link
              href={T.switchHref}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 underline decoration-dotted underline-offset-4 mt-2"
            >
              {T.switchTo}
            </Link>
          </div>
          <p className="text-slate-600 max-w-2xl">{T.intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map(p => (
            <div key={p.id} className="space-y-3">
              <Link href={`${basePath}/${p.id}`}>
                <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer">
                  <TikTokCard p={p} />
                </div>
              </Link>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-bold">{T.caption}</p>
                <p className="text-sm text-slate-700 leading-snug">{p.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExemplesTikTok() {
  return <Gallery personas={PERSONAS} lang="fr" basePath="/exemples-tiktok" />;
}

export function ExemplesTikTokEN() {
  return <Gallery personas={EN_PERSONAS} lang="en" basePath="/exemples-tiktok-en" />;
}

export function ExempleTikTokFullscreen() {
  const [, params] = useRoute("/exemples-tiktok/:id");
  const p = PERSONAS.find(x => x.id === params?.id);
  if (!p) return <div className="p-10">Inconnu</div>;
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div style={{ width: "min(100vw, calc(100vh * 9 / 16))", aspectRatio: "9 / 16" }}>
        <TikTokCard p={p} />
      </div>
    </div>
  );
}

export function ExempleTikTokFullscreenEN() {
  const [, params] = useRoute("/exemples-tiktok-en/:id");
  const p = EN_PERSONAS.find(x => x.id === params?.id);
  if (!p) return <div className="p-10">Not found</div>;
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div style={{ width: "min(100vw, calc(100vh * 9 / 16))", aspectRatio: "9 / 16" }}>
        <TikTokCard p={p} />
      </div>
    </div>
  );
}

export { PERSONAS, EN_PERSONAS };
