import React, { useState } from 'react';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const { scrollYProgress } = useViewportScroll();
  const opacitySection = useTransform(scrollYProgress, [0.4, 0.5], [0.4, 1]);
  const scaleSection = useTransform(scrollYProgress, [0.4, 0.5], [0.95, 1]);

  const projects = [
    {
      id: 1,
      title: 'Verby Flow',
      description: 'A live call translation app enabling real-time language translation during calls. When a call comes in from China, the recipient hears it in their native language, revolutionizing global business communication.',
      image: '/images/verbyflow.png',
      technologies: ['React Native', 'Node.js', 'WebRTC', 'AI Translation APIs']
    },
    {
      id: 2,
      title: 'Trading Bot(Jarvis)',
      description: 'An automated trading bot that manages trades with take-profit (TP), stop-loss (SL), and risk management features. Helps users automate their trading strategies with sophisticated risk controls.',
      image: '/images/tradingbot.png',
      technologies: ['Python', 'TensorFlow', 'Trading APIs', 'Cloud Infrastructure']
    },
    {
      id: 3,
      title: 'Oil and Gas Project',
      description: 'Providing technical input and implementation for an oil and gas initiative. Our expertise in complex technical solutions helped optimize operations and improve efficiency.',
      image: '/images/oilandgas.png',
      technologies: ['IoT Sensors', 'Big Data Analytics', 'Cloud Computing', 'Dashboard Reporting']
    }
  ];

  return (
    <section id="projects" className="py-32 relative bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-96 h-96 rounded-full bg-primary-50 blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary-50 blur-3xl opacity-30" />
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-primary-400 rounded-full opacity-30" />
      <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-secondary-400 rounded-full opacity-20" />
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          style={{ opacity: opacitySection, scale: scaleSection }}
        >
          <motion.span 
            className="inline-block text-primary-600 font-semibold tracking-widest uppercase text-sm mb-2 px-6 py-1 border border-primary-200 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary-900 mb-6 leading-tight">
            Our <span className="relative">Showcase
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-50"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg mt-6">
            Explore our innovative solutions that showcase our technical expertise and creative problem-solving capabilities.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.3 }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100 group relative transform transition-all duration-300"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 50, delay: index * 0.15 }}
              whileHover={{ 
                y: -15, 
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)',
                borderColor: 'rgba(99, 102, 241, 0.2)'
              }}
            >
              {/* Project number indicator */}
              <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center font-bold text-primary-600">
                {String(project.id).padStart(2, '0')}
              </div>
              
              <div className="relative overflow-hidden h-60">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/30 opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-500"
                />
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 1.2, opacity: 0.3 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <motion.div 
                  className="absolute bottom-0 left-0 p-6 z-20 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {/* Small indicator tag */}
                  <div className="flex mb-2">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                      {index === 0 ? "Featured" : index === 1 ? "Latest" : "Showcase"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary-100 transition-colors duration-300">{project.title}</h3>
                  <div className="w-10 h-1 bg-primary-500 rounded-full group-hover:w-20 transition-all duration-300 ease-in-out"></div>
                </motion.div>
              </div>
              
              <div className="p-6 relative">
                <p className="text-gray-600 mb-5 text-sm line-clamp-3 leading-relaxed">{project.description}</p>
                
                {/* Tech stack */}
                <div className="mb-6">
                  <span className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Technologies</span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors duration-300 cursor-default"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
                
                {/* Action button */}
                <motion.button
                  className="w-full py-3 mt-2 rounded-lg border border-primary-200 text-primary-600 font-medium group flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                  onClick={() => setActiveProject(project)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore Project</span>
                  <motion.span 
                    className="ml-2 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* View all projects button */}
      <div className="flex justify-center mt-16">
        <motion.a
          href="#contact"
          className="inline-flex items-center px-6 py-3 border-2 border-primary-500 rounded-full text-primary-600 font-medium transition-all duration-300 group"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
          whileTap={{ scale: 0.98 }}
        >
          <span>View All Projects</span>
          <span className="relative ml-2 w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </motion.a>
      </div>
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-80 object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <motion.h2 
                    className="text-3xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {activeProject.title}
                  </motion.h2>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    {activeProject.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>
                <motion.button 
                  className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm text-white rounded-full p-2 hover:bg-primary-600 transition-colors duration-300"
                  onClick={() => setActiveProject(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </motion.button>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="text-sm uppercase tracking-wider text-primary-600 font-semibold mb-1">Project Overview</h4>
                      <p className="text-gray-600 leading-relaxed">{activeProject.description}</p>
                      
                      <div className="mt-8">
                        <h4 className="text-sm uppercase tracking-wider text-primary-600 font-semibold mb-3">Key Features</h4>
                        <div className="space-y-3">
                          {[
                            { title: "Innovative Technology", desc: "Cutting-edge implementation of advanced technologies" },
                            { title: "User Experience", desc: "Intuitive, smooth, and engaging design focused on users" },
                            { title: "Robust Architecture", desc: "Secure, scalable, and maintainable codebase" },
                            { title: "Optimized Performance", desc: "Lightning fast, responsive application with minimal load times" }
                          ].map((feature, idx) => (
                            <motion.div 
                              key={idx} 
                              className="flex items-start"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + (idx * 0.1) }}
                            >
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mt-1">
                                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div className="ml-4">
                                <h5 className="text-sm font-semibold text-gray-900">{feature.title}</h5>
                                <p className="text-sm text-gray-500">{feature.desc}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="md:col-span-1">
                    <motion.div
                      className="bg-gray-50 p-6 rounded-xl border border-gray-100"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="text-sm uppercase tracking-wider text-primary-600 font-semibold mb-4">Project Details</h4>
                      
                      {[
                        { label: "Client", value: "Enterprise Client" },
                        { label: "Timeline", value: "3 months" },
                        { label: "Project Type", value: activeProject.type || "Enterprise Solution" },
                        { label: "Status", value: "Completed" }
                      ].map((detail, idx) => (
                        <div key={idx} className="mb-4">
                          <span className="text-xs text-gray-500 block">{detail.label}</span>
                          <span className="font-medium text-gray-800">{detail.value}</span>
                        </div>
                      ))}
                      
                      <div className="mt-8">
                        <h4 className="text-sm uppercase tracking-wider text-primary-600 font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.technologies.map((tech, index) => (
                            <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-lg">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-100 flex justify-between items-center">
                  <motion.button
                    className="text-gray-500 hover:text-gray-700 flex items-center text-sm font-medium"
                    onClick={() => setActiveProject(null)}
                    whileHover={{ x: -3 }}
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Projects
                  </motion.button>
                  
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-full shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 30px -5px rgba(59, 130, 246, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center">
                      Request Similar Solution
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </motion.button>
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
