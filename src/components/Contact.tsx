import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSectionContent } from '@/cms/context/ContentProvider';

interface ContactContent {
  heading?: string;
  subheading?: string;
  phone?: string;
  email?: string;
  company?: string;
  street?: string;
  city?: string;
}

const Contact = () => {
  const contactContent = useSectionContent<ContactContent>('contact');
  
  const heading = contactContent?.heading || 'Lassen Sie uns ins Gespräch kommen';
  const subheading = contactContent?.subheading || 'Wir freuen uns darauf, Sie kennenzulernen und Ihre Ideen zu hören. Schreiben Sie uns oder rufen Sie an.';
  const phone = contactContent?.phone || '+41 76 753 44 78';
  const email = contactContent?.email || 'info@baederberg.ch';
  const company = contactContent?.company || 'Bäderberg GmbH';
  const street = contactContent?.street || 'Zugerstrasse 18';
  const city = contactContent?.city || '8805 Richterswil';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    }, 1500);
  };

  const formFieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + custom * 0.1, duration: 0.5 }
    })
  };

  const contactInfo = [
    { icon: <Phone size={18} />, title: "Telefon", content: phone },
    { icon: <Mail size={18} />, title: "E-Mail", content: email },
    { 
      icon: <MapPin size={18} />, 
      title: "Unser Standort", 
      content: <>{company}<br />{street}<br />{city}<br />Schweiz</>
    }
  ];

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.7 }}
        >
          <motion.h2 
            className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-secondary rounded-full" 
            initial={{ opacity: 0, scale: 0.8 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kontakt
          </motion.h2>
          <motion.h3 
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {heading}
          </motion.h3>
          <motion.p 
            className="text-muted-foreground text-lg" 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {subheading}
          </motion.p>
        </motion.div>
        
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-sm" 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.7, type: "spring", stiffness: 50 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          >
            <motion.h4 
              className="text-2xl font-semibold mb-6" 
              initial={{ opacity: 0, y: 10 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Schreiben Sie uns
            </motion.h4>
            
            {isSuccess && (
              <motion.div 
                className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg" 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
              >
                Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <motion.div custom={0} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </motion.div>
                <motion.div custom={1} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">E-Mail</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </motion.div>
              </div>
              
              <div className="mb-4">
                <motion.div custom={2} variants={formFieldVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Telefon</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" />
                </motion.div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-1">Leistung</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="">Bitte wählen</option>
                  <option value="Badumbau">Badumbau</option>
                  <option value="Küchenumbau">Küchenumbau</option>
                  <option value="Innenausbau">Innenausbau</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Nachricht</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Nachricht senden
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
          <div>
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-sm mb-8" 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, type: "spring", stiffness: 50, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.h4 className="text-2xl font-semibold mb-6">So erreichen Sie uns</motion.h4>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={item.title} 
                    className="flex items-start gap-4" 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">{item.title}</h5>
                      <p className="text-muted-foreground">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-2xl p-8 shadow-sm" 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7, type: "spring", stiffness: 50, delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.h4 className="text-2xl font-semibold mb-6">Wann Sie uns erreichen</motion.h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span className="font-medium">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span className="font-medium">09:00 - 16:00</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
