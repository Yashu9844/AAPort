"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Refs for GSAP animation
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email, name });
  };

  // GSAP ScrollTrigger Animation (Zoox-style)
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const footer = footerRef.current;
    const content = contentRef.current;
    const background = backgroundRef.current;

    if (!footer || !content || !background) return;

    gsap.registerPlugin(ScrollTrigger);

    // Initial state
    gsap.set(footer, { minHeight: "100vh" });
    gsap.set(content, { scale: 1.15, opacity: 0.4, y: 80, paddingTop: 0 });
    gsap.set(background, { opacity: 1 });

    // Scroll-driven animation: BIG (full) → SMALL (compact)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "center center",
        scrub: 1,
        // Remove snapping to prevent auto-scrolling to the end
        // snap: false,
      },
    });

    tl.to(footer, { minHeight: "auto" })
      .to(content, { scale: 1, opacity: 1, y: 0, paddingTop: "5rem" }, 0)
      .to(background, { opacity: 0.6 }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.98 },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialIconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    tap: { scale: 0.95 },
  };

  return (
    <footer ref={footerRef} className="relative bg-black text-gray-200 overflow-hidden min-h-screen">
      {/* Background media with dark overlay */}
      <div ref={backgroundRef} className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to keep background cinematic and dark */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/15"></div>
      </div>

      {/* Footer Content - Overlaying the background */}
      <motion.div
        ref={contentRef}
        className="relative z-10 w-full bg-gradient-to-b from-black/40 via-black/80 to-black/95 backdrop-blur-[3px]"
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-full mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4">
          
          {/* Large CTA Section */}
          <div className="mb-12 md:mb-16">
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-8 md:mb-12"
              variants={headingVariants}
              style={{ fontFamily: 'KH Teka, sans-serif' }}
            >
              Let's Create
              <br />
              <span className="text-white/40">Something Great</span>
            </motion.h2>
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
              variants={sectionVariants}
            >
              <a href="mailto:your.email@example.com">
                <motion.button 
                  className="group bg-white text-black px-12 py-6 text-base font-medium tracking-wider uppercase hover:bg-white/90 transition-all duration-500 hover:scale-105 flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  Get In Touch
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </a>
              <motion.p 
                className="text-base md:text-lg text-white/60"
                variants={itemVariants}
                style={{ fontFamily: 'KH Teka, sans-serif' }}
              >
                Available for freelance projects
              </motion.p>
            </motion.div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12 md:mb-16">
            {/* Quick Links */}
            <motion.div variants={sectionVariants}>
              <motion.div variants={headingVariants}>
                <div className="h-[2px] w-12 bg-white mb-6"></div>
                <h3 className="text-sm font-medium mb-8 uppercase text-white/50" style={{ fontFamily: 'KH Teka, sans-serif', letterSpacing: '0.15em' }}>
                  Quick Links
                </h3>
              </motion.div>
              <nav className="space-y-5">
                <motion.a
                  href="/"
                  className="group block text-xl text-white hover:text-white/60 transition-all duration-300"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">Home</span>
                </motion.a>
                <motion.a
                  href="/projects"
                  className="group block text-xl text-white hover:text-white/60 transition-all duration-300"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">Work</span>
                </motion.a>
                <motion.a
                  href="#about"
                  className="group block text-xl text-white hover:text-white/60 transition-all duration-300"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">About</span>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="group block text-xl text-white hover:text-white/60 transition-all duration-300"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  <span className="group-hover:translate-x-2 inline-block transition-transform duration-300">Contact</span>
                </motion.a>
              </nav>
            </motion.div>

            {/* Expertise */}
            <motion.div variants={sectionVariants}>
              <motion.div variants={headingVariants}>
                <div className="h-[2px] w-12 bg-white mb-6"></div>
                <h3 className="text-sm font-medium mb-8 uppercase text-white/50" style={{ fontFamily: 'KH Teka, sans-serif', letterSpacing: '0.15em' }}>
                  Expertise
                </h3>
              </motion.div>
              <div className="space-y-5">
                <motion.p
                  className="text-xl text-white/80"
                  variants={itemVariants}
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  Web Development
                </motion.p>
                <motion.p
                  className="text-xl text-white/80"
                  variants={itemVariants}
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  UI/UX Design
                </motion.p>
                <motion.p
                  className="text-xl text-white/80"
                  variants={itemVariants}
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  Full Stack Apps
                </motion.p>
                <motion.p
                  className="text-xl text-white/80"
                  variants={itemVariants}
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  API Solutions
                </motion.p>
              </div>
            </motion.div>

            {/* Get In Touch */}
            <motion.div 
              className="lg:col-span-2" 
              variants={sectionVariants}
            >
              <motion.div variants={headingVariants}>
                <h3 className="text-xs font-bold mb-6 tracking-[0.3em] uppercase text-white font-accent">
                  Let's Connect
                </h3>
              </motion.div>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-lg text-white/90 leading-relaxed"
                variants={itemVariants}
              >
                Have a project in mind or want to collaborate?
                <br />
                Let's create something amazing together.
              </motion.p>
              <motion.form 
                onSubmit={handleNewsletterSubmit} 
                className="space-y-4"
                variants={sectionVariants}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={formItemVariants}>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="px-0 h-12 placeholder-gray-500 bg-transparent border-0 border-b-2 border-white/20 text-white font-light focus:border-white hover:border-white/50 transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="px-0 h-12 placeholder-gray-500 bg-transparent border-0 border-b-2 border-white/20 text-white font-light focus:border-white hover:border-white/50 transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none"
                    />
                  </motion.div>
                </div>
                <motion.div variants={formItemVariants}>
                  <Button
                    type="submit"
                    className="group w-full sm:w-auto bg-white text-black px-10 py-6 font-medium uppercase text-sm tracking-[0.2em] hover:bg-white/90 transition-all duration-300 hover:scale-105"
                  >
                    Send Message
                    <ExternalLink className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </motion.form>
              <motion.p 
                className="text-xs mt-6 text-gray-500 max-w-md font-light"
                variants={itemVariants}
              >
                By submitting this form, you agree to be contacted regarding your inquiry.
                I respect your privacy and will never share your information.
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6" 
            variants={sectionVariants}
          >
            {/* Copyright & Info */}
            <div className="flex flex-col gap-2">
              <motion.p 
                className="text-sm font-light text-gray-400"
                variants={itemVariants}
              >
                © {new Date().getFullYear()} Yashavanth R Siddesh. All rights reserved.
              </motion.p>
              <motion.p 
                className="text-xs font-light text-gray-500"
                variants={itemVariants}
              >
                Designed & Developed with passion
              </motion.p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <motion.span 
                className="text-xs font-bold uppercase tracking-[0.3em] text-white/70 font-accent"
                variants={itemVariants}
              >
                Connect
              </motion.span>
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                className="text-white hover:text-white/70 transition-all duration-300 hover:scale-110"
                aria-label="Email"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/70 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    
      {/* Spacer to ensure background is visible below footer */}
      <div className="h-64 md:h-80 lg:h-96"></div>
    </footer>
  );
};

export default Footer;