'use client';

import { useEffect, useRef, useState } from 'react';
import { Layers, Sparkles, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [expandedProj, setExpandedProj] = useState<number | null>(null);

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

  const projects = [
    {
      icon: <Layers size={36} />,
      title: 'SIWES Monitoring & Evaluation System',
      category: 'Final-Year Capstone Project (2025 - Present)',
      desc: 'A secure cloud-based real-time platform serving Students, Supervisors, and Admins. Features AI-powered logbook summarization, progress tracking, and digital submission workflows.',
      tags: ['Next.js', 'TypeScript', 'Node.js', 'Express'],
      link: null,
      details: [
        'Co-authored with Olabode Victor, supervised by Dr. O. C. Uche.',
        'Frontend state managed with Zustand and async fetching using TanStack Query.',
        'Secure backend built with Node.js/Express, Prisma ORM, MySQL database, and JWT authentication.',
        'Deployed backend server on Railway Cloud platform.',
      ],
    },
    {
      icon: <Sparkles size={36} />,
      title: 'Personal Portfolio Website',
      category: 'Independent Project',
      desc: 'A responsive, premium personal portfolio website designed and built from scratch to showcase UI/UX expertise and front-end engineering proficiency.',
      tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Zustand'],
      link: 'https://jehoshaphat-ibenye.netlify.app',
      details: [
        'Optimized with custom CSS variables, interactive glassmorphic panels, and glowing gradient backgrounds.',
        'Fully responsive design using modern CSS Grid and Flexbox layouts.',
        'Features an interactive theme-toggle saving choice in localStorage.',
        'Includes intersection observers for clean scroll animations.',
      ],
    },
  ];

  const handleToggle = (idx: number) => {
    setExpandedProj(expandedProj === idx ? null : idx);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`section py-20 bg-slate-100/50 dark:bg-slate-900/40 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-2 text-slate-900 dark:text-white relative inline-block">
            Featured Projects
            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Academic work and independent projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="glass-panel bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md hover:-translate-y-1 hover:border-indigo-500/20 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Card visual banner */}
              <div className="h-[180px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-center relative">
                <div className="text-indigo-500 opacity-60">
                  {proj.icon}
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-semibold bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-1">{proj.title}</h3>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-4 block">{proj.category}</span>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">{proj.desc}</p>

                {/* Details Accordion */}
                <div
                  className={`border-l-2 border-indigo-500 bg-slate-500/5 dark:bg-white/2 rounded-r-lg text-sm text-slate-600 dark:text-slate-400 overflow-hidden transition-all duration-350 ${
                    expandedProj === idx ? 'max-h-[300px] p-4 mb-6 opacity-100' : 'max-h-0 p-0 mb-0 opacity-0'
                  }`}
                >
                  <strong className="block font-heading font-bold text-xs text-slate-900 dark:text-white mb-2">
                    Key Details:
                  </strong>
                  <ul className="list-disc pl-4 flex flex-col gap-1.5 text-xs sm:text-sm">
                    {proj.details.map((detail, dIdx) => (
                      <li key={dIdx}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions bar */}
                <div className="flex items-center justify-between border-t border-slate-200/50 dark:border-white/5 pt-4 mt-auto">
                  <button
                    onClick={() => handleToggle(idx)}
                    className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
                  >
                    {expandedProj === idx ? 'Read Less' : 'Read More'}
                    {expandedProj === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded border border-slate-200 dark:border-white/5 text-xs font-heading font-medium hover:bg-indigo-500/5 hover:border-indigo-500 text-slate-900 dark:text-white transition-all duration-200"
                    >
                      Live Demo <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
