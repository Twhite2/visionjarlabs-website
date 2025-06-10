import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if we're hovering over clickable elements
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('clickable')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1
    },
    hovering: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1.5,
      backgroundColor: 'rgba(43, 108, 176, 0.5)',
      mixBlendMode: 'screen'
    }
  };

  // Don't render custom cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={isHovering ? 'hovering' : 'default'}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        mass: 0.5
      }}
      style={{
        position: 'fixed',
        zIndex: 9999,
        pointerEvents: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(2px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        mixBlendMode: 'difference',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <motion.div 
        style={{
          width: '4px',
          height: '4px',
          backgroundColor: 'white',
          borderRadius: '50%'
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
