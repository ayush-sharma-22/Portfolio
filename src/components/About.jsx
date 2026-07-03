import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const infoRows = [
  { label: 'OPERATOR', value: 'AYUSH RAJAN SHARMA', color: 'text-accent-orange' },
  { label: 'ROLE',     value: 'BACKEND_DEVELOPER',  color: 'text-accent-cyan' },
  { label: 'LOCATION', value: 'India',              color: 'text-text-primary' },
  { label: 'STATUS',   value: 'OPEN TO WORK',       badge: true },
];

const stats = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    iconColor: 'text-accent-orange',
    category: 'PROJECTS',
    value: '6+',
    unit: 'DEP',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    iconColor: 'text-accent-cyan',
    category: 'CERTS',
    value: '3',
    unit: 'EARNED',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    iconColor: 'text-accent-amber',
    category: 'FOCUS',
    value: 'μSvc',
    unit: 'ARCH',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 grid-bg">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-16">

        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <p className="section-label mb-2">{'// 01'}</p>
          <h2 className="section-header text-accent-orange">
            <span className="text-text-muted">$ </span>cat about.md
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── LEFT — Profile Card ───────────────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={1}
          >
          {/* Gradient-border wrapper — 1px gradient bg creates the border */}
            <div
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #f97316 35%, #22d3ee 65%, #22d3ee 100%)',
                padding: '1px',
                borderRadius: '18px',
                boxShadow: '-6px 6px 24px rgba(249,115,22,0.15), 6px -6px 24px rgba(34,211,238,0.15)',
              }}
            >
              <div
                className="rounded-2xl p-10 flex flex-col items-center text-center"
                style={{ background: '#0d1117' }}
              >
                {/* Orbit avatar */}
                <div className="relative w-44 h-44 mb-10">
                  {/* Orange arc — top-left half */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '2px solid transparent',
                      background: 'conic-gradient(from 200deg, #f97316 0deg, #f97316 160deg, transparent 160deg) border-box',
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'destination-out',
                      maskComposite: 'exclude',
                    }}
                  />
                  {/* Cyan arc — bottom-right half */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: '2px solid transparent',
                      background: 'conic-gradient(from 20deg, #22d3ee 0deg, #22d3ee 160deg, transparent 160deg) border-box',
                      WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'destination-out',
                      maskComposite: 'exclude',
                    }}
                  />
                  {/* Inner subtle ring */}
                  <div className="absolute inset-2 rounded-full border border-white/5" />
                  {/* Avatar circle */}
                  <div
                    className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(34,211,238,0.12))' }}
                  >
                    <img src="https://github.com/ayush-sharma-22.png" alt="Ayush Sharma" className="w-full h-full object-cover" />
                  </div>
                  {/* Online dot */}
                  <span
                    className="absolute bottom-4 right-3 w-4 h-4 bg-accent-green rounded-full border-2 border-bg-primary animate-pulse"
                    aria-label="Online"
                  />
                </div>

                {/* Info rows */}
                <div className="w-full space-y-4 text-left mt-2">
                  {infoRows.map(({ label, value, color, badge }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center pb-4"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <span className="text-mono text-xs text-text-muted tracking-[0.18em]">
                        {label}
                      </span>
                      {badge ? (
                        <span className="status-pill status-pill-green">
                          <span className="status-dot bg-accent-green" />
                          {value}
                        </span>
                      ) : (
                        <span className={`text-mono text-base font-semibold ${color}`}>
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — Terminal + Stat cards ────────────────────────── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={2}
            className="flex flex-col gap-5"
          >
            {/* Terminal panel */}
            <div
              className="terminal-window"
              style={{
                boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,34,40,0.8)',
              }}
            >
              <div className="terminal-header">
                <span className="terminal-dot bg-accent-red" />
                <span className="terminal-dot bg-accent-amber" />
                <span className="terminal-dot bg-accent-green" />
                <span className="text-mono text-xs text-text-muted ml-2 flex items-center gap-1">
                  <span className="text-accent-orange/70">{'>'}_</span> user_profile.log
                </span>
              </div>

              <div className="p-8 space-y-7">
                {/* whoami */}
                <div>
                  <p className="text-mono text-base mb-4 flex items-center gap-2">
                    <span className="text-accent-orange text-lg">→</span>
                    <span className="text-accent-amber">whoami</span>
                  </p>
                  <p className="text-text-secondary leading-loose font-mono text-sm border-l-2 border-accent-orange/40 pl-5">
                    Backend Developer and CS+AI student skilled in designing{' '}
                    <span className="text-accent-cyan">RESTful APIs</span>, secure{' '}
                    <span className="text-accent-cyan">JWT authentication</span>, and
                    event-driven communication with{' '}
                    <span className="text-accent-orange">Apache Kafka</span>. Proficient in
                    MySQL/MongoDB schema design,{' '}
                    <span className="text-accent-orange">Docker</span> containerization, and
                    building scalable, production-style backend systems.
                  </p>
                </div>

                {/* cat mission.txt */}
                <div>
                  <p className="text-mono text-base mb-4 flex items-center gap-2">
                    <span className="text-accent-orange text-lg">→</span>
                    <span className="text-accent-amber">cat mission.txt</span>
                  </p>
                  <p className="text-text-secondary leading-loose font-mono text-sm border-l-2 border-accent-cyan/40 pl-5">
                    Translating complex requirements into clean microservices architecture.
                    Currently focused on{' '}
                    <span className="font-bold text-text-primary">System Design</span>,{' '}
                    <span className="font-bold text-text-primary">Event-Driven Architecture</span>,
                    and{' '}
                    <span className="font-bold text-text-primary">AI-augmented backends</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Stat cards row — each its own card ───────────────── */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ icon, iconColor, category, value, unit }) => (
                <div
                  key={category}
                  className="rounded-xl p-5 flex flex-col gap-3"
                  style={{
                    background: 'rgba(17,19,24,0.9)',
                    border: '1px solid rgba(30,34,40,0.9)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Icon + category label */}
                  <div className="flex items-center gap-2">
                    <span className={`${iconColor} w-5 h-5`}>{icon}</span>
                    <span className="text-mono text-[10px] text-text-muted tracking-[0.14em] uppercase">
                      {category}
                    </span>
                  </div>
                  {/* Value + unit */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-display font-bold text-4xl gradient-text leading-none">
                      {value}
                    </span>
                    <span className="text-mono text-sm text-text-muted">{unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
