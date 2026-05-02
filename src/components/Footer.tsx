import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-surface-950/40 backdrop-blur-md text-white pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <motion.div 
              className="flex items-center mb-6 gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 p-[1px]">
                <div className="w-full h-full bg-surface-950 rounded-lg flex items-center justify-center">
                  <span className="font-display font-bold text-xs text-white">VL</span>
                </div>
              </div>
              <span className="text-xl font-display font-bold tracking-tight">Visionjar Labs</span>
            </motion.div>
            <motion.p 
              className="text-surface-400 mb-6 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Building next-generation digital experiences, technical infrastructure, and investment platforms for modern enterprises.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-display font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-surface-400 hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-surface-400 hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-surface-400 hover:text-primary-400 transition-colors">Services</a></li>
              <li><a href="#projects" className="text-surface-400 hover:text-primary-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-surface-400 hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-display font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-surface-400 hover:text-primary-400 transition-colors">Enterprise Software</a></li>
              <li><a href="#services" className="text-surface-400 hover:text-primary-400 transition-colors">Cloud Architecture</a></li>
              <li><a href="#services" className="text-surface-400 hover:text-primary-400 transition-colors">AI Integration</a></li>
              <li><a href="#services" className="text-surface-400 hover:text-primary-400 transition-colors">FinTech Solutions</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-display font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-surface-400">visionjarlabs@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-surface-400">+2347050322778</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-surface-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Visionjar Labs. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
