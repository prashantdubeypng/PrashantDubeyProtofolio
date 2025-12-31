import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Components
import Navigation from "./Navigation";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Experience from "./Experience";
import Certifications from "./Certifications";
import Contact from "./Contact";
import Footer from "./Footer";
import CursorGlow from "./CursorGlow";

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 MAIN PORTFOLIO - Orchestrating all sections
// ═══════════════════════════════════════════════════════════════════════════

// Page Loader Component
const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[var(--color-bg-primary)] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="text-6xl md:text-8xl font-bold gradient-text"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PD
          </motion.span>
          
          {/* Orbiting dot */}
          <motion.div
            className="absolute w-3 h-3 bg-[var(--color-accent-primary)] rounded-full"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "0 -50px",
            }}
          />
        </motion.div>

        {/* Loading bar */}
        <motion.div
          className="w-48 h-1 bg-[var(--color-bg-secondary)] rounded-full mt-8 mx-auto overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Loading text */}
        <motion.p
          className="text-[var(--color-text-muted)] text-sm mt-4 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / totalHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[var(--color-accent-primary)] via-[var(--color-accent-tertiary)] to-[var(--color-accent-secondary)]"
        style={{ width: `${progress}%` }}
      />
    </motion.div>
  );
};

// Back to Top Button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full glass-heavy flex items-center justify-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Section Divider
const SectionDivider = () => (
  <div className="relative h-px w-full max-w-6xl mx-auto">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
  </div>
);

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Page Loader */}
      <AnimatePresence>
        {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Cursor Follow Glow */}
        <CursorGlow />

        {/* Scroll Progress */}
        <ScrollProgress />

        {/* Navigation */}
        <Navigation />

        {/* Main Sections */}
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Certifications />
          <SectionDivider />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Back to Top */}
        <BackToTop />
      </motion.div>
    </>
  );
}
