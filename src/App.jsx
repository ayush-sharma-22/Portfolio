import { Suspense } from 'react';
import SidebarNav from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <SidebarNav />
      <main className="pr-14">
        <Hero />
        <About />
        <Experience />
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
