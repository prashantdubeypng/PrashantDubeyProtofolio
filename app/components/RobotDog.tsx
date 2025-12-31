import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 🐕 ROBOT DOG - Interactive Companion that chases cursor
// ═══════════════════════════════════════════════════════════════════════════

export default function RobotDog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isChasing, setIsChasing] = useState(false);
  const [isTailWagging, setIsTailWagging] = useState(false);
  const [isNearMouth, setIsNearMouth] = useState(false);
  
  // Dog position for chasing
  const dogX = useMotionValue(0);
  const dogY = useMotionValue(0);
  
  // Smooth spring for dog movement
  const springConfig = { damping: 20, stiffness: 100 };
  const smoothDogX = useSpring(dogX, springConfig);
  const smoothDogY = useSpring(dogY, springConfig);
  
  // Head rotation for looking at cursor
  const headRotate = useMotionValue(0);
  const smoothHeadRotate = useSpring(headRotate, { damping: 15, stiffness: 150 });
  
  // Eye tracking
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const smoothEyeX = useSpring(eyeX, { damping: 20, stiffness: 200 });
  const smoothEyeY = useSpring(eyeY, { damping: 20, stiffness: 200 });

  // Ear movement
  const earRotate = useMotionValue(0);
  const smoothEarRotate = useSpring(earRotate, { damping: 15, stiffness: 120 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Mouth position (relative to container)
      const mouthX = rect.left + rect.width * 0.5;
      const mouthY = rect.top + rect.height * 0.35;
      
      // Check if cursor is near mouth
      const distanceToMouth = Math.sqrt(
        Math.pow(e.clientX - mouthX, 2) + Math.pow(e.clientY - mouthY, 2)
      );
      
      const nearMouth = distanceToMouth < 80;
      setIsNearMouth(nearMouth);
      
      if (nearMouth && !isChasing) {
        setIsChasing(true);
        setIsTailWagging(true);
      }
      
      if (isChasing) {
        // Calculate chase position (dog moves toward cursor)
        const maxChaseDistance = 100;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 200) {
          // Stop chasing if cursor is too far
          setIsChasing(false);
          setTimeout(() => setIsTailWagging(false), 1000);
          dogX.set(0);
          dogY.set(0);
        } else {
          // Chase the cursor
          const moveX = Math.min(Math.max(dx * 0.3, -maxChaseDistance), maxChaseDistance);
          const moveY = Math.min(Math.max(dy * 0.3, -maxChaseDistance), maxChaseDistance);
          dogX.set(moveX);
          dogY.set(moveY);
        }
        
        // Head rotation to follow cursor
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        headRotate.set(Math.min(Math.max(angle * 0.15, -20), 20));
      }
      
      // Eye tracking (always active)
      const relX = (e.clientX - centerX) / rect.width;
      const relY = (e.clientY - centerY) / rect.height;
      eyeX.set(relX * 4);
      eyeY.set(relY * 3);
      
      // Ear perking up when cursor is near
      if (nearMouth) {
        earRotate.set(-15);
      } else {
        earRotate.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isChasing, dogX, dogY, headRotate, eyeX, eyeY, earRotate]);

  // Blinking animation
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Panting animation when excited
  const [isPanting, setIsPanting] = useState(false);
  useEffect(() => {
    if (isChasing) {
      setIsPanting(true);
    } else {
      setTimeout(() => setIsPanting(false), 500);
    }
  }, [isChasing]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-32 h-40 cursor-pointer"
      style={{
        x: smoothDogX,
        y: smoothDogY,
      }}
      whileHover={{ scale: 1.05 }}
    >
      <svg
        viewBox="0 0 120 160"
        className="w-full h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Metallic gradient for robot dog */}
          <linearGradient id="dogMetalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="50%" stopColor="#718096" />
            <stop offset="100%" stopColor="#4a5568" />
          </linearGradient>
          
          {/* Glow effect */}
          <filter id="dogGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Eye glow */}
          <filter id="eyeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* === TAIL (wagging) === */}
        <motion.g
          style={{ originX: "75px", originY: "95px" }}
          animate={isTailWagging ? {
            rotate: [-20, 20, -20],
          } : { rotate: 0 }}
          transition={isTailWagging ? {
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          } : { duration: 0.5 }}
        >
          {/* Tail segments */}
          <rect x="72" y="85" width="8" height="15" rx="3" fill="url(#dogMetalGradient)" stroke="#10b981" strokeWidth="0.5" />
          <rect x="74" y="75" width="6" height="12" rx="2" fill="url(#dogMetalGradient)" stroke="#10b981" strokeWidth="0.5" />
          <motion.circle
            cx="77"
            cy="72"
            r="4"
            fill="#10b981"
            filter="url(#eyeGlow)"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.g>

        {/* === BACK LEGS (sitting position) === */}
        {/* Left back leg */}
        <g>
          <rect x="30" y="110" width="18" height="25" rx="5" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          <rect x="28" y="130" width="22" height="12" rx="4" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          {/* Paw */}
          <ellipse cx="39" cy="145" rx="12" ry="6" fill="url(#dogMetalGradient)" stroke="#10b981" strokeWidth="0.5" />
          {/* Joint glow */}
          <circle cx="39" cy="115" r="3" fill="#14b8a6" opacity="0.7" />
        </g>

        {/* Right back leg */}
        <g>
          <rect x="72" y="110" width="18" height="25" rx="5" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          <rect x="70" y="130" width="22" height="12" rx="4" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          {/* Paw */}
          <ellipse cx="81" cy="145" rx="12" ry="6" fill="url(#dogMetalGradient)" stroke="#10b981" strokeWidth="0.5" />
          {/* Joint glow */}
          <circle cx="81" cy="115" r="3" fill="#14b8a6" opacity="0.7" />
        </g>

        {/* === BODY === */}
        <motion.g
          animate={isChasing ? { y: [-2, 2, -2] } : { y: 0 }}
          transition={isChasing ? { duration: 0.5, repeat: Infinity } : { duration: 0.3 }}
        >
          {/* Main body */}
          <ellipse cx="60" cy="95" rx="35" ry="25" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1.5" />
          
          {/* Body panel lines */}
          <path d="M30 90 Q60 85 90 90" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.6" />
          <path d="M35 100 Q60 105 85 100" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.6" />
          
          {/* Chest piece */}
          <ellipse cx="60" cy="80" rx="20" ry="12" fill="#4a5568" stroke="#10b981" strokeWidth="0.5" />
          
          {/* Core light on chest */}
          <motion.circle
            cx="60"
            cy="80"
            r="6"
            fill="#10b981"
            filter="url(#eyeGlow)"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              r: [5, 6, 5]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.g>

        {/* === FRONT LEGS (sitting upright) === */}
        {/* Left front leg */}
        <motion.g
          animate={isChasing ? { rotate: [-5, 5, -5] } : { rotate: 0 }}
          transition={isChasing ? { duration: 0.3, repeat: Infinity } : { duration: 0.3 }}
          style={{ originX: "40px", originY: "100px" }}
        >
          <rect x="32" y="95" width="14" height="35" rx="4" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          <rect x="30" y="125" width="18" height="10" rx="3" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          {/* Paw */}
          <ellipse cx="39" cy="138" rx="10" ry="5" fill="url(#dogMetalGradient)" stroke="#10b981" strokeWidth="0.5" />
          {/* Joint */}
          <circle cx="39" cy="100" r="2.5" fill="#14b8a6" opacity="0.8" />
          <circle cx="39" cy="125" r="2" fill="#14b8a6" opacity="0.8" />
        </motion.g>

        {/* Right front leg */}
        <motion.g
          animate={isChasing ? { rotate: [5, -5, 5] } : { rotate: 0 }}
          transition={isChasing ? { duration: 0.3, repeat: Infinity, delay: 0.15 } : { duration: 0.3 }}
          style={{ originX: "80px", originY: "100px" }}
        >
          <rect x="74" y="95" width="14" height="35" rx="4" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          <rect x="72" y="125" width="18" height="10" rx="3" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          {/* Paw */}
          <ellipse cx="81" cy="138" rx="10" ry="5" fill="url(#dogMetalGradient)" stroke="#10b981" strokeWidth="0.5" />
          {/* Joint */}
          <circle cx="81" cy="100" r="2.5" fill="#14b8a6" opacity="0.8" />
          <circle cx="81" cy="125" r="2" fill="#14b8a6" opacity="0.8" />
        </motion.g>

        {/* === HEAD === */}
        <motion.g
          style={{ 
            originX: "60px", 
            originY: "60px",
            rotate: smoothHeadRotate
          }}
        >
          {/* Neck */}
          <rect x="50" y="65" width="20" height="15" rx="5" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1" />
          
          {/* Main head */}
          <ellipse cx="60" cy="45" rx="28" ry="22" fill="url(#dogMetalGradient)" stroke="#2d3748" strokeWidth="1.5" />
          
          {/* Snout */}
          <ellipse cx="60" cy="55" rx="15" ry="10" fill="#5a6577" stroke="#2d3748" strokeWidth="1" />
          
          {/* Nose */}
          <motion.ellipse
            cx="60"
            cy="52"
            rx="5"
            ry="3.5"
            fill="#1a202c"
            stroke="#10b981"
            strokeWidth="0.5"
            animate={isNearMouth ? { scale: 1.1 } : { scale: 1 }}
          />
          
          {/* Mouth / Tongue area */}
          <motion.g>
            <path 
              d="M50 58 Q60 62 70 58" 
              fill="none" 
              stroke="#2d3748" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Tongue (shows when panting) */}
            {isPanting && (
              <motion.ellipse
                cx="60"
                cy="62"
                rx="4"
                ry="6"
                fill="#f56565"
                animate={{ 
                  scaleY: [1, 1.2, 1],
                  y: [0, 2, 0]
                }}
                transition={{ duration: 0.3, repeat: Infinity }}
              />
            )}
          </motion.g>

          {/* === EARS === */}
          {/* Left ear */}
          <motion.g
            style={{ 
              originX: "38px", 
              originY: "30px",
              rotate: smoothEarRotate
            }}
          >
            <path
              d="M38 30 L28 8 L45 22 Z"
              fill="url(#dogMetalGradient)"
              stroke="#2d3748"
              strokeWidth="1"
            />
            <path
              d="M36 25 L30 12 L42 20 Z"
              fill="#5a6577"
              opacity="0.5"
            />
          </motion.g>

          {/* Right ear */}
          <motion.g
            style={{ 
              originX: "82px", 
              originY: "30px",
              rotate: useTransform(smoothEarRotate, v => -v)
            }}
          >
            <path
              d="M82 30 L92 8 L75 22 Z"
              fill="url(#dogMetalGradient)"
              stroke="#2d3748"
              strokeWidth="1"
            />
            <path
              d="M84 25 L90 12 L78 20 Z"
              fill="#5a6577"
              opacity="0.5"
            />
          </motion.g>

          {/* === EYES === */}
          {/* Left eye socket */}
          <ellipse cx="45" cy="40" rx="9" ry="7" fill="#1a202c" stroke="#2d3748" strokeWidth="1" />
          {/* Left eye */}
          <motion.g style={{ x: smoothEyeX, y: smoothEyeY }}>
            <motion.ellipse
              cx="45"
              cy="40"
              rx={isBlinking ? 7 : 6}
              ry={isBlinking ? 1 : 5}
              fill="#10b981"
              filter="url(#eyeGlow)"
              animate={isChasing ? {
                fill: ["#10b981", "#14b8a6", "#10b981"]
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            {!isBlinking && (
              <circle cx="45" cy="39" r="2" fill="#ffffff" opacity="0.8" />
            )}
          </motion.g>

          {/* Right eye socket */}
          <ellipse cx="75" cy="40" rx="9" ry="7" fill="#1a202c" stroke="#2d3748" strokeWidth="1" />
          {/* Right eye */}
          <motion.g style={{ x: smoothEyeX, y: smoothEyeY }}>
            <motion.ellipse
              cx="75"
              cy="40"
              rx={isBlinking ? 7 : 6}
              ry={isBlinking ? 1 : 5}
              fill="#10b981"
              filter="url(#eyeGlow)"
              animate={isChasing ? {
                fill: ["#10b981", "#14b8a6", "#10b981"]
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            {!isBlinking && (
              <circle cx="75" cy="39" r="2" fill="#ffffff" opacity="0.8" />
            )}
          </motion.g>

          {/* Antenna / sensor on head */}
          <motion.g
            animate={{ rotate: isNearMouth ? [0, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            style={{ originX: "60px", originY: "25px" }}
          >
            <rect x="58" y="18" width="4" height="10" rx="2" fill="url(#dogMetalGradient)" />
            <motion.circle
              cx="60"
              cy="15"
              r="3"
              fill="#10b981"
              filter="url(#eyeGlow)"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.g>
        </motion.g>

        {/* === COLLAR === */}
        <rect x="45" y="68" width="30" height="6" rx="2" fill="#1a202c" stroke="#10b981" strokeWidth="0.5" />
        <motion.circle
          cx="60"
          cy="71"
          r="3"
          fill="#10b981"
          filter="url(#eyeGlow)"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

    </motion.div>
  );
}
