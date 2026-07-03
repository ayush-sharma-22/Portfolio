export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 grid-bg border-t border-white/5 flex flex-col items-center justify-center gap-4 text-center">
      
      {/* Title */}
      <div className="flex items-center gap-2 text-text-primary font-mono text-sm sm:text-base font-bold tracking-wide">
        <span className="text-accent-orange">{'</>'}</span>
        <span>Ayush Rajan Sharma</span>
        <span className="text-text-muted px-1 font-normal">|</span>
        <span>Backend Engineer</span>
      </div>
      
      {/* Built with */}
      <p className="text-mono text-xs sm:text-sm text-text-muted">
        Built with {'<3'} using React, Vite & Tailwind
      </p>
      
      {/* Copyright */}
      <p className="text-mono text-[10px] sm:text-xs text-text-muted/70">
        © {currentYear} Ayush Rajan Sharma. All rights reserved.
      </p>


    </footer>
  );
}
