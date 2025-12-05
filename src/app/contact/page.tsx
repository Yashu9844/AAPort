'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: `Company: ${company}\nBudget: ${budget}\n\nMessage:\n${message}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage('✓ Message sent! I\'ll get back to you within 24 hours.');
        setName('');
        setEmail('');
        setCompany('');
        setBudget('');
        setMessage('');
      } else {
        setStatusMessage('✗ Failed to send. Please try email directly.');
        console.error('Error:', data.error);
      }
    } catch (error) {
      setStatusMessage('✗ An error occurred. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 md:pt-32 pb-16">
        
        {/* Grid Background */}
        <div 
          className="fixed inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column - Info */}
            <div className="lg:col-span-5 space-y-8 sm:space-y-12">
              
              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 sm:w-16 h-[1px] bg-white/30" />
                  <span className="text-[10px] sm:text-xs text-white/50 tracking-[0.3em] uppercase font-light">
                    Get In Touch
                  </span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-primary text-white font-normal leading-[0.95] tracking-[-0.02em] mb-6">
                  Let's Build
                  <br />
                  <span className="text-white/40">Together</span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-light leading-relaxed max-w-xl">
                  Have a project in mind? I'm available for freelance work and full-time opportunities. Let's create something exceptional.
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Email */}
                <div className="group">
                  <p className="text-xs text-white/40 mb-2 tracking-wider uppercase">Email</p>
                  <a 
                    href="mailto:yashavanth.siddesh@example.com"
                    className="text-white text-lg sm:text-xl font-light hover:text-white/70 transition-colors flex items-center gap-2"
                  >
                    yashavanth.siddesh@example.com
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                {/* Location */}
                <div>
                  <p className="text-xs text-white/40 mb-2 tracking-wider uppercase">Location</p>
                  <p className="text-white text-lg sm:text-xl font-light">Bengaluru, India</p>
                </div>

                {/* Availability */}
                <div>
                  <p className="text-xs text-white/40 mb-2 tracking-wider uppercase">Availability</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-white text-lg sm:text-xl font-light">Available for projects</p>
                  </div>
                </div>

                {/* Response Time */}
                <div>
                  <p className="text-xs text-white/40 mb-2 tracking-wider uppercase">Response Time</p>
                  <p className="text-white text-lg sm:text-xl font-light">Within 24 hours</p>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4"
              >
                <p className="text-xs text-white/40 tracking-wider uppercase">Connect</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/YashavanthR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yashavanth-r-siddesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://leetcode.com/u/yashavanth_r_siddesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:border-white/30 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <svg
                      className="w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M7 15l5-5" />
                      <path d="M12 10l5 5" />
                      <path d="M14 7h3v3" />
                      <circle cx="9" cy="12" r="5" strokeOpacity="0.6" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative"
              >
                {/* Form Container */}
                <div className="bg-white/[0.02] backdrop-blur-sm border border-white/10 p-8 sm:p-10 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="text-xs text-white/40 mb-3 block tracking-wider uppercase">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-transparent border-b border-white/20 text-white text-lg font-light py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                          placeholder="John Doe"
                        />
                        <div 
                          className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${
                            focusedField === 'name' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <label className="text-xs text-white/40 mb-3 block tracking-wider uppercase">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full bg-transparent border-b border-white/20 text-white text-lg font-light py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                          placeholder="john@example.com"
                        />
                        <div 
                          className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${
                            focusedField === 'email' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Company & Budget Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="relative">
                        <label className="text-xs text-white/40 mb-3 block tracking-wider uppercase">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          onFocus={() => setFocusedField('company')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-b border-white/20 text-white text-lg font-light py-3 focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
                          placeholder="Your Company"
                        />
                        <div 
                          className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${
                            focusedField === 'company' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>

                      <div className="relative">
                        <label className="text-xs text-white/40 mb-3 block tracking-wider uppercase">
                          Project Budget
                        </label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          onFocus={() => setFocusedField('budget')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-transparent border-b border-white/20 text-white text-lg font-light py-3 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-black">Select budget</option>
                          <option value="<5k" className="bg-black">&lt; $5,000</option>
                          <option value="5k-10k" className="bg-black">$5,000 - $10,000</option>
                          <option value="10k-25k" className="bg-black">$10,000 - $25,000</option>
                          <option value="25k+" className="bg-black">$25,000+</option>
                        </select>
                        <div 
                          className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${
                            focusedField === 'budget' ? 'w-full' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="relative">
                      <label className="text-xs text-white/40 mb-3 block tracking-wider uppercase">
                        Project Details *
                      </label>
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={6}
                        className="w-full bg-transparent border-b border-white/20 text-white text-lg font-light py-3 focus:outline-none focus:border-white transition-colors resize-none placeholder:text-white/30"
                        placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                      />
                      <div 
                        className={`absolute bottom-0 left-0 h-[1px] bg-white transition-all duration-300 ${
                          focusedField === 'message' ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>

                    {/* Status Message */}
                    {statusMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-sm font-light ${
                          statusMessage.startsWith('✓') ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {statusMessage}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full sm:w-auto bg-white text-black px-10 py-5 text-sm font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-white/10 pointer-events-none" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-white/10 pointer-events-none" />
              </motion.div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-white/10"
          >
            <div className="text-center space-y-6">
              <p className="text-white/40 text-sm font-light tracking-wide">
                Prefer a different method?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <a
                  href="mailto:yashavanth.siddesh@example.com"
                  className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-light">Direct Email</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="hidden sm:block w-[1px] h-4 bg-white/20" />
                <a
                  href="https://www.linkedin.com/in/yashavanth-r-siddesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-light">LinkedIn Message</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
