import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 🎴 INTERACTIVE CARD - 3D Tilt + Glow on hover
// ═══════════════════════════════════════════════════════════════════════════

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  tiltIntensity?: number;
  glowIntensity?: number;
}

export default function InteractiveCard({
  children,
  className = "",
  glowColor = "var(--color-accent-primary)",
  tiltIntensity = 15,
  glowIntensity = 0.15,
}: InteractiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 400 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [tiltIntensity, -tiltIntensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-tiltIntensity, tiltIntensity]), springConfig);

  // Glow position
  const glowX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const glowY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Dynamic glow */}
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')} 0%, transparent 60%)`,
            borderRadius: "inherit",
          }}
        />
        {children}
      </motion.div>
    </motion.div>
  );
}
