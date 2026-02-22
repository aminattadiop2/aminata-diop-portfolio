import { motion } from 'motion/react';

interface SectionTitleProps {
  title: string;
  subtitle?: string | null;
  centered?: boolean;
}

export default function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className="text-sm font-medium tracking-wide t-secondary mb-3 block">
          {subtitle}
        </span>
      )}
      <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight t-primary">
        {title}
      </h2>
      <div className="mt-4 mx-auto h-0.5 w-12 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
    </motion.div>
  );
}
