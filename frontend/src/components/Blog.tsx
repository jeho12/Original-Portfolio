'use client';

import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ArrowRight, X, BookOpen } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  glow: string;
}

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
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

  const articles: Article[] = [
    {
      id: 1,
      title: 'Building Secure & Scalable SIWES Monitoring Portals',
      category: 'Case Study',
      summary: 'An inside look at the technical decisions, architecture patterns, and optimizations made while co-authoring the final-year capstone project.',
      content: `As part of my final-year capstone project, Olabode Victor and I developed a secure cloud-based real-time platform serving Students, Industry Supervisors, and University Admins. The system manages the Student Industrial Work Experience Scheme (SIWES) in Nigeria, digitizing logbooks and progress monitoring.

### The Architecture
We designed the platform using a modern, decoupled architecture. The frontend is powered by Next.js and TypeScript, using Zustand for state management and Tailwind CSS for utility-first styling. The backend is built on Node.js and Express, connected to a MySQL database through Prisma ORM.

### Challenges & Solutions
One of the main challenges was ensuring offline capabilities for students in remote areas. We solved this by using local storage synchronization that syncs logbook entries back to the database once connectivity is restored. To prevent fake logs, we implemented an AI-powered progress tracker that analyzes text submission updates and detects anomalies.`,
      date: 'Aug 15, 2026',
      readTime: '5 min read',
      glow: 'from-indigo-500/10 to-purple-500/10',
    },
    {
      id: 2,
      title: 'Migrating to Tailwind v4: Performance & New Syntax',
      category: 'Technical Guide',
      summary: 'Exploring the new CSS-first configuration, performance improvements, and utility changes in Tailwind CSS v4.',
      content: `Tailwind CSS v4 introduces a ground-up rewrite that leverages modern build tooling and shifts configurations into CSS imports rather than a javascript configuration file. Here are our key insights from migrating this portfolio to Tailwind v4.

### The CSS-First Paradigm
In v4, instead of a \`tailwind.config.js\`, variables and themes are defined using standard \`@theme\` declarations inside the main CSS file. This makes configuration much more intuitive and keeps style definitions close to native CSS custom properties.

### Performance Upgrades
The compiler is now incredibly fast, thanks to Rust-based optimizations. Dev builds load instantly, and production builds compile in milliseconds, creating a much better development experience for large-scale projects.`,
      date: 'Aug 08, 2026',
      readTime: '4 min read',
      glow: 'from-purple-500/10 to-pink-500/10',
    },
    {
      id: 3,
      title: 'The Art of Glassmorphic UI: Bridging UI/UX & Web Dev',
      category: 'UI/UX Design',
      summary: 'A deep dive into building beautiful, accessible glassmorphic cards using CSS backdrop-filters, borders, and shadows.',
      content: `Glassmorphism has become a hallmark of premium, high-fidelity user interfaces. Done right, it creates a sense of depth, hierarchy, and tactile premium styling. Done wrong, it looks cluttered and breaks accessibility.

### The Recipe for Clean Glassmorphism
To create a clean glass panel, you need a combination of three properties:
1. A semi-transparent background color (e.g. \`rgba(255, 255, 255, 0.4)\` for light mode, \`rgba(15, 23, 42, 0.45)\` for dark mode).
2. A subtle \`backdrop-filter: blur(12px) saturate(180%)\` to diffuse elements underneath.
3. A very thin, high-contrast border (e.g., \`rgba(255, 255, 255, 0.06)\`) to catch the light and define borders.

### Accessibility Matters
Always ensure that text placed on glassmorphic panels has sufficient contrast against whatever background blobs or images float underneath it. We achieve this by adding solid fallback backgrounds on elements that do not support backdrop filters.`,
      date: 'Jul 28, 2026',
      readTime: '6 min read',
      glow: 'from-blue-500/10 to-indigo-500/10',
    },
  ];

  return (
    <section
      id="blog"
      ref={sectionRef}
      className={`section py-20 bg-slate-100/50 dark:bg-slate-900/40 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="w-[90%] max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl mb-2 text-slate-900 dark:text-white relative inline-block">
            Technical Insights
            <span className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
            Technical write-ups, design notes, and software engineering case studies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="glass-panel bg-white/40 dark:bg-slate-950/40 border border-slate-200/50 dark:border-white/5 shadow-md hover:-translate-y-1 hover:border-indigo-500/20 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Cover Gradient Placeholder */}
              <div className={`h-[140px] bg-gradient-to-br ${article.glow} border-b border-slate-200/50 dark:border-white/5 flex items-center justify-center relative`}>
                <BookOpen className="w-10 h-10 text-indigo-500 opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 px-2 py-1 rounded text-slate-700 dark:text-slate-300 backdrop-blur-sm shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Card Action */}
                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center justify-center gap-1 w-full py-2.5 rounded-lg border border-slate-200 dark:border-white/5 text-xs font-heading font-medium hover:bg-indigo-500/5 hover:border-indigo-500 text-slate-900 dark:text-white transition-all duration-200"
                >
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel w-full max-w-[700px] max-h-[85vh] bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-500 px-2.5 py-1 rounded">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-grow scrollbar-thin">
              <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {activeArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {activeArticle.readTime}
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white mb-6 leading-tight">
                {activeArticle.title}
              </h2>

              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm sm:text-base space-y-4 leading-relaxed">
                {activeArticle.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white pt-4 pb-1">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-1.5">
                        {paragraph.split('\n').map((item, idx) => (
                          <li key={idx}>{item.replace(/^[-*]\s+/, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  // Render standard paragraphs
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200/50 dark:border-white/5 bg-slate-50 dark:bg-slate-900/30 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-heading text-xs font-medium hover:scale-[1.01] active:scale-95 transition-all duration-200"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
