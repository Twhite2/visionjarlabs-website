import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

// OrbitDot component for the Earth globe
const OrbitDot = ({ angle, scrollYProgress, color }) => {
  const orbitRadius = 130; // Distance from center
  
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.cos(angle * (Math.PI / 180)) * orbitRadius, Math.cos((angle + 360) * (Math.PI / 180)) * orbitRadius]
  );
  
  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [Math.sin(angle * (Math.PI / 180)) * orbitRadius, Math.sin((angle + 360) * (Math.PI / 180)) * orbitRadius]
  );
  
  // In Tailwind, we can't use string interpolation for class names
  // so we use conditional rendering instead
  return (
    <motion.div
      className={`absolute w-2 h-2 rounded-full shadow-lg z-10 ${color === 'blue-400' ? 'bg-blue-400' : 'bg-teal-400'}`}
      style={{
        top: '50%',
        left: '50%',
        x: xTransform,
        y: yTransform
      }}
    >
      {/* Glowing trail behind the dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/20 blur-sm -z-10" />
    </motion.div>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activatedConnections, setActivatedConnections] = useState([]);
  const mapRef = useRef(null);
  const isMapInView = useInView(mapRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Global connection points data
  const connectionPoints = [
    { id: 1, name: "New York", x: 25, y: 40, size: 8 },
    { id: 2, name: "London", x: 45, y: 35, size: 10 },
    { id: 3, name: "Tokyo", x: 82, y: 42, size: 9 },
    { id: 4, name: "Sydney", x: 85, y: 75, size: 7 },
    { id: 5, name: "San Francisco", x: 18, y: 42, size: 9 },
    { id: 6, name: "Berlin", x: 50, y: 33, size: 8 },
    { id: 7, name: "Singapore", x: 75, y: 58, size: 8 },
    { id: 8, name: "Dubai", x: 60, y: 48, size: 7 },
    { id: 9, name: "São Paulo", x: 32, y: 70, size: 8 },
    { id: 10, name: "Mumbai", x: 68, y: 52, size: 9 },
  ];
  
  // Connection paths between points
  const connectionPaths = [
    { from: 1, to: 2, delay: 0 },   // New York to London
    { from: 2, to: 6, delay: 0.2 }, // London to Berlin
    { from: 6, to: 8, delay: 0.4 }, // Berlin to Dubai
    { from: 8, to: 10, delay: 0.6 }, // Dubai to Mumbai
    { from: 10, to: 7, delay: 0.8 }, // Mumbai to Singapore
    { from: 7, to: 3, delay: 1.0 },  // Singapore to Tokyo
    { from: 3, to: 4, delay: 1.2 },  // Tokyo to Sydney
    { from: 5, to: 1, delay: 1.4 },  // San Francisco to New York
    { from: 5, to: 9, delay: 1.6 },  // San Francisco to São Paulo
    { from: 9, to: 2, delay: 1.8 },  // São Paulo to London
  ];
  
  useEffect(() => {
    // Activate connections as user scrolls
    if (isMapInView) {
      const timer = setTimeout(() => {
        const newConnections = [];
        connectionPaths.forEach((path, index) => {
          setTimeout(() => {
            setActivatedConnections(prev => [
              ...prev,
              { from: path.from, to: path.to }
            ]);
          }, path.delay * 1000);
        });
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      // Reset connections when map is out of view
      setActivatedConnections([]);
    }
  }, [isMapInView]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Helper function to get coordinates for drawing connection paths
  const getPointCoordinates = (pointId) => {
    const point = connectionPoints.find(p => p.id === pointId);
    if (!point) return { x: 0, y: 0 };
    return { x: point.x, y: point.y };
  };

  // Helper to generate SVG path between two points
  const generatePath = (fromPoint, toPoint) => {
    // Convert percentage to actual coordinates
    const startX = fromPoint.x;
    const startY = fromPoint.y;
    const endX = toPoint.x;
    const endY = toPoint.y;
    
    // Calculate control point for the curve (to create a nice arc)
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const controlX = midX;
    const controlY = midY - 15; // Pull control point up to create an arc
    
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };
  
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-24 md:pt-20 md:pb-12 flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-900 via-primary-900 to-secondary-800">
      {/* Dynamic animated background elements */}
      <div className="absolute w-full h-full">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-purple-900/40 mix-blend-overlay"></div>
        
        {/* Subtle floating particles for depth */}
        {[...Array(15)].map((_, index) => {
          const size = Math.random() * 100 + 50;
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          const duration = Math.random() * 15 + 20;
          
          return (
            <motion.div
              key={index}
              className="absolute rounded-full bg-gradient-to-br from-primary-400/10 to-secondary-400/5 backdrop-blur-sm"
              style={{
                width: size,
                height: size,
                left: `${initialX}%`,
                top: `${initialY}%`,
                filter: 'blur(8px)',
              }}
              animate={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.4 + 0.8,
              }}
              transition={{
                duration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          );
        })}
        
        {/* Mouse-following highlight effect */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-primary-500/10 pointer-events-none"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            filter: 'blur(80px)',
            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0) 70%)',
          }}
          animate={{
            x: 0,
            y: 0,
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
          }}
        />
      </div>

      {/* Background Reference Div */}
      <div ref={mapRef} className="absolute inset-0 z-0 overflow-hidden">
        {/* Empty div for scroll detection */}
      </div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity, y }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.div 
                className="overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight"
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 20 
                  }}
                >
                  <span className="block">Innovative</span> 
                  <span className="block"><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-300 drop-shadow-sm">Tech Solutions</span></span> 
                  <span className="block">for Your Business</span>
                </motion.h1>
              </motion.div>
            
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-10 font-light leading-relaxed max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                VisionLabs specializes in building cutting-edge websites, web solutions, technical innovations, and investment platforms to elevate your business.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.button 
                className="px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-full shadow-xl hover:shadow-primary-500/50 transition-all duration-300 text-lg tracking-wide"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center">
                  Explore Services
                  <motion.span 
                    className="ml-2"
                    animate={{ x: [0, 5] }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.75 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.span>
                </span>
              </motion.button>
              <motion.button 
                className="px-10 py-4 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 text-lg tracking-wide"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2 mt-8 mb-16 md:my-0 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Earth Globe Container */}
            <motion.div 
              className="w-full h-full p-8 bg-gradient-to-br from-primary-800/80 to-secondary-800/80 rounded-2xl backdrop-blur-sm border border-white/10 shadow-2xl overflow-hidden"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Earth Globe with scroll-based rotation */}
                <motion.div 
                  className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
                  style={{ 
                    rotateY: useTransform(scrollYProgress, [0, 1], [0, 360])  
                  }}
                >
                  {/* Earth SVG Globe */}
                  <motion.img 
                    src="/images/earth-globe.svg"
                    alt="Rotating Earth Globe"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.1}
                    whileDrag={{ scale: 1.1 }}
                  />
                  
                  {/* Orbiting satellite */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full bg-white shadow-lg shadow-blue-500/50 z-10"
                    style={{
                      top: "10%",
                      left: "50%",
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="absolute w-5 h-0.5 bg-white/50 -left-1 top-1/2 -translate-y-1/2" />
                  </motion.div>
                  
                  {/* Glow effect behind the globe */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-primary-500/20 to-teal-500/20 filter blur-xl -z-10" />
                </motion.div>
                
                {/* Connection lines - tech feel */}
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div 
                      key={`connection-${i}`}
                      className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: 0,
                        right: 0,
                        opacity: 0
                      }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        left: ["-100%", "200%"]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: i * 0.7,
                        repeatDelay: Math.random() * 3,
                        ease: "easeInOut",
                        type: "tween" // Important! Using tween instead of spring
                      }}
                    />
                  ))}
                </div>
                
                {/* Fixed implementation of orbital dots */}
                <OrbitDot angle={0} scrollYProgress={scrollYProgress} color="blue-400" />
                <OrbitDot angle={60} scrollYProgress={scrollYProgress} color="teal-400" />
                <OrbitDot angle={120} scrollYProgress={scrollYProgress} color="blue-400" />
                <OrbitDot angle={180} scrollYProgress={scrollYProgress} color="teal-400" />
                <OrbitDot angle={240} scrollYProgress={scrollYProgress} color="blue-400" />
                <OrbitDot angle={300} scrollYProgress={scrollYProgress} color="teal-400" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scroll indicator fixed for mobile */}
      <motion.div 
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
      >
        <motion.div 
          className="w-10 h-16 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm"
        >
          <motion.div 
            className="w-2 h-4 bg-gradient-to-b from-primary-400 to-primary-500 rounded-full mt-2"
            animate={{ y: 8 }}
            transition={{ 
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
        <motion.p 
          className="text-white/80 text-xs md:text-sm mt-2 text-center font-light tracking-widest uppercase"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0.6 }}
          transition={{ 
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1.5,
            ease: 'easeInOut'
          }}
        >
          SCROLL DOWN
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
