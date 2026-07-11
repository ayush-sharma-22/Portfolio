import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

const SkillGlob = lazy(() => import('./SkillGlob'));

function GlobFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-56 h-56">
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-orange/20 animate-spin-slow" />
        <div className="absolute inset-8 rounded-full bg-gradient-radial from-accent-orange/15 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold gradient-text text-display">Skills</span>
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: 'easeOut' },
  }),
};



export default function Skills() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <section id="skills" className="relative py-20 grid-bg overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-10 text-center"
        >
          <p className="section-label mb-2">{'// 03'}</p>
          <h2 className="section-header text-accent-orange">
            <span className="text-text-muted"># </span>Skills.json
          </h2>
          <p className="text-text-secondary text-sm mt-2 text-mono">
            <span className="text-text-muted">{'// '}</span>Interactive skills map
          </p>
        </motion.div>

        {/* Centered full-width glob */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative mx-auto h-[350px] md:h-[450px] lg:h-[520px] w-full max-w-3xl"
        >
          {!prefersReducedMotion ? (
            <Suspense fallback={<GlobFallback />}>
              <SkillGlob autoRotate={autoRotate} setAutoRotate={setAutoRotate} />
            </Suspense>
          ) : (
            <GlobFallback />
          )}
        </motion.div>
      </div>
    </section>
  );
}
