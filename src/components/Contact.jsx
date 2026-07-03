import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const contactLinks = [
  {
    key: 'email',
    label: 'email',
    value: 'ayushrajansharma124@gmail.com',
    href: 'mailto:ayushrajansharma124@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-accent-orange',
  },
  {
    key: 'github',
    label: 'github',
    value: 'github.com/ayush-sharma-22',
    href: 'https://github.com/ayush-sharma-22',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: 'text-text-primary',
  },
  {
    key: 'linkedin',
    label: 'linkedin',
    value: 'linkedin.com/in/ayush-sharma-2a34ba345',
    href: 'https://www.linkedin.com/in/ayush-sharma-2a34ba345/',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'text-accent-cyan',
  },
  {
    key: 'phone',
    label: 'phone',
    value: '+91 9137253356',
    href: 'tel:+919137253356',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    color: 'text-accent-green',
  },
];

// Web3Forms is the easiest way to receive emails from static sites.
// Get your free access key at https://web3forms.com and paste it below.
const WEB3FORMS_ACCESS_KEY = 'aabb9e6c-a81f-4ffb-ae6c-6d6a106551f3';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    // If key is not set, fallback to mailto immediately
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      window.location.href = `mailto:ayushrajansharma124@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      return;
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: form.name,
          ...form
        }),
      });
      
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-24 grid-bg">
      <div className="absolute left-1/4 bottom-0 w-96 h-96 bg-accent-orange/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-16">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-14"
        >
          <p className="section-label mb-2">{'// 06'}</p>
          <h2 className="section-header text-accent-orange">
            <span className="text-text-muted">$ </span>./contact.exe
          </h2>
          <p className="text-text-secondary text-sm mt-2 text-mono">
            <span className="text-text-muted">{'// '}</span>
            Open to backend developer internships
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Contact Info JSON panel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={1}
          >
            <div className="terminal-window h-full">
              <div className="terminal-header">
                <span className="terminal-dot bg-accent-red" />
                <span className="terminal-dot bg-accent-amber" />
                <span className="terminal-dot bg-accent-green" />
                <span className="text-mono text-xs text-text-muted ml-2">contact_info.json</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-2">
                <div className="text-text-code">{'{'}</div>
                {contactLinks.map((link, i) => (
                  <div key={link.key} className="ml-4">
                    <span className="text-syntax-string">&ldquo;{link.key}&rdquo;</span>
                    <span className="text-text-muted">: </span>
                    <a
                      href={link.href}
                      target={link.key !== 'phone' && link.key !== 'email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className={`${link.color} hover:underline transition-all`}
                      aria-label={`Contact via ${link.label}`}
                    >
                      &ldquo;{link.value}&rdquo;
                    </a>
                    {i < contactLinks.length - 1 && <span className="text-text-muted">,</span>}
                  </div>
                ))}
                <div className="text-text-code">{'}'}</div>

                {/* Availability note */}
                <div className="mt-6 pt-4 border-t border-bg-border">
                  <div className="text-syntax-comment mb-3">{'// Current availability status'}</div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="status-pill status-pill-green">
                      <span className="status-dot bg-accent-green" />
                      OPEN TO INTERNSHIPS
                    </span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed mt-3">
                    Actively seeking backend developer internship roles.<br />
                    Specifically interested in: enterprise microservices teams, and fintech.
                  </p>
                </div>

                {/* Quick links */}
                <div className="mt-4 flex flex-wrap gap-3">
                  {contactLinks.slice(0, 3).map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      target={link.key !== 'email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
                      aria-label={`Open ${link.label}`}
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            custom={2}
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-mono text-xs text-accent-orange">{'>'}</span>
                <span className="text-mono text-sm text-text-secondary">send_message.sh</span>
                <span className="animate-blink text-accent-orange">_</span>
              </div>

              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-display font-bold text-accent-green text-xl mb-2">Message Sent!</h3>
                  <p className="text-text-secondary text-sm text-mono">
                    {'// I\'ll get back to you shortly.'}
                  </p>
                  <button
                    className="btn-outline mt-6 text-xs"
                    onClick={() => setStatus('idle')}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="text-mono text-xs text-text-muted block mb-1.5">
                        name<span className="text-accent-orange">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-bg-primary border border-bg-border rounded-lg px-4 py-2.5 text-sm text-text-primary font-mono placeholder-text-muted focus:outline-none focus:border-accent-orange/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="text-mono text-xs text-text-muted block mb-1.5">
                        email<span className="text-accent-orange">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full bg-bg-primary border border-bg-border rounded-lg px-4 py-2.5 text-sm text-text-primary font-mono placeholder-text-muted focus:outline-none focus:border-accent-orange/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="text-mono text-xs text-text-muted block mb-1.5">
                      subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Internship Opportunity / Project Inquiry"
                      className="w-full bg-bg-primary border border-bg-border rounded-lg px-4 py-2.5 text-sm text-text-primary font-mono placeholder-text-muted focus:outline-none focus:border-accent-orange/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-mono text-xs text-text-muted block mb-1.5">
                      message<span className="text-accent-orange">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className="w-full bg-bg-primary border border-bg-border rounded-lg px-4 py-2.5 text-sm text-text-primary font-mono placeholder-text-muted focus:outline-none focus:border-accent-orange/50 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-accent-red text-mono text-xs">
                      ⚠ Error sending message. Please try again or email directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full justify-center text-sm py-3"
                    aria-label="Send contact message"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        SEND MESSAGE
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
