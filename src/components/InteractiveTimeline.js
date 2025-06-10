import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const InteractiveTimeline = ({ events, title = "Our Journey", subtitle = "" }) => {
  const [activeEvent, setActiveEvent] = useState(null);
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={timelineRef}
      className="py-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Timeline header */}
      <div className="text-center mb-16">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Timeline track */}
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500/30 via-secondary-500/30 to-primary-500/30 rounded-full"></div>
        
        {/* Timeline events */}
        <div className="relative">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isActive = activeEvent === index;
            
            return (
              <div 
                key={index} 
                className={`flex items-center mb-24 ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* Content block */}
                <motion.div
                  className={`relative max-w-lg w-full md:w-[calc(50%-40px)] z-10 ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <motion.div 
                    className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6 rounded-xl backdrop-blur-sm border ${
                      isActive 
                        ? 'border-primary-500/50 shadow-lg shadow-primary-500/20' 
                        : 'border-gray-700/20'
                    } transition-all duration-500`}
                    whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(43, 108, 176, 0.15)" }}
                    onClick={() => setActiveEvent(isActive ? null : index)}
                  >
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-800/50 text-primary-300">
                        {event.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-4">
                      {event.description}
                    </p>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {event.details && (
                            <div className="mt-4 pt-4 border-t border-gray-700/30">
                              <p className="text-gray-300 text-sm">{event.details}</p>
                              
                              {event.achievements && event.achievements.length > 0 && (
                                <ul className="mt-3 space-y-1">
                                  {event.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                      <span className="text-primary-400 mt-1">•</span>
                                      <span className="text-gray-300">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                              
                              {event.image && (
                                <img 
                                  src={event.image} 
                                  alt={event.title}
                                  className="mt-4 rounded-lg w-full object-cover h-40 opacity-90"
                                />
                              )}
                            </div>
                          )}
                          
                          <div className="mt-4 flex justify-end">
                            <motion.button
                              className="text-xs text-primary-400 flex items-center gap-1"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <span>Close</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Connection line to center */}
                  <div 
                    className={`hidden md:block absolute h-1 w-[40px] bg-gradient-to-r ${
                      isLeft ? 'from-transparent to-primary-500/70 right-0 translate-x-full' : 'from-primary-500/70 to-transparent left-0 -translate-x-full'
                    } top-10`}
                  ></div>
                </motion.div>

                {/* Center node */}
                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary-500 border-2 border-white/20 z-20 ${
                    isActive ? 'shadow-lg shadow-primary-500/50 scale-[1.3]' : ''
                  } transition-all duration-300`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: isActive ? 1.3 : 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * index + 0.3 }}
                  style={{ top: `calc(${index * 24}rem + 2.5rem)` }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTimeline;
