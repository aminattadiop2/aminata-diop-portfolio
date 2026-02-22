import { motion } from 'motion/react';
import { FileText, Download, MapPin, Calendar, Users, BarChart3 } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { defaultPublication } from '../../data/defaults';
import { useLanguage, ui, enPublication } from '../../i18n';

export default function Publications() {
  const { lang } = useLanguage();
  const t = ui[lang].publication;
  const pub = lang === 'en' ? enPublication : defaultPublication;

  return (
    <section id="publications" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl overflow-hidden max-w-4xl mx-auto"
        >
          <div className="h-1 w-full" style={{ backgroundColor: 'var(--accent)' }} />

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-s t-accent text-xs font-semibold">
                <FileText size={12} />
                {pub.venueShort}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs t-secondary">
                <Calendar size={12} />
                {pub.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs t-secondary">
                <MapPin size={12} />
                {pub.location}
              </span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold t-primary leading-snug">
              {pub.title}
            </h3>

            <div className="flex items-center gap-2 t-secondary text-sm">
              <Users size={14} className="shrink-0" />
              <span>
                {pub.authors.map((a, i) => (
                  <span key={a}>
                    {a === 'Aminata Diop' ? <strong className="t-primary">{a}</strong> : a}
                    {i < pub.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </span>
            </div>

            <p className="t-secondary text-sm leading-relaxed">
              {pub.abstract}
            </p>

            <div className="grid grid-cols-3 gap-3">
              {pub.metrics.map((m) => (
                <motion.div
                  key={m.label}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl p-4 bg-fill-s border bdr-light text-center transition-colors"
                >
                  <BarChart3 size={16} className="mx-auto mb-2 t-accent" />
                  <p className="font-heading text-lg sm:text-xl font-bold t-accent">{m.value}</p>
                  <p className="text-xs font-medium t-primary mt-1">{m.label}</p>
                  <p className="text-xs t-tertiary mt-0.5">{m.detail}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {pub.keywords.map((kw) => (
                <span key={kw} className="skill-tag text-xs">{kw}</span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={pub.pdfUrl}
                download
                className="btn-primary text-sm py-2 px-5"
              >
                <Download size={16} />
                {t.download}
              </a>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
