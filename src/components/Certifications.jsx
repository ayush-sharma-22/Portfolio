import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

// 1. The "Brand Identity" Set (Spring Logo)
const SpringLogoIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.801 17.618c-3.53-1.042-5.748-4.48-5.334-8.083.33-2.923 2.502-5.36 5.39-6.046 3.655-.865 7.151 1.258 8.163 4.793 1.01 3.528-1.054 7.23-4.664 8.358-1.127.351-2.316.33-3.414-.075l.135-.615c.983.337 2.04.341 3.037.014 3.076-.96 4.966-4.148 4.22-7.232-.746-3.08-3.834-4.78-6.945-3.805-2.457.77-4.296 2.87-4.57 5.39-.345 3.067 1.542 5.962 4.544 6.848l-.56 1.453zm6.657-6.082a4.42 4.42 0 01-1.353 3.12 4.407 4.407 0 01-3.117 1.252 4.417 4.417 0 01-3.12-1.348 4.414 4.414 0 01-1.256-3.114 4.42 4.42 0 011.352-3.12c1.722-1.631 4.512-1.631 6.234 0a4.422 4.422 0 011.26 3.21zm-1.264-2.385a3.393 3.393 0 00-4.8 0 3.385 3.385 0 00-.974 2.392c.002.905.357 1.764.985 2.408.643.627 1.503.98 2.408.98s1.764-.352 2.406-.976a3.386 3.386 0 00.974-2.404c0-.907-.354-1.769-.999-2.4z"/>
  </svg>
);

// 2. The "Hardware & Infrastructure" Set (Database/Server)
const DatabaseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

// 3. The "Abstract & Modern" Set (Neural Network Nodes)
const NetworkIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" />
    <circle cx="19" cy="19" r="3" />
    <circle cx="5" cy="19" r="3" />
    <path d="M10.5 7.5 7.5 16.5" />
    <path d="M13.5 7.5 16.5 16.5" />
    <path d="M7.5 19.5h9" />
  </svg>
);

const certifications = [
  {
    title: 'Spring 5 Basics with Spring Boot',
    issuer: 'Infosys Springboard',
    date: 'Feb 2026',
    icon: <SpringLogoIcon />,
    color: 'green',
    tags: ['Spring Boot', 'Java', 'Backend'],
    description: 'Comprehensive course covering Spring Framework 5 core concepts, Spring Boot auto-configuration, REST API development, and data access with Spring Data JPA.',
  },
  {
    title: 'AWS Academy Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'Aug 2025',
    icon: <DatabaseIcon />,
    color: 'amber',
    tags: ['AWS', 'Cloud', 'Infrastructure'],
    description: 'AWS foundational concepts covering EC2, S3, RDS, IAM, VPC, and core cloud architecture principles for scalable and secure cloud deployments.',
  },
  {
    title: 'AI Fundamentals with IBM SkillsBuild',
    issuer: 'Cisco & IBM SkillsBuild',
    date: 'Sep 2025',
    icon: <NetworkIcon />,
    color: 'cyan',
    tags: ['Artificial Intelligence', 'Machine Learning', 'IBM'],
    description: 'AI fundamentals including machine learning concepts, neural networks, natural language processing, and practical applications of AI in enterprise systems.',
  },
];

const colorConfig = {
  green: {
    border: 'border-accent-green/30 hover:border-accent-green/60',
    badge: 'bg-accent-green/10 border border-accent-green/20 text-accent-green',
    dot: 'bg-accent-green',
    shadow: 'hover:shadow-[0_8px_40px_rgba(74,222,128,0.12)]',
  },
  amber: {
    border: 'border-accent-amber/30 hover:border-accent-amber/60',
    badge: 'bg-accent-amber/10 border border-accent-amber/20 text-accent-amber',
    dot: 'bg-accent-amber',
    shadow: 'hover:shadow-glow-amber',
  },
  cyan: {
    border: 'border-accent-cyan/30 hover:border-accent-cyan/60',
    badge: 'bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan',
    dot: 'bg-accent-cyan',
    shadow: 'hover:shadow-glow-cyan',
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 grid-bg">
      <div className="absolute right-0 top-1/4 w-72 h-72 bg-accent-green/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <p className="section-label mb-2">{'// 05'}</p>
          <h2 className="section-header text-accent-orange">
            <span className="text-text-muted">$ </span>cat certifications.json
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, i) => {
            const cfg = colorConfig[cert.color];
            return (
              <motion.div
                key={cert.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                className={`glass-card p-6 border ${cfg.border} ${cfg.shadow} transition-all duration-300`}
              >
                {/* Icon + date */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${cfg.badge} flex items-center justify-center`}>
                    {cert.icon}
                  </div>
                  <span className="text-mono text-xs text-text-muted bg-bg-secondary px-2 py-1 rounded border border-bg-border">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-display font-bold text-text-primary text-base mb-1 leading-snug">
                  {cert.title}
                </h3>
                <p className={`text-mono text-xs ${cfg.badge.split(' ').find(c => c.startsWith('text-'))} mb-3`}>
                  {cert.issuer}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {cert.tags.map((tag) => (
                    <span key={tag} className={`text-mono text-xs px-2 py-0.5 rounded border ${cfg.badge}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Verified dot */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-bg-border">
                  <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                  <span className="text-mono text-xs text-text-muted">Verified Certificate</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
