import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, MessageSquare, Share2, Link as LinkIcon } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [resultMessage, setResultMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setResultMessage('');

    const form = e.currentTarget;
    const submissionData = new FormData(form);
    submissionData.append("access_key", "37638712-571c-43e8-a760-1fb1562e683d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submissionData
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setResultMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setResultMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus('error');
      setResultMessage("Network error. Please try again later.");
    }
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setResultMessage('');
    }, 5000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      details: 'Opolo housing estate, Bayelsa state, Nigeria'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'visionjarlabs@gmail.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+2347050322778'
    }
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-6 rounded-full" />
          <p className="max-w-2xl mx-auto text-surface-400 text-lg font-light">
            Have a project in mind or questions about our services? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div 
              key={index}
              className="glass-panel p-8 rounded-2xl text-center hover:border-primary-500/30 transition-colors"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-16 h-16 bg-primary-500/10 border border-primary-500/20 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <item.icon size={28} className="text-primary-400" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-surface-400 text-sm">{item.details}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <motion.div 
              className="p-12 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-secondary-600/20 mix-blend-overlay" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-6">Let's discuss your project</h3>
                  <p className="text-surface-300 font-light leading-relaxed mb-12">
                    Fill out the form and our team will get back to you within 24 hours. We're eager to discuss 
                    how Visionjar Labs can help bring your ideas to life and scale your business to new heights.
                  </p>
                </div>
                
                <div className="flex gap-4">
                  {[MessageSquare, Share2, LinkIcon].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-surface-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="p-12 bg-surface-900/50"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-surface-300 mb-2 text-sm font-medium">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-surface-600 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-surface-300 mb-2 text-sm font-medium">Your Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-surface-600 transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-surface-300 mb-2 text-sm font-medium">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-surface-600 transition-all"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                <div>
                  <label className="block text-surface-300 mb-2 text-sm font-medium">Your Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5} 
                    className="w-full px-4 py-3 bg-surface-950/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-surface-600 transition-all resize-none"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
                
                {resultMessage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-xl text-center text-sm font-medium ${
                      status === 'success' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {resultMessage}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
