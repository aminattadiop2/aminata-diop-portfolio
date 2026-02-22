import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, CheckCircle } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import { defaultLinks, resumeContact } from '../../data/defaults';
import { useLanguage, ui } from '../../i18n';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { lang } = useLanguage();
  const t = ui[lang].contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio - Message ${lang === 'fr' ? 'de' : 'from'} ${formState.name}`);
    const body = encodeURIComponent(`${lang === 'fr' ? 'De' : 'From'}: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`);
    window.location.href = `mailto:${resumeContact.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const socialIcons: Record<string, React.ReactNode> = {
    Github: <Github size={20} />,
    Linkedin: <Linkedin size={20} />,
    Mail: <Mail size={20} />,
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container">
        <SectionTitle title={t.title} subtitle={t.subtitle} />

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold t-primary mb-3">
                {t.heading}
              </h3>
              <p className="t-secondary leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 t-primary" style={{ opacity: 0.85 }}>
                <div className="p-2.5 rounded-xl bg-accent-s border bdr-accent">
                  <Mail size={18} className="t-accent" />
                </div>
                <a href={`mailto:${resumeContact.email}`} className="text-sm hover:t-accent transition-colors">
                  {resumeContact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 t-primary" style={{ opacity: 0.85 }}>
                <div className="p-2.5 rounded-xl bg-fill-s border bdr-light">
                  <MapPin size={18} className="t-secondary" />
                </div>
                <span className="text-sm">{resumeContact.location}</span>
              </div>
              <div className="flex items-center gap-3 t-primary" style={{ opacity: 0.85 }}>
                <div className="p-2.5 rounded-xl bg-fill-s border bdr-light">
                  <Phone size={18} className="t-secondary" />
                </div>
                <a href={`tel:${resumeContact.phone.replace(/\s/g, '')}`} className="text-sm hover:t-accent transition-colors">
                  {resumeContact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {defaultLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card t-secondary hover:t-primary transition-colors"
                  aria-label={link.platform}
                >
                  {socialIcons[link.icon] || <Mail size={20} />}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass-card rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium t-secondary mb-2">
                  {t.name}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="input-themed"
                  placeholder={t.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium t-secondary mb-2">
                  {t.email}
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="input-themed"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium t-secondary mb-2">
                {t.message}
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="input-themed resize-none"
                placeholder={t.messagePlaceholder}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center"
              disabled={sent}
            >
              {sent ? (
                <><CheckCircle size={18} /> {t.sent}</>
              ) : (
                <><Send size={18} /> {t.send}</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
