import { useState, useEffect } from 'react';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import new professional components
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import ParallaxBackground from './components/ParallaxBackground';
import CaseStudy from './components/CaseStudy';
import InteractiveButton from './components/InteractiveButton';
import ProductShowcase3D from './components/ProductShowcase3D';
import InteractiveTimeline from './components/InteractiveTimeline';
import { AnimatedBarChart, AnimatedDonutChart, AnimatedStatsGrid } from './components/AnimatedDataViz';

// Import Framer Motion for page transitions
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Sample data for demonstrations
  const caseStudyData = {
    title: "AR Experience Platform",
    description: "A cutting-edge augmented reality solution that transforms how users interact with digital content in physical spaces. This platform enables seamless integration of 3D objects into real-world environments.",
    image: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?q=80",
    technologies: ["React", "Three.js", "WebXR", "TensorFlow", "WebGL", "Cloud Vision API"],
    stats: [
      { label: "User Engagement", value: "87%" },
      { label: "Performance Gain", value: "3.5x" },
      { label: "Response Time", value: "62ms" }
    ]
  };
  
  const timelineEvents = [
    {
      date: "2023",
      title: "Global Expansion",
      description: "Expanded operations to three new continents with dedicated regional teams.",
      details: "This strategic expansion allowed us to better serve our global client base with localized solutions and support.",
      achievements: [
        "Opened new offices in Singapore, Berlin, and São Paulo",
        "Grew our team by 150% to accommodate new markets",
        "Established partnerships with 12 local technology providers"
      ]
    },
    {
      date: "2022",
      title: "Major Platform Release",
      description: "Launched version 2.0 of our flagship AR platform with groundbreaking new features.",
      details: "The new platform introduced industry-first capabilities including real-time collaborative AR editing and AI-powered scene recognition."
    },
    {
      date: "2021",
      title: "Series B Funding",
      description: "Secured $42M in Series B funding to accelerate product development and market expansion.",
      details: "This investment round was led by top-tier tech investors, valuing the company at over $200M."
    },
    {
      date: "2020",
      title: "Company Founded",
      description: "VisionLabs was established with a mission to transform digital experiences through immersive technology.",
      details: "Founded by a team of AR/VR experts from leading technology companies."
    }
  ];
  
  const vizData = [
    { label: "Product Development", value: 65 },
    { label: "Marketing & Sales", value: 45 },
    { label: "Research", value: 30 },
    { label: "Operations", value: 25 }
  ];
  
  const donutData = [
    { label: "Enterprise", value: 45 },
    { label: "Consumer", value: 30 },
    { label: "Education", value: 15 },
    { label: "Healthcare", value: 10 }
  ];

  useEffect(() => {
    // Add cursor-custom class to body for custom cursor
    document.body.classList.add('cursor-custom');
    setIsMounted(true);
    
    return () => {
      document.body.classList.remove('cursor-custom');
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="font-sans">
        {/* Custom cursor and theme toggle */}
        {isMounted && <CustomCursor />}
        <ThemeToggle />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main content with page transitions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero section with parallax background */}
          <ParallaxBackground>
            <Hero />
          </ParallaxBackground>
          
          {/* About section */}
          <About />
          
          {/* Interactive case study */}
          <section className="py-20 bg-gradient-to-b from-secondary-900/30 to-primary-900/30">
            <div className="container mx-auto px-4">
              <div className="mb-16 text-center">
                <motion.h2 
                  className="text-4xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  Featured Case Study
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Explore how our solutions transform businesses through immersive technology
                </motion.p>
              </div>
              
              <CaseStudy 
                title={caseStudyData.title}
                description={caseStudyData.description}
                image={caseStudyData.image}
                technologies={caseStudyData.technologies}
                stats={caseStudyData.stats}
              />
              
              <div className="mt-12 text-center">
                <InteractiveButton primary={true}>
                  Explore All Case Studies
                </InteractiveButton>
              </div>
            </div>
          </section>
          
          {/* Services with enhanced visuals */}
          <Services />
          
          {/* 3D Product showcase */}
          <section className="py-24 bg-gradient-to-b from-primary-900/20 to-secondary-900/20">
            <div className="container mx-auto px-4">
              <ProductShowcase3D
                title="Experience Our AR Technology"
                description="Interact with our 3D visualization platform that powers immersive experiences across industries"
                modelUrl="https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/vr-headset/model.gltf"
                modelScale={2.5}
                features={[
                  { title: "High Resolution Display", description: "4K per-eye resolution for crystal clear visuals", position: [0.8, 0.2, 0.5] },
                  { title: "Spatial Audio", description: "360° sound for complete immersion", position: [-0.8, 0.1, 0.5] },
                  { title: "Lightweight Design", description: "Ergonomic fit for extended sessions", position: [0, 0.5, 1] }
                ]}
              />
            </div>
          </section>
          
          {/* Projects showcase */}
          <Projects />
          
          {/* Interactive timeline */}
          <section className="py-24 bg-gradient-to-b from-secondary-900/20 to-primary-900/20">
            <div className="container mx-auto px-4">
              <InteractiveTimeline 
                title="Our Journey"
                subtitle="The evolution of VisionLabs from concept to industry leader"
                events={timelineEvents}
              />
            </div>
          </section>
          
          {/* Data visualization section */}
          <section className="py-24 bg-gradient-to-b from-primary-900/20 to-secondary-900/20">
            <div className="container mx-auto px-4">
              <div className="mb-16 text-center">
                <motion.h2 
                  className="text-4xl font-bold text-white mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  Our Impact
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Measuring success through data-driven insights
                </motion.p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <AnimatedBarChart
                  data={vizData}
                  title="Resource Allocation"
                  description="How we invest in different areas of our business"
                  formatValue={(val) => `${val}%`}
                />
                
                <AnimatedDonutChart
                  data={donutData}
                  title="Market Segments"
                  description="Distribution of our client base across industries"
                  size={250}
                />
              </div>
              
              <AnimatedStatsGrid
                stats={[
                  { 
                    value: 250, 
                    suffix: "+", 
                    label: "Projects Delivered",
                    trend: 24, 
                    trendLabel: "vs Last Year" 
                  },
                  { 
                    value: 18, 
                    label: "Countries Served", 
                    trend: 38, 
                    trendLabel: "Growth" 
                  },
                  { 
                    value: 96, 
                    suffix: "%", 
                    label: "Client Satisfaction", 
                    trend: 5, 
                    trendLabel: "Improvement" 
                  },
                ]}
              />
            </div>
          </section>
          
          {/* Contact section */}
          <Contact />
          
          {/* Footer */}
          <Footer />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default App;
