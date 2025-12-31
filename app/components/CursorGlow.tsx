import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// ✨ CURSOR GLOW - Premium Cursor Follow Effect
// ═══════════════════════════════════════════════════════════════════════════

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports hover (not touch-only)
    const mediaQuery = window.matchMedia("(hover: hover)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add listeners for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, [data-cursor-hover]"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 80 : 300,
            height: isHovering ? 80 : 300,
            opacity: isHovering ? 0.3 : 0.15,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, rgba(16, 185, 129, 0.4) 30%, transparent 70%)`,
            filter: "blur(40px)",
          }}
        />
      </motion.div>

      {/* Secondary smaller glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 40 : 20,
            height: isHovering ? 40 : 20,
            opacity: isHovering ? 0.8 : 0.6,
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: "rgba(16, 185, 129, 0.5)",
            filter: "blur(5px)",
          }}
        />
      </motion.div>
    </>
  );
}
