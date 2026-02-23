import { motion } from 'motion/react';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useSiteData } from '../../contexts/DataContext';
import { useLanguage, ui, enHero } from '../../i18n';

export default function Hero() {
  const { lang } = useLanguage();
  const t = ui[lang].hero;
  const isEn = lang === 'en';
  const { sections } = useSiteData();

  const title = isEn ? enHero.title : sections.hero.title;
  const content = isEn ? enHero.content : sections.hero.content;
  const roles = isEn
    ? enHero.roles
    : (() => { try { return JSON.parse(sections.hero.metadata || '{}').roles || []; } catch { return []; } })();

  const typedRole = useTypewriter(roles, 80, 40, 2500);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section-container relative z-10 py-32 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fill-s border bdr-light t-secondary text-sm mb-8"
          >
            <Sparkles size={14} />
            <span>{t.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.95] mb-6"
          >
            <span className="t-primary">{t.greeting}</span>
            <br />
            <span className="gradient-text">{title}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="h-10 mb-6"
          >
            <span className="font-heading text-xl sm:text-2xl t-secondary">
              {typedRole}
              <span className="animate-pulse t-accent">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg t-secondary max-w-xl mb-10 leading-relaxed"
          >
            {content}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn-primary">
              <Sparkles size={18} />
              {t.cta}
            </a>
            <a href="/resume" className="btn-secondary">
              <Download size={18} />
              {t.cv}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <a
              href="#about"
              className="flex flex-col items-center gap-2 t-secondary hover:t-accent transition-colors"
            >
              <span className="text-xs uppercase tracking-widest">{t.scroll}</span>
              <ArrowDown size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
