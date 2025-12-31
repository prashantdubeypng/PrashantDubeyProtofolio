import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 🤖 HUMANOID ROBOT AVATAR - Interactive AI Developer Avatar
// ═══════════════════════════════════════════════════════════════════════════

interface RobotAvatarProps {
  className?: string;
}

export default function RobotAvatar({ className = "" }: RobotAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  
  // Eye tracking transforms
  const eyeX = useTransform(smoothMouseX, [-1, 1], [-4, 4]);
  const eyeY = useTransform(smoothMouseY, [-1, 1], [-3, 3]);
  
  // Head tilt
  const headRotateY = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const headRotateX = useTransform(smoothMouseY, [-1, 1], [5, -5]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / (window.innerWidth / 2);
        const y = (e.clientY - centerY) / (window.innerHeight / 2);
        
        mouseX.set(Math.max(-1, Math.min(1, x)));
        mouseY.set(Math.max(-1, Math.min(1, y)));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect behind robot */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.5 }}
      />

      <motion.svg
        viewBox="0 0 200 350"
        className="w-full h-full relative z-10"
        style={{
          rotateY: headRotateY,
          rotateX: headRotateX,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" />
            <stop offset="50%" stopColor="#111827" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="50%" stopColor="#1f2937" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          
          <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#022c22" />
          </linearGradient>

          {/* Filters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="2"/>
            <feGaussianBlur stdDeviation="3"/>
            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0"/>
            <feBlend in2="SourceGraphic"/>
          </filter>
        </defs>

        {/* === LEGS === */}
        <g id="legs">
          {/* Left Leg */}
          <motion.rect
            x="60" y="280" width="25" height="50" rx="8"
            fill="url(#metalGradient)"
            stroke="#10b981"
            strokeWidth="1"
            strokeOpacity="0.3"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Left Foot */}
          <rect x="55" y="325" width="35" height="12" rx="4" fill="url(#metalGradient)" />
          <rect x="57" y="330" width="31" height="4" rx="2" fill="#10b981" opacity="0.3" />
          
          {/* Right Leg */}
          <motion.rect
            x="115" y="280" width="25" height="50" rx="8"
            fill="url(#metalGradient)"
            stroke="#10b981"
            strokeWidth="1"
            strokeOpacity="0.3"
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          {/* Right Foot */}
          <rect x="110" y="325" width="35" height="12" rx="4" fill="url(#metalGradient)" />
          <rect x="112" y="330" width="31" height="4" rx="2" fill="#10b981" opacity="0.3" />
        </g>

        {/* === TORSO === */}
        <g id="torso">
          {/* Main Body */}
          <motion.path
            d="M50 150 L50 260 Q50 280 70 280 L130 280 Q150 280 150 260 L150 150 Q150 130 130 120 L70 120 Q50 130 50 150 Z"
            fill="url(#bodyGradient)"
            filter="url(#innerShadow)"
            animate={{ scale: isHovered ? 1.02 : 1 }}
            style={{ transformOrigin: "100px 200px" }}
          />
          
          {/* Chest Plate */}
          <rect x="60" y="140" width="80" height="100" rx="10" fill="url(#metalGradient)" opacity="0.8" />
          
          {/* Arc Reactor / Core */}
          <motion.g
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <circle cx="100" cy="180" r="20" fill="#022c22" stroke="#10b981" strokeWidth="2" />
            <motion.circle
              cx="100" cy="180" r="15"
              fill="url(#glowGradient)"
              filter="url(#glow)"
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <circle cx="100" cy="180" r="8" fill="#10b981" />
            <motion.circle
              cx="100" cy="180" r="5"
              fill="#5eead4"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.g>
          
          {/* Circuit Lines on Chest */}
          <g stroke="#10b981" strokeWidth="1" opacity="0.4" fill="none">
            <motion.path
              d="M70 210 L70 240 L85 240"
              strokeDasharray="50"
              animate={{ strokeDashoffset: [50, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              d="M130 210 L130 240 L115 240"
              strokeDasharray="50"
              animate={{ strokeDashoffset: [50, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.path
              d="M100 200 L100 250"
              strokeDasharray="50"
              animate={{ strokeDashoffset: [50, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
          </g>

          {/* Belt/Waist */}
          <rect x="55" y="255" width="90" height="15" rx="5" fill="#1f2937" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
          <circle cx="100" cy="262" r="5" fill="#10b981" opacity="0.8" />
        </g>

        {/* === ARMS === */}
        <g id="arms">
          {/* Left Arm */}
          <motion.g
            animate={{ rotate: isHovered ? -10 : 0 }}
            style={{ transformOrigin: "45px 140px" }}
            transition={{ duration: 0.3 }}
          >
            {/* Shoulder */}
            <circle cx="45" cy="140" r="15" fill="url(#metalGradient)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            {/* Upper Arm */}
            <rect x="30" y="150" width="20" height="50" rx="8" fill="url(#metalGradient)" />
            {/* Elbow Joint */}
            <circle cx="40" cy="200" r="10" fill="#1f2937" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
            {/* Lower Arm */}
            <rect x="32" y="205" width="16" height="45" rx="6" fill="url(#metalGradient)" />
            {/* Hand */}
            <ellipse cx="40" cy="255" rx="12" ry="8" fill="url(#metalGradient)" />
            {/* Finger lights */}
            <circle cx="32" cy="258" r="2" fill="#10b981" opacity="0.6" />
            <circle cx="40" cy="260" r="2" fill="#10b981" opacity="0.6" />
            <circle cx="48" cy="258" r="2" fill="#10b981" opacity="0.6" />
          </motion.g>

          {/* Right Arm - Waving */}
          <motion.g
            animate={{ 
              rotate: isHovered ? [0, -20, 0, -20, 0] : 0,
            }}
            style={{ transformOrigin: "155px 140px" }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          >
            {/* Shoulder */}
            <circle cx="155" cy="140" r="15" fill="url(#metalGradient)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
            {/* Upper Arm */}
            <rect x="150" y="150" width="20" height="50" rx="8" fill="url(#metalGradient)" />
            {/* Elbow Joint */}
            <circle cx="160" cy="200" r="10" fill="#1f2937" stroke="#10b981" strokeWidth="1" strokeOpacity="0.5" />
            {/* Lower Arm */}
            <rect x="152" y="205" width="16" height="45" rx="6" fill="url(#metalGradient)" />
            {/* Hand */}
            <ellipse cx="160" cy="255" rx="12" ry="8" fill="url(#metalGradient)" />
            {/* Finger lights */}
            <circle cx="152" cy="258" r="2" fill="#10b981" opacity="0.6" />
            <circle cx="160" cy="260" r="2" fill="#10b981" opacity="0.6" />
            <circle cx="168" cy="258" r="2" fill="#10b981" opacity="0.6" />
          </motion.g>
        </g>

        {/* === HEAD === */}
        <motion.g
          id="head"
          style={{
            x: eyeX,
            transformOrigin: "100px 70px",
          }}
        >
          {/* Neck */}
          <rect x="85" y="105" width="30" height="20" rx="5" fill="url(#metalGradient)" />
          <rect x="90" y="108" width="20" height="3" fill="#10b981" opacity="0.3" />
          <rect x="90" y="115" width="20" height="3" fill="#10b981" opacity="0.3" />
          
          {/* Head Base */}
          <motion.path
            d="M55 70 Q55 25 100 25 Q145 25 145 70 L145 95 Q145 110 130 110 L70 110 Q55 110 55 95 Z"
            fill="url(#bodyGradient)"
            filter="url(#innerShadow)"
          />
          
          {/* Face Plate */}
          <rect x="65" y="45" width="70" height="55" rx="12" fill="url(#screenGradient)" stroke="#10b981" strokeWidth="2" strokeOpacity="0.5" />
          
          {/* Eyes */}
          <g>
            {/* Left Eye Socket */}
            <rect x="72" y="55" width="22" height="16" rx="4" fill="#022c22" />
            {/* Left Eye */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <motion.rect
                x="74" y="57" width="18" height="12" rx="3"
                fill={isBlinking ? "#022c22" : "#10b981"}
                filter={isBlinking ? "none" : "url(#glow)"}
                animate={{
                  opacity: isBlinking ? 0.3 : [0.8, 1, 0.8],
                }}
                transition={{ duration: isBlinking ? 0.1 : 2, repeat: isBlinking ? 0 : Infinity }}
              />
              {!isBlinking && (
                <motion.rect
                  x="78" y="60" width="6" height="6" rx="1"
                  fill="#5eead4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.g>

            {/* Right Eye Socket */}
            <rect x="106" y="55" width="22" height="16" rx="4" fill="#022c22" />
            {/* Right Eye */}
            <motion.g style={{ x: eyeX, y: eyeY }}>
              <motion.rect
                x="108" y="57" width="18" height="12" rx="3"
                fill={isBlinking ? "#022c22" : "#10b981"}
                filter={isBlinking ? "none" : "url(#glow)"}
                animate={{
                  opacity: isBlinking ? 0.3 : [0.8, 1, 0.8],
                }}
                transition={{ duration: isBlinking ? 0.1 : 2, repeat: isBlinking ? 0 : Infinity }}
              />
              {!isBlinking && (
                <motion.rect
                  x="112" y="60" width="6" height="6" rx="1"
                  fill="#5eead4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
              )}
            </motion.g>
          </g>

          {/* Mouth / Speaker */}
          <rect x="80" y="80" width="40" height="10" rx="3" fill="#022c22" />
          <motion.g>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.rect
                key={i}
                x={85 + i * 7}
                y="82"
                width="3"
                height="6"
                rx="1"
                fill="#10b981"
                animate={{
                  height: isHovered ? [6, 3, 8, 4, 6] : 6,
                  y: isHovered ? [82, 83.5, 81, 83, 82] : 82,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isHovered ? Infinity : 0,
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.g>

          {/* Antenna */}
          <motion.g
            animate={{ rotate: isHovered ? [0, 5, -5, 0] : 0 }}
            style={{ transformOrigin: "100px 25px" }}
            transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
          >
            <rect x="97" y="10" width="6" height="20" rx="3" fill="url(#metalGradient)" />
            <motion.circle
              cx="100" cy="8" r="6"
              fill="#10b981"
              filter="url(#glow)"
              animate={{
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.g>

          {/* Side Head Lights */}
          <circle cx="58" cy="70" r="4" fill="#10b981" opacity="0.5" />
          <circle cx="142" cy="70" r="4" fill="#10b981" opacity="0.5" />
          
          {/* Ear Pieces */}
          <rect x="50" y="60" width="8" height="25" rx="4" fill="url(#metalGradient)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
          <rect x="142" y="60" width="8" height="25" rx="4" fill="url(#metalGradient)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />
        </motion.g>

        {/* === FLOATING PARTICLES === */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            r="2"
            fill="#10b981"
            opacity="0.6"
            animate={{
              cx: [50 + i * 25, 60 + i * 25, 50 + i * 25],
              cy: [330 + (i % 3) * 10, 320 + (i % 3) * 10, 330 + (i % 3) * 10],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.svg>

      {/* Status Text */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          className="text-xs text-[var(--color-accent-primary)] font-mono tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isHovered ? "[ INTERACTIVE MODE ]" : "[ ONLINE ]"}
        </motion.span>
      </motion.div>
    </div>
  );
}
