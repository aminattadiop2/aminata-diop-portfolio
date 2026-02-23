import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Download, ArrowLeft, Mail, MapPin, Phone, Github, Linkedin, Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteData } from '../contexts/DataContext';
import {
  useLanguage, ui,
  enHero, enSkillCategories, enResumeContact,
  enResumeExperiences, enResumeEducation, enResumeLanguages, enResumeAtouts,
} from '../i18n';

export default function Resume() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);
  const { lang } = useLanguage();
  const t = ui[lang].resume;
  const isEn = lang === 'en';
  const siteData = useSiteData();

  const contact = isEn ? enResumeContact : siteData.resumeContact;
  const experiences = isEn ? enResumeExperiences : siteData.resumeExperiences;
  const education = isEn ? enResumeEducation : siteData.resumeEducation;
  const languages = isEn ? enResumeLanguages : siteData.resumeLanguages;
  const atouts = isEn ? enResumeAtouts : siteData.resumeAtouts;
  const skillCats = isEn ? enSkillCategories : siteData.skillCategories;
  const subtitle = isEn ? enHero.subtitle : 'Consultante en IA appliquée · Cofondatrice SIMILI · Solutions appliquées & automatisation';

  const handleDownload = async () => {
    if (!cvRef.current || generating) return;
    setGenerating(true);

    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf'),
      ]);

      const el = cvRef.current;

      const origStyle = el.getAttribute('style') || '';
      el.style.width = '680px';
      el.style.maxWidth = '680px';
      el.style.padding = '32px';
      el.classList.add('pdf-capture');

      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      el.setAttribute('style', origStyle);
      el.classList.remove('pdf-capture');

      const pdfW = 210;
      const pdfH = 297;
      const margin = 8;
      const contentW = pdfW - margin * 2;
      const ratio = contentW / canvas.width;

      const fullCtx = canvas.getContext('2d', { willReadFrequently: true })!;
      const maxPageSrcH = Math.floor((pdfH - margin * 2) / ratio);
      const searchRange = Math.floor(maxPageSrcH * 0.15);

      function isBlankRow(y: number): boolean {
        if (y < 0 || y >= canvas.height) return false;
        const row = fullCtx.getImageData(0, y, canvas.width, 1).data;
        for (let x = 0; x < canvas.width * 4; x += 4) {
          if (row[x] < 240 || row[x + 1] < 240 || row[x + 2] < 240) return false;
        }
        return true;
      }

      function findSafeCut(idealY: number): number {
        const clampedIdeal = Math.min(idealY, canvas.height);
        for (let offset = 0; offset <= searchRange; offset++) {
          const above = clampedIdeal - offset;
          if (above > 0 && isBlankRow(above) && isBlankRow(above - 1)) return above;
          const below = clampedIdeal + offset;
          if (below < canvas.height && isBlankRow(below) && isBlankRow(below + 1)) return below;
        }
        return clampedIdeal;
      }

      const pdf = new jsPDF('p', 'mm', 'a4');
      let srcY = 0;
      let page = 0;

      while (srcY < canvas.height) {
        if (page > 0) pdf.addPage();
        const remaining = canvas.height - srcY;
        let srcH: number;

        if (remaining <= maxPageSrcH) {
          srcH = remaining;
        } else {
          const cutY = findSafeCut(srcY + maxPageSrcH);
          srcH = cutY - srcY;
          if (srcH < maxPageSrcH * 0.5) srcH = maxPageSrcH;
        }

        const drawH = srcH * ratio;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.ceil(srcH);
        const ctx = pageCanvas.getContext('2d');
        if (ctx) ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH);

        const pageImg = pageCanvas.toDataURL('image/png');
        pdf.addImage(pageImg, 'PNG', margin, margin, contentW, drawH);
        srcY += srcH;
        page++;
      }

      pdf.save('Aminata_Diop_CV.pdf');
    } catch {
      window.print();
    } finally {
      setGenerating(false);
    }
  };

  const Dot = () => (
    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="section-container mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm t-secondary hover:t-primary transition-colors">
          <ArrowLeft size={16} /> {t.back}
        </Link>
        <button onClick={handleDownload} disabled={generating} className="btn-primary text-sm py-2 px-5">
          {generating ? (
            <><Loader2 size={16} className="animate-spin" /> {t.generating}</>
          ) : (
            <><Download size={16} /> {t.download}</>
          )}
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="section-container max-w-4xl">
        <div ref={cvRef} className="glass-card rounded-2xl p-8 sm:p-12 space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b bdr-light">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-black gradient-text">Aminata Diop</h1>
              <p className="text-lg t-secondary mt-1">{subtitle}</p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm t-secondary">
              <span className="flex items-center gap-2"><Mail size={14} /> {contact.email}</span>
              <span className="flex items-center gap-2"><MapPin size={14} /> {contact.location}</span>
              <span className="flex items-center gap-2"><Phone size={14} /> {contact.phone}</span>
            </div>
          </div>

          {/* Profile */}
          <div>
            <h2 className="font-heading text-xl font-bold t-primary mb-3 flex items-center gap-2">
              <Dot /> {t.profile}
            </h2>
            <p className="t-secondary leading-relaxed">{contact.profile}</p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="font-heading text-xl font-bold t-primary mb-4 flex items-center gap-2">
              <Dot /> {t.experience}
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <h3 className="font-medium t-primary">{exp.title}</h3>
                    <span className="text-sm t-secondary">{exp.period}</span>
                  </div>
                  <p className="text-sm t-accent mb-2">{exp.employer} — {exp.location}</p>
                  <ul className="list-disc list-inside text-sm t-secondary space-y-1">
                    {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-heading text-xl font-bold t-primary mb-4 flex items-center gap-2">
              <Dot /> {t.skills}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {skillCats.map((cat) => (
                <div key={cat.name}>
                  <h3 className="font-medium t-accent text-sm mb-2">{cat.name}</h3>
                  <p className="t-secondary text-sm">{cat.skills.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-heading text-xl font-bold t-primary mb-4 flex items-center gap-2">
              <Dot /> {t.education}
            </h2>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="font-medium t-primary">{edu.diploma}</h3>
                    <span className="text-sm t-secondary">{edu.period}</span>
                  </div>
                  <p className="text-sm t-accent">{edu.institution} — {edu.location}</p>
                  {edu.details && (
                    <ul className="list-disc list-inside text-sm t-secondary mt-2 space-y-1">
                      {edu.details.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="font-heading text-xl font-bold t-primary mb-3 flex items-center gap-2">
              <Dot /> {t.languages}
            </h2>
            <div className="flex flex-wrap gap-4 t-secondary">
              {languages.map((l, i) => (
                <span key={i} className="text-sm">
                  <strong className="t-primary">{l.name}</strong> — {l.level}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h2 className="font-heading text-xl font-bold t-primary mb-4 flex items-center gap-2">
              <Dot /> {t.strengths}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {atouts.map((a, i) => (
                <div key={i}>
                  <h3 className="font-medium t-accent text-sm mb-2">{a.title}</h3>
                  <ul className="list-disc list-inside text-sm t-secondary space-y-1">
                    {a.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="pt-4 border-t bdr-light">
            <div className="flex flex-wrap items-center gap-4 text-sm t-secondary">
              {siteData.links.map((link) => {
                const icons: Record<string, React.ReactNode> = {
                  Github: <Github size={14} />,
                  Linkedin: <Linkedin size={14} />,
                  Mail: <Mail size={14} />,
                };
                return (
                  <a key={link.id} href={link.url} className="flex items-center gap-1.5 hover:t-primary transition-colors">
                    {icons[link.icon]} {link.platform} — {link.url.replace('mailto:', '').replace('https://', '')}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
