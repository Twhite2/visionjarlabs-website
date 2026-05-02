import './App.css';

// Import components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { InteractiveBackground } from './components/InteractiveBackground';

// Import Framer Motion for page transitions
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="font-sans min-h-screen bg-surface-950 text-surface-50 selection:bg-primary-500/30 relative">
      <InteractiveBackground />
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
