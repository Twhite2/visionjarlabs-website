import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Cpu, LineChart, ArrowRight, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Enterprise Web Solutions',
      description: 'Custom-built web applications tailored to your specific business needs with responsive design and modern technologies.',
      icon: Globe,
    },
    {
      title: 'Technical Infrastructure',
      description: 'Comprehensive technical expertise to solve complex problems and implement scalable solutions for your business challenges.',
      icon: Cpu,
    },
    {
      title: 'Investment Platforms',
      description: 'Secure and user-friendly investment platforms with advanced analytics and portfolio management tools.',
      icon: LineChart,
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-32 relative bg-transparent overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-[30rem] h-[30rem] bg-primary-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-10 w-[20rem] h-[20rem] bg-secondary-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="inline-block text-primary-400 font-semibold tracking-widest uppercase text-sm mb-4 px-4 py-1 border border-primary-500/20 rounded-full glass-panel"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-surface-400 text-lg font-light">
            We offer a range of innovative tech solutions designed to help your enterprise thrive in the digital world.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="glass-panel rounded-3xl p-8 group hover:border-primary-500/30 transition-colors"
              variants={cardVariants}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-primary-400 group-hover:scale-110 transition-transform">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{service.title}</h3>
              <p className="text-surface-400 mb-8 font-light leading-relaxed">{service.description}</p>
              
              <div className="space-y-4 mb-8">
                {["Customized Solutions", "Modern Stack", "Expert Support"].map((feature, i) => (
                  <div key={i} className="flex items-center text-surface-300 text-sm">
                    <CheckCircle2 size={16} className="text-primary-400 mr-3" />
                    {feature}
                  </div>
                ))}
              </div>
              
              <a 
                href="#contact" 
                className="inline-flex items-center text-sm font-semibold text-white group-hover:text-primary-400 transition-colors"
              >
                Learn More
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-24 text-center glass-panel p-12 rounded-3xl border border-white/10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 mix-blend-overlay" />
          <h3 className="text-3xl font-display font-bold text-white mb-6 relative z-10">Ready to transform your business?</h3>
          <p className="text-surface-400 mb-8 max-w-2xl mx-auto relative z-10">
            Let's work together to create a powerful digital solution that puts you ahead of the competition.
          </p>
          <a 
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-white text-surface-950 font-bold rounded-full hover:scale-105 transition-transform relative z-10"
          >
            Start a Project
            <ArrowRight size={18} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
