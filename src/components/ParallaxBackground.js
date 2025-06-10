import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Create transformations based on scroll position
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);
  
  // For parallax shapes
  const shape1Y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const shape3X = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-900/20 dark:from-transparent dark:to-primary-900/40"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      />
      
      {/* Parallax decorative shapes */}
      <motion.div 
        className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-primary-500/10 to-primary-600/5 blur-3xl"
        style={{ y: shape1Y }}
      />
      
      <motion.div 
        className="absolute bottom-[30%] left-[5%] w-96 h-96 rounded-full bg-gradient-to-tr from-secondary-500/10 to-secondary-600/5 blur-3xl"
        style={{ y: shape2Y }}
      />
      
      <motion.div 
        className="absolute top-[60%] right-[20%] w-52 h-52 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-600/5 blur-3xl"
        style={{ x: shape3X }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
