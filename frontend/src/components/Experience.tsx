'use client';

import { useEffect, useRef, useState } from 'react';

export default function Experience() {
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

  const experiences = [
    {
      role: 'Front-End Developer',
      org: 'Anchor University, Lagos',
      date: 'Jan 2022 — Jun 2023',
      badge: 'Professional',
      badgeStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      bullets: [
        'Translated Figma design mockups into pixel-perfect, mobile-friendly, and responsive web pages.',
        'Collaborated closely with system administrators to ensure UI consistency and high-speed page loading.',
        'Focused on usability principles, structural search optimization, and seamless user experiences across various browser interfaces.',
      ],
    },
    {
      role: 'Head Usher (2 Tenures)',
      org: 'Anchor University, Lagos',
      date: 'Event Team Lead',
      badge: 'Leadership',
      badgeStyle: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      bullets: [
        'Coordinated event readiness, venue logistics, and crowd management strategies across two tenures.',
        'Demonstrated exceptional communication skills, coordinating seamlessly with guests, organizers, and university officials.',
        'Dedicated personal time to mentor and build ushering team members spiritually, academically, and career-wise.',
        'Led and motivated a team of 15+ members to achieve perfect operational execution under tight schedules.',
      ],
    },
    {
      role: 'Certified NACOS Member',
      org: 'National Association of Computer Science Students',
      date: 'Certified Member',
      badge: 'Certification',
      badgeStyle: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20',
      bullets: [
        'Certified active member holding the official association Identification Card.',
        'Participated in departmental tech symposiums, code jams, and networking events aimed at boosting student collaboration.',
        'Collaborated on study groups and peer tutoring to support junior computer science students.',
      ],
    },
    {
      role: 'Impact & Community Volunteer',
      org: 'Various Impact Events',
      date: 'Community Service',
      badge: 'Volunteering',
      badgeStyle: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
      bullets: [
        'Volunteered for multiple impactful events focused on youth empowerment, character development, and societal transformation.',
        'Managed event logistics, registrations, and operations, earning certificates of recognition for outstanding service.',
        'Helped build environments where hundreds of attendees were empowered and transformed to drive positive change in their communities.',
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`section py-20 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-2 text-slate-900 dark:text-white relative inline-block">
            Work & Leadership
            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Real-world experience and team leadership roles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mx-auto">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md hover:border-indigo-500/20 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between"
            >
              <span className={`absolute top-6 right-8 text-xs font-semibold px-2.5 py-0.5 rounded-full ${exp.badgeStyle}`}>
                {exp.badge}
              </span>

              <div className="mb-6 pr-24">
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-1">{exp.role}</h3>
                <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold block mb-2">{exp.org}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{exp.date}</span>
              </div>

              <ul className="list-disc pl-5 flex flex-col gap-3">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
