"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, Linkedin, Instagram } from "lucide-react";
import { useState } from "react";
import carImage from "../../public/zoox-car.jpg";
import Img from "next/image";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email, name });
  };

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
    <footer className="relative bg-black text-gray-200 overflow-hidden">
      {/* Background media with dark overlay */}
      <div className="absolute inset-0 w-full h-full">
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
        <div className="absolute top-0 left-0 w-full h-full bg-black/55"></div>
      </div>

      {/* Footer Content - Overlaying the background */}
      <motion.div
        className="relative z-10 mx-4 md:mx-10 lg:mx-16 xl:mx-24 rounded-3xl bg-gradient-to-b from-black/40 via-black/80 to-black/95 backdrop-blur-[3px] border border-white/15 shadow-[0_0_25px_rgba(255,255,255,0.05)] py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="max-w-8xl mx-auto px-6 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Site Map */}
            <motion.div variants={sectionVariants}>
              <motion.div variants={headingVariants}>
                <h3 className="text-sm font-semibold mb-6 tracking-wide uppercase text-white">
                  Site Map
                </h3>
              </motion.div>
              <nav className="space-y-3">
                <motion.a
                  href="#"
                  className="flex items-center text-base text-gray-200 hover:text-white transition-colors"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  How To Ride
                  <span className="ml-2">›</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="flex items-center text-base text-gray-200 hover:text-white transition-colors"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Where to Ride
                  <span className="ml-2">›</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="flex items-center text-base text-gray-200 hover:text-white transition-colors"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Know Your Ride
                  <span className="ml-2">›</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="flex items-center text-base text-gray-200 hover:text-white transition-colors"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Support
                  <span className="ml-2">›</span>
                </motion.a>
              </nav>
            </motion.div>

            {/* Where to Ride */}
            <motion.div variants={sectionVariants}>
              <motion.div variants={headingVariants}>
                <h3 className="text-sm font-semibold mb-6 tracking-wide uppercase text-white">
                  Where to Ride
                </h3>
              </motion.div>
              <nav className="space-y-3">
                <motion.a
                  href="#"
                  className="flex items-center text-base text-gray-200 hover:text-white transition-colors"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Las Vegas
                  <span className="ml-2">›</span>
                </motion.a>
                <motion.a
                  href="#"
                  className="flex items-center text-base text-gray-200 hover:text-white transition-colors"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  San Francisco
                  <span className="ml-2">›</span>
                </motion.a>
                <motion.p 
                  className="text-base text-gray-400"
                  variants={itemVariants}
                >
                  Austin (Coming Soon)
                </motion.p>
                <motion.p 
                  className="text-base text-gray-400"
                  variants={itemVariants}
                >
                  Miami (Coming Soon)
                </motion.p>
              </nav>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div 
              className="lg:col-span-2" 
              variants={sectionVariants}
            >
              <motion.div variants={headingVariants}>
                <h3 className="text-sm font-semibold mb-6 tracking-wide uppercase text-white">
                  Get Up to Speed
                </h3>
              </motion.div>
              <motion.p 
                className="text-sm mb-4 max-w-md text-gray-300"
                variants={itemVariants}
              >
                Sign up for our newsletter to see where we're headed next.
              </motion.p>
              <motion.form 
                onSubmit={handleNewsletterSubmit} 
                className="space-y-3"
                variants={sectionVariants}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.div variants={formItemVariants}>
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="rounded-full px-6 h-12 placeholder-[#9ca3af] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-white focus:border-white hover:border-white/70 transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <Input
                      type="text"
                      placeholder="Zip Code *"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                      className="rounded-full px-6 h-12 placeholder-[#9ca3af] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-white focus:border-white hover:border-white/70 transition-colors focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </motion.div>
                </div>
                <motion.div variants={formItemVariants}>
                  <Button
                    type="submit"
                    className="w-full sm:w-auto rounded-full px-8 h-12 font-medium uppercase text-sm tracking-wide bg-white text-black hover:bg-gray-200 transition-colors"
                  >
                    Join the Newsletter
                    <span className="ml-2">›</span>
                  </Button>
                </motion.div>
              </motion.form>
              <motion.p 
                className="text-xs mt-4 text-gray-400 max-w-md"
                variants={itemVariants}
              >
                By submitting, you give Zoox permission to store and process your
                personal information so we can provide you with the content you've
                requested. For more information, please see our{" "}
                <a href="#" className="underline hover:text-white transition-colors">
                  privacy policy
                </a>
                .
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" 
            variants={sectionVariants}
          >
            {/* Legal Links */}
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <motion.a 
                href="#" 
                className="uppercase tracking-wide text-gray-200 hover:text-white transition-colors" 
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Privacy Policy
                <span className="ml-2">›</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="uppercase tracking-wide text-gray-200 hover:text-white transition-colors" 
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Supply Chain Standards
                <span className="ml-2">›</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="uppercase tracking-wide text-gray-200 hover:text-white transition-colors" 
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Terms of Use
                <span className="ml-2">›</span>
              </motion.a>
              <motion.a 
                href="#" 
                className="uppercase tracking-wide text-gray-200 hover:text-white transition-colors" 
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Manage Cookies
                <span className="ml-2">›</span>
              </motion.a>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4 text-white">
              <motion.span 
                className="text-sm font-semibold uppercase tracking-wide"
                variants={itemVariants}
              >
                Socials
              </motion.span>
              <motion.a
                href="#"
                className="hover:opacity-70 transition-opacity"
                aria-label="YouTube"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:opacity-70 transition-opacity"
                aria-label="Instagram"
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="hover:opacity-70 transition-opacity"
                aria-label="X (Twitter)"
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