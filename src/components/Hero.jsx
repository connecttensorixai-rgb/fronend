import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AnimatedText } from '@/components/ui/animated-shiny-text';

export default function Hero() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const badgeRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Hero layout sections sequentially
      const tl = gsap.timeline();
      tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.85, y: -10 }, { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' })
        .fromTo([title1Ref.current, title2Ref.current], 
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power4.out' },
          '-=0.5'
        )
        .fromTo(descRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
        .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-24 overflow-hidden bg-transparent">
      
      {/* Background Gradients & Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] glow-orange rounded-full pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] glow-blue rounded-full pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Subtitle Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-semibold tracking-wider uppercase mb-8 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
          NEXT-GENERATION ENTERPRISE AI PLATFORM
        </div>

        {/* Screen-reader accessible Heading */}
        <h1 className="sr-only">
          TensorixAI - Hyper-Automation, Computer Vision, and Industrial Machine Learning
        </h1>
        
        <div aria-hidden="true" className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 font-sans max-w-4xl leading-tight">
          <span ref={title1Ref} className="block opacity-0">
            Empowering Systems With
          </span>
          <AnimatedText
            ref={title2Ref}
            text="Agentic Intelligence"
            className="py-0 block opacity-0"
            textClassName="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight text-glow"
          />
        </div>

        {/* Times New Roman / Editorial styled description */}
        <p ref={descRef} className="text-lg md:text-xl text-slate-700 max-w-2xl font-serif leading-relaxed mb-10 opacity-0">
          TensorixAI empowers enterprises to deploy AI-driven systems that automate complex workflows, optimize operations in real time, and unlock actionable intelligence across the organization. From manufacturing and logistics to finance, healthcare, retail, and smart infrastructure, our AI agents deliver measurable business outcomes with speed, precision, and scale. 
        </p>


        {/* Value metrics or status bar */}
        <div ref={statsRef} className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-slate-200 pt-10 w-full max-w-3xl opacity-0">
          <div>
            <div className="text-3xl md:text-4xl font-bold font-sans text-brand-orange">90%</div>
            <div className="text-xs text-slate-500 font-serif uppercase tracking-wider mt-1">Reduction in Repetitive Tasks</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold font-sans text-slate-800">50M+</div>
            <div className="text-xs text-slate-500 font-serif uppercase tracking-wider mt-1">Automated Actions Executed</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl md:text-4xl font-bold font-sans text-brand-blue">15x</div>
            <div className="text-xs text-slate-500 font-serif uppercase tracking-wider mt-1">Faster Decision Intelligence</div>
          </div>
        </div>
      </div>
    </section>
  );
}
