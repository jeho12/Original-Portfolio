'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText } from 'lucide-react';
import { portfolioConfig } from '../config/portfolio';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const education = [
    {
      date: '2022 — 2026',
      title: 'BSc Computer Science',
      org: 'Anchor University, Lagos',
      desc: 'Graduated with a focus on cloud systems and AI-assisted evaluation tools. Developed capstone projects implementing modern web stacks.',
    },
    {
      date: '2016 — 2022',
      title: 'Senior Secondary Certificate (SSCE)',
      org: "King's College, Lagos",
      desc: 'Graduated from the Science department with strong analytical and problem-solving foundations.',
    },
    {
      date: '2010 — 2016',
      title: 'Primary Education',
      org: 'Destiny Seed Primary School',
      desc: 'Placed among the top 3 best results in the National Common Entrance examination and selected for scholarship examinations.',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`section py-20 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-2 text-slate-900 dark:text-white relative inline-block">
            About Me
            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Bridging functional engineering and pixel-perfect design
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Card */}
          <div className="flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              {/* Profile Photo Wrapper */}
              <div className="relative group w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-900">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-45 transition duration-300" />
                {portfolioConfig.contact.profileImage ? (
                  <img
                    src={portfolioConfig.contact.profileImage}
                    alt={portfolioConfig.name}
                    className="relative w-full h-full object-cover rounded-2xl grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="relative w-full h-full flex items-center justify-center rounded-2xl font-bold text-3xl bg-slate-200 dark:bg-slate-800 text-indigo-500">
                    {portfolioConfig.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                )}
              </div>
              
              <div className="text-center sm:text-left flex-grow">
                <h3 className="font-heading font-bold text-2xl relative pb-2 text-slate-900 dark:text-white inline-block">
                  Who I Am
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 w-8 h-0.5 bg-indigo-500" />
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-3">
                  Computer Science Graduate bridging the gap between functional code and pixel-perfect design.
                </p>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              I am a recent <strong className="text-slate-800 dark:text-slate-200">Computer Science Graduate</strong> from Anchor University, Lagos. With a deep foundation in computer systems and a passion for frontend aesthetics, I specialize in creating fast, intuitive, and accessible user experiences on the web.
            </p>
            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              My skills span the full lifecycle of software production—starting from wireframes and Figma designs in the <strong className="text-slate-800 dark:text-slate-200">UI/UX stage</strong>, through structured engineering in <strong className="text-slate-800 dark:text-slate-200">React/Next.js/TypeScript</strong>, up to backend systems with <strong className="text-slate-800 dark:text-slate-200">Node.js, Prisma, and relational databases</strong>.
            </p>

            <div className="grid grid-cols-1 gap-4 border-t border-slate-200 dark:border-white/5 pt-6 font-medium text-sm">
              <div className="flex gap-4">
                <span className="text-slate-800 dark:text-slate-200 w-24">Location:</span>
                <span className="text-slate-500 dark:text-slate-400">{portfolioConfig.contact.location}</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-800 dark:text-slate-200 w-24">Email:</span>
                <span className="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
                  <a href={`mailto:${portfolioConfig.contact.email}`}>{portfolioConfig.contact.email}</a>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-800 dark:text-slate-200 w-24">Degree:</span>
                <span className="text-slate-500 dark:text-slate-400">BSc Computer Science</span>
              </div>
            </div>

            {portfolioConfig.contact.cvUrl && (
              <div className="mt-8">
                <a
                  href={portfolioConfig.contact.cvUrl}
                  download="Jehoshaphat_Ibenye_CV.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-heading font-medium hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
                >
                  Download CV <FileText size={18} />
                </a>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div>
            <h3 className="font-heading font-bold text-2xl mb-6 relative pb-2 text-slate-900 dark:text-white">
              Education Timeline
              <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500" />
            </h3>
            
            <div className="relative pl-6 border-l-2 border-slate-200 dark:border-white/5">
              {education.map((item, index) => (
                <div key={index} className="relative mb-8 last:mb-0">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-white dark:border-[#080b11]" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mb-1 sm:mb-0">
                      {item.date}
                    </span>
                    <h4 className="font-heading font-semibold text-lg text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 font-medium mb-1">
                    {item.org}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
