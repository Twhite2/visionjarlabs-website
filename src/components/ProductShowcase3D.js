import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

// Custom loader for 3D models
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200/20"></div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-t-primary-400 border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <p className="mt-4 font-medium text-white">
          {Math.round(progress)}% loaded
        </p>
      </div>
    </Html>
  );
}

// 3D model component with animations
const Model = ({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const ref = useRef();
  const { scene } = useGLTF(url);

  // Gentle floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t / 2) * 0.1;
    ref.current.rotation.y = rotation[1] + Math.sin(t / 4) * 0.2;
  });

  return (
    <primitive 
      ref={ref}
      object={scene} 
      scale={scale} 
      position={position} 
      rotation={rotation} 
      castShadow
      receiveShadow
    />
  );
};

// Feature callout component that appears when hovering over parts
const FeatureCallout = ({ feature, position, visible }) => {
  return (
    <Html position={position} distanceFactor={10}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900/80 backdrop-blur-md p-3 rounded-lg border border-white/20 shadow-xl w-40"
      >
        <h4 className="text-primary-400 font-semibold text-sm mb-1">{feature.title}</h4>
        <p className="text-white/80 text-xs">{feature.description}</p>
      </motion.div>
    </Html>
  );
};

// Main component
const ProductShowcase3D = ({ 
  title,
  description,
  modelUrl, 
  modelScale = 1, 
  modelPosition = [0, 0, 0], 
  initialRotation = [0, 0, 0],
  features = []
}) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  return (
    <div className="w-full relative">
      {/* Heading section */}
      <div className="mb-8 text-center max-w-2xl mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
      
      {/* 3D canvas */}
      <div className="w-full h-[500px] md:h-[700px] rounded-xl overflow-hidden bg-gradient-to-b from-primary-900/30 to-secondary-900/30 backdrop-blur-sm border border-white/10">
        <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
          <color attach="background" args={['rgb(7, 10, 25)']} />
          
          {/* Ambient light */}
          <ambientLight intensity={0.5} />
          
          {/* Main directional light with shadow */}
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.5} 
            castShadow 
            shadow-mapSize={[2048, 2048]} 
          />
          
          {/* Spotlight for dramatic effect */}
          <spotLight 
            position={[-10, 10, 10]} 
            angle={0.3} 
            penumbra={0.8} 
            intensity={1} 
            castShadow 
          />

          {/* Environment map for realistic reflections */}
          <Environment preset="city" />
          
          {/* Shadow plane */}
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={3} 
            resolution={256} 
            color="#000000" 
          />

          <Suspense fallback={<Loader />}>
            <Model 
              url={modelUrl} 
              scale={modelScale} 
              position={modelPosition} 
              rotation={initialRotation}
              onLoad={() => setIsModelLoaded(true)}
            />
            
            {/* Feature callouts */}
            {isModelLoaded && features.map((feature, index) => (
              <FeatureCallout 
                key={index}
                feature={feature}
                position={feature.position}
                visible={activeFeature === index}
              />
            ))}
          </Suspense>

          {/* Controls for user interaction */}
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            rotateSpeed={0.5}
            autoRotate={!activeFeature}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      {/* Feature selection buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {features.map((feature, index) => (
          <motion.button
            key={index}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFeature === index 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                : 'bg-gray-800/50 text-gray-300 border border-white/10'
            } transition-all duration-300`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveFeature(index === activeFeature ? null : index)}
          >
            {feature.title}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase3D;
