'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-white font-primary text-xl font-bold tracking-wide">
            PORTFOLIO
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white/80 hover:text-white font-light transition-colors">
              Home
            </a>
            <a href="#projects" className="text-white/80 hover:text-white font-light transition-colors">
              Projects
            </a>
            <a href="#about" className="text-white/80 hover:text-white font-light transition-colors">
              About
            </a>
            <a href="#contact" className="text-white/80 hover:text-white font-light transition-colors">
              Contact
            </a>
          </div>

          {/* Download Resume Button */}
          <div className="hidden md:block">
            <button className="bg-white/10 hover:bg-white/20 text-white font-light px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300">
              Download Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white p-2"
            >
              <div className="flex flex-col space-y-1">
                <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-black/30 backdrop-blur-sm`}>
        <div className="px-6 py-4 space-y-4">
          <a href="#home" className="block text-white/80 hover:text-white font-light transition-colors">
            Home
          </a>
          <a href="#projects" className="block text-white/80 hover:text-white font-light transition-colors">
            Projects
          </a>
          <a href="#about" className="block text-white/80 hover:text-white font-light transition-colors">
            About
          </a>
          <a href="#contact" className="block text-white/80 hover:text-white font-light transition-colors">
            Contact
          </a>
          <button className="w-full bg-white/10 hover:bg-white/20 text-white font-light px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-300 mt-4">
            Download Resume
          </button>
        </div>
      </div>
    </nav>
  );
}