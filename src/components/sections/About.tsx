import { motion } from 'motion/react';
import { User, GraduationCap, BookOpen, FlaskConical } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../contexts/DataContext';
import { useLanguage, ui, enAbout } from '../../i18n';

const highlightIcons = [GraduationCap, BookOpen, FlaskConical];

export default function About() {
  const { lang } = useLanguage();
  const t = ui[lang].about;
  const isEn = lang === 'en';
  const { sections } = useSiteData();

  const content = isEn ? enAbout.content : (sections.about.content || '');
  const highlights: string[] = isEn
    ? enAbout.highlights
    : (() => { try { return JSON.parse(sections.about.metadata || '{}').highlights || []; } catch { return []; } })();
  const paragraphs = content.split('\n\n');

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl border-2 bdr-light bg-surface flex items-center justify-center">
                <User size={80} className="t-tertiary" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-surface border bdr-light flex items-center justify-center">
                <span className="font-heading text-3xl font-bold t-primary">AD</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="t-primary leading-relaxed text-lg" style={{ opacity: 0.85 }}>
                {p}
              </p>
            ))}

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((label, i) => {
                const Icon = highlightIcons[i % highlightIcons.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="group glass-card rounded-xl p-4 text-center"
                  >
                    <Icon className="mx-auto mb-2 t-secondary group-hover:t-accent transition-colors" size={24} />
                    <span className="text-sm font-medium t-secondary group-hover:t-primary transition-colors">{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
