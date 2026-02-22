-- Aminata Diop Portfolio - D1 Schema

CREATE TABLE IF NOT EXISTS sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT,
  metadata TEXT,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  live_url TEXT,
  repo_url TEXT,
  tags TEXT DEFAULT '[]',
  featured INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Seed: Hero
INSERT INTO sections (id, title, subtitle, content, metadata) VALUES (
  'hero',
  'Aminata Diop',
  'Développeuse Full-Stack & Créatrice Digitale',
  'Je conçois des expériences web modernes, performantes et élégantes qui transforment les idées en réalité.',
  '{"roles":["Développeuse Full-Stack","UI/UX Designer","Créatrice Digitale"],"cta_text":"Voir mes projets","cv_url":"/resume"}'
);

-- Seed: About
INSERT INTO sections (id, title, subtitle, content, metadata) VALUES (
  'about',
  'À Propos',
  'Qui suis-je ?',
  'Passionnée par le développement web et le design, je crée des applications modernes qui allient esthétique et performance. Mon approche combine une expertise technique solide avec un sens aigu du design pour offrir des expériences utilisateur exceptionnelles.\n\nAvec une formation solide en informatique et une curiosité insatiable pour les nouvelles technologies, je m''investis dans chaque projet avec rigueur et créativité.',
  '{"highlights":["3+ années d''expérience","20+ projets réalisés","Formation continue"]}'
);

-- Seed: Skills
INSERT INTO sections (id, title, subtitle, content, metadata) VALUES (
  'skills',
  'Compétences',
  'Technologies & Outils',
  NULL,
  '{"categories":[{"name":"Frontend","icon":"Monitor","skills":["React","TypeScript","Tailwind CSS","Next.js","Vue.js","HTML/CSS"]},{"name":"Backend","icon":"Server","skills":["Node.js","Python","Express","PostgreSQL","REST API","GraphQL"]},{"name":"Outils","icon":"Wrench","skills":["Git","Docker","Figma","VS Code","Linux","CI/CD"]},{"name":"Cloud","icon":"Cloud","skills":["Cloudflare","AWS","Vercel","Firebase","D1","Workers"]}]}'
);

-- Seed projects
INSERT INTO projects (title, description, image_url, tags, featured, sort_order) VALUES (
  'E-Commerce Platform',
  'Plateforme e-commerce complète avec panier, paiement Stripe et tableau de bord admin. Interface moderne et responsive.',
  NULL,
  '["React","Node.js","PostgreSQL","Stripe","Tailwind CSS"]',
  1, 1
);

INSERT INTO projects (title, description, image_url, tags, featured, sort_order) VALUES (
  'Task Manager Pro',
  'Application de gestion de tâches collaborative avec drag-and-drop, notifications en temps réel et intégration calendrier.',
  NULL,
  '["Vue.js","Express","MongoDB","Socket.io","TypeScript"]',
  1, 2
);

INSERT INTO projects (title, description, image_url, tags, featured, sort_order) VALUES (
  'Portfolio IA',
  'Portfolio personnel propulsé par l''IA Gemini avec assistant virtuel, thème dynamique et administration intégrée.',
  NULL,
  '["React","Cloudflare Workers","D1","Gemini AI","Motion"]',
  1, 3
);

INSERT INTO projects (title, description, image_url, tags, featured, sort_order) VALUES (
  'Weather Dashboard',
  'Dashboard météo interactif avec visualisations temps réel, prévisions 7 jours et géolocalisation.',
  NULL,
  '["React","Chart.js","OpenWeather API","Tailwind CSS"]',
  0, 4
);

-- Seed links
INSERT INTO links (platform, url, icon, sort_order) VALUES ('GitHub', 'https://github.com/aminata-diop', 'Github', 1);
INSERT INTO links (platform, url, icon, sort_order) VALUES ('LinkedIn', 'https://linkedin.com/in/aminata-diop', 'Linkedin', 2);
INSERT INTO links (platform, url, icon, sort_order) VALUES ('Email', 'mailto:aminata.diop@email.com', 'Mail', 3);

-- Seed settings
INSERT INTO settings (key, value) VALUES ('site_title', 'Aminata Diop | Portfolio');
INSERT INTO settings (key, value) VALUES ('contact_email', 'aminata.diop@email.com');
INSERT INTO settings (key, value) VALUES ('admin_enabled', 'true');
