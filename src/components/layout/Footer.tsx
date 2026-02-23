import { Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { useSiteData } from '../../contexts/DataContext';
import { useLanguage, ui, enHero } from '../../i18n';

const iconMap: Record<string, React.ReactNode> = {
  Github: <Github size={18} />,
  Linkedin: <Linkedin size={18} />,
  Mail: <Mail size={18} />,
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const { lang } = useLanguage();
  const t = ui[lang].footer;
  const { sections, links: defaultLinks } = useSiteData();
  const subtitle = lang === 'en' ? enHero.subtitle : (sections.hero.subtitle || '');

  return (
    <footer className="relative border-t bdr-light bg-page">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="font-heading text-lg font-semibold t-primary">Aminata Diop</span>
            <p className="text-sm t-secondary mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {defaultLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="p-2.5 rounded-full t-secondary hover:t-primary hover:bg-fill-s transition-all duration-200"
                aria-label={link.platform}
              >
                {iconMap[link.icon] || <Mail size={18} />}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t bdr-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm t-secondary flex items-center gap-1">
            &copy; {new Date().getFullYear()} Aminata Diop. {t.madeWith}{' '}
            <Heart size={14} className="t-accent" style={{ fill: 'var(--accent)' }} />
          </p>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full t-secondary hover:t-primary hover:bg-fill-s transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
