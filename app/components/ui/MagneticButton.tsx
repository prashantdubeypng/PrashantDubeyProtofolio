import { motion } from "framer-motion";
import { type ReactNode } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// 🔘 MAGNETIC BUTTON - Follows cursor with magnetic pull + micro-bounce
// ═══════════════════════════════════════════════════════════════════════════

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  magneticPull?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  magneticPull = 0.3,
}: MagneticButtonProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * magneticPull;
    const deltaY = (e.clientY - centerY) * magneticPull;
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
      style={{
        transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Glow effect on hover */}
      <motion.span
        className="absolute inset-0 rounded-inherit opacity-0"
        style={{
          background: "radial-gradient(circle at center, var(--color-accent-primary) 0%, transparent 70%)",
          filter: "blur(15px)",
          borderRadius: "inherit",
        }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
