'use client';

import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin, Twitter, Facebook, Instagram } from './SocialIcons';
import { portfolioConfig } from '../config/portfolio';

export default function Footer() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        timeZone: portfolioConfig.contact.timezone || 'Africa/Lagos',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: <Mail size={18} />, href: `mailto:${portfolioConfig.contact.email}`, title: 'Email', show: true },
    { icon: <Github size={18} />, href: portfolioConfig.socials.github, title: 'GitHub', show: !!portfolioConfig.socials.github },
    { icon: <Linkedin size={18} />, href: portfolioConfig.socials.linkedin, title: 'LinkedIn', show: !!portfolioConfig.socials.linkedin },
    { icon: <Twitter size={18} />, href: portfolioConfig.socials.twitter, title: 'Twitter', show: !!portfolioConfig.socials.twitter },
    { icon: <Facebook size={18} />, href: portfolioConfig.socials.facebook, title: 'Facebook', show: !!portfolioConfig.socials.facebook },
    { icon: <Instagram size={18} />, href: portfolioConfig.socials.instagram, title: 'Instagram', show: !!portfolioConfig.socials.instagram },
  ];

  return (
    <footer className="border-t border-slate-200/50 dark:border-white/5 bg-white dark:bg-slate-950 py-8 transition-colors duration-300 relative z-10">
      <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; 2026 {portfolioConfig.name}. All rights reserved.
          </p>
          {time && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200/60 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 backdrop-blur-sm shadow-sm transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-heading font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                Lagos, NG
              </span>
              <span className="text-xs font-mono font-bold tracking-widest bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                {time}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {socialLinks
            .filter((link) => link.show)
            .map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                title={link.title}
                className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
              >
                {link.icon}
              </a>
            ))}
        </div>
      </div>
    </footer>
  );
}
