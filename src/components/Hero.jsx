import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import resumePdf from '../assets/Resume.pdf';

const modules = ['JAVA 21', 'SPRING BOOT', 'SPRING CLOUD', 'KAFKA', 'MYSQL', 'DOCKER', 'REACT', 'MICROSERVICES', 'JWT', 'REST APIs'];

function LoadingButton({ href, download, children }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            setProgress(0);
            if (download) {
              const link = document.createElement('a');
              link.href = href;
              link.download = download;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              window.open(href, '_blank');
            }
          }, 200);
          return 100;
        }
        return p + 8;
      });
    }, 60);
  };

  return (
    <button
      onClick={handleClick}
      className="btn-primary relative overflow-hidden min-w-[160px]"
      aria-label="Download Resume"
    >
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <>
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Loading... {progress}%
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {children}
          </>
        )}
      </span>
      {loading && (
        <motion.div
          className="absolute inset-0 bg-white/10 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ ease: 'linear' }}
        />
      )}
    </button>
  );
}

const CODE_LINES = [
  { id: 0, indent: '', content: null, comment: true, raw: '// Welcome to my workspace' },
  { id: 1, indent: '', content: null, raw: "import { Developer } from './universe';" },
  { id: 2, indent: '', content: null, raw: '' },
  { id: 3, indent: '', content: null, raw: 'const Portfolio = () => {' },
  { id: 4, indent: 'ml-4', content: null, raw: '  return (' },
  { id: 5, indent: 'ml-8', content: null, raw: '    <Developer' },
  { id: 6, indent: 'ml-10', content: null, raw: '      name="Ayush Sharma"}' },
  { id: 7, indent: 'ml-10', content: null, raw: '      role="Backend Developer"}' },
  { id: 8, indent: 'ml-10', content: null, raw: '      stack="Java · Spring Boot · Kafka"}' },
  { id: 9, indent: 'ml-10', content: null, raw: '      focus="Microservices, Event-Driven"}' },
  { id: 10, indent: 'ml-8', content: null, raw: '    />' },
  { id: 11, indent: 'ml-4', content: null, raw: '  );' },
  { id: 12, indent: '', content: null, raw: '};' },
];

const formatCodeLine = (text) => {
  if (text.startsWith('//')) return <span className="text-syntax-comment">{text}</span>;
  
  // A simple syntax highlighter for our specific strings
  const parts = text.split(/(\s+|['"].*?['"]|[{}();=<>.,])/g).filter(Boolean);
  
  return parts.map((part, i) => {
    if (part.match(/^['"].*?['"]$/)) return <span key={i} className="text-syntax-string">{part}</span>;
    if (['import', 'from', 'const', 'return'].includes(part)) return <span key={i} className="text-syntax-keyword">{part}</span>;
    if (['Developer', 'Portfolio'].includes(part)) return <span key={i} className="text-accent-cyan">{part}</span>;
    if (['name', 'role', 'stack', 'focus'].includes(part)) return <span key={i} className="text-syntax-string">{part}</span>;
    return <span key={i}>{part}</span>;
  });
};

export default function Hero() {
  const [text] = useTypewriter({
    words: ['Backend Developer', 'Java & Spring Boot Engineer', 'Microservices Architect', 'CS + AI Student'],
    loop: 0,
    delaySpeed: 2000,
    typeSpeed: 60,
    deleteSpeed: 40,
  });
  const tickerRef = useRef(null);

  // State-based typewriter for code block
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), 1200);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleLines >= CODE_LINES.length) return;
    
    const line = CODE_LINES[visibleLines];
    if (currentChar < line.raw.length) {
      // Type 2 characters at a time to make it insanely fast
      const t = setTimeout(() => setCurrentChar(c => c + 2), 15);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines(v => v + 1);
        setCurrentChar(0);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [started, visibleLines, currentChar]);

  return (
    <section id="hero" className="relative flex flex-col justify-center pt-32 pb-24 grid-bg overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text Content */}
          <div>
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="status-pill status-pill-green">
                <span className="status-dot bg-accent-green" />
                SYSTEM.KERNEL :: ONLINE
              </span>
              <span className="text-mono text-xs text-text-muted">v2.7.0</span>
            </motion.div>

            {/* Hello */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-mono text-text-secondary text-lg mb-2"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-display font-bold text-5xl lg:text-6xl xl:text-7xl mb-4 leading-tight"
            >
              <span className="gradient-text">Ayush</span>
              <br />
              <span className="text-text-primary">Sharma</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-mono text-accent-cyan text-xl lg:text-2xl mb-6 h-8"
            >
              <span className="text-syntax-comment">{'// '}</span>
              <span>{text}</span>
              <Cursor cursorStyle="_" cursorColor="#22d3ee" />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-text-secondary text-base lg:text-lg max-w-lg mb-8 leading-relaxed"
            >
              Backend Developer specializing in Java and Spring Boot architecture —{' '}
              <span className="text-text-primary">building microservices, RESTful APIs, and event-driven systems.</span>
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <LoadingButton href={resumePdf} download="Ayush_Sharma_Resume.pdf">Initialize Resume</LoadingButton>
              <a
                href="https://github.com/ayush-sharma-22"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                aria-label="Check out GitHub profile"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                Check out GitHub
              </a>
            </motion.div>

            {/* Stat pills row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: '🎓', label: 'Parul Institute of Technology' },
                { icon: '📅', label: 'Expected May 2027' },
                { icon: '🔬', label: 'CS + AI Specialization' },
              ].map((item) => (
                <span key={item.label} className="text-mono text-xs text-text-secondary bg-bg-card px-3 py-1.5 rounded-md border border-bg-border flex items-center gap-2">
                  <span>{item.icon}</span> {item.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Code Editor Mock */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="terminal-window shadow-glow-orange">
              {/* Editor chrome */}
              <div className="terminal-header">
                <span className="terminal-dot bg-accent-red" />
                <span className="terminal-dot bg-accent-amber" />
                <span className="terminal-dot bg-accent-green" />
                <div className="ml-2 flex gap-2 text-xs text-text-muted text-mono">
                  <span className="bg-bg-primary/60 px-3 py-0.5 rounded-t border-t border-x border-accent-orange/30 text-text-primary">
                    Portfolio.jsx
                  </span>
                  <span className="px-2 py-0.5">types.ts</span>
                </div>
              </div>

              {/* Code content — state-driven typewriter */}
              <div className="p-5 text-mono text-sm leading-7 min-h-[320px]">
                {CODE_LINES.map((line, i) => {
                  if (i > visibleLines) return null;
                  const isActive = i === visibleLines;
                  const textToShow = isActive ? line.raw.substring(0, currentChar) : line.raw;
                  if (textToShow === '' && !isActive && line.raw === '') return <div key={line.id} className="h-3" />;
                  
                  return (
                    <div key={line.id} className={`flex items-center ${line.indent}`}>
                      <span className="text-text-code whitespace-pre">
                        {formatCodeLine(textToShow)}
                      </span>
                      {isActive && (
                        <span className="inline-block w-2 h-4 ml-0.5 align-middle bg-[#f97316] shadow-glow-orange animate-blink" />
                      )}
                    </div>
                  );
                })}
              </div>


              {/* Bottom buttons */}
              <div className="px-5 py-4 border-t border-bg-border flex gap-3 bg-[#0d1117]/50">
                <button className="btn-primary text-xs py-1.5 px-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>
                  Run Profile
                </button>
                <button className="btn-outline text-xs py-1.5 px-3">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                  View Projects
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 border-t border-bg-border pt-6 flex items-center gap-4 overflow-hidden"
        >
          <span className="text-mono text-xs text-text-muted shrink-0 pr-4 border-r border-bg-border">LOADED_MODULES:</span>
          <div className="overflow-hidden flex-1 relative">
            <div
              className="flex gap-4 whitespace-nowrap animate-ticker"
              aria-label="Technology stack modules"
            >
              {[...modules, ...modules, ...modules, ...modules].map((mod, i) => (
                <span key={i} className="tag-chip shrink-0">{mod}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, y: { duration: 1.5, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
      >
        <span className="text-mono text-xs">scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </motion.div>
    </section>
  );
}
