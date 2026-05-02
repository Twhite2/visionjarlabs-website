import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Verby Flow',
      description: 'A live call translation app enabling real-time language translation during calls. When a call comes in from China, the recipient hears it in their native language, revolutionizing global business communication.',
      image: '/images/verbyflow.png',
      technologies: ['React Native', 'Node.js', 'WebRTC', 'AI Translation APIs'],
      category: 'Mobile App',
      tag: 'Featured'
    },
    {
      id: 2,
      title: 'Trading Bot (Jarvis)',
      description: 'An automated trading bot that manages trades with take-profit (TP), stop-loss (SL), and risk management features. Helps users automate their trading strategies with sophisticated risk controls.',
      image: '/images/tradingbot.png',
      technologies: ['Python', 'TensorFlow', 'Trading APIs', 'Cloud Infrastructure'],
      category: 'FinTech',
      tag: 'Latest'
    },
    {
      id: 3,
      title: 'Oil and Gas Project',
      description: 'Providing technical input and implementation for an oil and gas initiative. Our expertise in complex technical solutions helped optimize operations and improve efficiency.',
      image: '/images/oilandgas.png',
      technologies: ['IoT Sensors', 'Big Data Analytics', 'Cloud Computing', 'Dashboard Reporting'],
      category: 'Enterprise Solution',
      tag: 'Showcase'
    }
  ];

  return (
    <section id="projects" className="py-32 relative bg-transparent overflow-hidden border-t border-white/5">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-primary-400 font-semibold tracking-widest uppercase text-sm mb-4 px-4 py-1 border border-primary-500/20 rounded-full glass-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Our <span className="text-gradient">Showcase Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-400 text-lg font-light">
            Explore our innovative solutions that demonstrate our technical expertise and creative problem-solving capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="glass-panel rounded-3xl overflow-hidden group hover:border-primary-500/30 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveProject(project)}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent z-10" />
                
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://via.placeholder.com/600x400/1e293b/38bdf8?text=${encodeURIComponent(project.title)}`;
                  }}
                />

                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs font-medium text-white">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-primary-500/20 backdrop-blur-md border border-primary-500/20 rounded-full text-xs font-medium text-primary-300">
                    {project.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-8 relative z-20 -mt-12">
                <h3 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-surface-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-2.5 py-1 bg-surface-900 border border-white/5 rounded-md text-xs text-surface-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2.5 py-1 bg-surface-900 border border-white/5 rounded-md text-xs text-surface-300">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-sm font-semibold text-white group-hover:text-primary-400 transition-colors">
                  Explore Project
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            className="fixed inset-0 bg-surface-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-950 to-transparent z-10" />
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://via.placeholder.com/800x400/1e293b/38bdf8?text=${encodeURIComponent(activeProject.title)}`;
                  }}
                />
                
                <button 
                  className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  onClick={() => setActiveProject(null)}
                >
                  <X size={20} />
                </button>

                <div className="absolute bottom-6 left-6 z-20">
                  <span className="inline-block px-3 py-1 bg-primary-500/20 border border-primary-500/20 rounded-full text-xs font-medium text-primary-300 mb-3">
                    {activeProject.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                    {activeProject.title}
                  </h2>
                </div>
              </div>
              
              <div className="p-6 sm:p-10">
                <div className="grid md:grid-cols-3 gap-10">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-display font-semibold text-white mb-4">Project Overview</h3>
                    <p className="text-surface-300 leading-relaxed font-light mb-8">
                      {activeProject.description}
                    </p>
                    
                    <h3 className="text-lg font-display font-semibold text-white mb-4">Core Technologies</h3>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {activeProject.technologies.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-surface-900 border border-white/5 rounded-lg text-sm text-surface-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <div className="glass-panel p-6 rounded-2xl bg-surface-900/30">
                      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Quick Facts</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-surface-400 mb-1">Status</p>
                          <p className="text-sm font-medium text-white">Deployed & Active</p>
                        </div>
                        <div>
                          <p className="text-xs text-surface-400 mb-1">Project Type</p>
                          <p className="text-sm font-medium text-white">{activeProject.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-surface-400 mb-1">Client Focus</p>
                          <p className="text-sm font-medium text-white">Global Enterprise</p>
                        </div>
                      </div>
                      
                      <button className="w-full mt-8 py-3 bg-white text-surface-950 font-semibold rounded-xl flex items-center justify-center hover:bg-surface-200 transition-colors">
                        Visit Project
                        <ExternalLink size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
