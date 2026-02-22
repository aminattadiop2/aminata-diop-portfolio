import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, LogOut, LayoutDashboard, FolderKanban, User, Link2, Settings, Save,
  Plus, Trash2, GripVertical, Eye, CheckCircle, AlertCircle, X,
  Sparkles, Brain, BookOpen, FileText, ChevronDown, ChevronUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';
import {
  defaultProjects, defaultSections, defaultLinks, defaultSkillCategories,
  defaultPublication, resumeExperiences, resumeEducation, resumeLanguages,
  resumeAtouts, resumeContact,
  type Publication, type ResumeExperience, type ResumeEducation,
  type ResumeLanguage, type ResumeAtout, type SkillCategory,
} from '../data/defaults';

type Tab = 'dashboard' | 'hero' | 'about' | 'skills' | 'projects' | 'publication' | 'cv' | 'links' | 'settings';

const STORAGE_PREFIX = 'ad_';
function saveToStorage(key: string, value: unknown) {
  try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); } catch { /* */ }
}

/* ─── Login ─── */
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem('admin_password') || 'admin123';
    if (password === stored) {
      localStorage.setItem('admin_token', btoa(Date.now().toString()));
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent)' }}>
            <Lock size={28} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-bold t-primary">Administration</h1>
          <p className="t-secondary text-sm mt-1">Connectez-vous pour gérer le contenu</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-pass" className="block text-sm font-medium t-secondary mb-2">Mot de passe</label>
            <input id="admin-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-themed" placeholder="Entrez le mot de passe" autoFocus />
          </div>
          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm flex items-center gap-1"><AlertCircle size={14} /> Mot de passe incorrect</motion.p>}
          <button type="submit" className="btn-primary w-full justify-center"><Lock size={16} /> Se connecter</button>
        </form>
        <p className="text-xs t-tertiary text-center mt-6">Mot de passe par défaut : admin123 (à changer dans les paramètres)</p>
      </motion.div>
    </div>
  );
}

/* ─── Toast ─── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl ${type === 'success' ? 'bg-emerald-500/90' : 'bg-red-500/90'} text-white text-sm font-medium backdrop-blur-sm`}>
      {type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {message}
      <button onClick={onClose} className="ml-2 hover:opacity-70"><X size={14} /></button>
    </motion.div>
  );
}

/* ─── Helpers ─── */
function SectionCard({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="glass-card rounded-xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold t-primary">{title}</h3>
        {actions}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium t-secondary mb-2">{label}</label>
      {children}
    </div>
  );
}

function ArrayStringEditor({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input value={item} onChange={(e) => { const n = [...items]; n[i] = e.target.value; onChange(n); }}
            className="flex-1 input-themed text-sm" placeholder={placeholder} />
          <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button onClick={() => onChange([...items, ''])} className="btn-secondary text-xs py-1.5 px-3">
        <Plus size={14} /> Ajouter
      </button>
    </div>
  );
}

function Collapsible({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-elevated transition-colors">
        <span className="font-heading text-sm font-semibold t-primary">{title}</span>
        {open ? <ChevronUp size={16} className="t-secondary" /> : <ChevronDown size={16} className="t-secondary" />}
      </button>
      {open && <div className="p-4 pt-0 space-y-4">{children}</div>}
    </div>
  );
}

/* ─── Main ─── */
export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => !!localStorage.getItem('admin_token'));
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => setToast({ message, type });

  /* ── Hero state ── */
  const heroMeta = (() => { try { return JSON.parse(defaultSections.hero.metadata || '{}'); } catch { return {}; } })();
  const [heroTitle, setHeroTitle] = useState(defaultSections.hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState(defaultSections.hero.subtitle || '');
  const [heroContent, setHeroContent] = useState(defaultSections.hero.content || '');
  const [heroRoles, setHeroRoles] = useState<string[]>(heroMeta.roles || []);
  const [heroCtaText, setHeroCtaText] = useState(heroMeta.cta_text || 'Voir mes projets');

  /* ── About state ── */
  const aboutMeta = (() => { try { return JSON.parse(defaultSections.about.metadata || '{}'); } catch { return {}; } })();
  const [aboutTitle, setAboutTitle] = useState(defaultSections.about.title);
  const [aboutSubtitle, setAboutSubtitle] = useState(defaultSections.about.subtitle || '');
  const [aboutContent, setAboutContent] = useState(defaultSections.about.content || '');
  const [aboutHighlights, setAboutHighlights] = useState<string[]>(aboutMeta.highlights || []);

  /* ── Skills state ── */
  const [skills, setSkills] = useState<SkillCategory[]>(() => defaultSkillCategories.map((c) => ({ ...c, skills: [...c.skills] })));

  /* ── Projects state ── */
  const [projects, setProjects] = useState<Project[]>(() => defaultProjects.map((p) => ({ ...p })));

  /* ── Publication state ── */
  const [pub, setPub] = useState<Publication>(() => ({
    ...defaultPublication,
    authors: [...defaultPublication.authors],
    keywords: [...defaultPublication.keywords],
    metrics: defaultPublication.metrics.map((m) => ({ ...m })),
  }));

  /* ── CV state ── */
  const [cvProfile, setCvProfile] = useState(resumeContact.profile);
  const [cvEmail, setCvEmail] = useState(resumeContact.email);
  const [cvLocation, setCvLocation] = useState(resumeContact.location);
  const [cvPhone, setCvPhone] = useState(resumeContact.phone);
  const [cvExp, setCvExp] = useState<ResumeExperience[]>(() => resumeExperiences.map((e) => ({ ...e, bullets: [...e.bullets] })));
  const [cvEdu, setCvEdu] = useState<ResumeEducation[]>(() => resumeEducation.map((e) => ({ ...e, details: e.details ? [...e.details] : undefined })));
  const [cvLangs, setCvLangs] = useState<ResumeLanguage[]>(() => resumeLanguages.map((l) => ({ ...l })));
  const [cvAtouts, setCvAtouts] = useState<ResumeAtout[]>(() => resumeAtouts.map((a) => ({ ...a, items: [...a.items] })));

  /* ── Links state ── */
  const [links, setLinks] = useState(() => defaultLinks.map((l) => ({ ...l })));

  /* ── Settings ── */
  const [adminPassword, setAdminPassword] = useState('');

  /* ── Save handlers ── */
  const handleSaveHero = () => {
    const meta = JSON.stringify({ roles: heroRoles, cta_text: heroCtaText, cv_url: '/resume' });
    Object.assign(defaultSections.hero, { title: heroTitle, subtitle: heroSubtitle, content: heroContent, metadata: meta, updated_at: new Date().toISOString() });
    saveToStorage('hero', defaultSections.hero);
    showToast('Section Accueil sauvegardée !');
  };

  const handleSaveAbout = () => {
    const meta = JSON.stringify({ highlights: aboutHighlights });
    Object.assign(defaultSections.about, { title: aboutTitle, subtitle: aboutSubtitle, content: aboutContent, metadata: meta, updated_at: new Date().toISOString() });
    saveToStorage('about', defaultSections.about);
    showToast('Section À propos sauvegardée !');
  };

  const handleSaveSkills = () => {
    defaultSkillCategories.length = 0;
    defaultSkillCategories.push(...skills);
    defaultSections.skills.metadata = JSON.stringify({ categories: skills });
    saveToStorage('skills', skills);
    showToast('Compétences sauvegardées !');
  };

  const handleSaveProjects = () => {
    defaultProjects.length = 0;
    defaultProjects.push(...projects);
    saveToStorage('projects', projects);
    showToast('Projets sauvegardés !');
  };

  const handleSavePublication = () => {
    Object.assign(defaultPublication, pub);
    saveToStorage('publication', pub);
    showToast('Publication sauvegardée !');
  };

  const handleSaveCV = () => {
    Object.assign(resumeContact, { profile: cvProfile, email: cvEmail, location: cvLocation, phone: cvPhone });
    resumeExperiences.length = 0; resumeExperiences.push(...cvExp);
    resumeEducation.length = 0; resumeEducation.push(...cvEdu);
    resumeLanguages.length = 0; resumeLanguages.push(...cvLangs);
    resumeAtouts.length = 0; resumeAtouts.push(...cvAtouts);
    saveToStorage('resumeContact', resumeContact);
    saveToStorage('resumeExp', cvExp);
    saveToStorage('resumeEdu', cvEdu);
    saveToStorage('resumeLang', cvLangs);
    saveToStorage('resumeAtouts', cvAtouts);
    showToast('CV sauvegardé !');
  };

  const handleSaveLinks = () => {
    defaultLinks.length = 0;
    defaultLinks.push(...links);
    saveToStorage('links', links);
    showToast('Liens sauvegardés !');
  };

  const handleSavePassword = () => {
    if (adminPassword.length < 4) { showToast('Le mot de passe doit faire au moins 4 caractères', 'error'); return; }
    localStorage.setItem('admin_password', adminPassword);
    setAdminPassword('');
    showToast('Mot de passe modifié !');
  };

  const handleLogout = () => { localStorage.removeItem('admin_token'); setAuthenticated(false); };

  if (!authenticated) return <AdminLogin onLogin={() => setAuthenticated(true)} />;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
    { id: 'hero', label: 'Accueil', icon: <Sparkles size={18} /> },
    { id: 'about', label: 'À Propos', icon: <User size={18} /> },
    { id: 'skills', label: 'Compétences', icon: <Brain size={18} /> },
    { id: 'projects', label: 'Projets', icon: <FolderKanban size={18} /> },
    { id: 'publication', label: 'Publication', icon: <BookOpen size={18} /> },
    { id: 'cv', label: 'CV', icon: <FileText size={18} /> },
    { id: 'links', label: 'Liens', icon: <Link2 size={18} /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold t-primary">Administration</h1>
            <p className="t-secondary text-sm mt-1">Gérez le contenu de votre portfolio</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="btn-secondary text-sm py-2 px-4"><Eye size={16} /> Voir le site</Link>
            <button onClick={handleLogout} className="btn-secondary text-sm py-2 px-4 text-red-400 border-red-500/20 hover:border-red-500/40">
              <LogOut size={16} /> Déconnexion
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <nav className="lg:col-span-1 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id ? 'bg-accent-s t-accent border bdr-accent' : 't-secondary hover:t-primary hover:bg-elevated'
                }`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                {/* ── Dashboard ── */}
                {activeTab === 'dashboard' && (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Projets', value: projects.length },
                        { label: 'Compétences', value: skills.reduce((a, c) => a + c.skills.length, 0) },
                        { label: 'Expériences', value: cvExp.length },
                        { label: 'Liens sociaux', value: links.length },
                      ].map((s) => (
                        <div key={s.label} className="glass-card rounded-xl p-6">
                          <p className="text-sm t-secondary mb-1">{s.label}</p>
                          <p className="font-heading text-3xl font-bold t-accent">{s.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="glass-card rounded-xl p-6">
                      <h3 className="font-heading text-lg font-bold t-primary mb-3">Bienvenue dans l'admin</h3>
                      <p className="t-secondary text-sm leading-relaxed">
                        Ici tu peux modifier l'intégralité du contenu de ton portfolio : section d'accueil, à propos, compétences,
                        projets, publication, CV complet (profil, expériences, formations, langues, atouts), liens sociaux et paramètres.
                        Les modifications sont sauvegardées localement et appliquées en temps réel.
                      </p>
                    </div>
                  </div>
                )}

                {/* ── Hero ── */}
                {activeTab === 'hero' && (
                  <SectionCard title="Section Accueil (Hero)" actions={<button onClick={handleSaveHero} className="btn-primary text-sm"><Save size={16} /> Sauvegarder</button>}>
                    <Field label="Nom affiché">
                      <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="input-themed" />
                    </Field>
                    <Field label="Sous-titre (séparé par ·)">
                      <input value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="input-themed" />
                    </Field>
                    <Field label="Texte de présentation">
                      <textarea rows={4} value={heroContent} onChange={(e) => setHeroContent(e.target.value)} className="input-themed resize-none" />
                    </Field>
                    <Field label="Rôles (animation typewriter)">
                      <ArrayStringEditor items={heroRoles} onChange={setHeroRoles} placeholder="Ex: Consultante en IA appliquée" />
                    </Field>
                    <Field label="Texte du bouton CTA">
                      <input value={heroCtaText} onChange={(e) => setHeroCtaText(e.target.value)} className="input-themed max-w-xs" />
                    </Field>
                  </SectionCard>
                )}

                {/* ── About ── */}
                {activeTab === 'about' && (
                  <SectionCard title="Section À Propos" actions={<button onClick={handleSaveAbout} className="btn-primary text-sm"><Save size={16} /> Sauvegarder</button>}>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Titre">
                        <input value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} className="input-themed" />
                      </Field>
                      <Field label="Sous-titre">
                        <input value={aboutSubtitle} onChange={(e) => setAboutSubtitle(e.target.value)} className="input-themed" />
                      </Field>
                    </div>
                    <Field label="Contenu (séparer les paragraphes par une ligne vide)">
                      <textarea rows={10} value={aboutContent} onChange={(e) => setAboutContent(e.target.value)} className="input-themed resize-none" />
                    </Field>
                    <Field label="Points forts (highlights)">
                      <ArrayStringEditor items={aboutHighlights} onChange={setAboutHighlights} placeholder="Ex: Master IA appliquée (UQTR)" />
                    </Field>
                  </SectionCard>
                )}

                {/* ── Skills ── */}
                {activeTab === 'skills' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold t-primary">Compétences ({skills.length} catégories)</h3>
                      <div className="flex gap-2">
                        <button onClick={() => setSkills([...skills, { name: 'Nouvelle catégorie', icon: 'Star', skills: [] }])} className="btn-secondary text-sm py-2 px-3">
                          <Plus size={16} /> Catégorie
                        </button>
                        <button onClick={handleSaveSkills} className="btn-primary text-sm py-2 px-3">
                          <Save size={16} /> Sauvegarder
                        </button>
                      </div>
                    </div>
                    {skills.map((cat, ci) => (
                      <div key={ci} className="glass-card rounded-xl p-5 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 grid sm:grid-cols-2 gap-3">
                            <input value={cat.name} onChange={(e) => { const n = [...skills]; n[ci] = { ...n[ci], name: e.target.value }; setSkills(n); }}
                              className="input-themed text-sm font-medium" placeholder="Nom de la catégorie" />
                            <input value={cat.icon} onChange={(e) => { const n = [...skills]; n[ci] = { ...n[ci], icon: e.target.value }; setSkills(n); }}
                              className="input-themed text-sm" placeholder="Icône Lucide (Brain, Code, Wrench...)" />
                          </div>
                          <button onClick={() => setSkills(skills.filter((_, j) => j !== ci))} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <Field label="Compétences">
                          <ArrayStringEditor items={cat.skills} onChange={(v) => { const n = [...skills]; n[ci] = { ...n[ci], skills: v }; setSkills(n); }} placeholder="Ex: Python" />
                        </Field>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Projects ── */}
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold t-primary">Projets ({projects.length})</h3>
                      <div className="flex gap-2">
                        <button onClick={() => {
                          setProjects([...projects, {
                            id: Date.now(), title: 'Nouveau Projet', description: 'Description du projet...',
                            image_url: null, live_url: null, repo_url: null, tags: '["React"]',
                            featured: 0, sort_order: projects.length + 1,
                            created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
                          }]);
                        }} className="btn-secondary text-sm py-2 px-3"><Plus size={16} /> Ajouter</button>
                        <button onClick={handleSaveProjects} className="btn-primary text-sm py-2 px-3"><Save size={16} /> Sauvegarder</button>
                      </div>
                    </div>
                    {projects.map((project, pi) => (
                      <motion.div key={project.id} layout className="glass-card rounded-xl p-5 space-y-3">
                        <div className="flex items-start gap-3">
                          <GripVertical size={18} className="t-tertiary mt-1 cursor-grab" />
                          <div className="flex-1 space-y-3">
                            <input value={project.title} onChange={(e) => { const n = [...projects]; n[pi] = { ...n[pi], title: e.target.value }; setProjects(n); }}
                              className="input-themed text-sm font-medium" />
                            <textarea value={project.description || ''} onChange={(e) => { const n = [...projects]; n[pi] = { ...n[pi], description: e.target.value }; setProjects(n); }}
                              rows={2} className="input-themed text-sm resize-none" />
                            <div className="grid sm:grid-cols-2 gap-3">
                              <input value={project.live_url || ''} onChange={(e) => { const n = [...projects]; n[pi] = { ...n[pi], live_url: e.target.value }; setProjects(n); }}
                                placeholder="URL live" className="input-themed text-sm" />
                              <input value={project.repo_url || ''} onChange={(e) => { const n = [...projects]; n[pi] = { ...n[pi], repo_url: e.target.value }; setProjects(n); }}
                                placeholder="URL repo" className="input-themed text-sm" />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                              <input value={project.tags} onChange={(e) => { const n = [...projects]; n[pi] = { ...n[pi], tags: e.target.value }; setProjects(n); }}
                                placeholder='Tags JSON: ["React","Node.js"]' className="input-themed text-sm" />
                              <label className="flex items-center gap-2 text-sm t-secondary cursor-pointer">
                                <input type="checkbox" checked={project.featured === 1}
                                  onChange={(e) => { const n = [...projects]; n[pi] = { ...n[pi], featured: e.target.checked ? 1 : 0 }; setProjects(n); }}
                                  className="rounded" />
                                Projet mis en avant
                              </label>
                            </div>
                          </div>
                          <button onClick={() => setProjects(projects.filter((p) => p.id !== project.id))} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* ── Publication ── */}
                {activeTab === 'publication' && (
                  <SectionCard title="Publication scientifique" actions={<button onClick={handleSavePublication} className="btn-primary text-sm"><Save size={16} /> Sauvegarder</button>}>
                    <Field label="Titre">
                      <input value={pub.title} onChange={(e) => setPub({ ...pub, title: e.target.value })} className="input-themed" />
                    </Field>
                    <Field label="Auteurs">
                      <ArrayStringEditor items={pub.authors} onChange={(v) => setPub({ ...pub, authors: v })} placeholder="Nom complet" />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Conférence / revue">
                        <input value={pub.venue} onChange={(e) => setPub({ ...pub, venue: e.target.value })} className="input-themed text-sm" />
                      </Field>
                      <Field label="Abréviation">
                        <input value={pub.venueShort} onChange={(e) => setPub({ ...pub, venueShort: e.target.value })} className="input-themed text-sm" />
                      </Field>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Date">
                        <input value={pub.date} onChange={(e) => setPub({ ...pub, date: e.target.value })} className="input-themed text-sm" />
                      </Field>
                      <Field label="Lieu">
                        <input value={pub.location} onChange={(e) => setPub({ ...pub, location: e.target.value })} className="input-themed text-sm" />
                      </Field>
                    </div>
                    <Field label="Résumé (abstract)">
                      <textarea rows={5} value={pub.abstract} onChange={(e) => setPub({ ...pub, abstract: e.target.value })} className="input-themed resize-none text-sm" />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="DOI">
                        <input value={pub.doi} onChange={(e) => setPub({ ...pub, doi: e.target.value })} className="input-themed text-sm" />
                      </Field>
                      <Field label="URL du PDF">
                        <input value={pub.pdfUrl} onChange={(e) => setPub({ ...pub, pdfUrl: e.target.value })} className="input-themed text-sm" />
                      </Field>
                    </div>
                    <Field label="Mots-clés">
                      <ArrayStringEditor items={pub.keywords} onChange={(v) => setPub({ ...pub, keywords: v })} placeholder="Keyword" />
                    </Field>
                    <Field label="Métriques">
                      <div className="space-y-3">
                        {pub.metrics.map((m, mi) => (
                          <div key={mi} className="flex items-center gap-2">
                            <input value={m.label} placeholder="Label" onChange={(e) => { const n = [...pub.metrics]; n[mi] = { ...n[mi], label: e.target.value }; setPub({ ...pub, metrics: n }); }}
                              className="flex-1 input-themed text-sm" />
                            <input value={m.value} placeholder="Valeur" onChange={(e) => { const n = [...pub.metrics]; n[mi] = { ...n[mi], value: e.target.value }; setPub({ ...pub, metrics: n }); }}
                              className="w-24 input-themed text-sm" />
                            <input value={m.detail} placeholder="Détail" onChange={(e) => { const n = [...pub.metrics]; n[mi] = { ...n[mi], detail: e.target.value }; setPub({ ...pub, metrics: n }); }}
                              className="flex-1 input-themed text-sm" />
                            <button onClick={() => setPub({ ...pub, metrics: pub.metrics.filter((_, j) => j !== mi) })} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => setPub({ ...pub, metrics: [...pub.metrics, { label: '', value: '', detail: '' }] })} className="btn-secondary text-xs py-1.5 px-3">
                          <Plus size={14} /> Ajouter une métrique
                        </button>
                      </div>
                    </Field>
                  </SectionCard>
                )}

                {/* ── CV ── */}
                {activeTab === 'cv' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold t-primary">Curriculum Vitae</h3>
                      <div className="flex gap-2">
                        <Link to="/resume" className="btn-secondary text-sm py-2 px-3"><Eye size={16} /> Prévisualiser</Link>
                        <button onClick={handleSaveCV} className="btn-primary text-sm py-2 px-3"><Save size={16} /> Sauvegarder tout</button>
                      </div>
                    </div>

                    {/* Profil & Contact */}
                    <Collapsible title="Profil & Contact" defaultOpen>
                      <Field label="Résumé de profil">
                        <textarea rows={3} value={cvProfile} onChange={(e) => setCvProfile(e.target.value)} className="input-themed resize-none text-sm" />
                      </Field>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Field label="Email">
                          <input value={cvEmail} onChange={(e) => setCvEmail(e.target.value)} className="input-themed text-sm" />
                        </Field>
                        <Field label="Localisation">
                          <input value={cvLocation} onChange={(e) => setCvLocation(e.target.value)} className="input-themed text-sm" />
                        </Field>
                        <Field label="Téléphone">
                          <input value={cvPhone} onChange={(e) => setCvPhone(e.target.value)} className="input-themed text-sm" />
                        </Field>
                      </div>
                    </Collapsible>

                    {/* Expériences */}
                    <Collapsible title={`Expériences (${cvExp.length})`}>
                      <div className="space-y-4">
                        {cvExp.map((exp, ei) => (
                          <div key={ei} className="p-4 rounded-lg bg-fill-s space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 grid sm:grid-cols-2 gap-2">
                                <input value={exp.title} onChange={(e) => { const n = [...cvExp]; n[ei] = { ...n[ei], title: e.target.value }; setCvExp(n); }}
                                  className="input-themed text-sm" placeholder="Titre du poste" />
                                <input value={exp.employer} onChange={(e) => { const n = [...cvExp]; n[ei] = { ...n[ei], employer: e.target.value }; setCvExp(n); }}
                                  className="input-themed text-sm" placeholder="Employeur" />
                                <input value={exp.period} onChange={(e) => { const n = [...cvExp]; n[ei] = { ...n[ei], period: e.target.value }; setCvExp(n); }}
                                  className="input-themed text-sm" placeholder="Période" />
                                <input value={exp.location} onChange={(e) => { const n = [...cvExp]; n[ei] = { ...n[ei], location: e.target.value }; setCvExp(n); }}
                                  className="input-themed text-sm" placeholder="Lieu" />
                              </div>
                              <button onClick={() => setCvExp(cvExp.filter((_, j) => j !== ei))} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <Field label="Points clés">
                              <ArrayStringEditor items={exp.bullets} onChange={(v) => { const n = [...cvExp]; n[ei] = { ...n[ei], bullets: v }; setCvExp(n); }}
                                placeholder="Description..." />
                            </Field>
                          </div>
                        ))}
                        <button onClick={() => setCvExp([...cvExp, { title: '', employer: '', period: '', location: '', bullets: [''] }])}
                          className="btn-secondary text-sm"><Plus size={16} /> Ajouter une expérience</button>
                      </div>
                    </Collapsible>

                    {/* Formations */}
                    <Collapsible title={`Formations (${cvEdu.length})`}>
                      <div className="space-y-4">
                        {cvEdu.map((edu, ei) => (
                          <div key={ei} className="p-4 rounded-lg bg-fill-s space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 grid sm:grid-cols-2 gap-2">
                                <input value={edu.diploma} onChange={(e) => { const n = [...cvEdu]; n[ei] = { ...n[ei], diploma: e.target.value }; setCvEdu(n); }}
                                  className="input-themed text-sm" placeholder="Diplôme" />
                                <input value={edu.institution} onChange={(e) => { const n = [...cvEdu]; n[ei] = { ...n[ei], institution: e.target.value }; setCvEdu(n); }}
                                  className="input-themed text-sm" placeholder="Établissement" />
                                <input value={edu.period} onChange={(e) => { const n = [...cvEdu]; n[ei] = { ...n[ei], period: e.target.value }; setCvEdu(n); }}
                                  className="input-themed text-sm" placeholder="Période" />
                                <input value={edu.location} onChange={(e) => { const n = [...cvEdu]; n[ei] = { ...n[ei], location: e.target.value }; setCvEdu(n); }}
                                  className="input-themed text-sm" placeholder="Lieu" />
                              </div>
                              <button onClick={() => setCvEdu(cvEdu.filter((_, j) => j !== ei))} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <Field label="Détails (optionnel)">
                              <ArrayStringEditor items={edu.details || []} onChange={(v) => { const n = [...cvEdu]; n[ei] = { ...n[ei], details: v.length ? v : undefined }; setCvEdu(n); }}
                                placeholder="Détail..." />
                            </Field>
                          </div>
                        ))}
                        <button onClick={() => setCvEdu([...cvEdu, { diploma: '', institution: '', period: '', location: '' }])}
                          className="btn-secondary text-sm"><Plus size={16} /> Ajouter une formation</button>
                      </div>
                    </Collapsible>

                    {/* Langues */}
                    <Collapsible title={`Langues (${cvLangs.length})`}>
                      <div className="space-y-3">
                        {cvLangs.map((lang, li) => (
                          <div key={li} className="flex items-center gap-2">
                            <input value={lang.name} onChange={(e) => { const n = [...cvLangs]; n[li] = { ...n[li], name: e.target.value }; setCvLangs(n); }}
                              className="w-40 input-themed text-sm" placeholder="Langue" />
                            <input value={lang.level} onChange={(e) => { const n = [...cvLangs]; n[li] = { ...n[li], level: e.target.value }; setCvLangs(n); }}
                              className="flex-1 input-themed text-sm" placeholder="Niveau" />
                            <button onClick={() => setCvLangs(cvLangs.filter((_, j) => j !== li))} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                        <button onClick={() => setCvLangs([...cvLangs, { name: '', level: '' }])}
                          className="btn-secondary text-sm"><Plus size={16} /> Ajouter une langue</button>
                      </div>
                    </Collapsible>

                    {/* Atouts */}
                    <Collapsible title={`Atouts (${cvAtouts.length})`}>
                      <div className="space-y-4">
                        {cvAtouts.map((atout, ai) => (
                          <div key={ai} className="p-4 rounded-lg bg-fill-s space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <input value={atout.title} onChange={(e) => { const n = [...cvAtouts]; n[ai] = { ...n[ai], title: e.target.value }; setCvAtouts(n); }}
                                className="flex-1 input-themed text-sm font-medium" placeholder="Titre de l'atout" />
                              <button onClick={() => setCvAtouts(cvAtouts.filter((_, j) => j !== ai))} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10">
                                <Trash2 size={14} />
                              </button>
                            </div>
                            <ArrayStringEditor items={atout.items} onChange={(v) => { const n = [...cvAtouts]; n[ai] = { ...n[ai], items: v }; setCvAtouts(n); }}
                              placeholder="Description..." />
                          </div>
                        ))}
                        <button onClick={() => setCvAtouts([...cvAtouts, { title: '', items: [''] }])}
                          className="btn-secondary text-sm"><Plus size={16} /> Ajouter un atout</button>
                      </div>
                    </Collapsible>
                  </div>
                )}

                {/* ── Links ── */}
                {activeTab === 'links' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold t-primary">Liens sociaux</h3>
                      <button onClick={handleSaveLinks} className="btn-primary text-sm py-2 px-3"><Save size={16} /> Sauvegarder</button>
                    </div>
                    <div className="glass-card rounded-xl p-4 bg-accent-s/30 border bdr-accent">
                      <p className="text-sm font-medium t-primary mb-2">Comment configurer les liens</p>
                      <ul className="text-sm t-secondary space-y-1 list-disc list-inside">
                        <li><strong className="t-primary">Plateforme</strong> : nom affiché (ex. Email, LinkedIn, GitHub).</li>
                        <li><strong className="t-primary">URL</strong> : adresse complète — pour l’email utilisez <code className="text-xs bg-fill-s px-1 rounded">mailto:votre@email.com</code>, pour les réseaux <code className="text-xs bg-fill-s px-1 rounded">https://...</code>.</li>
                        <li><strong className="t-primary">Icône</strong> : nom exact parmi <code className="text-xs bg-fill-s px-1 rounded">Github</code>, <code className="text-xs bg-fill-s px-1 rounded">Linkedin</code>, <code className="text-xs bg-fill-s px-1 rounded">Mail</code> (casse respectée).</li>
                      </ul>
                    </div>
                    {links.map((link, i) => (
                      <div key={link.id} className="glass-card rounded-xl p-4 flex flex-wrap items-center gap-3">
                        <input value={link.platform} onChange={(e) => { const n = [...links]; n[i] = { ...n[i], platform: e.target.value }; setLinks(n); }}
                          className="w-32 input-themed text-sm" placeholder="Plateforme (ex. LinkedIn)" title="Nom affiché" />
                        <input value={link.url} onChange={(e) => { const n = [...links]; n[i] = { ...n[i], url: e.target.value }; setLinks(n); }}
                          className="flex-1 min-w-[200px] input-themed text-sm" placeholder="https://... ou mailto:..." title="URL complète" />
                        <input value={link.icon} onChange={(e) => { const n = [...links]; n[i] = { ...n[i], icon: e.target.value }; setLinks(n); }}
                          placeholder="Github, Linkedin, Mail" className="w-28 input-themed text-sm" title="Icône : Github, Linkedin ou Mail" />
                        <button onClick={() => setLinks(links.filter((_, j) => j !== i))} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10" aria-label="Supprimer le lien">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => setLinks([...links, { id: Date.now(), platform: '', url: '', icon: 'Mail', sort_order: links.length + 1 }])}
                      className="btn-secondary text-sm"><Plus size={16} /> Ajouter un lien</button>
                  </div>
                )}

                {/* ── Settings ── */}
                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <SectionCard title="Changer le mot de passe">
                      <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Nouveau mot de passe" className="input-themed max-w-md" />
                      <button onClick={handleSavePassword} className="btn-primary text-sm"><Save size={16} /> Changer</button>
                    </SectionCard>
                    <SectionCard title="Réinitialiser les données">
                      <p className="text-sm t-secondary">Supprimer toutes les modifications sauvegardées et revenir aux valeurs par défaut.</p>
                      <button onClick={() => {
                        const keys = ['hero', 'about', 'skills', 'projects', 'links', 'publication', 'resumeContact', 'resumeExp', 'resumeEdu', 'resumeLang', 'resumeAtouts'];
                        keys.forEach((k) => localStorage.removeItem(STORAGE_PREFIX + k));
                        showToast('Données réinitialisées. Rechargez la page pour appliquer.');
                      }} className="btn-secondary text-sm text-red-400 border-red-500/20 hover:border-red-500/40">
                        <Trash2 size={16} /> Réinitialiser
                      </button>
                    </SectionCard>
                    <SectionCard title="Déploiement Cloudflare">
                      <div className="text-sm t-secondary space-y-2">
                        <p>Pour connecter la base de données D1 :</p>
                        <ol className="list-decimal list-inside space-y-1 t-tertiary">
                          <li>Créez une base D1 : <code className="t-accent">wrangler d1 create aminata-diop-db</code></li>
                          <li>Copiez l'ID dans <code className="t-accent">wrangler.toml</code></li>
                          <li>Appliquez le schéma : <code className="t-accent">wrangler d1 execute aminata-diop-db --file=migrations/0001_init.sql</code></li>
                          <li>Déployez : <code className="t-accent">npm run deploy</code></li>
                        </ol>
                      </div>
                    </SectionCard>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
