import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 📜 CERTIFICATIONS SECTION - Professional Courses with Premium 3D Cards
// ═══════════════════════════════════════════════════════════════════════════

// Consistent easing for premium feel
const SMOOTH_EASING = [0.4, 0, 0.2, 1] as const;

interface Certification {
  id: number;
  title: string;
  provider: string;
  date: string;
  skills: string[];
  category: string;
  color: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: "System Design Masterclass",
    provider: "YouTube",
    date: "Ongoing",
    skills: ["Distributed Systems", "Scalability", "Load Balancing", "Database Sharding", "Caching", "Message Queues", "Microservices"],
    category: "System Design",
    color: "#ff0000",
    link: "https://www.youtube.com/watch?v=AK0hu0Zxua4&list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT",
  },
  {
    id: 2,
    title: "Java Programming Fundamentals Specialization",
    provider: "IBM",
    date: "Nov 2025",
    skills: ["Core Java", "OOP Principles", "Data Structures", "Exception Handling", "Collections Framework"],
    category: "Java",
    color: "#f89820",
  },
  {
    id: 3,
    title: "Cloud Native, Microservices, Containers, DevOps and Agile",
    provider: "IBM",
    date: "Nov 2025",
    skills: ["Docker", "Kubernetes", "CI/CD Pipelines", "Microservices Architecture", "Agile Methodology", "Cloud Deployment"],
    category: "DevOps",
    color: "#10b981",
  },
  {
    id: 4,
    title: "Spring Framework for Java Development",
    provider: "SkillUp",
    date: "Nov 2025",
    skills: ["Spring Boot", "Dependency Injection", "Spring MVC", "REST APIs", "Spring Security"],
    category: "Backend",
    color: "#6db33f",
  },
  {
    id: 5,
    title: "Java Development with Databases",
    provider: "SkillUp",
    date: "Nov 2025",
    skills: ["JDBC", "SQL Queries", "Database Design", "Connection Pooling", "ORM Concepts"],
    category: "Database",
    color: "#336791",
  },
  {
    id: 6,
    title: "Object Oriented Programming in Java",
    provider: "IBM",
    date: "Nov 2025",
    skills: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "Design Patterns"],
    category: "Java",
    color: "#f89820",
  },
  {
    id: 7,
    title: "Getting Started with Git and GitHub",
    provider: "IBM",
    date: "Nov 2025",
    skills: ["Version Control", "Branching Strategies", "Pull Requests", "Code Review", "Collaboration"],
    category: "Tools",
    color: "#f05032",
  },
  {
    id: 8,
    title: "Introduction to Software Engineering",
    provider: "IBM",
    date: "Nov 2025",
    skills: ["SDLC", "Software Architecture", "Requirements Analysis", "Testing Strategies", "Documentation"],
    category: "Engineering",
    color: "#14b8a6",
  },
  {
    id: 9,
    title: "Introduction to HTML, CSS, & JavaScript",
    provider: "IBM",
    date: "Nov 2025",
    skills: ["HTML5", "CSS3", "JavaScript Basics", "DOM Manipulation", "Responsive Design"],
    category: "Frontend",
    color: "#e34c26",
  },
  {
    id: 10,
    title: "Java App Development Project",
    provider: "SkillUp",
    date: "Nov 2025",
    skills: ["File I/O", "Project Structure", "Build Tools", "Unit Testing", "Application Deployment"],
    category: "Java",
    color: "#f89820",
  },
];

const categories = ["All", "System Design", "Java", "DevOps", "Backend", "Database", "Tools", "Engineering", "Frontend"];

// Certification Card Component with 3D tilt
const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 3D tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: SMOOTH_EASING }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="glass rounded-xl p-5 h-full cursor-pointer relative overflow-hidden group"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          borderLeft: `3px solid ${cert.color}`,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ 
          y: -6, 
          boxShadow: `0 20px 40px -15px ${cert.color}30`,
        }}
        transition={{ duration: 0.3, ease: SMOOTH_EASING }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${cert.color}15 0%, transparent 70%)`,
          }}
        />

        {/* Provider badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ 
              background: `${cert.color}20`,
              color: cert.color 
            }}
          >
            {cert.provider}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">{cert.date}</span>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-[var(--color-text-primary)] mb-3 text-sm leading-tight">
          {cert.title}
        </h3>

        {/* Category */}
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
          {cert.category}
        </span>

        {/* Skills (expandable) */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-[var(--color-border)]"
            >
              <p className="text-xs text-[var(--color-text-muted)] mb-2">Skills Learned:</p>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] px-2 py-1 rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand indicator */}
        <motion.div
          className="absolute bottom-2 right-2 text-[var(--color-text-muted)]"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function Certifications() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCerts = activeCategory === "All"
    ? certifications
    : certifications.filter(c => c.category === activeCategory);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section min-h-screen relative overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
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
            Professional Development
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Certifications & <span className="gradient-text">Courses</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] mt-4 max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications from IBM, SkillUp, and Coursera
          </p>
        </motion.div>

        {/* Coursera Profile Link */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://www.coursera.org/user/6b1c5634ea7a0c9e2bbfa6c7209c0c1b"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium hover:text-[var(--color-accent-primary)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.879 14.858c-.315.658-1.007 1.057-1.752 1.057H7.873c-.745 0-1.437-.399-1.752-1.057-.315-.658-.215-1.447.254-1.99l4.127-4.127c.586-.586 1.536-.586 2.122 0l4.127 4.127c.469.543.569 1.332.254 1.99z"/>
            </svg>
            View Full Certification Profile on Coursera
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeCategory === category
                  ? "bg-[var(--color-accent-primary)] text-white"
                  : "glass text-[var(--color-text-secondary)] hover:text-white"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-[var(--color-border)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { number: "10+", label: "Certifications" },
            { number: "4", label: "Providers" },
            { number: "45+", label: "Skills Learned" },
            { number: "2025", label: "Latest Update" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9 + index * 0.1 }}
            >
              <span className="text-3xl font-bold gradient-text">{stat.number}</span>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
