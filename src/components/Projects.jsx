import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14, delay: i * 0.08 },
  }),
};

// ── Language colour dots ──────────────────────────────────────────────────────
const langColor = {
  Java: '#f97316',
  JavaScript: '#f59e0b',
  Python: '#4ade80',
  TypeScript: '#22d3ee',
  HTML: '#f87171',
  CSS: '#a78bfa',
  Shell: '#8b949e',
  Dockerfile: '#22d3ee',
};

// ── Pinned / featured projects (max 5) ───────────────────────────────────────
const pinnedProjects = [
  {
    id: 'salon',
    name: 'Salon Booking Platform',
    description:
      'A 10-service microservices platform with Eureka service discovery, Keycloak OAuth2/JWT auth, Apache Kafka for async events, and Razorpay/Stripe payments. Fully containerized with Docker Compose.',
    tags: ['Spring Boot', 'Java', 'Kafka', 'Keycloak', 'Docker', 'React'],
    lang: 'Java',
    stars: 12,
    forks: 4,
    visibility: 'Public',
    github: 'https://github.com/ayush-sharma-22/Salon-microservices',
  },
  {
    id: 'rippler',
    name: 'Rippler',
    description:
      'Static analysis tool that maps Spring microservice dependencies via AST parsing with JavaParser. Auto-detects FeignClient, Kafka pub/sub, JPA mappings, and injection chains. Visualized with React Flow.',
    tags: ['Spring Boot', 'JavaParser', 'React Flow', 'AST'],
    lang: 'Java',
    stars: 8,
    forks: 2,
    visibility: 'Public',
    github: 'https://github.com/ayush-sharma-22/rippler',
    demo: 'https://rippler.netlify.app',
  },
  {
    id: 'trustsight',
    name: 'TrustSight AI',
    description:
      'Multi-agent AI research assistant built at Devi@Thon 2025. Coordinates specialized LLM agents for information synthesis with an orchestration layer for collaborative research workflows.',
    tags: ['Python', 'Multi-Agent AI', 'LLM Orchestration'],
    lang: 'Python',
    stars: 5,
    forks: 1,
    visibility: 'Public',
    github: 'https://github.com/ayush-sharma-22/TrustSight',
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce Backend',
    description:
      'Scalable E-commerce REST API handling product catalog, user authentication, and order processing. Built with Spring Boot, secured via JWT, and integrates with PostgreSQL.',
    tags: ['Spring Boot', 'REST API', 'PostgreSQL', 'JWT'],
    lang: 'Java',
    stars: 5,
    forks: 2,
    visibility: 'Public',
    github: 'https://github.com/ayush-sharma-22/Ecommerce-backend',
  },
  {
    id: 'kafka-demo',
    name: 'Kafka Event Pipeline',
    description:
      'JPMorgan Forage simulation project — Spring Boot microservice consuming high-volume transaction events from Kafka, validating them via JPA, and calling external incentive REST services.',
    tags: ['Kafka', 'Spring Boot', 'JPA', 'H2', 'REST'],
    lang: 'Java',
    stars: 4,
    forks: 1,
    visibility: 'Public',
    github: 'https://github.com/ayush-sharma-22/forage-midas',
  },
];

// ── GitHub repo list (live fetch) ─────────────────────────────────────────────
const fallbackRepos = [
  { id: 1, name: 'Ecommerce-backend', description: 'A robust ecommerce backend API built with Spring Boot.', html_url: 'https://github.com/ayush-sharma-22/Ecommerce-backend', stargazers_count: 2, updated_at: new Date().toISOString() },
  { id: 2, name: 'Salon-microservice', description: 'Microservices based salon booking architecture.', html_url: 'https://github.com/ayush-sharma-22/Salon-microservice', stargazers_count: 12, updated_at: new Date().toISOString() },
  { id: 3, name: 'TrustSight', description: 'AI-powered fake review detection system.', html_url: 'https://github.com/ayush-sharma-22/TrustSight', stargazers_count: 4, updated_at: new Date().toISOString() },
  { id: 4, name: 'Portfolio', description: 'My personal developer portfolio built with React and Tailwind.', html_url: 'https://github.com/ayush-sharma-22/Portfolio', stargazers_count: 1, updated_at: new Date().toISOString() },
  { id: 5, name: 'forage-midas', description: 'JPMorgan Chase software engineering simulation.', html_url: 'https://github.com/ayush-sharma-22/forage-midas', stargazers_count: 0, updated_at: new Date().toISOString() },
];

function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=public`
    )
      .then((r) => {
        if (!r.ok) throw new Error('GitHub API rate limit or error');
        return r.json();
      })
      .then((data) => { 
        setRepos(data); 
        setLoading(false); 
      })
      .catch((e) => { 
        console.warn('GitHub API failed, using fallback data:', e.message);
        setRepos(fallbackRepos); 
        setLoading(false); 
      });
  }, [username]);

  return { repos, loading };
}

// ── Left panel — repo list ─────────────────────────────────────────────────────
function RepoList() {
  const { repos, loading } = useGitHubRepos('ayush-sharma-22');

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        height: '680px',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span className="text-display font-semibold text-text-primary text-sm">Repositories</span>
        </div>
        {!loading && (
          <span className="text-mono text-xs text-text-muted bg-bg-border/50 px-2 py-0.5 rounded-full">
            {repos.length}
          </span>
        )}
      </div>

      {/* Repo items */}
      <div className="overflow-y-auto flex-1 scrollbar-thin">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <span className="text-mono text-xs text-text-muted animate-pulse">Fetching repos...</span>
          </div>
        )}
        {!loading && repos.map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className="flex flex-col gap-1 px-5 py-3.5 group"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            whileHover={{ backgroundColor: 'rgba(249,115,22,0.04)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-accent-orange text-sm font-semibold group-hover:underline truncate max-w-[160px]">
                {repo.name}
              </span>
              <span className="text-mono text-[10px] text-text-muted shrink-0">
                {repo.private ? 'Private' : 'Public'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-mono text-[10px] text-text-muted">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: langColor[repo.language] || '#8b949e' }}
                  />
                  {repo.language}
                </span>
              )}
              <span>
                Updated {new Date(repo.updated_at).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric',
                })}
              </span>
              {repo.stargazers_count > 0 && (
                <span>★ {repo.stargazers_count}</span>
              )}
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

// ── Right panel — pinned cards ────────────────────────────────────────────────
function PinnedCard({ project, i }) {
  return (
    <motion.a
      href={project.demo || project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 80, damping: 14, delay: i * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.25)' }}
      className="flex flex-col gap-3 rounded-xl p-5 group"
      style={{
        background: '#0d1117',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
        cursor: 'pointer',
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-semibold text-text-primary group-hover:text-accent-orange transition-colors duration-200 truncate">
            {project.name}
          </span>
        </div>
        <span className="text-mono text-[10px] text-text-muted border border-bg-border rounded-full px-2 py-0.5 shrink-0">
          {project.visibility}
        </span>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-xs leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span key={t} className="tag-chip">{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 pt-1 mt-auto">
        <span className="flex items-center gap-1">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: langColor[project.lang] || '#8b949e' }}
          />
          <span className="text-mono text-[10px] text-text-muted">{project.lang}</span>
        </span>
        <span className="text-mono text-[10px] text-text-muted">★ {project.stars}</span>
        <span className="text-mono text-[10px] text-text-muted">⑂ {project.forks}</span>
        <span className="ml-auto text-mono text-[10px] text-accent-orange/70 group-hover:text-accent-orange transition-colors">
          {project.demo ? 'Demo ↗' : 'GitHub ↗'}
        </span>
      </div>
    </motion.a>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="relative py-24 grid-bg">
      <div className="absolute left-0 top-1/3 w-72 h-72 bg-accent-orange/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-16">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-12"
        >
          <p className="section-label mb-2">{'// 04'}</p>
          <h2 className="section-header text-accent-orange">
            <span className="text-text-muted">$ </span>ls -la projects/
          </h2>
        </motion.div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start">

          {/* Left — live GitHub repo list */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 14 }}
          >
            <RepoList />
          </motion.div>

          {/* Right — pinned featured projects */}
          <div className="flex flex-col gap-4">
            <p className="text-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-1">
              Pinned Projects
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pinnedProjects.map((project, i) => (
                <PinnedCard key={project.id} project={project} i={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
