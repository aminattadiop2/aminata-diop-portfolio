import { motion } from 'motion/react';
import { ExternalLink, Github, Star } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { useSiteData } from '../../contexts/DataContext';
import { useLanguage, ui, enProjects } from '../../i18n';

export default function Projects() {
  const { lang } = useLanguage();
  const t = ui[lang].projects;
  const { projects: siteProjects } = useSiteData();

  const projects = lang === 'en'
    ? siteProjects.map((p) => {
        const en = enProjects.find((e) => e.id === p.id);
        return en ? { ...p, ...en } : p;
      })
    : siteProjects;

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const tags: string[] = JSON.parse(project.tags || '[]');

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group glass-card rounded-2xl overflow-hidden"
              >
                <div className="relative h-48 bg-surface border-b bdr-light flex items-center justify-center overflow-hidden">
                  <span className="font-heading text-5xl font-semibold t-tertiary group-hover:t-secondary transition-colors select-none">
                    {project.title.charAt(0)}
                  </span>
                  {project.featured === 1 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-s t-accent text-xs font-medium">
                      <Star size={12} style={{ fill: 'var(--accent)' }} />
                      {t.featured}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold t-primary mb-2 group-hover:t-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="t-secondary text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {tags.map((tag) => (
                      <span key={tag} className="skill-tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t bdr-light">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm t-secondary hover:t-accent transition-colors"
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm t-secondary hover:t-primary transition-colors"
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
