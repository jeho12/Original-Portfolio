'use client';

import { useState, useEffect } from 'react';
import { Mail, ArrowRight, Code, Palette, ChevronDown, FileText } from 'lucide-react';
import { Github, Linkedin, Twitter, Facebook, Instagram } from './SocialIcons';
import { portfolioConfig } from '../config/portfolio';

const roles = ['Web Developer', 'UI/UX Designer', 'Computer Science Graduate'];

export default function Hero() {
  const [roleText, setRoleText] = useState('');
  
  const socialLinks = [
    { icon: <Mail size={18} />, href: `mailto:${portfolioConfig.contact.email}`, title: 'Email', show: true },
    { icon: <Github size={18} />, href: portfolioConfig.socials.github, title: 'GitHub', show: !!portfolioConfig.socials.github },
    { icon: <Linkedin size={18} />, href: portfolioConfig.socials.linkedin, title: 'LinkedIn', show: !!portfolioConfig.socials.linkedin },
    { icon: <Twitter size={18} />, href: portfolioConfig.socials.twitter, title: 'Twitter', show: !!portfolioConfig.socials.twitter },
    { icon: <Facebook size={18} />, href: portfolioConfig.socials.facebook, title: 'Facebook', show: !!portfolioConfig.socials.facebook },
    { icon: <Instagram size={18} />, href: portfolioConfig.socials.instagram, title: 'Instagram', show: !!portfolioConfig.socials.instagram },
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        setRoleText(currentRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        setSpeed(50);
      } else {
        setRoleText(currentRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        setSpeed(100);
      }

      if (!isDeleting && charIndex === currentRole.length) {
        setIsDeleting(true);
        setSpeed(2000); // Wait on complete word
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setSpeed(500); // Brief pause before starting next word
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, speed]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-24 pb-12 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="blob-glow blob-1"></div>
      <div className="blob-glow blob-2"></div>

      <div className="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center z-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-500 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Open for Opportunities
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-4 text-slate-900 dark:text-white">
            Hi, I&apos;m <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{portfolioConfig.name}</span>
          </h1>

          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-slate-500 dark:text-slate-400 mb-6 h-[40px] flex items-center justify-center lg:justify-start">
            I am a <span className="text-indigo-600 dark:text-indigo-400 ml-2 font-bold">{roleText}</span>
            <span className="typed-cursor text-indigo-600 dark:text-indigo-400 font-extralight ml-0.5">|</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-[540px] mb-8 leading-relaxed">
            A front-end-focused Web Developer and UI/UX Designer bridging the gap between beautiful aesthetics and robust modern software architectures. Computer Science graduate specialized in React, Next.js, and Express.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-heading font-medium hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-500/30"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-white/5 bg-transparent text-slate-900 dark:text-white font-heading font-medium hover:bg-indigo-500/5 hover:border-indigo-500 transition-all duration-200"
            >
              Get In Touch
            </a>
            {portfolioConfig.contact.cvUrl && (
              <a
                href={portfolioConfig.contact.cvUrl}
                download="Jehoshaphat_Ibenye_CV.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-200 dark:border-white/5 bg-transparent text-slate-900 dark:text-white font-heading font-medium hover:bg-indigo-500/5 hover:border-indigo-500 transition-all duration-200"
              >
                Download CV <FileText size={18} />
              </a>
            )}
          </div>

          <div className="flex gap-4">
            {socialLinks
              .filter((social) => social.show)
              .map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  title={social.title}
                  className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 bg-white/40 dark:bg-slate-900/40 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500 hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
          </div>
        </div>

        {/* Code Visual Mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[420px]">
            {/* Visual Card */}
            <div className="w-full bg-[#0f1422] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-white/3 py-3 px-4 border-b border-white/5 flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed text-slate-400">
                <pre>
                  <code>
                    <span className="text-pink-500">const</span> developer = &#123;{'\n'}
                    {'  '}name: <span className="text-emerald-400">&apos;{portfolioConfig.name.split(' ')[0]}&apos;</span>,{'\n'}
                    {'  '}skills: [<span className="text-emerald-400">&apos;React&apos;</span>, <span className="text-emerald-400">&apos;Next.js&apos;</span>, <span className="text-emerald-400">&apos;Node&apos;</span>],{'\n'}
                    {'  '}focus: <span className="text-emerald-400">&apos;Usable UI/UX&apos;</span>,{'\n'}
                    {'  '}passionate: <span className="text-rose-400">true</span>{'\n'}
                    &#125;;
                  </code>
                </pre>
              </div>
            </div>

            {/* Float Badge 1 */}
            <div className="absolute -top-6 -left-6 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-lg animate-float-y-slow hover:scale-105 transition-transform duration-200">
              <Code className="text-indigo-500 animate-pulse" size={18} />
              <div>
                <h4 className="font-heading font-semibold text-xs text-slate-900 dark:text-white leading-none mb-1">Web Stack</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Next.js & Node</p>
              </div>
            </div>

            {/* Float Badge 2 */}
            <div className="absolute -bottom-6 -right-3 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 backdrop-blur-md px-4 py-2.5 rounded-lg shadow-lg animate-float-y-slow-reverse hover:scale-105 transition-transform duration-200">
              <Palette className="text-purple-500" size={18} />
              <div>
                <h4 className="font-heading font-semibold text-xs text-slate-900 dark:text-white leading-none mb-1">UI / UX</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Modern Design</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 dark:text-slate-400 animate-bounce cursor-pointer"
        aria-label="Scroll to About"
      >
        <ChevronDown size={24} />
      </a>
    </section>
  );
}
