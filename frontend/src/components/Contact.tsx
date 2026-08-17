'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value.trim()) {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let nameErr = false;
    let emailErr = false;
    let msgErr = false;

    if (!formData.name.trim()) nameErr = true;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) emailErr = true;
    
    if (!formData.message.trim()) msgErr = true;

    setErrors({ name: nameErr, email: emailErr, message: msgErr });

    if (!nameErr && !emailErr && !msgErr) {
      setStatus('submitting');
      
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      window.location.href = `mailto:${portfolioConfig.contact.email}?subject=${subject}&body=${body}`;
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`section py-20 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-2 text-slate-900 dark:text-white relative inline-block">
            Get In Touch
            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Let&apos;s build something beautiful together
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
          {/* Info Card */}
          <div className="glass-panel p-8 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">Contact Information</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                Feel free to reach out to me for project inquiries, job opportunities, or just to say hello.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white mb-0.5">Email</h4>
                    <a href={`mailto:${portfolioConfig.contact.email}`} className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
                      {portfolioConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white mb-0.5">Phone</h4>
                    <a href={`tel:${portfolioConfig.contact.phoneDial}`} className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
                      {portfolioConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-slate-900 dark:text-white mb-0.5">Location</h4>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{portfolioConfig.contact.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md">
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-heading font-medium text-slate-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2.5 bg-white dark:bg-slate-950 border rounded-lg text-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 outline-none ${
                    errors.name ? 'border-red-500' : 'border-slate-200 dark:border-white/5'
                  }`}
                />
                {errors.name && <span className="text-xs text-red-500">Name is required</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-heading font-medium text-slate-900 dark:text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2.5 bg-white dark:bg-slate-950 border rounded-lg text-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 outline-none ${
                    errors.email ? 'border-red-500' : 'border-slate-200 dark:border-white/5'
                  }`}
                />
                {errors.email && <span className="text-xs text-red-500">Please enter a valid email address</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-heading font-medium text-slate-900 dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="How can I help you?"
                  className={`w-full px-4 py-2.5 bg-white dark:bg-slate-950 border rounded-lg text-sm transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 outline-none ${
                    errors.message ? 'border-red-500' : 'border-slate-200 dark:border-white/5'
                  }`}
                />
                {errors.message && <span className="text-xs text-red-500">Message cannot be empty</span>}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-heading font-medium hover:scale-[1.01] active:scale-95 disabled:opacity-75 disabled:pointer-events-none transition-all duration-200 shadow-md shadow-indigo-500/20"
                >
                  {status === 'submitting' ? 'Opening Mail Client...' : 'Send Message'}
                  <Send size={16} />
                </button>
              </div>

              {status === 'success' && (
                <div className="p-3 text-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-sm">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
