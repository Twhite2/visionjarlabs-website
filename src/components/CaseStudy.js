import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const CaseStudy = ({ 
  title, 
  description, 
  image, 
  technologies = [], 
  stats = [],
  reversed = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.4, 1, 1, 0.8]);
  
  const techVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
      }
    })
  };
  
  const statVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    })
  };

  return (
    <motion.div 
      ref={ref}
      className="relative my-20 md:my-40 py-12 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background accent */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div 
          className={`absolute w-[80%] h-[70%] ${reversed ? 'right-0' : 'left-0'} top-0 bg-gradient-to-r ${reversed ? 'from-secondary-900/5 to-secondary-800/15' : 'from-primary-900/15 to-primary-800/5'} rounded-3xl blur-3xl`}
          style={{ 
            opacity: isInView ? 0.6 : 0,
            scale: isInView ? 1 : 0.8,
            transition: "all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
          }}
        />
      </div>
      
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}>
          {/* Image with parallax effect */}
          <motion.div 
            className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
            style={{ y: imageY }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden aspect-[5/3]"
              initial={{ scale: 1.1, filter: "blur(10px)" }}
              animate={isInView ? { 
                scale: 1, 
                filter: "blur(0px)" 
              } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </motion.div>
          </motion.div>
          
          {/* Content with parallax effect */}
          <motion.div 
            className="w-full md:w-1/2"
            style={{ 
              y: contentY,
              opacity: contentOpacity
            }}
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-bold mb-6 text-white"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              {description}
            </motion.p>
            
            {/* Tech stack */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    custom={index}
                    variants={techVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm text-gray-300 border border-gray-700/50"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* Key stats */}
            {stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    custom={index}
                    variants={statVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30"
                  >
                    <p className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudy;
