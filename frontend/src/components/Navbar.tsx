'use client';

import { useState, useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [lagosTime, setLagosTime] = useState<string>('');

  // Sync theme state on mount to avoid hydration mismatch
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('portfolio-theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }, [setTheme]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Live Lagos time updates
  useEffect(() => {
    const updateLagosTime = () => {
      const now = new Date();
      setLagosTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };
    updateLagosTime();
    const interval = setInterval(updateLagosTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Section observer for scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 h-[70px] border-b border-white/5 bg-slate-950/70 backdrop-blur-md">
        <div className="w-[90%] max-w-[1200px] mx-auto h-full flex items-center justify-between">
          <span className="font-heading font-extrabold text-[1.8rem] lowercase">jeho<span className="text-purple-500">.</span></span>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 h-[70px] border-b border-slate-200/8 dark:border-white/5 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
      <div className="w-[90%] max-w-[1200px] mx-auto h-full flex items-center justify-between">
        <a href="#" className="font-heading font-extrabold text-[1.8rem] tracking-tight text-slate-900 dark:text-white lowercase">
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">jeho</span>
          <span className="text-purple-500">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`font-heading font-medium relative py-2 transition-colors duration-200 text-sm ${
                activeSection === link.id
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {lagosTime && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Lagos: {lagosTime}</span>
            </div>
          )}

          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-200"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all duration-200"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-white dark:bg-slate-950 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden z-40 ${
          menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className={`font-heading font-medium text-lg transition-colors ${
              activeSection === link.id
                ? 'text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
}
