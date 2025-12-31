import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

// ═══════════════════════════════════════════════════════════════════════════
// 📬 CONTACT SECTION - Minimal Form with Premium Micro-interactions
// ═══════════════════════════════════════════════════════════════════════════

// Consistent easing for premium feel
const SMOOTH_EASING = [0.4, 0, 0.2, 1] as const;

interface FormState {
  name: string;
  email: string;
  message: string;
}

// Animated Input Component
const AnimatedInput = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder,
  isTextarea = false,
}: {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  isTextarea?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div className="relative">
      <motion.label
        className="block text-sm text-[var(--color-text-muted)] mb-2"
        animate={{
          color: isFocused ? "var(--color-accent-primary)" : "var(--color-text-muted)",
        }}
      >
        {label}
      </motion.label>
      <div className="relative">
        <InputComponent
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-[var(--color-bg-secondary)] border rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/50 outline-none transition-all duration-300 ${
            isTextarea ? "min-h-[150px] resize-none" : ""
          }`}
          style={{
            borderColor: isFocused 
              ? "var(--color-accent-primary)" 
              : hasValue 
                ? "var(--color-border-hover)" 
                : "var(--color-border)",
          }}
        />
        
        {/* Glow effect on focus */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          animate={{
            boxShadow: isFocused 
              ? "0 0 0 4px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.2)" 
              : "0 0 0 0px transparent",
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
};

// Success Animation Component
const SuccessAnimation = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-12"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
  >
    {/* Checkmark Circle */}
    <motion.div
      className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", bounce: 0.5 }}
    >
      <motion.svg
        className="w-10 h-10 text-green-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M20 6L9 17l-5-5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </motion.svg>
    </motion.div>
    
    <motion.h3
      className="text-2xl font-bold mb-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      Message Sent!
    </motion.h3>
    
    <motion.p
      className="text-[var(--color-text-secondary)] text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      Thanks for reaching out. I'll get back to you soon!
    </motion.p>
  </motion.div>
);

// Social Link Component
const SocialLink = ({ href, icon, label, delay }: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  delay: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 p-4 rounded-xl glass group cursor-pointer"
    style={{ border: "1px solid var(--color-border)" }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    whileHover={{ 
      scale: 1.02, 
      borderColor: "var(--color-accent-primary)",
      boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.3)",
    }}
  >
    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-primary)]/10 flex items-center justify-center text-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-primary)] group-hover:text-white transition-colors">
      {icon}
    </div>
    <span className="text-[var(--color-text-secondary)] group-hover:text-white transition-colors">
      {label}
    </span>
  </motion.a>
);

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  const socialLinks = [
    {
      href: "mailto:prashant2107pd@gmail.com",
      label: "prashant2107pd@gmail.com",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com/in/21prashant",
      label: "linkedin.com/in/21prashant",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      href: "https://github.com/prashantdubeypng",
      label: "github.com/prashantdubeypng",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      href: "https://leetcode.com/u/prashantdubeyPD",
      label: "LeetCode (Knight)",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section min-h-screen relative overflow-hidden py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--color-accent-primary) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
        />
        <motion.div
          className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, var(--color-accent-secondary) 0%, transparent 70%)",
            filter: "blur(80px)",
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
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
            Drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            className="glass rounded-2xl p-8"
            style={{ border: "1px solid var(--color-border)" }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <SuccessAnimation key="success" />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <AnimatedInput
                    label="Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                  
                  <AnimatedInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                  
                  <AnimatedInput
                    label="Message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    isTextarea
                  />

                  <motion.button
                    type="submit"
                    className="btn btn-primary w-full py-4 text-lg font-medium relative overflow-hidden"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="loading"
                          className="flex items-center justify-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </motion.div>
                      ) : (
                        <motion.span
                          key="text"
                          className="flex items-center justify-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Send Message
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Info Card */}
            <div className="glass rounded-2xl p-8" style={{ border: "1px solid var(--color-border)" }}>
              <h3 className="text-xl font-bold mb-4">Let's work together</h3>
              <p className="text-[var(--color-text-secondary)] mb-6">
                I'm currently available for freelance work and full-time positions.
                If you have a project that you want to get started, think you need my help
                with something, or just want to say hello, then get in touch.
              </p>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-bg-secondary)]">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm">
                  Currently available for new projects
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <SocialLink key={link.label} {...link} delay={0.4 + index * 0.1} />
              ))}
            </div>

            {/* Location */}
            <motion.div
              className="glass rounded-2xl p-6 text-center"
              style={{ border: "1px solid var(--color-border)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-3xl mb-2">�🇳</div>
              <p className="text-[var(--color-text-secondary)]">
                Based in <span className="text-white font-medium">Ranchi, Jharkhand, India</span>
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                Available for remote work worldwide
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
