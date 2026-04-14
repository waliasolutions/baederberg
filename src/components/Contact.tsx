import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSectionContent } from '@/cms/context/ContentProvider';
import { z } from 'zod';

// --- Zod validation schema ---
const contactSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich').max(100, 'Name darf maximal 100 Zeichen haben'),
  email: z.string().min(1, 'E-Mail ist erforderlich').email('Ungültige E-Mail-Adresse'),
  phone: z.string().max(30, 'Telefonnummer darf maximal 30 Zeichen haben').optional().or(z.literal('')),
  service: z.enum(['', 'Badumbau', 'Innenausbau']).optional(),
  message: z.string().max(2000, 'Nachricht darf maximal 2000 Zeichen haben').optional().or(z.literal('')),
});

// --- Turnstile types ---
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'error-callback'?: () => void;
        'expired-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface ContactContent {
  heading?: string;
  subheading?: string;
  phone?: string;
  email?: string;
  company?: string;
  street?: string;
  city?: string;
}

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

const Contact = () => {
  const contactContent = useSectionContent<ContactContent>('contact');

  const heading = contactContent?.heading || 'Kontakt';
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
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState('');

  // Timing: record when form mounts
  const formLoadedAt = useRef(Date.now());
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);

  // Load Turnstile script
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    if (document.querySelector('script[src*="turnstile"]')) return;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
      }
    };
  }, []);

  // Render Turnstile widget once script is loaded
  const renderTurnstile = useCallback(() => {
    if (
      !TURNSTILE_SITE_KEY ||
      !window.turnstile ||
      !turnstileContainerRef.current ||
      turnstileWidgetId.current
    ) return;

    turnstileWidgetId.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      'error-callback': () => setTurnstileToken(''),
      'expired-callback': () => setTurnstileToken(''),
      theme: 'light',
    });
  }, []);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    // Poll for turnstile to be ready (script loads async)
    const interval = setInterval(() => {
      if (window.turnstile && turnstileContainerRef.current) {
        renderTurnstile();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [renderTurnstile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage('');
    setFieldErrors({});

    // Client-side Zod validation
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Turnstile check (client-side guard)
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setIsError(true);
      setErrorMessage('Bitte bestätigen Sie die Sicherheitsüberprüfung.');
      setIsSubmitting(false);
      return;
    }

    // Compute form duration
    const formDuration = Date.now() - formLoadedAt.current;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            turnstileToken,
            honeypot,
            formDuration,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || 'Fehler beim Senden der Nachricht');
      }

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setHoneypot('');
      setTurnstileToken('');
      formLoadedAt.current = Date.now();

      // Reset Turnstile widget
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setIsError(true);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Phone size={18} />, title: "Telefon", content: phone },
    { icon: <Mail size={18} />, title: "E-Mail", content: email },
    {
      icon: <MapPin size={18} />,
      title: "Unser Standort",
      content: <>{company}<br />{street}<br />{city}</>
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container px-6 md:px-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-6">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-sm"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-xl md:text-2xl font-semibold mb-6">
              Schreiben Sie uns
            </h4>

            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg">
                Vielen Dank für Ihre Nachricht! Wir melden uns bald bei Ihnen.
              </div>
            )}

            {isError && (
              <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Honeypot field — hidden from humans, bots will fill it */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[44px] ${fieldErrors.name ? 'border-red-400' : 'border-border'}`} />
                  {fieldErrors.name && <p className="text-red-600 text-xs mt-1">{fieldErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">E-Mail</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[44px] ${fieldErrors.email ? 'border-red-400' : 'border-border'}`} />
                  {fieldErrors.email && <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1">Telefon</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[44px] ${fieldErrors.phone ? 'border-red-400' : 'border-border'}`} />
                {fieldErrors.phone && <p className="text-red-600 text-xs mt-1">{fieldErrors.phone}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="service" className="block text-sm font-medium text-muted-foreground mb-1">Leistung</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white min-h-[44px]">
                  <option value="">Bitte wählen</option>
                  <option value="Badumbau">Badumbau</option>
                  <option value="Innenausbau">Innenausbau</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Nachricht</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${fieldErrors.message ? 'border-red-400' : 'border-border'}`}></textarea>
                {fieldErrors.message && <p className="text-red-600 text-xs mt-1">{fieldErrors.message}</p>}
              </div>

              {/* Cloudflare Turnstile widget */}
              {TURNSTILE_SITE_KEY && (
                <div className="mb-6">
                  <div ref={turnstileContainerRef} />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
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
              </button>
            </form>
          </motion.div>

          <div>
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm mb-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-xl md:text-2xl font-semibold mb-6">So erreichen Sie uns</h4>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-medium mb-1">{item.title}</h5>
                      <p className="text-muted-foreground">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl md:text-2xl font-semibold mb-6">Wann Sie uns erreichen</h4>

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
