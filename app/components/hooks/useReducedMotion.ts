import { useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 PERFORMANCE HOOKS - Detect low-end devices & reduced motion preferences
// ═══════════════════════════════════════════════════════════════════════════

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

export function useIsLowEndDevice() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Check for low-end device indicators
    const checkDevice = () => {
      const memory = (navigator as any).deviceMemory;
      const cores = navigator.hardwareConcurrency;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Consider low-end if: <4GB RAM, <4 cores, or mobile with low specs
      const isLowEndDevice = (memory && memory < 4) || (cores && cores < 4) || (isMobile && (!cores || cores < 6));
      setIsLowEnd(!!isLowEndDevice);
    };

    checkDevice();
  }, []);

  return isLowEnd;
}

export function useSmoothValue(value: number, damping = 0.1) {
  const [smoothValue, setSmoothValue] = useState(value);

  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setSmoothValue(prev => prev + (value - prev) * damping);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [value, damping]);

  return smoothValue;
}

// Consistent easing curve for all animations
export const SMOOTH_EASING = [0.4, 0, 0.2, 1] as const;

// Animation presets for consistency
export const ANIMATION_PRESETS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: SMOOTH_EASING }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: SMOOTH_EASING }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: SMOOTH_EASING }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: SMOOTH_EASING }
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: SMOOTH_EASING }
  }
};

// Stagger children helper
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  animate: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});
