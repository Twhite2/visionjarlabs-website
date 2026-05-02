import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-primary-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-1/3 -right-1/4 w-[40rem] h-[40rem] bg-secondary-500/20 rounded-full blur-[120px] mix-blend-screen animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-1/4 left-1/3 w-[60rem] h-[60rem] bg-surface-900/50 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary-500/30"
          >
            <Sparkles size={16} className="text-primary-400" />
            <span className="text-sm font-medium text-surface-200">Welcome to the future of enterprise</span>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Build Next-Generation <br />
            <span className="text-gradient">Digital Experiences</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-2xl text-surface-400 max-w-3xl mb-12 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Visionjar Labs delivers enterprise-grade software, AI integrations, and high-performance technical infrastructure to scale your business into the future.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a 
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-surface-950 font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
            >
              Start Your Project
              <ArrowRight size={20} />
            </a>
            <a 
              href="#services"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel text-white font-semibold flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
            >
              Explore Services
            </a>
          </motion.div>
          
          {/* Stats / Features Strip */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { icon: Globe, title: "Global Scale", desc: "Built for worldwide reach" },
              { icon: Zap, title: "High Performance", desc: "Optimized for speed" },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-grade protection" }
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left gap-4 hover:border-primary-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-white mb-1">{feature.title}</h3>
                  <p className="text-surface-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
