# Aminata Diop — Portfolio

Portfolio personnel moderne, responsive et déployable sur **Cloudflare Pages**, avec mode admin pour modifier le contenu sans toucher au code.

---

## Stack technique

| Couche | Technologies |
|--------|--------------|
| **Frontend** | React 19, Vite 6, TypeScript, Tailwind CSS 4, Motion (animations), React Router, Lucide React |
| **Backend** | Cloudflare Pages Functions (serverless) |
| **Base de données** | Cloudflare D1 (SQLite) |
| **Hébergement** | Cloudflare Pages |

---

## Fonctionnalités

- **Accueil** : Hero plein écran avec effet typewriter, orbes animées, sections À propos, Compétences, Projets, Contact
- **CV** : Page `/resume` imprimable et exportable en PDF
- **Admin** : Panel protégé (`/admin`) pour éditer le texte « À propos », gérer les projets (CRUD) et les liens sociaux
- **Design** : Thème sombre par défaut, toggle clair/sombre, glass morphism, animations au scroll
- **API** : Endpoints publics (`/api/sections`, `/api/projects`, `/api/links`) et admin pour persister les données en D1 (optionnel)

Le site fonctionne **sans base de données** grâce à des données par défaut en dur ; la connexion D1 permet de persister les modifications faites depuis l’admin.

---

## Prérequis

- **Node.js** 18+ (recommandé 20+)
- Compte **Cloudflare** (gratuit) pour le déploiement

---

## Installation

```bash
# Cloner le dépôt (ou se placer dans le dossier du projet)
cd aminata-diop

# Installer les dépendances
npm install
```

---

## Développement local

```bash
npm run dev
```

Le site est accessible sur **http://localhost:3000/**.

- **Admin** : http://localhost:3000/admin — mot de passe par défaut : `admin123`
- Les changements en admin sont en mémoire (pas de D1 en local sauf si configuré)

---

## Build

```bash
npm run build
```

Génère le dossier `dist/` prêt pour Cloudflare Pages.

---

## Déploiement sur Cloudflare

### 1. Créer le projet Pages

- [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** (ou **Upload assets**)
- Si Git : connecter le repo ; le build command sera `npm run build`, output directory `dist`
- Si upload : après `npm run build`, uploader le contenu de `dist/`

### 2. (Optionnel) Base de données D1

Pour persister les données de l’admin en production :

```bash
# Créer la base D1
npm run db:create

# Récupérer le database_id affiché et le mettre dans wrangler.toml :
# [[d1_databases]]
# binding = "DB"
# database_name = "aminata-diop-db"
# database_id = "<VOTRE_ID>"

# Appliquer le schéma + données initiales (production)
npm run db:migrate

# Ou en local pour tester les Functions avec D1
npm run db:migrate:local
```

### 3. Déployer avec Wrangler

```bash
npm run deploy
```

Cela exécute `npm run build` puis `wrangler pages deploy dist --project-name=aminata-diop-portfolio`.

La première fois, Wrangler peut demander de se connecter à Cloudflare (`wrangler login`).

### 4. Variables d’environnement (Pages)

Dans le dashboard Cloudflare (Pages → projet → **Settings** → **Environment variables**) :

- **ADMIN_PASSWORD** (secret) : mot de passe de l’admin (remplace `admin123`)
- **GEMINI_API_KEY** (optionnel) : si tu ajoutes une feature type « Ask me » avec l’API Gemini

Pour D1, lier la base au projet Pages dans **Settings** → **Functions** → **D1 database bindings** : variable `DB` → base `aminata-diop-db`.

---

## Structure du projet

```
aminata-diop/
├── functions/                 # Cloudflare Pages Functions (API)
│   └── api/
│       ├── sections.ts        # GET /api/sections
│       ├── projects.ts        # GET /api/projects
│       ├── links.ts           # GET /api/links
│       └── admin/
│           ├── login.ts       # POST /api/admin/login
│           ├── sections.ts    # PUT /api/admin/sections
│           └── projects.ts   # POST/PUT/DELETE /api/admin/projects
├── migrations/
│   └── 0001_init.sql         # Schéma D1 + seed (sections, projects, links, settings)
├── src/
│   ├── App.tsx               # Router : /, /resume, /admin
│   ├── main.tsx
│   ├── index.css             # Design system (thème, glass, gradients)
│   ├── types/
│   ├── data/defaults.ts      # Données par défaut (site utilisable sans D1)
│   ├── hooks/                # useTheme, useScrollSpy, useTypewriter
│   ├── components/
│   │   ├── layout/            # Navbar, Footer
│   │   ├── sections/          # Hero, About, Skills, Projects, Contact
│   │   └── ui/
│   └── pages/                # Home, Resume, Admin
├── index.html
├── package.json
├── vite.config.ts
├── wrangler.toml             # Config Cloudflare Pages + D1
└── README.md
```

---

## Scripts npm

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le serveur de dev Vite (port 3000) |
| `npm run build` | Build de production → `dist/` |
| `npm run preview` | Prévisualise le build avec `wrangler pages dev dist` |
| `npm run deploy` | Build + déploiement sur Cloudflare Pages |
| `npm run db:create` | Crée la base D1 `aminata-diop-db` |
| `npm run db:migrate` | Applique la migration SQL sur D1 (prod) |
| `npm run db:migrate:local` | Applique la migration en local (D1 local) |
| `npm run clean` | Supprime le dossier `dist/` |
| `npm run lint` | Vérification TypeScript (`tsc --noEmit`) |

---

## Mode Admin

- **URL** : `/admin`
- **Accès** : mot de passe (défaut `admin123`, modifiable dans Admin → Paramètres)
- **Fonctions** :
  - **Tableau de bord** : aperçu du nombre de projets, liens, sections
  - **À propos** : modifier le titre et le contenu de la section
  - **Projets** : ajouter, modifier (titre, description, URLs, tags), supprimer
  - **Liens** : modifier les liens sociaux (plateforme, URL, icône)
  - **Paramètres** : changer le mot de passe admin + rappel des étapes Cloudflare/D1

Sans D1, les modifications ne sont pas persistées après rechargement ; avec D1 et les Functions déployées, elles sont stockées en base.

---

## Licence

Projet personnel — Aminata Diop.
