import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Moon, Sun, FileText, Shield, Globe } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { useLanguage, ui } from '../../i18n';

const NAV_IDS = ['hero', 'about', 'skills', 'projects', 'publications', 'contact'] as const;

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const activeSection = useScrollSpy([...NAV_IDS], 120);
  const { lang, setLang } = useLanguage();
  const t = ui[lang].nav;

  const navItems = [
    { id: 'hero', label: t.home },
    { id: 'about', label: t.about },
    { id: 'skills', label: t.skills },
    { id: 'projects', label: t.projects },
    { id: 'publications', label: t.publications },
    { id: 'contact', label: t.contact },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (!isHome) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleLang = () => setLang(lang === 'fr' ? 'en' : 'fr');

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 sm:h-20">
        <Link
          to="/"
          className="font-heading text-xl font-semibold t-primary hover:opacity-80 transition-opacity"
        >
          AD.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {isHome &&
            navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.id ? 't-primary' : 't-secondary hover:t-primary'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-fill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}

          <Link
            to="/resume"
            className="ml-2 px-4 py-2 text-sm font-medium t-secondary hover:t-primary transition-colors flex items-center gap-1.5"
          >
            <FileText size={15} />
            {t.cv}
          </Link>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold t-secondary hover:t-primary hover:bg-fill-s transition-colors"
            aria-label="Switch language"
          >
            <Globe size={14} />
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          <button
            onClick={onToggleTheme}
            className="ml-1 p-2 rounded-full t-secondary hover:t-primary hover:bg-fill-s transition-colors"
            aria-label={ui[lang].theme}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/admin"
            className="ml-1 p-2 rounded-full t-tertiary hover:t-accent hover:bg-fill-s transition-colors"
            aria-label={t.admin}
          >
            <Shield size={18} />
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLang}
            className="px-2.5 py-1.5 rounded-full text-xs font-semibold t-secondary hover:t-primary transition-colors"
          >
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full t-secondary hover:t-primary transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full t-secondary hover:t-primary transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t bdr-light overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {isHome &&
                navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 't-primary bg-fill'
                        : 't-secondary hover:t-primary hover:bg-fill-s'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              <Link
                to="/resume"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium t-secondary hover:t-primary hover:bg-fill-s transition-colors"
              >
                <FileText size={15} /> {t.cv}
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium t-tertiary hover:t-accent hover:bg-fill-s transition-colors"
              >
                <Shield size={15} /> {t.admin}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
