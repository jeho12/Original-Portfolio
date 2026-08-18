'use client';

import { useEffect, useRef, useState } from 'react';
import { Code, Layout, Database, Check } from 'lucide-react';

export default function Services() {
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

  const services = [
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Frontend Engineering',
      description: 'Crafting responsive, high-performance user interfaces with clean state architectures.',
      bullets: [
        'React & Next.js (App Router)',
        'TypeScript for type-safe codebases',
        'State Management (Zustand, Redux)',
        'Tailwind CSS & Modern Styling systems',
      ],
      color: 'from-indigo-500 to-blue-500',
      bgGlow: 'bg-indigo-500/5',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'UI/UX & Web Design',
      description: 'Bridging the gap between design and development with user-centric interfaces.',
      bullets: [
        'Figma UI design & interactive prototypes',
        'Wireframing & user flow mapping',
        'Responsive layout optimization',
        'Sleek glassmorphism & dark-mode aesthetics',
      ],
      color: 'from-purple-500 to-indigo-500',
      bgGlow: 'bg-purple-500/5',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Backend & API Development',
      description: 'Building robust, secure backends and RESTful API endpoints for integrated applications.',
      bullets: [
        'Node.js & Express servers',
        'MySQL & PostgreSQL (Prisma ORM)',
        'JSON Web Token (JWT) authentication',
        'Cloud deployment & platform integrations',
      ],
      color: 'from-purple-500 to-pink-500',
      bgGlow: 'bg-pink-500/5',
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`section py-20 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-2 text-slate-900 dark:text-white relative inline-block">
            What I Do
            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Specialized services tailored to build high-quality digital products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="glass-panel relative overflow-hidden group p-8 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md hover:-translate-y-1 hover:border-indigo-500/20 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Dynamic hover color-top border indicator */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-350`} />

              {/* Glowing Background Blob */}
              <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full ${service.bgGlow} filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Service Icon Badge */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r ${service.color} text-white shadow-md transition-all duration-300 group-hover:scale-110`}>
                  {service.icon}
                </div>

                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-3 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="flex flex-col gap-2.5 mb-2">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                        <Check size={12} />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
