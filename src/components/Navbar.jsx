import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero',           label: 'Home' },
  { id: 'about',          label: 'About' },
  { id: 'experience',     label: 'Experience' },
  { id: 'skills',         label: 'Skills' },
  { id: 'projects',       label: 'Projects' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact',        label: 'Contact' },
];

const sectionIcons = {
  hero: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  about: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  experience: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  skills: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  projects: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  certifications: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  contact: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
};

function useSectionSpy() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = [];
    const ratio = {};

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          ratio[id] = entry.intersectionRatio;
          // Pick the section with the highest visible ratio
          const best = Object.entries(ratio).sort((a, b) => b[1] - a[1])[0];
          if (best && best[1] > 0) setActive(best[0]);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return active;
}

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function SidebarNav() {
  const active = useSectionSpy();
  const [hovered, setHovered] = useState(null);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 pointer-events-none"
      aria-label="Section navigation"
    >


      {/* ── Dot timeline ── */}
      <div className="pointer-events-auto relative flex flex-col items-center gap-0">
        {/* connecting line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-3 bottom-3 w-px bg-gradient-to-b from-accent-orange/30 via-bg-border to-accent-orange/10" />

        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <div
              key={id}
              className="relative flex items-center justify-center py-5"
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* label pill — left side */}
              <AnimatePresence>
                {hovered === id && (
                  <motion.div
                    initial={{ opacity: 0, x: 8, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 8, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-6 whitespace-nowrap"
                  >
                    <span className="text-mono text-xs bg-bg-card border border-bg-border text-text-secondary px-2.5 py-1 rounded-full shadow-card">
                      {'> '}{label}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* dot / active icon */}
              <motion.button
                onClick={() => scrollTo(id)}
                aria-label={`Navigate to ${label}`}
                aria-current={isActive ? 'location' : undefined}
                className={`relative z-10 flex items-center justify-center focus:outline-none rounded-full ${
                  !isActive ? 'bg-bg-border hover:bg-accent-orange/60 hover:scale-125 transition-colors duration-300' : ''
                }`}
                animate={{
                  width: isActive ? 36 : 8,
                  height: isActive ? 36 : 8,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="absolute inset-0 rounded-full border border-dashed border-accent-orange/50 animate-spin-slow" />
                      <span className="w-7 h-7 rounded-full bg-bg-card border border-accent-orange/40 flex items-center justify-center text-accent-orange">
                        {sectionIcons[id]}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* ── Bottom action buttons ── */}
      <div className="pointer-events-auto flex flex-col items-center gap-5 mt-2">


        {/* Profile FAB (Scroll to top) */}
        <button 
          onClick={() => scrollTo('hero')}
          className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-[#161b22] border border-accent-orange/40 hover:border-accent-orange transition-all duration-300"
          title="Back to Top"
        >
          <div className="absolute -inset-[4px] rounded-full border border-dashed border-accent-orange/30 group-hover:border-accent-orange/60 transition-colors animate-[spin_8s_linear_infinite_reverse]" />
          <img 
            src="https://github.com/ayush-sharma-22.png" 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover z-10 group-hover:scale-105 transition-transform" 
          />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#161b22] z-20" />
        </button>
      </div>
    </nav>
  );
}
