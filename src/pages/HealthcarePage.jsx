import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Database, Network, ShieldAlert } from 'lucide-react';
import img1 from '../assets/healthcare_stock_1.png';
import img2 from '../assets/healthcare_stock_2.png';
import img3 from '../assets/healthcare_stock_3.png';

gsap.registerPlugin(ScrollTrigger);

export default function HealthcarePage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Animation - Palantir style stark reveal
      gsap.from('.hero-element', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });

      // Sticky Scrollytelling Images
      const sections = gsap.utils.toArray('.scroll-step');
      const images = gsap.utils.toArray('.sticky-img');
      const indicators = gsap.utils.toArray('.step-indicator');

      if (images.length > 0) {
        gsap.set(images, { opacity: 0, scale: 1.05 });
        gsap.set(images[0], { opacity: 1, scale: 1 });

        sections.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => transitionImage(index),
            onEnterBack: () => transitionImage(index),
          });
        });

        function transitionImage(index) {
          // Transition images
          gsap.to(images, { opacity: 0, scale: 1.05, duration: 0.8, ease: 'power2.inOut' });
          if (images[index]) {
            gsap.to(images[index], { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' });
          }

          // Transition indicators
          gsap.to(indicators, { width: '2rem', backgroundColor: '#e2e8f0', duration: 0.3 });
          if (indicators[index]) {
            gsap.to(indicators[index], { width: '4rem', backgroundColor: '#0f172a', duration: 0.3 });
          }
        }
      }

      // Fade in text for each step and dim inactive ones
      sections.forEach((step) => {
        gsap.set(step, { opacity: 0.2 }); // Initial dimmed state

        const textElements = step.querySelectorAll('.step-element');

        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(step, { opacity: 1, duration: 0.4, ease: 'power2.out' });
              gsap.to(textElements, { y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', overwrite: 'auto' });
            } else {
              gsap.to(step, { opacity: 0.2, duration: 0.4, ease: 'power2.out' });
              gsap.to(textElements, { y: 10, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
            }
          }
        });
      });

      // Reveal features grid
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-grid',
          start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-white text-slate-900 pt-24 pb-20 selection:bg-slate-900 selection:text-white font-sans">

      {/* Palantir-style Grid Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 border-b border-slate-200">
        <div className="mb-6 hero-element">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">
            Tensorix Healthcare
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8 hero-element">
          {/* <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 text-white flex items-center justify-center rounded-2xl shadow-md shrink-0">
            <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-14 md:h-14 text-white fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 50,20 L 50,80" />
              <path d="M 20,50 L 80,50" />
              <circle cx="50" cy="50" r="38" strokeDasharray="18 12" />
              <circle cx="50" cy="50" r="4" fill="currentColor" />
            </svg>
          </div> */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.05] max-w-5xl">
            The AI-powered smart System for Modern Clinical Intelligence.
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl hero-element font-light leading-relaxed">
          Unify hospital data streams, automate clinical workflows, and empower physicians with real-time AI analytics.
        </p>
      </div>

      {/* Scrollytelling Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 relative">

          {/* Left Content (Scrolls) */}
          <div className="w-full md:w-1/2 py-8 md:py-[10vh]">

            <div className="scroll-step relative pl-8 border-l border-slate-200 min-h-[75vh] flex flex-col justify-center">
              {/* Monospace step marker */}
              <div className="absolute top-0 -left-[1px] w-[2px] h-full bg-slate-900 origin-top scale-y-0 step-progress hidden"></div>

              <div className="mb-4 step-element">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">Module 01</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6 step-element">Connected Clinical Care</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 step-element">
                Seamlessly integrating AI into daily hospital operations. Our platform bridges the gap between patient data and actionable medical insights, providing doctors with an unbroken chain of clinical intelligence.
              </p>

              {/* Mobile-only inline image */}
              <div className="block md:hidden my-6 h-60 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img src={img1} alt="Connected Clinical Care" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[0.2]" />
              </div>

              <div className="grid grid-cols-1 gap-4 step-element">
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <Database className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Data Integration</h4>
                    <p className="text-sm text-slate-500 mt-1">Unified pipelines for EMR and continuous telemetry.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-step relative pl-8 border-l border-slate-200 min-h-[75vh] flex flex-col justify-center">
              <div className="mb-4 step-element">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">Module 02</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6 step-element">Precision Diagnostics</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 step-element">
                Tensorix leverages advanced deep learning to support early detection. Our computer vision models analyze radiology scans, CTs, and MRIs, empowering healthcare providers with faster, more accurate clinical insights.
              </p>

              {/* Mobile-only inline image */}
              <div className="block md:hidden my-6 h-60 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img src={img2} alt="Precision Diagnostics" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[0.2]" />
              </div>

              <div className="grid grid-cols-1 gap-4 step-element">
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <Network className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Predictive Risk</h4>
                    <p className="text-sm text-slate-500 mt-1">Real-time neural networks identifying early deterioration.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="scroll-step relative pl-8 border-l border-slate-200 min-h-[75vh] flex flex-col justify-center">
              <div className="mb-4 step-element">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">Module 03</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6 step-element">Empowering Physicians</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 step-element">
                Because in healthcare, every second—and every decision—matters. Our unified interface reduces operational burden, giving doctors more time to focus on what truly matters: caring for their patients.
              </p>

              {/* Mobile-only inline image */}
              <div className="block md:hidden my-6 h-60 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <img src={img3} alt="Empowering Physicians" className="w-full h-full object-cover filter contrast-[1.05] grayscale-[0.2]" />
              </div>

              <div className="p-6 border border-slate-900 bg-slate-900 text-white step-element">
                <p className="font-medium text-lg leading-relaxed">
                  "Scaling operational efficiency by 15x while reducing patient wait times and improving overall treatment outcomes."
                </p>
              </div>
            </div>

          </div>

          {/* Right Image (Sticky Track) */}
          <div className="hidden md:block md:w-1/2 relative">
            <div className="md:sticky md:top-32 flex flex-col gap-6">
              <div className="h-[400px] md:h-[600px] w-full border border-slate-200 bg-slate-100 relative overflow-hidden rounded-3xl shadow-sm">
                <img src={img1} alt="Hospital Operations" className="sticky-img absolute inset-0 w-full h-full object-cover filter contrast-[1.05] grayscale-[0.2]" />
                <img src={img2} alt="Medical Diagnostics" className="sticky-img absolute inset-0 w-full h-full object-cover filter contrast-[1.05] grayscale-[0.2]" />
                <img src={img3} alt="Physician Empowerment" className="sticky-img absolute inset-0 w-full h-full object-cover filter contrast-[1.05] grayscale-[0.2]" />

                {/* Viewport UI overlays */}
                <div className="absolute top-4 left-4 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-white border border-slate-200"></div>
                  <div className="w-1.5 h-1.5 bg-white border border-slate-200"></div>
                  <div className="w-1.5 h-1.5 bg-white border border-slate-200"></div>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex gap-2 items-center">
                <div className="step-indicator h-1 w-8 bg-slate-900 transition-all"></div>
                <div className="step-indicator h-1 w-8 bg-slate-200 transition-all"></div>
                <div className="step-indicator h-1 w-8 bg-slate-200 transition-all"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Outcomes Grid - Stark & Minimal */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200">
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-4">Operational Impact</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">Measurable Clinical Outcomes.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-200 features-grid">
          {[
            {
              title: 'Accelerated Diagnosis',
              desc: 'AI-assisted triage accelerates treatment decisions and identifies critical patient needs instantly, reducing diagnostic latency.',
              metric: '-40%',
              label: 'Time to Diagnosis'
            },
            {
              title: 'Resource Optimization',
              desc: 'Optimized hospital workflow and intelligent patient routing maximizes resource utilization and ICU bed availability.',
              metric: '+15x',
              label: 'Efficiency Scaling'
            },
            {
              title: 'Risk Mitigation',
              desc: 'Predictive alerting for patient deterioration reduces adverse events and lowers operational overhead through automation.',
              metric: '99.9%',
              label: 'System Reliability'
            }
          ].map((item, idx) => (
            <div key={idx} className="feature-card p-10 border-b border-r border-slate-200 bg-white hover:bg-slate-50 transition-colors group">
              <div className="mb-12 font-mono text-4xl font-light tracking-tighter text-slate-900">
                {item.metric}
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-3">{item.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{item.desc}</p>
              <div className="font-mono text-[9px] font-bold tracking-widest text-slate-400 uppercase pt-4 border-t border-slate-100 group-hover:text-slate-600 transition-colors">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
