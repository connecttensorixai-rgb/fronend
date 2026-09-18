import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from '@/components/ui/animated-shiny-text';
import { Sprout, ArrowRight } from 'lucide-react';
import AgricultureTrends from '@/components/AgricultureTrends';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


export default function AgriculturePage() {
  const containerRef = useRef(null);
  const heroBadgeRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const uspRef = useRef(null);
  const ctaRef = useRef(null);
  const floatIconRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Animation
      const tl = gsap.timeline();
      tl.fromTo(floatIconRef.current,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)', delay: 0.1 })
        .fromTo(heroBadgeRef.current,
          { opacity: 0, scale: 0.85, y: -10 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
          '-=0.5'
        )
        .fromTo(heroTitleRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(heroDescRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );

      // Floating animation loop for the 3D icon
      if (floatIconRef.current) {
        gsap.to(floatIconRef.current, {
          y: '+=15',
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }



      // USP Animation
      gsap.fromTo(uspRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: uspRef.current,
            start: 'top 85%',
          }
        }
      );

      // CTA Animation
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative min-h-[100dvh]">

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-32 relative">

        {/* Floating Geometric Logo Tile */}
        <div ref={floatIconRef} className="flex justify-center mb-8 opacity-0">
          {/* <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 text-white flex items-center justify-center rounded-2xl shadow-md">
            <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-14 md:h-14 text-white fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" strokeDasharray="15 8" strokeWidth="4" />
              <line x1="50" y1="25" x2="50" y2="75" />
              <path d="M 50,65 L 70,45" />
              <path d="M 50,50 L 30,30" />
              <path d="M 50,45 L 70,25" strokeWidth="5" />
              <path d="M 50,60 L 30,40" strokeWidth="5" />
              <circle cx="50" cy="75" r="4" fill="currentColor" />
            </svg>
          </div> */}
        </div>

        <div ref={heroBadgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-6 opacity-0">
          <Sprout className="w-4 h-4" />
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
          Precision Farming
        </div>

        <h1 ref={heroTitleRef} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 font-sans leading-tight opacity-0">
          Powered By{' '}
          <AnimatedText
            text="Artificial Intelligence"
            className="py-0 inline-block"
            textClassName="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-glow"
          />
        </h1>

        <p ref={heroDescRef} className="text-lg md:text-xl text-slate-600 font-serif leading-relaxed max-w-2xl mx-auto opacity-0">
          Tensorix AI helps modern agriculture businesses improve crop productivity, monitor farm health, and automate agricultural operations using AI, ML, Computer Vision, satellite analytics, and predictive intelligence.
        </p>
      </div>



      {/* Core Capabilities */}
      <AgricultureTrends />

      {/* USP Section */}
      <div ref={uspRef} className="mt-24 md:mt-32 max-w-4xl mx-auto text-center opacity-0">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 font-sans italic mb-4">
          "AI-powered precision agriculture for smarter, faster, and sustainable farming."
        </h2>
      </div>

      {/* CTA Section */}
      {/* <div ref={ctaRef} className="mt-16 md:mt-24 max-w-5xl mx-auto glass-card rounded-3xl border border-slate-200/60 p-8 md:p-12 relative overflow-hidden text-center opacity-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-orange/5 pointer-events-none" />
        <div className="relative z-10">
          <div className="mx-auto w-20 h-20 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center mb-6 transform transition-transform duration-500 hover:rotate-6 hover:scale-110">
            <Sprout className="w-10 h-10 text-brand-orange" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Transform Agricultural Operations</h2>
          <p className="text-slate-600 font-serif max-w-xl mx-auto mb-8 text-lg">
            Transform agricultural operations with AI-driven farm intelligence and predictive farming solutions.
          </p>
          <a href="#/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div> */}
    </div>
  );
}
