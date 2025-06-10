import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const { scrollYProgress } = useViewportScroll();
  
  // Stats data for achievements section
  const stats = [
    { number: "200+", label: "Projects Completed", icon: "🚀" },
    { number: "95%", label: "Client Satisfaction", icon: "⭐" },
    { number: "40+", label: "Expert Team Members", icon: "👥" }
  ];
  
  // Enhanced scroll-based animations
  const scaleAnim = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1.05]);
  const opacityAnim = useTransform(scrollYProgress, [0.1, 0.3], [0.3, 1]);
  const yAnim = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const blurAnim = useTransform(scrollYProgress, [0.1, 0.25], [5, 0]);
  
  // Animated background positions
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate normalized mouse position
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Update motion values with slight delay for smooth movement
    bgX.set(x * 20); // Multiplier controls movement intensity
    bgY.set(y * 20);
  };
  
  return (
    <section 
      id="about" 
      className="py-32 relative overflow-hidden bg-gradient-to-b from-gray-900 to-secondary-900"
      onMouseMove={handleMouseMove}
    >
      {/* Premium animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-full h-full bg-grid-pattern opacity-10"></div>
      </div>
      
      {/* Decorative blurred gradient circles */}
      <motion.div 
        className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500/20 to-primary-700/10 blur-[80px] opacity-60"
        style={{ x: useTransform(bgX, v => v * -1), y: useTransform(bgY, v => v * -1) }}
        animate={{ scale: 1.1, opacity: 0.6 }}
        initial={{ scale: 1, opacity: 0.4 }}
        transition={{ 
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 10,
          ease: 'easeInOut',
          type: 'tween'
        }}
      />
      
      <motion.div 
        className="absolute bottom-40 left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-secondary-500/20 to-blue-500/10 blur-[60px] opacity-40"
        style={{ x: useTransform(bgX, v => v * 0.5), y: useTransform(bgY, v => v * 0.5) }}
        animate={{ scale: 0.9, opacity: 0.5 }}
        initial={{ scale: 1, opacity: 0.3 }}
        transition={{ 
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 8,
          ease: 'easeInOut',
          delay: 1,
          type: 'tween'
        }}
      />
      
      <motion.div 
        className="absolute top-[30%] left-[25%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-yellow-500/10 to-secondary-500/20 blur-[50px] opacity-30"
        style={{ x: useTransform(bgX, v => v * 1.2), y: useTransform(bgY, v => v * 1.2) }}
        animate={{ scale: 1.2, opacity: 0.4 }}
        initial={{ scale: 1, opacity: 0.2 }}
        transition={{ 
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 12,
          ease: 'easeInOut',
          delay: 2,
          type: 'tween'
        }}
      />

      {/* Small decorative particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${i % 2 === 0 ? 'from-primary-400 to-primary-500' : 'from-secondary-400 to-secondary-500'}`}
          style={{
            left: `${20 + i * 10}%`,
            top: `${10 + (i % 4) * 20}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 15 }}
          style={{ y: yAnim, filter: `blur(${blurAnim}px)` }}
        >
          {/* Premium animated subtitle with sparkle effect */}
          <motion.div 
            className="relative inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="relative z-10">
              <motion.span 
                className="inline-block bg-gradient-to-r from-primary-400 to-secondary-400 text-transparent bg-clip-text font-semibold tracking-widest uppercase text-sm px-6 py-2"
                animate={{ opacity: 1 }}
                initial={{ opacity: 0.8 }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 3,
                  ease: 'easeInOut',
                  type: 'tween'
                }}
              >
                WHO WE ARE
              </motion.span>
            </div>
            {/* Animated sparkle decorative elements */}
            <motion.div 
              className="absolute -top-1 -left-2 w-4 h-4 bg-primary-400 rounded-full opacity-60"
              animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.div 
              className="absolute -bottom-1 -right-2 w-3 h-3 bg-secondary-400 rounded-full opacity-60"
              animate={{ scale: [0, 1, 0], opacity: [0, 0.8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 2, delay: 1 }}
            />
          </motion.div>

          {/* Premium animated title with enhanced typography and glow */}
          <div className="relative">
            <motion.h2 
              className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              About <span className="inline-block relative">
                <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-300 drop-shadow-sm">
                  Vision<span className="text-white">Labs</span>
                </span>
                <motion.span 
                  className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-30 blur-md rounded-lg"
                  animate={{ opacity: 0.4 }}
                  initial={{ opacity: 0.2 }}
                  transition={{ 
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 3,
                    ease: 'easeInOut',
                    type: 'tween'
                  }}
                />
              </span>
            </motion.h2>
            {/* Animated underline with gradient and glow */}
            <motion.div 
              className="w-24 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-400 mx-auto mb-8 rounded-full shadow-lg relative overflow-hidden"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 150, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6, type: "spring" }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-50"
                animate={{ x: [-150, 150] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Enhanced description text */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Innovative technology solutions crafted to <span className="text-primary-300 font-normal">elevate</span> your business to new heights
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16 mt-8">
          {/* Enhanced image section with 3D-like effects */}
          <motion.div 
            className="lg:w-1/2 mb-16 lg:mb-0 px-4"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 20 }}
            style={{ scale: scaleAnim, opacity: opacityAnim }}
          >
            <div className="relative mx-auto max-w-lg">
              {/* Floating decorative elements */}
              <motion.div 
                className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-br from-primary-600/80 to-primary-400/80 rounded-2xl z-10 backdrop-blur-sm shadow-lg border border-white/20"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                animate={{ y: -15, rotate: 5 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ 
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 4,
                  ease: 'easeInOut',
                  type: 'tween',
                  whileHover: {
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.3 }
                  },
                  delay: 0.4,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
              </motion.div>
              
              {/* Animated border frame */}
              <motion.div 
                className="absolute -inset-4 border-2 border-primary-400/50 rounded-2xl z-0"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ borderColor: "rgba(99, 102, 241, 0.8)" }}
              >
                {/* Animated corner accents */}
                <motion.div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-lg" 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-secondary-500 rounded-br-lg" 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
              
              {/* Main image with premium effects */}
              <div className="relative z-10 overflow-hidden rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="relative"
                >
                  <img 
                    src="/images/20241025_163228.jpg" 
                    alt="About VisionLabs" 
                    className="w-full rounded-2xl transition-all duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/600x400?text=About+VisionLabs";
                    }}
                  />
                  
                  {/* Layered image overlays for depth */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-secondary-900/20 to-transparent opacity-60 mix-blend-overlay group-hover:opacity-40 transition-opacity duration-700"
                    whileHover={{ opacity: 0.3 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700 mix-blend-overlay"
                  />
                  
                  {/* Image caption overlay that appears on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-secondary-900/90 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                    initial={{ y: 100 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <motion.p 
                      className="text-white/90 font-medium text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      Our headquarters in Silicon Valley
                    </motion.p>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Floating accent shapes */}
              <motion.div 
                className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-secondary-500/80 to-secondary-400/80 rounded-full z-10 shadow-lg overflow-hidden backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ y: -12, scale: 1.05, opacity: 1 }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.6 },
                  y: { repeat: Infinity, repeatType: 'reverse', duration: 2.5, ease: "easeInOut" },
                  scale: { repeat: Infinity, repeatType: 'reverse', duration: 2.5, ease: "easeInOut" }
                }}
              >
                <motion.div 
                  className="w-full h-full bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced content section with tabs */}
          <motion.div 
            className="lg:w-1/2 text-white"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring", stiffness: 40, damping: 20 }}
          >
            {/* Interactive tab navigation */}
            <motion.div 
              className="flex mb-10 border-b border-gray-700/30 pb-2 overflow-x-auto scrollbar-hide"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {['mission', 'approach', 'values'].map((tab) => (
                <motion.button
                  key={tab}
                  className={`px-6 py-3 mr-4 text-lg font-medium transition-all duration-300 rounded-t-lg relative ${activeTab === tab ? 'text-primary-400' : 'text-gray-400 hover:text-gray-200'}`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <motion.div 
                      className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
                      layoutId="activetab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
            
            {/* Tab content with animated transitions */}
            <div className="relative h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'mission' && (
                  <motion.div
                    key="mission"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <h3 className="text-3xl font-bold text-white mb-6 relative inline-block">
                      Our Mission
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                      At VisionLabs, we're dedicated to providing <span className="text-primary-300 font-medium">innovative technology solutions</span> that transform how businesses operate. 
                      Our mission is to empower organizations with cutting-edge web development, technical expertise, and investment 
                      platforms that drive growth and success in the digital era.
                    </p>
                    
                    {/* Mission highlights with icons */}
                    <div className="space-y-5 mt-8">
                      {[
                        { icon: '💡', text: 'Revolutionize digital experiences through creative innovation' },
                        { icon: '📈', text: 'Drive measurable business growth with data-driven solutions' },
                        { icon: '🌎', text: 'Create accessible technology that empowers global connectivity' }
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + (i * 0.2) }}
                        >
                          <div className="mr-4 mt-1 bg-gradient-to-br from-primary-500 to-primary-700 p-3 rounded-lg shadow-lg flex items-center justify-center w-10 h-10">
                            <span className="text-white text-xl">{item.icon}</span>
                          </div>
                          <p className="text-gray-300">{item.text}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'approach' && (
                  <motion.div
                    key="approach"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <h3 className="text-3xl font-bold text-white mb-6 relative inline-block">
                      Our Approach
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-400 to-secondary-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                      We combine <span className="text-secondary-300 font-medium">creativity, technical excellence</span>, and a deep understanding of business needs to deliver solutions 
                      that exceed expectations. Our team of experts works closely with clients to understand their unique challenges 
                      and create custom solutions that drive real results.
                    </p>
                    
                    {/* Approach methodology with progress bars */}
                    <div className="space-y-6 mt-8">
                      {[
                        { label: 'Discovery & Planning', percentage: 95, color: 'from-primary-500 to-primary-400' },
                        { label: 'Design & Development', percentage: 90, color: 'from-secondary-500 to-secondary-400' },
                        { label: 'Testing & Optimization', percentage: 85, color: 'from-blue-500 to-blue-400' }
                      ].map((item, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-medium">{item.label}</span>
                            <span className="text-gray-300">{item.percentage}%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-700/30 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.percentage}%` }}
                              transition={{ duration: 1, delay: 0.3 + (i * 0.2), ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {activeTab === 'values' && (
                  <motion.div
                    key="values"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <h3 className="text-3xl font-bold text-white mb-6 relative inline-block">
                      Our Values
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-300 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </h3>
                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                      Our values shape everything we do at VisionLabs. We believe in <span className="text-blue-300 font-medium">integrity, excellence, innovation</span>,
                      and putting our clients at the center of our work.
                    </p>
                    
                    {/* Values cards with hover effects */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {[
                        { title: 'Innovation', description: 'We constantly push boundaries and explore new technologies' },
                        { title: 'Excellence', description: 'We strive for perfection in every project we undertake' },
                        { title: 'Integrity', description: 'We operate with transparency and honesty in all our dealings' },
                        { title: 'Client-Focused', description: 'We prioritize our clients\'s needs and success above all else' }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700/30 hover:border-primary-500/50 transition-all duration-300 group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                          whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}
                        >
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">{item.title}</h4>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-24">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="relative bg-white p-8 rounded-xl shadow-xl border border-gray-100 text-center overflow-hidden group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
                >
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Stat icon */}
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white shadow-lg relative z-10"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-3xl">{stat.icon}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="text-5xl font-extrabold text-secondary-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
                      {stat.number}
                    </div>
                    <div className="text-xl font-bold text-gray-800 mb-3">{stat.label}</div>
                  </motion.div>
                  
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary-400 to-primary-500 w-10 h-10 transform rotate-45 translate-x-[20px] translate-y-[-20px]"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
