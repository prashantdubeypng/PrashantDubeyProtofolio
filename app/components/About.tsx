import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import RobotAvatar from "./RobotAvatar";
import RobotDog from "./RobotDog";

// ═══════════════════════════════════════════════════════════════════════════
// 👤 ABOUT SECTION - Glass Card with 3D Tilt Effect & Robot Avatar
// ═══════════════════════════════════════════════════════════════════════════

// 3D Tilt Card Component
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="glass-heavy rounded-2xl p-8 md:p-10 relative overflow-hidden"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 rounded-2xl"
          style={{
            background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
          }}
          whileHover={{ opacity: 1 }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
};

// Animated Text Reveal
const TextReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
};

// Stat Card Component
const StatCard = ({ number, label, delay }: { number: string; label: string; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.span
        className="block text-4xl md:text-5xl font-bold gradient-text"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
      >
        {number}
      </motion.span>
      <span className="text-[var(--color-text-muted)] text-sm mt-2 block">{label}</span>
    </motion.div>
  );
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stats = [
    { number: "1653", label: "LeetCode Rating" },
    { number: "300+", label: "DSA Problems" },
    { number: "8.50", label: "CGPA" },
    { number: "2nd", label: "GFG Inst. Rank" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section min-h-screen flex items-center relative overflow-hidden py-24 md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-[var(--color-accent-primary)] text-sm tracking-[0.3em] uppercase mb-4 block"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            About Me
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Who <span className="gradient-text">Am I?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Profile Card with 3D Tilt - Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TiltCard>
              {/* Profile Image */}
              <div className="relative mb-8">
                <motion.div
                  className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden mx-auto relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Placeholder gradient avatar */}
                  <div
                    className="w-full h-full"
                    style={{
                      background: "linear-gradient(135deg, var(--color-accent-primary), var(--color-accent-tertiary))",
                    }}
                  />
                  {/* Overlay with initials */}
                  <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
                    PD
                  </div>
                </motion.div>
                
                {/* Status indicator */}
                <motion.div
                  className="absolute bottom-0 right-1/2 translate-x-[55px] md:translate-x-[65px]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-4 h-4 rounded-full bg-[var(--color-accent-primary)] border-2 border-[var(--color-bg-secondary)]" />
                </motion.div>
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Prashant Dubey</h3>
                <p className="text-[var(--color-accent-primary)] mb-3 text-sm">Data Pipeline Engineer</p>
                <p className="text-[var(--color-text-secondary)] text-xs">
                  CUJ, Ranchi | India
                </p>
              </div>

              {/* Quick Info */}
              <div className="mt-5 pt-5 border-t border-[var(--color-border)] space-y-3">
                <div>
                  <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Email</span>
                  <p className="text-xs mt-1 break-all">prashant2107pd@gmail.com</p>
                </div>
                <div>
                  <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">Status</span>
                  <p className="text-xs mt-1 text-[var(--color-accent-primary)]">Open to Work</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Content - Middle */}
          <div className="space-y-5">
            <TextReveal delay={0.3}>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">
                I'm a <span className="text-[var(--color-text-primary)] font-medium">Computer Science undergraduate</span> with strong foundations in 
                data structures, algorithms, and distributed systems. Experienced in building 
                <span className="text-[var(--color-accent-primary)]"> data-intensive backend services</span>, 
                <span className="text-[var(--color-accent-secondary)]"> streaming data pipelines</span>, and 
                <span className="text-[var(--color-accent-tertiary)]"> MongoDB-backed applications</span>.
              </p>
            </TextReveal>

            <TextReveal delay={0.4}>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                Proficient with Kafka, Redis, and SQL/NoSQL databases. Passionate about Data Pipeline 
                Engineering and platform infrastructure. Currently pursuing B.Tech at Central University 
                of Jharkhand with 8.50 CGPA.
              </p>
            </TextReveal>

            <TextReveal delay={0.5}>
              <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">
                LeetCode Knight (1653 rating), solved 300+ DSA problems, and ranked 2nd on GFG institutional 
                leaderboard. Active open-source contributor to TheAlgorithms/Java and Bruno API Client.
              </p>
            </TextReveal>

            {/* CTA */}
            <TextReveal delay={0.6}>
              <div className="flex flex-wrap gap-3 pt-3">
                <motion.a
                  href="https://drive.google.com/file/d/1T41ElE4MV_YlEgAXMOsQK2zBsj-f5RNP/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-sm px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download CV
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.a>
                <motion.button
                  className="btn btn-secondary text-sm px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Let's Talk
                </motion.button>
              </div>
            </TextReveal>
          </div>

          {/* Robot Avatar with Dog - Right */}
          <motion.div
            className="flex flex-col justify-center items-center gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Robot and Dog container */}
            <div className="relative flex items-end gap-2">
              <RobotAvatar className="w-full max-w-[220px] h-[350px]" />
              {/* Robot Dog sitting next to robot */}
              <div className="relative -ml-4 mb-4">
                <RobotDog />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-[var(--color-border)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={0.8 + index * 0.1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
