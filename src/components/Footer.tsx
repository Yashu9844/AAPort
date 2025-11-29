"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email, name });
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const footer = footerRef.current;
    const content = contentRef.current;
    const background = backgroundRef.current;

    if (!footer || !content || !background) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(footer, { minHeight: "100vh" });
    gsap.set(content, { scale: 1.15, opacity: 0.4, y: 80, paddingTop: 0 });
    gsap.set(background, { opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "center center",
        scrub: 1,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
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

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      x: 8,
      transition: { duration: 0.2, ease: "easeOut" },
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
      scale: 1.2,
      y: -2,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  return (
    <footer ref={footerRef} className="relative bg-black text-gray-200 overflow-hidden min-h-screen">
      {/* Background */}
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
        <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
      </div>

      {/* Footer Content */}
      <motion.div
        ref={contentRef}
        className="relative z-10 w-full  md:w-[95%] lg:w-[85%] xl:w-[80%] mx-auto  bg-gradient-to-b from-black/40 via-black/80 to-black/95  backdrop-blur-[2px]"
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          
          {/* Hero CTA Section - Stacked on mobile, side-by-side on larger screens */}
          <div className="mb-12 lg:mb-16 xl:mb-20">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 lg:mb-8"
              variants={sectionVariants}
              style={{ fontFamily: 'KH Teka, sans-serif' }}
            >
              Let's Create
              <br />
              <span className="text-white/40">Something Great</span>
            </motion.h2>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <motion.a 
                href="mailto:your.email@example.com"
                variants={itemVariants}
                whileHover="hover"
              >
                <button 
                  className="group bg-white text-black px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-medium tracking-wider uppercase hover:bg-white/90 transition-all duration-300 flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center"
                  style={{ fontFamily: 'KH Teka, sans-serif' }}
                >
                  Get In Touch
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </motion.a>
              <motion.p 
                className="text-sm sm:text-base text-white/60 text-center sm:text-left mt-2 sm:mt-0"
                variants={itemVariants}
                style={{ fontFamily: 'KH Teka, sans-serif' }}
              >
                Available for freelance projects
              </motion.p>
            </div>
          </div>

          {/* Main Content Grid - Responsive layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            
            {/* Quick Links */}
            <motion.div variants={sectionVariants} className="mb-8 md:mb-0">
              <div className="h-px w-8 bg-white/50 mb-4"></div>
              <h3 className="text-xs font-medium mb-6 uppercase text-white/40 tracking-widest" style={{ fontFamily: 'KH Teka, sans-serif' }}>
                Navigation
              </h3>
              <nav className="space-y-4">
                {['Home', 'Work', 'About', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className="group block text-lg text-white hover:text-white/70 transition-all duration-300"
                    variants={itemVariants}
                    whileHover="hover"
                    style={{ fontFamily: 'KH Teka, sans-serif' }}
                  >
                    <span className="border-b border-transparent group-hover:border-white/30 transition-all duration-300">
                      {item}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            {/* Expertise */}
            <motion.div variants={sectionVariants} className="mb-8 md:mb-0">
              <div className="h-px w-8 bg-white/50 mb-4"></div>
              <h3 className="text-xs font-medium mb-6 uppercase text-white/40 tracking-widest" style={{ fontFamily: 'KH Teka, sans-serif' }}>
                Expertise
              </h3>
              <div className="space-y-4">
                {['Web Development', 'UI/UX Design', 'Full Stack Apps', 'API Solutions'].map((skill) => (
                  <motion.p
                    key={skill}
                    className="text-lg text-white/80"
                    variants={itemVariants}
                    style={{ fontFamily: 'KH Teka, sans-serif' }}
                  >
                    {skill}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            {/* Contact Form - Full width on mobile, spans 2 cols on desktop */}
            <motion.div 
              className="md:col-span-2 lg:col-span-2" 
              variants={sectionVariants}
            >
              <h3 className="text-xs font-bold mb-4 tracking-widest uppercase text-white/60" style={{ fontFamily: 'KH Teka, sans-serif' }}>
                Start a Project
              </h3>
              <motion.p 
                className="text-base sm:text-lg md:text-xl font-light mb-6 text-white/80 leading-relaxed"
                variants={itemVariants}
                style={{ fontFamily: 'KH Teka, sans-serif' }}
              >
                Ready to bring your ideas to life? Let's discuss your next project.
              </motion.p>
              
              <motion.form 
                onSubmit={handleNewsletterSubmit} 
                className="space-y-4"
                variants={sectionVariants}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="px-0 h-12 placeholder-gray-400 bg-transparent border-0 border-b border-white/30 text-white font-light focus:border-white hover:border-white/60 transition-colors focus:outline-none focus-visible:ring-0 rounded-none text-base"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="px-0 h-12 placeholder-gray-400 bg-transparent border-0 border-b border-white/30 text-white font-light focus:border-white hover:border-white/60 transition-colors focus:outline-none focus-visible:ring-0 rounded-none text-base"
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="group w-full bg-white text-black px-8 py-4 font-medium uppercase text-xs tracking-widest hover:bg-white/90 transition-all duration-300"
                  >
                    Send Message
                    <ExternalLink className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>
              </motion.form>
              
              <motion.p 
                className="text-xs mt-4 text-gray-500 font-light"
                variants={itemVariants}
              >
                Your information is secure and will never be shared with third parties.
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom Bar - Stacked on mobile, row on desktop */}
          <motion.div 
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            variants={sectionVariants}
          >
            {/* Copyright */}
            <div className="flex flex-col gap-2 order-2 md:order-1">
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
                Crafted with precision and passion
              </motion.p>
            </div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-6 order-1 md:order-2"
              variants={sectionVariants}
            >
              <motion.span 
                className="text-xs font-bold uppercase tracking-widest text-white/40 hidden sm:block"
                variants={itemVariants}
                style={{ fontFamily: 'KH Teka, sans-serif' }}
              >
                Follow
              </motion.span>
              <div className="flex items-center gap-4">
                {[
                  { icon: Github, href: "https://github.com/yourusername", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-all duration-300 p-2"
                    aria-label={social.label}
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                    custom={index}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom spacer */}
      <div className="h-32 sm:h-40 lg:h-48"></div>
    </footer>
  );
};

export default Footer;