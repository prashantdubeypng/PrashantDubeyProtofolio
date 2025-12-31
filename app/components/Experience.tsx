import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 📅 EXPERIENCE SECTION - Animated Timeline with Premium Interactions
// ═══════════════════════════════════════════════════════════════════════════

// Consistent easing for premium feel
const SMOOTH_EASING = [0.4, 0, 0.2, 1] as const;

interface Experience {
  id: number;
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "work" | "education";
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Developer Intern",
    company: "Palanam Technology, Delhi",
    companyUrl: "https://palanam.com",
    period: "May 2025 - July 2025",
    description: "Worked in an 8-member backend team on a production fintech platform.",
    achievements: [
      "Designed and implemented secure authentication and user management APIs",
      "Improved API latency and throughput by ~65% using Redis caching and SQL optimization",
      "Built automated data ingestion pipelines to fetch, validate, and expose structured data from Google Drive",
    ],
    technologies: ["Node.js", "Redis", "SQL", "REST APIs", "Docker"],
    type: "work",
  },
  {
    id: 2,
    title: "Open-Source Contributor",
    company: "TheAlgorithms/Java",
    companyUrl: "https://github.com/TheAlgorithms/Java",
    period: "2025",
    description: "Contributing to one of the largest algorithm repositories on GitHub.",
    achievements: [
      "Authored PR #7156 adding 25+ JUnit test cases for graph algorithms",
      "Improved algorithm reliability covering edge cases like negative weights",
      "Test coverage for BFS, DFS, Dijkstra, Bellman-Ford algorithms",
    ],
    technologies: ["Java", "JUnit", "Git", "Algorithms"],
    type: "work",
  },
  {
    id: 3,
    title: "Open-Source Contributor",
    company: "Bruno API Client (85k+ downloads)",
    companyUrl: "https://github.com/usebruno/bruno",
    period: "2025",
    description: "Contributing to popular open-source API client used by developers worldwide.",
    achievements: [
      "Authored PR #6338 fixing critical authentication inheritance bug",
      "Refactored the code-generation pipeline for better maintainability",
      "Added regression test coverage to prevent future issues",
    ],
    technologies: ["JavaScript", "API Testing", "Git", "Open Source"],
    type: "work",
  },
  {
    id: 4,
    title: "B.Tech in Computer Science",
    company: "Central University of Jharkhand, Ranchi",
    period: "Aug 2023 - May 2027",
    description: "Bachelor of Technology focusing on Data Structures, Algorithms, and Distributed Systems.",
    achievements: [
      "Current CGPA: 8.50",
      "Joint Secretary of Code Crafters Club (500+ students)",
      "2nd Institutional Rank on GeeksforGeeks",
    ],
    technologies: ["DSA", "DBMS", "Computer Networks", "OOP"],
    type: "education",
  },
];

// Timeline Item Component with 3D tilt
const TimelineItem = ({ experience, index, isLeft }: { 
  experience: Experience; 
  index: number; 
  isLeft: boolean;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });
  
  // 3D tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex items-center ${isLeft ? "md:flex-row-reverse" : ""} mb-12 md:mb-0`}
      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 50 : -50 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: SMOOTH_EASING }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      {/* Content Card */}
      <motion.div
        className={`w-full md:w-[calc(50%-40px)] ${isLeft ? "md:ml-auto" : "md:mr-auto"}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: SMOOTH_EASING }}
      >
        <motion.div
          className="glass rounded-xl p-6 relative overflow-hidden group cursor-pointer"
          style={{ border: "1px solid var(--color-border)" }}
          whileHover={{
            borderColor: "var(--color-accent-primary)",
            boxShadow: "0 20px 50px -15px rgba(16, 185, 129, 0.25)",
          }}
          transition={{ duration: 0.3, ease: SMOOTH_EASING }}
        >
          {/* Type badge */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                experience.type === "work" 
                  ? "bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)]" 
                  : "bg-[var(--color-accent-secondary)]/20 text-[var(--color-accent-secondary)]"
              }`}
              whileHover={{ rotate: [0, -10, 10, 0] }}
            >
              {experience.type === "work" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              )}
            </motion.div>
            <span className="text-sm text-[var(--color-text-muted)]">{experience.period}</span>
          </div>

          {/* Title & Company */}
          <h3 className="text-xl font-bold mb-1">{experience.title}</h3>
          {experience.companyUrl ? (
            <a 
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-accent-primary)] hover:underline"
            >
              {experience.company}
            </a>
          ) : (
            <span className="text-[var(--color-accent-primary)]">{experience.company}</span>
          )}

          {/* Description */}
          <p className="text-[var(--color-text-secondary)] text-sm mt-3 mb-4">
            {experience.description}
          </p>

          {/* Achievements */}
          <motion.ul
            className="space-y-2 mb-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
          >
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <span className="text-[var(--color-accent-primary)] mt-1">▸</span>
                {achievement}
              </motion.li>
            ))}
          </motion.ul>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded-md bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Hover gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          />
        </motion.div>
      </motion.div>

      {/* Timeline dot - only visible on md+ */}
      <motion.div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-[var(--color-accent-primary)] border-4 border-[var(--color-bg-primary)]"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(139, 92, 246, 0.4)",
              "0 0 0 10px rgba(139, 92, 246, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section min-h-screen relative overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
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
            Career Path
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)]">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile Line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-[var(--color-border)]">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-16 pl-12 md:pl-0">
            {experiences.map((exp, index) => (
              <TimelineItem 
                key={exp.id} 
                experience={exp} 
                index={index} 
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Download Resume CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="https://drive.google.com/file/d/1T41ElE4MV_YlEgAXMOsQK2zBsj-f5RNP/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
