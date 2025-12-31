import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 PROJECTS SECTION - Glassmorphic Cards with Focus Mode & System Viz
// ═══════════════════════════════════════════════════════════════════════════

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  color: string;
  link: string;
  github: string;
  architecture?: {
    components: string[];
    flow: string;
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "MetaSpace",
    description: "Distributed real-time collaboration platform",
    longDescription: "Built a real-time collaboration platform supporting 150+ concurrent users with Kafka-based streaming data pipelines for room events and presence signals. Modeled relational data in PostgreSQL and containerized services using Docker.",
    tags: ["Node.js", "TypeScript", "PostgreSQL", "Kafka", "Redis", "Docker"],
    image: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
    color: "#10b981",
    link: "https://metaverse-seven-gold.vercel.app/",
    github: "https://github.com/prashantdubeypng/metaverse",
    architecture: {
      components: ["WebSocket", "Kafka", "Redis", "PostgreSQL", "Docker"],
      flow: "Client → WebSocket → Kafka → Redis Cache → PostgreSQL"
    }
  },
  {
    id: 2,
    title: "TaskHive",
    description: "Real-time task management with Kafka pipelines",
    longDescription: "Designed MongoDB data models for tasks, activity logs, and user roles. Built Kafka-based streaming data pipelines to ingest, validate, and propagate task events. Used Redis for real-time sync supporting 50+ concurrent users.",
    tags: ["Node.js", "MongoDB", "Kafka", "Redis", "WebSocket"],
    image: "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
    color: "#06b6d4",
    link: "https://timetide.onrender.com/logic/guest",
    github: "https://github.com/prashantdubeypng/TaskHive",
    architecture: {
      components: ["API", "Kafka", "MongoDB", "Redis", "WebSocket"],
      flow: "REST API → Kafka Queue → Worker → MongoDB → Redis Pub/Sub"
    }
  },
  {
    id: 3,
    title: "Crypto Risk Bot",
    description: "ML-based crypto risk monitoring & forecasting",
    longDescription: "Real-time cryptocurrency risk monitoring system with live spot price tracking via Bybit API, auto-hedging using user-defined thresholds, ML-based BTC price forecasting using Random Forest, and Telegram bot integration.",
    tags: ["Python", "Scikit-learn", "Telegram API", "Bybit API"],
    image: "linear-gradient(135deg, #f59e0b 0%, #10b981 100%)",
    color: "#f59e0b",
    link: "https://github.com/prashantdubeypng/crypto_risk_management",
    github: "https://github.com/prashantdubeypng/crypto_risk_management",
    architecture: {
      components: ["Bybit API", "ML Model", "Risk Engine", "Telegram Bot"],
      flow: "Price Feed → Risk Engine → ML Predictor → Alert System"
    }
  },
  {
    id: 4,
    title: "Py-IDE",
    description: "AI-powered code execution visualizer",
    longDescription: "Developer-focused IDE for real-time execution flow visualization. Designed a graph-based execution engine using NetworkX for visualizing code paths and dependencies.",
    tags: ["Python", "WebSocket", "NetworkX", "Multithreading"],
    image: "linear-gradient(135deg, #3776AB 0%, #06b6d4 100%)",
    color: "#3776AB",
    link: "https://py-dimple-ide-pevl.vercel.app/",
    github: "https://github.com/prashantdubeypng/Py-IDE",
    architecture: {
      components: ["Parser", "AST", "NetworkX", "Visualizer"],
      flow: "Code Input → AST Parser → Graph Builder → Visual Output"
    }
  },
  {
    id: 5,
    title: "Shop Management System",
    description: "Java-based inventory & sales management",
    longDescription: "Built a comprehensive Java-based inventory and sales management system with SQL-backed persistence using JDBC and MySQL. Implements OOP principles for clean architecture.",
    tags: ["Java", "JDBC", "MySQL", "OOP"],
    image: "linear-gradient(135deg, #ED8B00 0%, #f59e0b 100%)",
    color: "#ED8B00",
    link: "https://github.com/prashantdubeypng/Shop_Management_System",
    github: "https://github.com/prashantdubeypng/Shop_Management_System",
    architecture: {
      components: ["Java App", "JDBC", "MySQL", "Reports"],
      flow: "UI Layer → Business Logic → JDBC → MySQL Database"
    }
  },
  {
    id: 6,
    title: "TheAlgorithms Contrib",
    description: "Open-source: 25+ JUnit tests for graph algos",
    longDescription: "Contributed to TheAlgorithms/Java with 25+ JUnit test cases for BFS, DFS, Dijkstra, Bellman-Ford algorithms. Improved reliability by covering edge cases like negative weights and disconnected graphs.",
    tags: ["Java", "JUnit", "Algorithms", "Open Source"],
    image: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "#10b981",
    link: "https://github.com/TheAlgorithms/Java/pull/7156",
    github: "https://github.com/TheAlgorithms/Java/pull/7156",
    architecture: {
      components: ["JUnit", "BFS/DFS", "Dijkstra", "Bellman-Ford"],
      flow: "Test Suite → Algorithm → Edge Cases → Validation"
    }
  },
];

// Architecture Flow Visualization
const ArchitectureFlow = ({ architecture, color }: { architecture: Project["architecture"]; color: string }) => {
  if (!architecture) return null;
  
  return (
    <motion.div
      className="mt-4 pt-4 border-t border-[var(--color-border)]"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <p className="text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">System Architecture</p>
      
      {/* Components with connecting lines */}
      <div className="flex flex-wrap gap-2 mb-3">
        {architecture.components.map((comp, i) => (
          <motion.span
            key={comp}
            className="relative text-[10px] px-2 py-1 rounded-md font-mono"
            style={{
              backgroundColor: `${color}20`,
              color: color,
              border: `1px solid ${color}40`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: `0 0 15px ${color}50`,
              zIndex: 10
            }}
          >
            {comp}
          </motion.span>
        ))}
      </div>
      
      {/* Data flow */}
      <motion.div 
        className="text-[10px] text-[var(--color-text-muted)] font-mono flex items-center gap-1 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {architecture.flow.split(" → ").map((step, i, arr) => (
          <span key={i} className="flex items-center gap-1">
            <motion.span
              className="text-[var(--color-text-secondary)]"
              whileHover={{ color: color }}
            >
              {step}
            </motion.span>
            {i < arr.length - 1 && (
              <motion.span 
                style={{ color }}
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              >
                →
              </motion.span>
            )}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Project Card Component with Focus Mode
const ProjectCard = ({ project, index, onFocus, isFocused }: { 
  project: Project; 
  index: number; 
  onFocus: (id: number | null) => void;
  isFocused: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        scale: isFocused ? 1.05 : 1,
        zIndex: isFocused ? 50 : 1,
      } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setIsExpanded(true)}
      onHoverEnd={() => { setIsExpanded(false); setShowArchitecture(false); }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      layout
    >
      <motion.div
        className="glass rounded-2xl overflow-hidden cursor-pointer relative"
        style={{ 
          border: "1px solid var(--color-border)",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -8,
          boxShadow: `0 20px 60px -15px ${project.color}40`,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onClick={() => onFocus(isFocused ? null : project.id)}
        layout
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}15 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Image/Gradient Background */}
        <motion.div
          className="relative h-48 md:h-56 overflow-hidden"
          style={{ background: project.image }}
          layout
        >
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-heavy flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={isExpanded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass-heavy flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={isExpanded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            
            {/* Architecture toggle */}
            {project.architecture && (
              <motion.button
                className="w-12 h-12 rounded-full glass-heavy flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={isExpanded ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => { e.stopPropagation(); setShowArchitecture(!showArchitecture); }}
                title="View Architecture"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </motion.button>
            )}
          </motion.div>

          {/* Project number */}
          <motion.div 
            className="absolute top-4 left-4 text-white/30 text-6xl font-bold"
            animate={isExpanded ? { scale: 1.1, opacity: 0.5 } : { scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.3 }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          
          <AnimatePresence mode="wait">
            <motion.p
              key={isExpanded ? "long" : "short"}
              className="text-[var(--color-text-secondary)] text-sm mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {isExpanded ? project.longDescription : project.description}
            </motion.p>
          </AnimatePresence>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className="text-xs px-3 py-1 rounded-full cursor-default"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}30`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.3, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: `0 0 10px ${project.color}40`
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          
          {/* Architecture Flow - shown on toggle */}
          <AnimatePresence>
            {showArchitecture && project.architecture && (
              <ArchitectureFlow architecture={project.architecture} color={project.color} />
            )}
          </AnimatePresence>
        </div>

        {/* Bottom gradient line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: project.color }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [focusedProject, setFocusedProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section min-h-screen relative overflow-hidden py-24 md:py-32"
    >
      {/* Focus mode backdrop blur */}
      <AnimatePresence>
        {focusedProject !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFocusedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            Featured Work
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            A collection of projects that showcase my expertise in building modern, 
            scalable, and user-centric applications.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onFocus={setFocusedProject}
              isFocused={focusedProject === project.id}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="btn btn-secondary px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
