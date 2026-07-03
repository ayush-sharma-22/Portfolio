import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 70 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 14,
      delay: i * 0.12,
    },
  }),
};

const experiences = [
  // ── JPMorgan Simulation (most recent) ──────────────────────────────────
  {
    hash: 'a3f9c12',
    branch: 'forage',
    company: 'JPMorgan Chase & Co.',
    title: 'Software Engineering Simulation',
    period: '2026-01',
    periodLabel: '2026-01',
    type: 'Simulation',
    bullets: [
      'Integrated Apache Kafka with Spring Boot to process high-volume transaction messages in real time.',
      'Built 3+ REST endpoints with Spring Data JPA for end-to-end transaction workflows.',
    ],
    tags: ['Kafka', 'Spring Boot', 'JPA', 'REST APIs'],
  },
  // ── Hackathon ─────────────────────────────────────────────────────────────
  {
    hash: 'b2e7d09',
    branch: 'hackathon',
    company: 'Devi@Thon 2025',
    title: 'Project Lead — TrustSight AI',
    period: '2025-11',
    periodLabel: '2025-11',
    type: 'Hackathon',
    bullets: [
      'Led development of a multi-agent AI research assistant coordinating specialized LLM agents.',
      'Designed the orchestration layer for agent communication and collaborative workflows.',
    ],
    tags: ['Python', 'Multi-Agent AI', 'LLM Orchestration'],
  },

  // ── Initial commit (origin anchor at bottom) ─────────────────────────────
  {
    hash: '0000001',
    branch: 'main',
    company: 'Parul Institute of Technology',
    title: 'Initial Commit — Journey Begins',
    period: '2023-07',
    periodLabel: '2023-07',
    type: 'Education',
    bullets: [
      'B.Tech Computer Science (AI specialization) · Expected May 2027.',
    ],
    tags: ['CS+AI', 'B.Tech'],
    isInit: true,
  },
];

// ── Date pill matching the reference ─────────────────────────────────────────
function DatePill({ label }) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap"
      style={{
        background: '#161b22',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      }}
    >
      <span className="text-accent-orange text-sm">
        {/* Calendar icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </span>
      <span className="text-mono text-xs text-text-secondary tracking-wide">{label}</span>
    </div>
  );
}

// ── Experience card ──────────────────────────────────────────────────────────
function ExperienceCard({ exp }) {
  return (
    <motion.div
      className="w-full rounded-xl p-5 flex flex-col gap-3 cursor-default group"
      style={{
        background: exp.isInit ? 'rgba(249,115,22,0.04)' : '#0d1117',
        border: exp.isInit
          ? '1px solid rgba(249,115,22,0.25)'
          : '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
      whileHover={{
        y: -5,
        boxShadow: exp.isInit
          ? '0 12px 36px rgba(249,115,22,0.25), 0 0 0 1px rgba(249,115,22,0.4)'
          : '0 12px 36px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.3)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Hash + branch */}
      <div className="flex items-center gap-2 flex-wrap">
        <code className="text-mono text-[10px] text-accent-orange bg-accent-orange/10 px-2 py-0.5 rounded">
          {exp.hash}
        </code>
        <span className="text-mono text-[10px] text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded">
          {exp.branch}
        </span>
      </div>

      {/* Title + company */}
      <div>
        <h3 className="text-display font-bold text-text-primary text-base leading-snug transition-colors duration-300 group-hover:text-accent-orange">
          {exp.title}
        </h3>
        <p className="text-mono text-xs text-text-muted mt-0.5">@ {exp.company}</p>
      </div>

      {/* Bullets */}
      <ul className="space-y-1.5">
        {exp.bullets.map((b, bi) => (
          <li key={bi} className="flex gap-2 text-text-secondary text-xs leading-relaxed">
            <span className="text-accent-orange shrink-0 mt-0.5">▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {exp.tags.map((tag) => (
          <span key={tag} className="tag-chip">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" className="relative py-24 grid-bg">
      <div className="absolute right-0 top-1/3 w-64 h-64 bg-accent-cyan/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-16">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-16"
        >
          <p className="section-label mb-2">{'// 02'}</p>
          <h2 className="section-header text-accent-orange">
            <span className="text-text-muted">$ </span>git log --oneline
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical centre line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-orange/60 via-accent-orange/30 to-transparent" />

          <div className="space-y-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0; // card on left → date pill on right
              return (
                <motion.div
                  key={exp.hash}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  variants={fadeUp}
                  custom={i}
                  className="relative flex items-center"
                >
                  {/* Centre dot */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 z-10 rounded-full border-[3px] border-bg-primary"
                    style={{
                      width: exp.isInit ? '18px' : '14px',
                      height: exp.isInit ? '18px' : '14px',
                      background: '#f97316',
                      boxShadow: '0 0 12px rgba(249,115,22,0.75)',
                    }}
                  >
                    {/* Pulse ring on the most-recent (top) entry */}
                    {i === 0 && (
                      <>
                        <span className="absolute inset-0 rounded-full animate-ping bg-accent-orange opacity-50" />
                        <span className="absolute -inset-2 rounded-full border border-accent-orange/25 animate-pulse" />
                      </>
                    )}
                  </div>

                  {isLeft ? (
                    <>
                      {/* Card — left side */}
                      <div className="w-[46%] pr-8 flex justify-end">
                        <div className="w-full max-w-sm">
                          <ExperienceCard exp={exp} />
                        </div>
                      </div>

                      {/* Gap covering the dot */}
                      <div className="w-[8%]" />

                      {/* Date pill — right side */}
                      <div className="w-[46%] pl-8 flex items-center">
                        {/* Connector line from dot to pill */}
                        <div className="w-4 h-px bg-accent-orange/40 shrink-0" />
                        <DatePill label={exp.periodLabel} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Date pill — left side */}
                      <div className="w-[46%] pr-8 flex items-center justify-end">
                        <DatePill label={exp.periodLabel} />
                        {/* Connector line from pill to dot */}
                        <div className="w-4 h-px bg-accent-orange/40 shrink-0" />
                      </div>

                      {/* Gap covering the dot */}
                      <div className="w-[8%]" />

                      {/* Card — right side */}
                      <div className="w-[46%] pl-8 flex justify-start">
                        <div className="w-full max-w-sm">
                          <ExperienceCard exp={exp} />
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
