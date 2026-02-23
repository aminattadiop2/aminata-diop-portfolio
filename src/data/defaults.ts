import type { Section, Project, SocialLink, SkillCategory } from '../types';

export const defaultSections: Record<string, Section> = {
  hero: {
    id: 'hero',
    title: 'Aminata Diop',
    subtitle: 'Consultante en IA appliquée · Cofondatrice SIMILI · Solutions appliquées & automatisation',
    content:
      "Diplômée en mathématiques et informatique, spécialisée en IA appliquée (Master, UQTR). Je cofonde SIMILI (Sénégal, télétravail) : plateformes e‑commerce, solutions d'IA appliquée et automatisation de processus. Je conçois des agents IA, j'accompagne des entreprises dans l'adoption de l'IA et je transforme des problématiques complexes en solutions fiables et utiles.",
    metadata: JSON.stringify({
      roles: [
        'Consultante en IA appliquée',
        'Cofondatrice SIMILI',
        'Solutions appliquées & automatisation',
        'Diplômée Master (IA appliquée)',
      ],
      cta_text: 'Voir mes projets',
      cv_url: '/resume',
    }),
    updated_at: new Date().toISOString(),
  },
  about: {
    id: 'about',
    title: 'À Propos',
    subtitle: 'Qui suis-je ?',
    content:
      "Titulaire d'une maîtrise en mathématiques et informatique appliquées (UQTR — mémoire sur la génération de tests avec LLM, publication WSSE 2025), j'ai cofondé SIMILI au Sénégal avec des partenaires expérimentés pour mettre l'IA en pratique au quotidien. Nous y construisons des plateformes e‑commerce (dont bubaaxbi.sn), des solutions d'IA appliquée et des outils d'automatisation.\n\nJe m'appuie sur une approche analytique rigoureuse et une compréhension concrète des enjeux métiers. Mon expérience couvre le machine learning appliqué, l'IA générative, l'analyse de données et l'automatisation de processus. Je conçois des agents IA, j'accompagne des entreprises dans l'adoption de l'IA, et je m'attache à la qualité, la transparence et l'évaluation des résultats.\n\nAppréciée pour mon souci du détail, ma capacité de collaboration et ma communication claire, je m'investis dans des projets où l'IA constitue un levier d'amélioration des services, de performance organisationnelle et d'aide à la décision.",
    metadata: JSON.stringify({
      highlights: [
        'Master IA appliquée (UQTR, WSSE 2025)',
        'Cofondatrice SIMILI (Sénégal) · IA & e‑commerce',
        'Qualité, transparence & évaluation IA',
      ],
    }),
    updated_at: new Date().toISOString(),
  },
  skills: {
    id: 'skills',
    title: 'Compétences',
    subtitle: 'Technologies & domaines',
    content: null,
    metadata: JSON.stringify({
      categories: [
        {
          name: 'IA & apprentissage machine',
          icon: 'Brain',
          skills: [
            'Grands modèles de langage (LLM)',
            'Prompting (zero-shot, few-shot, COT)',
            'Fine-tuning & évaluation',
            'TensorFlow/Keras',
            'HuggingFace Transformers',
            'NLP, deep learning',
          ],
        },
        {
          name: 'Programmation & données',
          icon: 'Code',
          skills: ['Python', 'Java', 'C', 'SQL', 'Structures de données', 'Pandas', 'NumPy'],
        },
        {
          name: 'Outils & recherche',
          icon: 'Wrench',
          skills: [
            'HuggingFace',
            'Google Colab',
            'VS Code',
            'GitHub',
            'EvoSuite',
            'Traitement d\'images',
          ],
        },
        {
          name: 'Développement web',
          icon: 'Monitor',
          skills: ['HTML', 'CSS', 'JavaScript', 'Création d\'applications web'],
        },
      ],
    }),
    updated_at: new Date().toISOString(),
  },
};

export const defaultProjects: Project[] = [
  {
    id: 5,
    title: 'SIMILI — E‑commerce, solutions IA & automatisation',
    description:
      "Entreprise cofondée au Sénégal avec des partenaires expérimentés. Plateformes e‑commerce (dont bubaaxbi.sn), solutions d'IA appliquée et outils d'automatisation de processus. Conception d'agents IA, accompagnement d'entreprises dans l'adoption de l'IA, machine learning appliqué, IA générative et stratégies de test et de non‑régression pour les systèmes IA.",
    image_url: null,
    live_url: 'https://bubaaxbi.sn',
    repo_url: null,
    tags: JSON.stringify(['IA appliquée', 'Agents IA', 'E‑commerce', 'Automatisation', 'ML']),
    featured: 1,
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 1,
    title: 'Génération automatique de tests unitaires à l\'aide de LLM',
    description:
      "Développement d'outil de génération de tests automatisés pour des projets Java à partir de LLM (CodeGen, Mistral, BART, LLaMA2). Expérimentation de stratégies de prompting et de fine-tuning. Utilisation de HuggingFace Transformers et évaluation comparative avec EvoSuite. Analyse qualitative et quantitative des tests générés. Article accepté à WSSE 2025 (Okayama, Japon).",
    image_url: null,
    live_url: null,
    repo_url: null,
    tags: JSON.stringify([
      'Python',
      'HuggingFace',
      'LLaMA2',
      'Mistral',
      'EvoSuite',
      'Java',
    ]),
    featured: 1,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'From Scenario to Code: Structured Prompting for LLM-Based Unit Test Generation',
    description:
      "Article scientifique (WSSE 2025) présentant une évaluation comparative entre approches de génération automatique de tests : fine-tuning, prompting contextuel, prompting en deux étapes, et outils existants (EvoSuite). Contribution aux discussions sur la fiabilité, les limites et le potentiel des LLM en développement logiciel.",
    image_url: null,
    live_url: null,
    repo_url: null,
    tags: JSON.stringify(['LLM', 'Prompting', 'Recherche', 'Publication', 'WSSE 2025']),
    featured: 1,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Détection intelligente de la somnolence du conducteur',
    description:
      "Système de sécurité routière basé sur un modèle profond multi-CNN et sous-échantillonnage facial. Détection et extraction de régions faciales (yeux, bouche) à partir de flux vidéo en temps réel. Entraînement de CNN pour la reconnaissance d'états oculaires et buccaux. Modèle ensemble learning combinant plusieurs CNN pour améliorer la précision.",
    image_url: null,
    live_url: null,
    repo_url: null,
    tags: JSON.stringify([
      'Deep learning',
      'CNN',
      'Traitement d\'images',
      'Temps réel',
      'TensorFlow/Keras',
    ]),
    featured: 1,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Assistant d\'enseignement — 1er cycle',
    description:
      "Soutien aux laboratoires et travaux pratiques en programmation orientée objet à l'Université du Québec à Trois-Rivières. Surveillance d'examens.",
    image_url: null,
    live_url: null,
    repo_url: null,
    tags: JSON.stringify(['Enseignement', 'UQTR', 'Programmation']),
    featured: 0,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const defaultLinks: SocialLink[] = [
  { id: 1, platform: 'Email', url: 'mailto:aminattadiop@gmail.com', icon: 'Mail', sort_order: 1 },
  { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/in/aminata-diop', icon: 'Linkedin', sort_order: 2 },
  { id: 3, platform: 'GitHub', url: 'https://github.com/aminattadiop', icon: 'Github', sort_order: 3 },
];

export const defaultSkillCategories: SkillCategory[] = [
  {
    name: 'IA & apprentissage machine',
    icon: 'Brain',
    skills: [
      'Grands modèles de langage (LLM)',
      'Prompting (zero-shot, few-shot, COT)',
      'Fine-tuning & évaluation',
      'TensorFlow/Keras',
      'HuggingFace Transformers',
      'NLP, deep learning',
    ],
  },
  {
    name: 'Programmation & données',
    icon: 'Code',
    skills: ['Python', 'Java', 'C', 'SQL', 'Structures de données', 'Pandas', 'NumPy'],
  },
  {
    name: 'Outils & recherche',
    icon: 'Wrench',
    skills: [
      'HuggingFace',
      'Google Colab',
      'VS Code',
      'GitHub',
      'EvoSuite',
      "Traitement d'images",
    ],
  },
  {
    name: 'Développement web',
    icon: 'Monitor',
    skills: ['HTML', 'CSS', 'JavaScript', "Création d'applications web"],
  },
];

// ——— Publication scientifique ———

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  venueShort: string;
  date: string;
  location: string;
  abstract: string;
  doi: string;
  pdfUrl: string;
  keywords: string[];
  metrics: { label: string; value: string; detail: string }[];
}

export const defaultPublication: Publication = {
  title: 'From Scenario to Code: Structured Prompting for LLM-Based Unit Test Generation',
  authors: ['Aminata Diop', 'Fadel Toure', 'Mourad Badri'],
  venue: '2025 The 7th World Symposium on Software Engineering (WSSE 2025)',
  venueShort: 'WSSE 2025',
  date: 'Octobre 24–26, 2025',
  location: 'Okayama, Japon',
  abstract:
    'Nous proposons le Two-Step Zero-Shot Prompting (2SZSP), une approche structurée utilisant les LLM pour la génération automatique de tests unitaires. Le modèle identifie d\'abord les scénarios de test pertinents, puis génère le code de test correspondant. Évalué sur des projets Java du benchmark SBST 2020, notre approche surpasse EvoSuite en score de mutation (+10,5 points) tout en produisant des tests plus lisibles et contextualisés.',
  doi: 'https://doi.org/10.1145/3779657.3779658',
  pdfUrl: '/wsse2025.pdf',
  keywords: ['Unit Test Generation', 'LLM', 'Zero-Shot Prompting', 'EvoSuite', 'Software Quality'],
  metrics: [
    { label: 'Score de mutation', value: '41.3%', detail: 'vs 30.8% EvoSuite (+10.5 pts)' },
    { label: 'Couverture de lignes', value: '43.4%', detail: 'Tests plus ciblés et lisibles' },
    { label: 'Couverture de branches', value: '31.3%', detail: 'Focus sur la détection de fautes' },
  ],
};

// ——— Données pour la page CV (Resume) ———

export interface ResumeExperience {
  title: string;
  employer: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface ResumeEducation {
  diploma: string;
  institution: string;
  period: string;
  location: string;
  details?: string[];
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface ResumeAtout {
  title: string;
  items: string[];
}

export const resumeExperiences: ResumeExperience[] = [
  {
    title: 'Consultante en IA appliquée & cofondatrice',
    employer: 'SIMILI',
    period: '10/2025 — Aujourd\'hui',
    location: 'Sénégal (télétravail)',
    bullets: [
      'Cofondation avec une équipe expérimentée ; développement de plateformes e‑commerce (ex. bubaaxbi.sn) et d\'outils d\'automatisation.',
      'Conception d\'agents IA et mise en œuvre de solutions d\'IA appliquée adaptées aux besoins des organisations.',
      'Machine learning appliqué, IA générative, analyse de données et aide à la décision.',
      'Accompagnement d\'entreprises dans l\'adoption de l\'IA ; qualité, transparence et évaluation des résultats.',
      'Stratégies de test et de non‑régression pour les systèmes et pipelines IA.',
    ],
  },
  {
    title: 'Chercheuse en IA appliquée — Génération automatique de tests unitaires à l\'aide de LLM',
    employer: 'Université du Québec à Trois-Rivières',
    period: '09/2022 — 08/2025',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Développement d\'outil de génération de tests automatisés pour projets Java à partir de LLM (CodeGen, Mistral, BART, LLaMA2) ; expérimentation de stratégies de prompting et de fine-tuning.',
      'Utilisation d\'outils avancés : HuggingFace Transformers ; évaluation comparative avec EvoSuite.',
      'Préparation et traitement de jeux de données ; nettoyage et structuration des prompts et contextes pour maximiser la performance des modèles.',
      'Analyse qualitative et quantitative des tests générés (complétude, structure, pertinence du code).',
      'Rédaction et soumission d\'un article accepté pour publication et présentation à la conférence WSSE 2025 au Japon.',
    ],
  },
  {
    title: 'Auteure — From Scenario to Code: Structured Prompting for LLM-Based Unit Test Generation',
    employer: 'WSSE 2025 (à venir)',
    period: '04/2025 — 06/2025',
    location: 'Okayama-shi, Japon',
    bullets: [
      'Évaluation comparative entre approches de génération automatique de tests (fine-tuning, prompting contextuel, prompting en deux étapes) et outils existants (EvoSuite).',
      'Contribution aux discussions sur la fiabilité, les limites et le potentiel des LLM dans les tâches de développement logiciel.',
      'Mise en lumière de facteurs clés de performance (erreurs de compilation, réalisme des scénarios de test).',
    ],
  },
  {
    title: 'Projet de recherche : Détection intelligente de la somnolence du conducteur',
    employer: 'Université du Québec à Trois-Rivières',
    period: '05/2023 — 07/2023',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Conception d\'un système de sécurité routière basé sur un modèle profond multi-CNN et le sous-échantillonnage facial.',
      'Détection et extraction de régions faciales (yeux, bouche) à partir de flux vidéo en temps réel.',
      'Entraînement de CNN pour la reconnaissance d\'états oculaires et buccaux.',
      'Développement d\'un modèle ensemble learning combinant plusieurs CNN pour améliorer la précision.',
    ],
  },
  {
    title: 'Assistant d\'enseignement — 1er cycle',
    employer: 'Université du Québec à Trois-Rivières',
    period: '01/2023 — 04/2023',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Soutien aux laboratoires et aux travaux pratiques en programmation orientée objet.',
      'Surveillance d\'examens.',
    ],
  },
  {
    title: 'Agente administrative',
    employer: 'Office de la Protection du Consommateur',
    period: '10/2022 — 04/2025',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Gestion des courriels, envois et réceptions de courrier.',
      'Correction, classement et distribution des documents administratifs.',
      'Planification de l\'horaire des agents.',
    ],
  },
];

export const resumeEducation: ResumeEducation[] = [
  {
    diploma: 'Maîtrise en Mathématiques et Informatique appliquées (avec mémoire)',
    institution: 'Université du Québec à Trois-Rivières',
    period: '09/2022 — 08/2025',
    location: 'Trois-Rivières, QC, Canada',
    details: [
      'Spécialisation en modèles de langage (LLM) et génération automatique de tests logiciels.',
      'Projet de recherche : "Génération automatique de tests unitaires à l\'aide de LLM".',
      'Outils et technologies : Mistral, LLaMA, HuggingFace, Python, Java, Pandas, NumPy, Google Colab, VS Code, GitHub.',
      'Résultats présentés à la conférence internationale WSSE 2025 (Okayama, Japon).',
    ],
  },
  {
    diploma: 'Évaluation comparative des diplômes hors Québec',
    institution: 'MIFI',
    period: '2024',
    location: 'Montréal, QC, Canada',
  },
  {
    diploma: 'Bachelière de l\'enseignement du second degré',
    institution: 'Dakar, Sénégal',
    period: '—',
    location: 'Repère scolaire québécois : DES et une année d\'études collégiales préuniversitaires réussie',
  },
  {
    diploma: 'Licence en Informatique',
    institution: 'Dakar, Sénégal',
    period: '—',
    location: 'Repère scolaire québécois : Baccalauréat en Sciences de l\'informatique',
  },
];

export const resumeLanguages: ResumeLanguage[] = [
  { name: 'Français', level: 'Parlé, lu, écrit' },
  { name: 'Anglais', level: 'B1 — Vocabulaire du quotidien' },
];

export const resumeAtouts: ResumeAtout[] = [
  {
    title: 'Communication',
    items: [
      'Excellentes aptitudes en communication écrite et orale.',
      'Capacité à accompagner, guider et former d\'autres personnes.',
      'Goût pour le partage des connaissances et la collaboration interdisciplinaire.',
    ],
  },
  {
    title: 'Collaboration',
    items: [
      'Esprit d\'équipe et capacité à collaborer efficacement avec des collègues de profils variés.',
      'Aisance dans les environnements pluridisciplinaires (IA, génie logiciel, enseignement, publication).',
    ],
  },
  {
    title: 'Autonomie',
    items: [
      'Capacité à travailler de manière autonome tout en respectant les procédures internes.',
      'Sens de l\'initiative, rigueur méthodologique et gestion efficace du temps.',
      'Facilité d\'adaptation à des environnements nouveaux et aux outils technologiques avancés.',
    ],
  },
];

export const resumeContact = {
  profile:
    "Consultante en intelligence artificielle, titulaire d'une maîtrise en mathématiques et informatique appliquées (UQTR). Cofondatrice de SIMILI (Sénégal), je conçois des solutions d'IA appliquée, des agents IA et des outils d'automatisation. Expérience en machine learning, IA générative, analyse de données et accompagnement d'entreprises dans l'adoption de l'IA.",
  email: 'aminattadiop@gmail.com',
  location: 'Trois-Rivières, QC, Canada',
  phone: '514 942 7793',
};

