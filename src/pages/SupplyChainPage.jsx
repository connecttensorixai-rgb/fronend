import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Map, Truck, Globe, LineChart, Users, Warehouse, ShoppingCart, Box } from 'lucide-react';
import { AnimatedText } from '@/components/ui/animated-shiny-text';
import SupplyChainTelemetry from '../components/SupplyChainTelemetry';

gsap.registerPlugin(ScrollTrigger);

export default function SupplyChainPage() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

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

      // Sticky Scrollytelling
      const sections = gsap.utils.toArray('.scroll-step');
      const indicators = gsap.utils.toArray('.step-indicator');

      // Fade in text for each step and dim inactive ones, while tracking active step for 3D Camera
      sections.forEach((step, index) => {
        gsap.set(step, { opacity: 0.2 }); // Initial dimmed state

        const textElements = step.querySelectorAll('.step-element');

        ScrollTrigger.create({
          trigger: step,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveStep(index);
              gsap.to(step, { opacity: 1, duration: 0.4, ease: 'power2.out' });
              gsap.to(textElements, { y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', overwrite: 'auto' });

              // Indicator update
              gsap.to(indicators, { width: '2rem', backgroundColor: '#e2e8f0', duration: 0.3 });
              if (indicators[index]) {
                gsap.to(indicators[index], { width: '4rem', backgroundColor: '#0f172a', duration: 0.3 });
              }
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

      <Helmet>
        <title>Supply Chain Intelligence | Tensorix AI</title>
        <meta name="keywords" content="AI supply chain platform, logistics intelligence software, warehouse automation AI, supply chain analytics, AI demand forecasting, procurement intelligence platform" />
        <meta name="description" content="Tensorix AI provides end-to-end supply chain visibility with AI-powered logistics intelligence, warehouse optimization, procurement automation, and predictive demand forecasting." />
      </Helmet>

      {/* Palantir-style Grid Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 border-b border-slate-200">
        {/* <div className="mb-6 hero-element">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Tensorix Supply Chain
          </span>
        </div> */}
        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 mb-8 hero-element leading-[1.05] max-w-5xl">
          Autonomous <AnimatedText text="Supply Chain" className="inline-flex py-0 m-0 align-bottom" textClassName="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]" /> Intelligence Platform.
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl hero-element font-light leading-relaxed mb-12">
          Tensorix AI provides end-to-end supply chain visibility with AI-powered logistics intelligence, warehouse optimization, procurement automation, and predictive demand forecasting.
        </p>

        <div className="hero-element p-6 border border-slate-900 bg-slate-900 text-white max-w-2xl inline-block">
          <p className="font-medium text-lg md:text-xl leading-relaxed">
            "Tensorix AI transforms fragmented supply chains into autonomous, intelligent operational ecosystems."
          </p>
        </div>
      </div>

      {/* Scrollytelling Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 border-b border-slate-200">
        <div className="flex flex-col md:flex-row gap-16 relative">

          {/* Left Content (Scrolls) */}
          <div className="w-full md:w-1/2 py-8 md:py-[10vh]">

            {/* MODULE 01 */}
            <div className="scroll-step relative pl-8 border-l border-slate-200 min-h-[75vh] flex flex-col justify-center">
              <div className="mb-4 step-element">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">Module 01</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6 step-element">Global Logistics & Visibility</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 step-element">
                Create centralized operational visibility across suppliers, warehouses, procurement, and logistics networks. Monitor shipments, vehicles, and movements in real time.
              </p>

              {/* Mobile-only inline telemetry */}
              <div className="block md:hidden my-6 h-[300px] sm:h-[350px] w-full relative z-10">
                <SupplyChainTelemetry activeStep={0} />
              </div>

              <div className="grid grid-cols-1 gap-4 step-element">
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <Truck className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Real-Time Tracking</h4>
                    <p className="text-sm text-slate-500 mt-1">Faster delivery visibility & reduced shipment delays.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <Map className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Logistics Optimization</h4>
                    <p className="text-sm text-slate-500 mt-1">Optimize transportation routes and fleet operations.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 02 */}
            <div className="scroll-step relative pl-8 border-l border-slate-200 min-h-[75vh] flex flex-col justify-center">
              <div className="mb-4 step-element">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">Module 02</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6 step-element">Predictive Intelligence</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 step-element">
                Leverage AI and predictive analytics to forecast customer demand, anticipate disruptions, and analyze supplier performance in real time.
              </p>

              {/* Mobile-only inline telemetry */}
              <div className="block md:hidden my-6 h-[300px] sm:h-[350px] w-full relative z-10">
                <SupplyChainTelemetry activeStep={1} />
              </div>

              <div className="grid grid-cols-1 gap-4 step-element">
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <LineChart className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Demand Forecasting</h4>
                    <p className="text-sm text-slate-500 mt-1">Prevent stock shortages and reduce excess inventory.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <Users className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Vendor Intelligence</h4>
                    <p className="text-sm text-slate-500 mt-1">Analyze supplier performance and operational risks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* MODULE 03 */}
            <div className="scroll-step relative pl-8 border-l border-slate-200 min-h-[75vh] flex flex-col justify-center">
              <div className="mb-4 step-element">
                <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase">Module 03</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6 step-element">Autonomous Operations</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 step-element">
                Optimize warehouse operations and automate procurement workflows using AI-driven monitoring, agents, and inventory intelligence.
              </p>

              {/* Mobile-only inline telemetry */}
              <div className="block md:hidden my-6 h-[300px] sm:h-[350px] w-full relative z-10">
                <SupplyChainTelemetry activeStep={2} />
              </div>

              <div className="grid grid-cols-1 gap-4 step-element">
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <Warehouse className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Warehouse Intelligence</h4>
                    <p className="text-sm text-slate-500 mt-1">Faster warehouse operations and improved accuracy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <ShoppingCart className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Procurement Automation</h4>
                    <p className="text-sm text-slate-500 mt-1">Faster cycles and reduced manual workload.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border border-slate-100 bg-slate-50/50">
                  <Box className="w-5 h-5 text-slate-700 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">Inventory Analytics</h4>
                    <p className="text-sm text-slate-500 mt-1">Track movement patterns and warehouse stock performance.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image (Sticky Track for 3D Globe) */}
          <div className="hidden md:block md:w-1/2 relative">
            <div className="md:sticky md:top-32 flex flex-col gap-6">

              <div className="h-[400px] md:h-[600px] w-full relative">
                <SupplyChainTelemetry activeStep={activeStep} />
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-4">Strategic Impact</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">Measurable Logistics Outcomes.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-200 features-grid">
          {[
            {
              title: 'Build Resilient Ecosystems',
              desc: 'Anticipate shocks to the global supply chain using AI demand forecasting and real-time vendor intelligence networks.',
              metric: '-35%',
              label: 'Supply Disruptions'
            },
            {
              title: 'Autonomous Automation',
              desc: 'Transform fragmented operations into a unified workflow, optimizing routes and automating procurement cycles.',
              metric: '+20x',
              label: 'Operational Efficiency'
            },
            {
              title: 'End-to-End Visibility',
              desc: 'Create centralized operational intelligence across suppliers, fleets, and warehouse networks for instant issue resolution.',
              metric: '100%',
              label: 'Real-Time Transparency'
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
