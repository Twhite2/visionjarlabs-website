import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

const Services = () => {
  const { scrollYProgress } = useViewportScroll();
  const translateY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0.3, 1]);

  const services = [
    {
      title: 'Website & Web Solutions',
      description: 'Custom-built websites and web applications tailored to your specific business needs with responsive design and modern technologies.',
      icon: 'fa-globe',
    },
    {
      title: 'Technical Solutions',
      description: 'Comprehensive technical expertise to solve complex problems and implement innovative solutions for your business challenges.',
      icon: 'fa-cogs',
    },
    {
      title: 'Investment Platforms',
      description: 'Secure and user-friendly investment platforms with advanced analytics and portfolio management tools.',
      icon: 'fa-chart-line',
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="services" className="py-32 relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-80 h-80 bg-primary-100 rounded-full opacity-30 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-secondary-100 rounded-full opacity-30 blur-3xl" />
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          <motion.span 
            className="block text-primary-600 font-semibold tracking-widest uppercase text-sm mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Offer
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary-900 mb-6 leading-tight">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">Services</span>
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            We offer a range of innovative tech solutions designed to help your business thrive in the digital world.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          style={{ opacity, y: translateY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-gray-100 relative"
              variants={cardVariants}
              whileHover={{ y: -15, boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)' }}
            >
              {/* Card highlight gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Service card content */}
              <div className="p-10 relative z-10">
                <motion.div 
                  className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-8 mx-auto shadow-lg transform group-hover:rotate-6 transition-transform duration-300"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <i className={`fas ${service.icon} text-2xl text-white`}></i>
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary-800 mb-5 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center mb-8 leading-relaxed">{service.description}</p>
                
                {/* Feature bullets */}
                <div className="space-y-3 mb-8">
                  {["Customized Solutions", "Modern Technologies", "Expert Support"].map((feature, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                    >
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-primary-400 flex-shrink-0 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="ml-3 text-gray-600">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="flex justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="#contact" 
                    className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center group"
                  >
                    <span>Learn More</span>
                    <motion.span 
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </motion.span>
                  </a>
                </motion.div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary-400 to-primary-500 w-10 h-10 transform rotate-45 translate-x-[20px] translate-y-[-20px]"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          <motion.a 
            href="#contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-full shadow-xl hover:shadow-primary-500/40 transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center">
              Discuss Your Project
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </motion.a>
          
          {/* Service advantages */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Modern Solutions", icon: "fa-rocket" },
              { title: "Expert Support", icon: "fa-headset" },
              { title: "Quality Assurance", icon: "fa-shield-alt" }
            ].map((advantage, idx) => (
              <motion.div 
                key={idx}
                className="flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + (idx * 0.2) }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                    <i className={`fas ${advantage.icon} text-primary-600`}></i>
                  </div>
                  <p className="text-gray-700 font-medium">{advantage.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
