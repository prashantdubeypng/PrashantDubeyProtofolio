import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 🎬 HERO SECTION - Cinematic First Impression
// ═══════════════════════════════════════════════════════════════════════════

// Floating Particle Component
const Particle = ({ delay, duration, size, initialX, initialY }: {
  delay: number;
  duration: number;
  size: number;
  initialX: number;
  initialY: number;
}) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      left: `${initialX}%`,
      top: `${initialY}%`,
      background: `radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0) 70%)`,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Typewriter Effect Component
const TypewriterText = ({ text, startDelay = 0.5 }: { text: string; startDelay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Initial delay before typing starts
    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev < text.length) {
            setDisplayedText(text.slice(0, prev + 1));
            return prev + 1;
          }
          clearInterval(typingInterval);
          return prev;
        });
      }, 100); // Speed of typing

      return () => clearInterval(typingInterval);
    }, startDelay * 1000);

    return () => clearTimeout(initialDelay);
  }, [text, startDelay]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className="gradient-text">
      {displayedText}
      <motion.span
        className="inline-block ml-1 w-[3px] h-[0.9em] bg-[var(--color-accent-primary)] align-middle"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        style={{ 
          display: currentIndex >= text.length ? 'none' : 'inline-block',
          verticalAlign: 'baseline',
          marginBottom: '0.1em'
        }}
      />
    </span>
  );
};

// Scroll Indicator Component
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 1 }}
    onClick={() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    <motion.span
      className="text-sm text-[var(--color-text-muted)] tracking-widest uppercase"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Scroll
    </motion.span>
    <motion.div
      className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex justify-center pt-2"
      animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(16,185,129,0.5)", "rgba(255,255,255,0.1)"] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]"
        animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  </motion.div>
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Transform for parallax effect
  const gradientX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const gradientY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { clientX, clientY } = e;
        const { width, height } = containerRef.current.getBoundingClientRect();
        const x = (clientX / width) - 0.5;
        const y = (clientY / height) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: clientX, y: clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const name = "Prashant Dubey";
  const subtitle = "Data Pipeline Engineer & Backend Developer";

  // Generate particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 4 + Math.random() * 4,
    size: 4 + Math.random() * 8,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          x: gradientX,
          y: gradientY,
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 70% 30%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 30% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.p
          className="text-[var(--color-text-muted)] text-sm md:text-base tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to my portfolio
        </motion.p>

        {/* Animated Name with Typewriter Effect */}
        <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-bold leading-[1.1] mb-6 text-center">
          <span className="block text-[var(--color-text-secondary)] text-[clamp(1rem,3vw,1.5rem)] font-normal mb-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Hi, I'm
            </motion.span>
          </span>
          <TypewriterText text={name} startDelay={0.8} />
        </h1>

        {/* Animated Subtitle - Centered */}
        <motion.p
          className="text-[var(--color-text-secondary)] text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {subtitle}
        </motion.p>

        {/* Bold One-liner Tagline */}
        <motion.p
          className="text-[var(--color-text-muted)] text-sm md:text-base max-w-xl mx-auto mb-12 text-center italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8, ease: [0.4, 0, 0.2, 1] }}
        >
          "I build <motion.span 
            className="text-[var(--color-accent-primary)] font-medium not-italic"
            animate={{ 
              textShadow: ["0 0 0px transparent", "0 0 10px rgba(16, 185, 129, 0.5)", "0 0 0px transparent"]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
          >scalable systems</motion.span>, not just interfaces."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.button
            className="btn btn-primary px-8 py-4 text-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>View My Work</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
          
          <motion.a
            href="https://drive.google.com/file/d/1T41ElE4MV_YlEgAXMOsQK2zBsj-f5RNP/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary px-8 py-4 text-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Download Resume</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex gap-6 justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[
            { name: "github", url: "https://github.com/prashantdubeypng" },
            { name: "linkedin", url: "https://linkedin.com/in/21prashant" },
            { name: "leetcode", url: "https://leetcode.com/u/prashantdubeyPD" },
          ].map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1 }}
            >
              {social.name === "github" && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )}
              {social.name === "linkedin" && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )}
              {social.name === "leetcode" && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
              )}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </section>
  );
}
