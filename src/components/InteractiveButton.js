import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveButton = ({ 
  children, 
  onClick,
  primary = true,
  className = '',
  icon = null,
  trailEffect = true,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);

  // Generate a unique ID for each button
  const buttonId = React.useId();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    
    if (trailEffect && isHovered && Math.random() > 0.8) {
      createSparkle(x, y);
    }
  };

  const createSparkle = (x, y) => {
    const newSparkle = {
      id: `sparkle-${Date.now()}-${Math.random()}`,
      x,
      y,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
    };
    
    setSparkles(prev => [...prev, newSparkle]);
    
    // Remove sparkle after animation completes
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 700);
  };

  const backgroundClasses = primary 
    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white' 
    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white';

  return (
    <motion.button
      className={`relative overflow-hidden rounded-md px-5 py-3 font-medium shadow-md transition-all ${backgroundClasses} ${className}`}
      whileHover={{ 
        scale: 1.03,
        boxShadow: primary ? "0px 10px 25px rgba(43, 108, 176, 0.3)" : "0px 10px 25px rgba(0, 0, 0, 0.1)" 
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSparkles([]);
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      {...props}
    >
      {/* Highlight gradient that follows cursor */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent"
        animate={{
          background: isHovered 
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)` 
            : `radial-gradient(circle at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 0%)`,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      />
      
      {/* Sparkle effect */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute rounded-full pointer-events-none"
          style={{ 
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: sparkle.color
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0.8, 1, 0],
            y: sparkle.y - 15
          }}
          transition={{ 
            duration: 0.7, 
            ease: "easeOut" 
          }}
        />
      ))}

      {/* Button content with optional icon */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </div>
    </motion.button>
  );
};

export default InteractiveButton;
