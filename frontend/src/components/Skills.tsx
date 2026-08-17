'use client';

import { useEffect, useRef, useState } from 'react';
import { Palette, LayoutTemplate, Server, Check } from 'lucide-react';

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Wait a fraction of a second to start progress bar fills
          setTimeout(() => setStartAnimation(true), 300);
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

  const categories = [
    {
      icon: <Palette size={24} />,
      title: 'Design & UI/UX',
      desc: 'Creating highly functional wireframes and interactive layouts.',
      skills: ['UI/UX Design', 'Responsive Design', 'Figma Prototyping', 'Accessibility (a11y)'],
    },
    {
      icon: <LayoutTemplate size={24} />,
      title: 'Front-End',
      desc: 'Building scalable, stateful, and interactive clients.',
      skills: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Zustand / State Mgmt'],
    },
    {
      icon: <Server size={24} />,
      title: 'Back-End & DB',
      desc: 'Designing APIs and structuring relational data layers.',
      skills: ['Node.js / Express', 'MySQL / Relational DBs', 'Prisma ORM', 'JWT / Auth Systems'],
    },
  ];

  const progressSkills = [
    { name: 'Frontend (Next.js, React, TS)', percentage: 90 },
    { name: 'UI/UX Design & Prototyping', percentage: 85 },
    { name: 'Backend Engineering (Node.js, Express)', percentage: 75 },
    { name: 'Database & ORM (MySQL, Prisma)', percentage: 70 },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`section py-20 bg-slate-100/50 dark:bg-slate-900/40 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-2 text-slate-900 dark:text-white relative inline-block">
            My Tech Stack
            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Technologies and methodologies I leverage daily
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md hover:-translate-y-2 hover:border-indigo-500/30 hover:shadow-lg dark:hover:shadow-indigo-500/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6">
                {cat.icon}
              </div>
              <h3 className="font-heading font-bold text-xl mb-2 text-slate-900 dark:text-white">{cat.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{cat.desc}</p>
              <ul className="flex flex-col gap-3">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500">
                      <Check size={12} />
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="glass-panel p-8 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md">
          <h3 className="font-heading font-bold text-xl mb-8 text-center text-slate-900 dark:text-white">Expertise Map</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {progressSkills.map((pSkill, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="flex justify-between text-sm font-medium text-slate-800 dark:text-slate-200">
                  <span>{pSkill.name}</span>
                  <span>{pSkill.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: startAnimation ? `${pSkill.percentage}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
