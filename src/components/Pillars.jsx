import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DashboardTelemetry from './DashboardTelemetry';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Pillars() {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const pillars = [
    {
      badge: 'AGENTIC AI & ENTERPRISE AUTOMATION',
      title: 'Hyper-Automation & Agents',
      description: 'Replacing complex manual overhead with self-executing workflows.',
      body: 'Our core focus resides in Enterprise SaaS, generative AI, and agentic workflows. By deploying advanced NLP and Large Language Models (LLMs), we systematically eliminate entire tiers of administrative, legal, and operational overhead, accelerating execution from days to milliseconds.'
    },
    {
      badge: 'COMPUTER VISION & AI ANALYTICS',
      title: 'Scale & Vision',
      description: 'Deep neural networks translating visual streams into actionable data.',
      body: 'We deploy cutting-edge Computer Vision (CV) and Deep Learning (DL) architectures inside high-output environments. From massive-scale autonomous quality control on manufacturing lines to automated port logistics and deeply integrated real-time supply chain tracking, we make systems see and react.'
    },
    {
      badge: 'AUTONOMOUS INDUSTRIAL INTELLIGENCE',
      title: 'Predictive & Robotic',
      description: 'Preventative diagnostics and mechanical precision for industrial sectors.',
      body: 'Designed to tackle the challenges of an aging workforce, we leverage Machine Learning (ML) to power predictive maintenance for heavy machinery. By pairing it with advanced robotics, we ensure zero downtime, continuous output, and safe operational continuity in critical industrial sectors.'
    }
  ];

  useEffect(() => {
    const section = containerRef.current;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    let pinTrigger;

    const initScrollTrigger = () => {
      if (mediaQuery.matches) {
        pinTrigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=200%', // 3 panels = 200% scroll distance
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            setScrollProgress(progress);

            // Map scroll progress to active step
            if (progress <= 0.33) {
              setActiveStep(0);
            } else if (progress > 0.33 && progress <= 0.66) {
              setActiveStep(1);
            } else {
              setActiveStep(2);
            }
          }
        });
      } else {
        setActiveStep(0);
        setScrollProgress(0);
      }
    };

    initScrollTrigger();

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => {
      if (pinTrigger) {
        pinTrigger.kill();
        pinTrigger = null;
      }
      initScrollTrigger();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (pinTrigger) pinTrigger.kill();
      window.removeEventListener('resize', handleResize);
      clearTimeout(refreshTimer);
    };
  }, []);

  return (
    <div className="gsap-pin-wrapper">
      <section ref={containerRef} id="about" className="relative lg:h-screen w-full bg-transparent lg:overflow-hidden flex items-center py-16 lg:py-0">
      
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Mobile-only Section Title */}
        <div className="mb-8 block lg:hidden text-center sm:text-left">
          <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase font-sans">
            Interactive Telemetry
          </span>
          <h3 className="text-2xl font-bold text-slate-800 font-sans mt-1">
            Visualizing Structural Focus
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive UI Telemetry Dashboard (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center w-full">
            <div className="mb-4">
              <span className="text-brand-orange text-xs font-semibold tracking-widest uppercase font-sans">
                Interactive Telemetry
              </span>
              <h3 className="text-xl font-bold text-slate-800 font-sans mt-1">
                Visualizing Structural Focus
              </h3>
            </div>
            <DashboardTelemetry activeStep={activeStep} />
          </div>

          {/* Right Column: Scroll-Revealed Text Cards */}
          <div ref={textContainerRef} className="lg:col-span-6 relative lg:h-[380px] h-auto flex items-center mt-8 lg:mt-0">
            
            {/* Progress bar line indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200 pointer-events-none hidden lg:block">
              <div 
                className="w-full bg-brand-orange transition-all duration-75 origin-top"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Stepped content blocks */}
            <div className="w-full lg:pl-8 flex flex-col">
              {pillars.map((pillar, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={idx}
                    className={`transition-all duration-700 ease-out w-full lg:absolute lg:inset-0 lg:left-8 lg:flex lg:flex-col lg:justify-center mb-12 lg:mb-0 ${
                      isActive 
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
                        : 'lg:opacity-0 lg:translate-y-6 lg:scale-95 lg:pointer-events-none'
                    } ${isActive ? 'block' : 'block lg:hidden'}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold font-sans flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 font-sans border border-slate-200 px-3 py-1 rounded-full bg-white">
                        {pillar.badge}
                      </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 font-sans tracking-tight">
                      {pillar.title}
                    </h2>
                    
                    <h4 className="text-base font-medium text-brand-orange/90 mb-4 font-sans">
                      {pillar.description}
                    </h4>

                    <p className="text-slate-600 font-serif leading-relaxed text-base sm:text-lg">
                      {pillar.body}
                    </p>

                    {/* Mobile-only inline telemetry dashboard */}
                    <div className="block lg:hidden mt-6 w-full">
                      <DashboardTelemetry activeStep={idx} />
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
    </div>
  );
}
