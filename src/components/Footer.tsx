"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useState, useRef, useLayoutEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeFormats, setActiveFormats] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
  }>({
    bold: false,
    italic: false,
    underline: false,
  });
  const messageRef = useRef<HTMLDivElement>(null);

  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const htmlContent = messageRef.current?.innerHTML || '';
    console.log("Form submission:", { email, name, message: htmlContent });
  };

  const applyFormat = (command: string, value?: string) => {
    try {
      // Ensure editor is focused
      if (messageRef.current) {
        messageRef.current.focus();
      }
      
      // Execute the command
      const success = document.execCommand(command, false, value);
      
      if (!success && (command === 'insertUnorderedList' || command === 'insertOrderedList')) {
        // Fallback: try alternative approach
        document.execCommand(command);
      }
    } catch (error) {
      console.error('Format command failed:', command, error);
    }
  };

  const handleMessageChange = () => {
    if (messageRef.current) {
      const textContent = messageRef.current.textContent?.trim() || '';
      setMessage(textContent);
      
      // If all text is removed, clear list formatting
      if (!textContent) {
        // Remove list formatting
        document.execCommand('insertUnorderedList', false);
        document.execCommand('insertOrderedList', false);
        // Clear the content to ensure clean state
        messageRef.current.innerHTML = '';
        setMessage('');
      }
      
      updateActiveFormats();
    }
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  const handleFormatClick = (command: string) => {
    // Store the current selection
    const selection = window.getSelection();
    
    // Ensure the editor is focused
    if (messageRef.current) {
      messageRef.current.focus();
    }
    
    // Apply the formatting
    applyFormat(command);
    
    // Update active formats
    setTimeout(() => {
      updateActiveFormats();
    }, 10);
  };

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Skip animation on mobile devices
    if (window.innerWidth < 768) return;

    const footer = footerRef.current;
    const content = contentRef.current;
    const background = backgroundRef.current;

    if (!footer || !content || !background) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(footer, { minHeight: "100vh" });
    gsap.set(content, { scale: 1.15, opacity: 0.4, y: 0, paddingTop: 0 });
    gsap.set(background, { opacity: 0.6 });

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
        className="relative z-10 w-full bg-gradient-to-b from-black/40 via-black/80 to-black/95 backdrop-blur-[2px]"
        initial={false}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-12">
          
          {/* Hero CTA Section + Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16 xl:mb-20">
            {/* Left: Heading and Button */}
            <div>
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

            {/* Right: Contact Form */}
            <motion.div 
              className="lg:pl-8" 
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
                className="space-y-3"
                variants={sectionVariants}
              >
                <div className="grid grid-cols-2 gap-3">
                  <motion.div variants={itemVariants}>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="px-0 h-10 placeholder-gray-400 bg-transparent border-0 border-b border-white/30 text-white font-light focus:border-white hover:border-white/60 transition-colors focus:outline-none focus-visible:ring-0 rounded-none text-base"
                      style={{ fontFamily: 'KH Teka, sans-serif' }}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="px-0 h-10 placeholder-gray-400 bg-transparent border-0 border-b border-white/30 text-white font-light focus:border-white hover:border-white/60 transition-colors focus:outline-none focus-visible:ring-0 rounded-none text-base"
                      style={{ fontFamily: 'KH Teka, sans-serif' }}
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <div className="relative border-0 border-b border-white/30 focus-within:border-white transition-colors">
                    {/* Formatting Toolbar - Inside, top right, only show if there's content */}
                    {message && (
                      <div className="absolute top-0 right-0 flex gap-2 z-10 pr-1">
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleFormatClick('bold')}
                          className={`py-2 px-1.5 transition-all duration-200 text-xs font-semibold ${
                            activeFormats.bold
                              ? 'text-white bg-white/10 rounded'
                              : 'text-white/60 hover:text-white'
                          }`}
                          title="Bold (Ctrl+B)"
                        >
                          B
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleFormatClick('italic')}
                          className={`py-2 px-1.5 transition-all duration-200 text-xs italic ${
                            activeFormats.italic
                              ? 'text-white bg-white/10 rounded'
                              : 'text-white/60 hover:text-white'
                          }`}
                          title="Italic (Ctrl+I)"
                        >
                          I
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleFormatClick('underline')}
                          className={`py-2 px-1.5 transition-all duration-200 text-xs underline ${
                            activeFormats.underline
                              ? 'text-white bg-white/10 rounded'
                              : 'text-white/60 hover:text-white'
                          }`}
                          title="Underline (Ctrl+U)"
                        >
                          U
                        </button>
                        <span className="w-px bg-white/20"></span>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleFormatClick('insertUnorderedList')}
                          className="py-2 px-1.5 hover:text-white transition-all duration-200 text-white/60 text-xs"
                          title="Bullet List"
                        >
                          •
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleFormatClick('insertOrderedList')}
                          className="py-2 px-1.5 hover:text-white transition-all duration-200 text-white/60 text-xs font-semibold"
                          title="Numbered List"
                        >
                          1.
                        </button>
                      </div>
                    )}
                    {/* Editor */}
                    <div
                      ref={messageRef}
                      contentEditable
                      onInput={handleMessageChange}
                      suppressContentEditableWarning
                      className="w-full px-0 py-2 bg-transparent text-white font-light focus:outline-none text-base min-h-[100px] max-h-[150px] overflow-y-auto whitespace-pre-wrap break-words [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1"
                      style={{
                        fontFamily: 'KH Teka, sans-serif',
                        paddingTop: message ? '32px' : '8px',
                        backgroundImage: message ? 'none' : `url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\"><text x=\"0\" y=\"14\" font-size=\"16\" fill=\"rgba(255,255,255,0.3)\" font-family=\"KH Teka, sans-serif\" font-weight=\"300\">Your Message</text></svg>')`,
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="group bg-white text-black px-6 py-2.5 font-medium uppercase text-xs tracking-widest hover:bg-white/90 transition-all duration-300 w-auto"
                  >
                    Send Message
                    <ExternalLink className="ml-2 w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
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

          {/* Main Content Grid - Navigation and Expertise */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 lg:mb-16">
            
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
      <div className="h-0"></div>
    </footer>
  );
};

export default Footer;