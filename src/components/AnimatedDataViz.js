import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

// Reusable animated counter component
const AnimatedCounter = ({ from, to, duration = 2, delay = 0, formatter = (value) => value }) => {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView || !nodeRef.current) return;
    
    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration,
      delay,
      onUpdate(value) {
        node.textContent = formatter(Math.round(value));
      },
      ease: [0.25, 0.1, 0.25, 1], // Custom easing
    });
    
    return () => controls.stop();
  }, [from, to, duration, isInView, formatter, delay]);
  
  return <span ref={nodeRef}>{formatter(from)}</span>;
};

// Bar chart component
export const AnimatedBarChart = ({ 
  data, 
  title = "", 
  description = "", 
  maxValue,
  formatValue = (value) => value,
  colorStart = "#2563eb", 
  colorEnd = "#7c3aed",
}) => {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.3 });
  const actualMaxValue = maxValue || Math.max(...data.map(item => item.value)) * 1.2;

  return (
    <motion.div
      className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      ref={chartRef}
    >
      {title && <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>}
      {description && <p className="text-gray-400 mb-6 text-sm">{description}</p>}
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.label} className="relative">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-300">{item.label}</span>
              <span className="text-sm font-medium text-gray-300">
                {isInView ? (
                  <AnimatedCounter 
                    from={0} 
                    to={item.value} 
                    delay={0.2 + index * 0.1} 
                    formatter={formatValue} 
                  />
                ) : formatValue(0)}
              </span>
            </div>
            <div className="h-3 rounded-full bg-gray-700/30 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  background: `linear-gradient(to right, ${colorStart}, ${colorEnd})`,
                }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(item.value / actualMaxValue) * 100}%` } : {}}
                transition={{ duration: 1.2, delay: 0.2 + index * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Pie/Donut chart component
export const AnimatedDonutChart = ({
  data,
  title = "",
  description = "",
  size = 200,
  thickness = 30,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#f59e0b", "#10b981"],
}) => {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true, amount: 0.3 });
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = size / 2;
  const innerRadius = radius - thickness;
  const centerX = radius;
  const centerY = radius;

  // Calculate the SVG path and angle for each segment
  const segments = [];
  let currentAngle = 0;

  data.forEach((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const startX = centerX + radius * Math.sin((currentAngle * Math.PI) / 180);
    const startY = centerY - radius * Math.cos((currentAngle * Math.PI) / 180);
    
    const endAngle = currentAngle + angle;
    const endX = centerX + radius * Math.sin((endAngle * Math.PI) / 180);
    const endY = centerY - radius * Math.cos((endAngle * Math.PI) / 180);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
      "Z"
    ].join(" ");
    
    segments.push({
      pathData,
      color: colors[index % colors.length],
      percentage,
      label: item.label,
      value: item.value,
      startAngle: currentAngle,
      angle
    });
    
    currentAngle += angle;
  });

  return (
    <motion.div
      className="p-6 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      ref={chartRef}
    >
      {title && <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>}
      {description && <p className="text-gray-400 mb-6 text-sm">{description}</p>}
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Donut chart SVG */}
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="transparent"
              stroke="#1f2937"
              strokeWidth={thickness}
            />
            
            {/* Segments */}
            {segments.map((segment, i) => (
              <motion.path
                key={i}
                d={segment.pathData}
                fill={segment.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
            
            {/* Inner circle for donut effect */}
            <circle
              cx={centerX}
              cy={centerY}
              r={innerRadius}
              fill="#111827"
            />
            
            {/* Central text */}
            <text
              x={centerX}
              y={centerY - 10}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="16"
              fontWeight="500"
            >
              Total
            </text>
            <text
              x={centerX}
              y={centerY + 15}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="20"
              fontWeight="700"
            >
              {isInView ? (
                <AnimatedCounter 
                  from={0} 
                  to={total} 
                  duration={1.5}
                />
              ) : 0}
            </text>
          </svg>
          
          {/* Animated percentage indicators */}
          {segments.map((segment, i) => {
            // Calculate position around the donut
            const angle = segment.startAngle + segment.angle / 2;
            const indicatorX = centerX + (radius + 15) * Math.sin((angle * Math.PI) / 180);
            const indicatorY = centerY - (radius + 15) * Math.cos((angle * Math.PI) / 180);
            
            return (
              <motion.div
                key={`indicator-${i}`}
                className="absolute flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold text-white"
                style={{
                  left: indicatorX - 16,
                  top: indicatorY - 16,
                  backgroundColor: segment.color,
                  boxShadow: `0 0 15px ${segment.color}80`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
              >
                {Math.round(segment.percentage * 100)}%
              </motion.div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {segments.map((segment, i) => (
            <motion.div
              key={`legend-${i}`}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1
              }}
            >
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: segment.color }} 
              />
              <span className="text-sm text-gray-300">
                {segment.label} <span className="font-semibold text-white">{segment.value}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Stats grid component
export const AnimatedStatsGrid = ({ stats, columns = 3 }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <motion.div 
      className={`grid ${gridColumns} gap-6`}
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-gradient-to-br from-gray-900/40 to-gray-800/20 rounded-xl p-6 border border-gray-700/30 shadow-lg backdrop-blur-sm"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1 * index, ease: "easeOut" }}
        >
          {stat.icon && (
            <div className="mb-3 text-primary-400 text-2xl">
              {stat.icon}
            </div>
          )}
          
          <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {stat.prefix || ''}
            <AnimatedCounter 
              from={0} 
              to={stat.value} 
              delay={0.3 + index * 0.1} 
              formatter={stat.formatter || ((value) => value)} 
            />
            {stat.suffix || ''}
          </div>
          
          <div className="text-gray-400">
            {stat.label}
          </div>
          
          {stat.trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              stat.trend > 0 ? 'text-green-400' : stat.trend < 0 ? 'text-red-400' : 'text-gray-400'
            }`}>
              {stat.trend > 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : stat.trend < 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              ) : null}
              {Math.abs(stat.trend)}% {stat.trendLabel || (stat.trend > 0 ? 'Increase' : stat.trend < 0 ? 'Decrease' : 'No change')}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default {
  AnimatedBarChart,
  AnimatedDonutChart,
  AnimatedStatsGrid
};
