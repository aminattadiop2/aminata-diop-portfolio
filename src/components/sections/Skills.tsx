import { motion } from 'motion/react';
import { Monitor, Wrench, Brain, Code } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../contexts/DataContext';
import { useLanguage, ui, enSkillCategories } from '../../i18n';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Monitor,
  Wrench,
  Brain,
  Code,
};

export default function Skills() {
  const { lang } = useLanguage();
  const t = ui[lang].skills;
  const { skillCategories } = useSiteData();
  const categories = lang === 'en' ? enSkillCategories : skillCategories;

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Monitor;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl border bg-fill-s bdr-light group-hover:bg-accent-s group-hover:bdr-accent transition-colors">
                    <Icon size={22} className="t-secondary group-hover:t-accent transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold t-primary">{cat.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-tag text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
