
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { ref, inView } = useInView({
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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        region: '',
        service: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="inline-block px-3 py-1 mb-4 text-sm md:text-base text-primary bg-secondary rounded-full">
            Kontakt
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Sprechen Sie mit uns
          </h3>
          <p className="text-muted-foreground text-lg">
            Kontaktieren Sie uns für eine kostenlose Beratung und lassen Sie uns gemeinsam Ihr Projekt planen.
          </p>
        </div>
        
        <div 
          ref={ref} 
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${inView ? 'animate-fade-in' : 'opacity-0'}`}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm hover-lift">
            <h4 className="text-2xl font-semibold mb-6">Senden Sie uns eine Nachricht</h4>
            
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg">
                Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-muted-foreground mb-1">
                    Region
                  </label>
                  <select
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="Zürich">Zürich</option>
                    <option value="Richterswil">Richterswil</option>
                    <option value="Wädenswil">Wädenswil</option>
                    <option value="Lachen">Lachen</option>
                    <option value="Pfäffikon SZ">Pfäffikon SZ</option>
                    <option value="Menzingen">Menzingen</option>
                    <option value="Freienbach SZ">Freienbach SZ</option>
                    <option value="Rapperswil SG">Rapperswil SG</option>
                    <option value="Horgen">Horgen</option>
                    <option value="Rüti ZH">Rüti ZH</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-1">
                  Leistung
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Bitte wählen</option>
                  <option value="Badumbau">Badumbau</option>
                  <option value="Küchenumbau">Küchenumbau</option>
                  <option value="Innenausbau">Innenausbau</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-medium"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
              </button>
            </form>
          </div>
          
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 hover-lift">
              <h4 className="text-2xl font-semibold mb-6">Kontaktinformationen</h4>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Telefon</h5>
                    <p className="text-muted-foreground">+41 44 123 45 67</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">E-Mail</h5>
                    <p className="text-muted-foreground">info@baederberg.ch</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Hauptsitz</h5>
                    <p className="text-muted-foreground">
                      Musterstrasse 123<br />
                      8000 Zürich<br />
                      Schweiz
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm hover-lift">
              <h4 className="text-2xl font-semibold mb-6">Öffnungszeiten</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span className="font-medium">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span className="font-medium">09:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag</span>
                  <span className="font-medium">Geschlossen</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Terminvereinbarungen sind auch ausserhalb der regulären Öffnungszeiten möglich. Kontaktieren Sie uns für einen individuellen Beratungstermin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
