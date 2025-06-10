import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <motion.div 
              className="flex items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="/images/20241028_084914.png" 
                alt="VisionLabs Logo" 
                className="h-10 w-auto mr-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/40?text=VL";
                }}
              />
              <span className="text-xl font-bold">VisionLabs</span>
            </motion.div>
            <motion.p 
              className="text-gray-400 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Innovative tech solutions for websites, technical challenges, and investment platforms.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-facebook text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <i className="fab fa-github text-lg"></i>
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-primary-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors">Services</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-primary-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors">Website Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors">Web Solutions</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors">Technical Solutions</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary-400 transition-colors">Investment Platforms</a></li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-primary-400"></i>
                <span className="text-gray-400">Opolo housing estate, Bayelsa state, Nigeria</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-primary-400"></i>
                <span className="text-gray-400">visionjarlabs@gmail.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-3 text-primary-400"></i>
                <span className="text-gray-400">+2347050322778</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} VisionLabs. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
