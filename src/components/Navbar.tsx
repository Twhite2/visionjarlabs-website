import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${scrolled ? 'bg-surface-950/80 backdrop-blur-xl border-white/10 shadow-2xl py-4' : 'bg-transparent border-transparent py-6'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a 
            href="#home"
            className="flex items-center gap-3 group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 p-[1px]">
              <div className="absolute inset-0 bg-surface-950 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-transparent">
                <span className="font-display font-bold text-lg text-white group-hover:text-surface-950 transition-colors">VL</span>
              </div>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight text-white">
              Visionjar <span className="text-primary-400 font-normal">Labs</span>
            </span>
          </motion.a>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-1 bg-surface-900/50 backdrop-blur-md p-1.5 rounded-full border border-white/5">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-surface-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/5"
                >
                  {item.name}
                </a>
              ))}
            </div>
            
            <motion.a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-white/10 border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-surface-300 hover:text-white hover:bg-surface-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 w-full bg-surface-950/95 backdrop-blur-xl border-b border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-surface-200 hover:text-white hover:bg-surface-800 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 pb-2 border-t border-white/10">
                <a 
                  href="#contact"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-medium text-white bg-primary-600 hover:bg-primary-500 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
