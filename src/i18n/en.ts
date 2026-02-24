import type { SkillCategory } from '../types';
import type { Publication, ResumeExperience, ResumeEducation, ResumeLanguage, ResumeAtout } from '../data/defaults';

export const enHero = {
  title: 'Aminata Diop',
  subtitle: 'AI Consultant · SIMILI Co-founder · Applied Solutions & Automation',
  content:
    "Graduate in mathematics and computer science, specialized in applied AI (Master's, UQTR). I co-founded SIMILI (Senegal, remote): e-commerce platforms, applied AI solutions and process automation. I design AI agents, support businesses in AI adoption, and transform complex problems into reliable, useful solutions.",
  roles: [
    'AI Consultant',
    'SIMILI Co-founder',
    'Applied Solutions & Automation',
    "Master's in Applied AI",
  ],
};

export const enAbout = {
  title: 'About',
  subtitle: 'Who am I?',
  content:
    "Holder of a Master's degree in Applied Mathematics and Computer Science (UQTR — thesis on test generation with LLMs, WSSE 2025 publication), I co-founded SIMILI in Senegal with experienced partners to put AI into practice on a daily basis. We build e-commerce platforms (including bubaaxbi.sn), applied AI solutions, and automation tools.\n\nI rely on a rigorous analytical approach and a concrete understanding of business challenges. My experience spans applied machine learning, generative AI, data analysis, and process automation. I design AI agents, support businesses in AI adoption, and am committed to quality, transparency, and results evaluation.\n\nValued for my attention to detail, collaborative spirit, and clear communication, I invest in projects where AI serves as a lever for improving services, organizational performance, and decision support.",
  highlights: [
    "Master's in Applied AI (UQTR, WSSE 2025)",
    'SIMILI Co-founder (Senegal) · AI & E-commerce',
    'Quality, Transparency & AI Evaluation',
  ],
};

export const enSkillCategories: SkillCategory[] = [
  {
    name: 'AI & Machine Learning',
    icon: 'Brain',
    skills: [
      'Large Language Models (LLM)',
      'Prompting (zero-shot, few-shot, COT)',
      'Fine-tuning & evaluation',
      'TensorFlow/Keras',
      'HuggingFace Transformers',
      'NLP, deep learning',
    ],
  },
  {
    name: 'Programming & Data',
    icon: 'Code',
    skills: ['Python', 'Java', 'C', 'SQL', 'Data structures', 'Pandas', 'NumPy'],
  },
  {
    name: 'Tools & Research',
    icon: 'Wrench',
    skills: ['HuggingFace', 'Google Colab', 'VS Code', 'GitHub', 'EvoSuite', 'Image processing'],
  },
  {
    name: 'Web Development',
    icon: 'Monitor',
    skills: ['HTML', 'CSS', 'JavaScript', 'Web application development'],
  },
];

export const enProjects = [
  {
    id: 5,
    title: 'SIMILI — E-commerce, AI Solutions & Automation',
    description:
      'Company co-founded in Senegal with experienced partners. E-commerce platforms (including bubaaxbi.sn), applied AI solutions and process automation tools. AI agent design, business support in AI adoption, applied ML, generative AI, and testing/non-regression strategies for AI systems.',
    tags: '["Applied AI","AI Agents","E-commerce","Automation","ML"]',
    featured: 1,
    live_url: 'https://bubaaxbi.sn',
    repo_url: null,
  },
  {
    id: 1,
    title: 'Automatic Unit Test Generation Using LLMs',
    description:
      'Development of an automated test generation tool for Java projects using LLMs (CodeGen, Mistral, BART, LLaMA2). Experimentation with prompting and fine-tuning strategies. Using HuggingFace Transformers with comparative evaluation against EvoSuite. Paper accepted at WSSE 2025 (Okayama, Japan).',
    tags: '["Python","HuggingFace","LLaMA2","Mistral","EvoSuite","Java"]',
    featured: 1,
    live_url: null,
    repo_url: null,
  },
  {
    id: 2,
    title: 'From Scenario to Code: Structured Prompting for LLM-Based Unit Test Generation',
    description:
      'Scientific paper (WSSE 2025) presenting a comparative evaluation of automatic test generation approaches: fine-tuning, contextual prompting, two-step prompting, and existing tools (EvoSuite). Contribution to discussions on the reliability, limitations, and potential of LLMs in software development.',
    tags: '["LLM","Prompting","Research","Publication","WSSE 2025"]',
    featured: 1,
    live_url: null,
    repo_url: null,
  },
  {
    id: 3,
    title: 'Intelligent Driver Drowsiness Detection',
    description:
      'Road safety system based on a multi-CNN deep model and facial sub-sampling. Detection and extraction of facial regions (eyes, mouth) from real-time video streams. CNN training for eye and mouth state recognition. Ensemble learning model combining multiple CNNs for improved accuracy.',
    tags: '["Deep Learning","CNN","Image Processing","Real-time","TensorFlow/Keras"]',
    featured: 1,
    live_url: null,
    repo_url: null,
  },
  {
    id: 4,
    title: 'Teaching Assistant — Undergraduate',
    description:
      'Lab and practical work support in object-oriented programming at Université du Québec à Trois-Rivières. Exam proctoring.',
    tags: '["Teaching","UQTR","Programming"]',
    featured: 0,
    live_url: null,
    repo_url: null,
  },
];

export const enPublication: Omit<Publication, 'metrics'> & { metrics: Publication['metrics'] } = {
  title: 'From Scenario to Code: Structured Prompting for LLM-Based Unit Test Generation',
  authors: ['Aminata Diop', 'Fadel Toure', 'Mourad Badri'],
  venue: '2025 The 7th World Symposium on Software Engineering (WSSE 2025)',
  venueShort: 'WSSE 2025',
  date: 'October 24–26, 2025',
  location: 'Okayama, Japan',
  abstract:
    'We propose Two-Step Zero-Shot Prompting (2SZSP), a structured approach using LLMs for automatic unit test generation. The model first identifies relevant test scenarios, then generates the corresponding test code. Evaluated on Java projects from the SBST 2020 benchmark, our approach outperforms EvoSuite in mutation score (+10.5 points) while producing more readable and contextualized tests.',
  doi: 'https://doi.org/10.1145/3779657.3779658',
  pdfUrl: '/wsse2025.pdf',
  keywords: ['Unit Test Generation', 'LLM', 'Zero-Shot Prompting', 'EvoSuite', 'Software Quality'],
  metrics: [
    { label: 'Mutation score', value: '41.3%', detail: 'vs 30.8% EvoSuite (+10.5 pts)' },
    { label: 'Line coverage', value: '43.4%', detail: 'More targeted and readable tests' },
    { label: 'Branch coverage', value: '31.3%', detail: 'Focus on fault detection' },
  ],
};

export const enResumeContact = {
  profile:
    "AI consultant, holder of a Master's degree in Applied Mathematics and Computer Science (UQTR). Co-founder of SIMILI (Senegal), I design applied AI solutions, AI agents, and automation tools. Experience in machine learning, generative AI, data analysis, and supporting businesses in AI adoption.",
  email: 'aminattadiop@gmail.com',
  location: 'Trois-Rivières, QC, Canada',
  phone: '514 942 7793',
};

export const enResumeExperiences: ResumeExperience[] = [
  {
    title: 'AI Consultant & Co-founder',
    employer: 'SIMILI',
    period: '10/2025 — Present',
    location: 'Senegal (remote)',
    bullets: [
      'Co-founded with an experienced team; development of e-commerce platforms (e.g., bubaaxbi.sn) and automation tools.',
      'AI agent design and implementation of applied AI solutions tailored to organizational needs.',
      'Applied machine learning, generative AI, data analysis, and decision support.',
      'Supporting businesses in AI adoption; quality, transparency, and results evaluation.',
      'Testing and non-regression strategies for AI systems and pipelines.',
    ],
  },
  {
    title: 'Applied AI Researcher — Automatic Unit Test Generation Using LLMs',
    employer: 'Université du Québec à Trois-Rivières',
    period: '09/2022 — 08/2025',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Development of automated test generation tools for Java projects using LLMs (CodeGen, Mistral, BART, LLaMA2); prompting and fine-tuning strategy experimentation.',
      'Advanced tooling: HuggingFace Transformers; comparative evaluation with EvoSuite.',
      'Dataset preparation and processing; prompt structuring to maximize model performance.',
      'Qualitative and quantitative analysis of generated tests (completeness, structure, code relevance).',
      'Paper accepted for publication and presentation at WSSE 2025 conference in Japan.',
    ],
  },
  {
    title: 'Author — From Scenario to Code: Structured Prompting for LLM-Based Unit Test Generation',
    employer: 'WSSE 2025',
    period: '04/2025 — 06/2025',
    location: 'Okayama, Japan',
    bullets: [
      'Comparative evaluation of automatic test generation approaches (fine-tuning, contextual prompting, two-step prompting) and existing tools (EvoSuite).',
      'Contribution to discussions on the reliability, limitations, and potential of LLMs in software development tasks.',
      'Highlighting key performance factors (compilation errors, test scenario realism).',
    ],
  },
  {
    title: 'Research Project: Intelligent Driver Drowsiness Detection',
    employer: 'Université du Québec à Trois-Rivières',
    period: '05/2023 — 07/2023',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Design of a road safety system based on a multi-CNN deep model and facial sub-sampling.',
      'Detection and extraction of facial regions (eyes, mouth) from real-time video streams.',
      'CNN training for eye and mouth state recognition.',
      'Ensemble learning model combining multiple CNNs for improved accuracy.',
    ],
  },
  {
    title: 'Teaching Assistant — Undergraduate',
    employer: 'Université du Québec à Trois-Rivières',
    period: '01/2023 — 04/2023',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Lab and practical work support in object-oriented programming.',
      'Exam proctoring.',
    ],
  },
  {
    title: 'Administrative Agent',
    employer: 'Office de la Protection du Consommateur',
    period: '10/2022 — 04/2025',
    location: 'Trois-Rivières, QC, Canada',
    bullets: [
      'Email management, mail sending and receiving.',
      'Correction, filing, and distribution of administrative documents.',
      'Agent scheduling and planning.',
    ],
  },
];

export const enResumeEducation: ResumeEducation[] = [
  {
    diploma: "Master's in Applied Mathematics and Computer Science (with thesis)",
    institution: 'Université du Québec à Trois-Rivières',
    period: '09/2022 — 08/2025',
    location: 'Trois-Rivières, QC, Canada',
    details: [
      'Specialization in language models (LLM) and automatic software test generation.',
      'Research project: "Automatic Unit Test Generation Using LLMs".',
      'Tools and technologies: Mistral, LLaMA, HuggingFace, Python, Java, Pandas, NumPy, Google Colab, VS Code, GitHub.',
      'Results presented at the WSSE 2025 international conference (Okayama, Japan).',
    ],
  },
  {
    diploma: 'Comparative Evaluation of Non-Quebec Diplomas',
    institution: 'MIFI',
    period: '2024',
    location: 'Montréal, QC, Canada',
    details: [
      'Secondary education teaching diploma (Dakar, Senegal) ⇒ Quebec equivalent: DES and one year of pre-university college studies completed.',
      "Bachelor's in Computer Science (Dakar, Senegal) ⇒ Quebec equivalent: Bachelor's in Computer Science.",
    ],
  },
];

export const enResumeLanguages: ResumeLanguage[] = [
  { name: 'French', level: 'Spoken, read, written' },
  { name: 'English', level: 'B1 — Everyday vocabulary' },
];

export const enResumeAtouts: ResumeAtout[] = [
  {
    title: 'Communication',
    items: [
      'Excellent written and oral communication skills.',
      'Ability to guide, mentor, and train others.',
      'Passion for knowledge sharing and interdisciplinary collaboration.',
    ],
  },
  {
    title: 'Collaboration',
    items: [
      'Team spirit and ability to work effectively with colleagues from diverse backgrounds.',
      'Comfort in multidisciplinary environments (AI, software engineering, teaching, publishing).',
    ],
  },
  {
    title: 'Autonomy',
    items: [
      'Ability to work independently while respecting internal procedures.',
      'Initiative, methodological rigor, and effective time management.',
      'Adaptability to new environments and advanced technological tools.',
    ],
  },
];
