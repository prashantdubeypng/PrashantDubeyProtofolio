import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 🧭 NAVIGATION - Floating Glass Navbar
// ═══════════════════════════════════════════════════════════════════════════

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Courses", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.replace("#", "")).filter(Boolean);
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          className="px-2 py-2 rounded-full glass-heavy"
          animate={{
            boxShadow: isScrolled 
              ? "0 10px 40px -10px rgba(0, 0, 0, 0.5)" 
              : "0 0 0 0 transparent",
          }}
        >
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.href === "#" 
                ? activeSection === "" 
                : activeSection === item.href.replace("#", "");
              
              return (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-white" 
                      : "text-[var(--color-text-secondary)] hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[var(--color-accent-primary)]"
                      layoutId="activeNav"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Menu Toggle Button */}
        <motion.button
          className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass-heavy flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative w-5 h-4 flex flex-col justify-between">
            <motion.span
              className="w-full h-0.5 bg-white rounded-full origin-left"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? -1 : 0,
              }}
            />
            <motion.span
              className="w-full h-0.5 bg-white rounded-full"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
                x: isMobileMenuOpen ? 10 : 0,
              }}
            />
            <motion.span
              className="w-full h-0.5 bg-white rounded-full origin-left"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? 1 : 0,
              }}
            />
          </div>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-[var(--color-bg-primary)]/95 backdrop-blur-xl flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <nav className="flex flex-col items-center gap-6">
                {navItems.map((item, index) => {
                  const isActive = item.href === "#" 
                    ? activeSection === "" 
                    : activeSection === item.href.replace("#", "");
                  
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-3xl font-bold ${
                        isActive 
                          ? "gradient-text" 
                          : "text-[var(--color-text-secondary)] hover:text-white"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Logo - Top Left */}
      <motion.a
        href="#"
        className="fixed top-6 left-6 z-50 text-2xl font-bold gradient-text hidden md:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        whileHover={{ scale: 1.05 }}
      >
        PD.
      </motion.a>
    </>
  );
}
