import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ SKILLS SECTION - Orbiting Elements + Interactive Cards with 3D Tilt
// ═══════════════════════════════════════════════════════════════════════════

// Consistent easing for premium feel
const SMOOTH_EASING = [0.4, 0, 0.2, 1] as const;

interface Skill {
  name: string;
  icon: string;
  level: number;
  color: string;
  category: string;
}

const skills: Skill[] = [
  { name: "Java", icon: "☕", level: 92, color: "#ED8B00", category: "Languages" },
  { name: "Python", icon: "🐍", level: 88, color: "#3776AB", category: "Languages" },
  { name: "TypeScript", icon: "📘", level: 85, color: "#3178C6", category: "Languages" },
  { name: "Node.js", icon: "💚", level: 90, color: "#339933", category: "Backend" },
  { name: "Kafka", icon: "📨", level: 88, color: "#231F20", category: "Backend" },
  { name: "Redis", icon: "🔴", level: 87, color: "#DC382D", category: "Backend" },
  { name: "MongoDB", icon: "🍃", level: 90, color: "#47A248", category: "Database" },
  { name: "PostgreSQL", icon: "🐘", level: 88, color: "#336791", category: "Database" },
  { name: "React.js", icon: "⚛️", level: 85, color: "#61DAFB", category: "Frontend" },
  { name: "Docker", icon: "🐳", level: 85, color: "#2496ED", category: "DevOps" },
  { name: "DSA", icon: "🧩", level: 95, color: "#10b981", category: "Core" },
  { name: "AWS", icon: "☁️", level: 80, color: "#FF9900", category: "Cloud" },
];

const categories = ["All", "Languages", "Backend", "Database", "Frontend", "DevOps", "Core"];

// Orbiting Skill Component
const OrbitingSkill = ({ skill, index, total }: { skill: Skill; index: number; total: number }) => {
  const angle = (index / total) * 360;
  const radius = 180;
  const duration = 40 + index * 2;
  
  return (
    <motion.div
      className="absolute"
      style={{
        width: 60,
        height: 60,
      }}
      animate={{
        rotate: [angle, angle + 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <motion.div
        className="w-full h-full rounded-xl glass flex items-center justify-center text-2xl cursor-pointer"
        style={{
          transform: `translateX(${radius}px) rotate(-${angle}deg)`,
          boxShadow: `0 0 20px ${skill.color}33`,
        }}
        whileHover={{
          scale: 1.3,
          boxShadow: `0 0 30px ${skill.color}66`,
        }}
        animate={{
          rotate: [-angle, -(angle + 360)],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span>{skill.icon}</span>
      </motion.div>
    </motion.div>
  );
};

// Skill Card Component with 3D Tilt
const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  // 3D tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: SMOOTH_EASING }}
      onHoverStart={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="glass rounded-xl p-6 h-full cursor-pointer relative overflow-hidden"
        style={{
          border: "1px solid var(--color-border)",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -4,
          borderColor: skill.color,
          boxShadow: `0 20px 40px -15px ${skill.color}30`,
        }}
        transition={{ duration: 0.3, ease: SMOOTH_EASING }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 rounded-xl"
          animate={{ opacity: isHovered ? 0.15 : 0 }}
          style={{
            background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          className="text-4xl mb-4"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -10, 10, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {skill.icon}
        </motion.div>

        {/* Name */}
        <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
        
        {/* Category */}
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
          {skill.category}
        </span>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-1.5 bg-[var(--color-bg-secondary)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 1, delay: index * 0.05 + 0.3, ease: "easeOut" }}
            />
          </div>
          <motion.span
            className="text-xs text-[var(--color-text-muted)] mt-2 block text-right"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.05 + 0.5 }}
          >
            {skill.level}%
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section min-h-screen relative overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
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
            My Expertise
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
        </motion.div>

        {/* Orbit Visualization - Desktop Only */}
        <motion.div
          className="hidden lg:flex justify-center items-center mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="relative w-[400px] h-[400px]">
            {/* Center circle */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full glass-heavy flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 30px rgba(16, 185, 129, 0.3)",
                  "0 0 50px rgba(16, 185, 129, 0.5)",
                  "0 0 30px rgba(16, 185, 129, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-2xl font-bold gradient-text">AI</span>
            </motion.div>

            {/* Orbit rings */}
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)]"
                style={{
                  width: ring * 120,
                  height: ring * 120,
                  opacity: 0.3,
                }}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: 0.5 + ring * 0.2 }}
              />
            ))}

            {/* Orbiting skills */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {skills.slice(0, 8).map((skill, index) => (
                <OrbitingSkill 
                  key={skill.name} 
                  skill={skill} 
                  index={index} 
                  total={8} 
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
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

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-[var(--color-text-muted)] max-w-2xl mx-auto">
            Always learning and exploring new technologies. Currently diving deep into{" "}
            <span className="text-[var(--color-accent-primary)]">AI/ML</span>,{" "}
            <span className="text-[var(--color-accent-secondary)]">Web3</span>, and{" "}
            <span className="text-[var(--color-accent-tertiary)]">Edge Computing</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
