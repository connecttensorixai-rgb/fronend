import React, { useEffect, useState, useRef } from 'react';
import { AnimatedText } from '@/components/ui/animated-shiny-text';
import ServiceRadialGraph from '../components/ServiceRadialGraph';
import PremiumSectorCard from '../components/PremiumSectorCard';

// Each module carries its own accent color (matching ServiceRadialGraph's
// hub/cards) and a badge icon. Rendering is handled by PremiumSectorCard,
// which gives every card real 3D depth (layered z-planes, mouse-tilt
// parallax) plus continuous ambient motion (drifting gradient mesh,
// floating icon badge) so the grid feels alive rather than static.
const domainModules = [
  {
    title: 'Healthcare',
    description: 'TensorixAI leverages advanced analytics, genomic intelligence, and predictive models to support the early detection of cardiovascular diseases, cancer, and other complex health conditions, empowering healthcare providers with faster and more accurate clinical insights.',
    color: '#06b6d4',
    path: '#/healthcare',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21c-4.5-2.7-9-6.4-9-11A5 5 0 0112 6a5 5 0 019 4c0 4.6-4.5 8.3-9 11z" />
    )
  },
  {
    title: 'Manufacturing',
    description: 'Deploy real-time Deep Learning networks and computer vision models to automate visual quality control, track assembly components, detect defects on the line, and orchestrate precision manufacturing robotics.',
    color: '#6366f1',
    path: '#/manufacturing',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V9l6 4V9m-9 8h12a1 1 0 001-1v-4l-4-4H8L4 12v4a1 1 0 001 1z" />
    )
  },
  {
    title: 'Agriculture',
    description: 'Harness advanced Computer Vision and machine learning models on edge devices (drones, smart tractors) for crop yield monitoring, automated soil hydration analysis, plant disease detection, and autonomous farming operations.',
    color: '#22c55e',
    path: '#/agriculture',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3c1 3-1 5-3 6-2 1-3 3-2 5 3 1 6-1 6-4M12 3c-1 3 1 5 3 6 2 1 3 3 2 5-3 1-6-1-6-4M12 21v-9" />
    )
  },
  {
    title: 'Financial Management',
    description: 'Modernize financial operations using Artificial Intelligence, Machine Learning, predictive analytics, and real-time operational intelligence. Automate workflows, detect anomalies, and gain complete visibility.',
    color: '#f59e0b',
    path: '#/financial-management',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 17l5-5 4 4 8-8M21 8V4h-4" />
    )
  },
  {
    title: 'Supply Chain',
    description: 'Tensorix AI provides end-to-end supply chain visibility with AI-powered logistics intelligence, warehouse optimization, procurement automation, and predictive demand forecasting.',
    color: '#ec4899',
    path: '#/supply-chain',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4M3 7v10l9 4 9-4V7" />
    )
  },
  {
    title: 'Energy & Consumption',
    description: 'Optimize utility grid distribution and automate mechanical diagnostic assessments across wind, solar, and traditional grids using Machine Learning forecasting models, edge vision checking, and predictive maintenance tools.',
    color: '#ef4444',
    path: '#/energy-construction',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    )
  }
];

export default function ServicesPage() {
  const [selectedSector, setSelectedSector] = useState(null);
  const modulesRef = useRef(null);

  useEffect(() => {
    // Ensure we start at the top
    window.scrollTo(0, 0);
  }, []);

  const handleNodeClick = (sectorName) => {
    if (selectedSector === sectorName) {
      setSelectedSector(null);
    } else {
      setSelectedSector(sectorName);
      setTimeout(() => {
        if (modulesRef.current) {
          const yOffset = -100; // offset for fixed header
          const element = modulesRef.current;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const displayedModules = selectedSector
    ? domainModules.filter(mod => mod.title === selectedSector)
    : domainModules;

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative min-h-[100dvh]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-32">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-brand-blue text-xs font-semibold tracking-wider uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
          Domain-Specific Operations
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 font-sans leading-tight">
          Intelligent Infrastructure for{' '}
          <AnimatedText
            text="Every Sector"
            className="py-0 inline-block"
            textClassName="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-glow"
          />
        </h1>

        <p className="text-lg md:text-xl text-slate-600 font-serif leading-relaxed max-w-2xl mx-auto">
          We adapt our cognitive agentic workflows and visual networks for critical sectors,
          ensuring high compliance, high speed, and zero latency. Explore our core vertical deployments.
        </p>
      </div>

      <div className="relative z-10 w-full mt-10 md:mt-20">
        <ServiceRadialGraph onNodeClick={handleNodeClick} />
      </div>

      {/* Modules of Tensorix AI Section */}
      <div ref={modulesRef} className="mt-24 md:mt-40 max-w-7xl mx-auto border-t border-slate-200/60 pt-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-slate-900 mb-4">Modules of Tensorix AI</h2>
          <p className="text-slate-600 font-serif max-w-2xl mx-auto text-lg">
            Our specialized intelligence modules power the most critical sectors with uncompromising accuracy and speed.
          </p>
          {selectedSector && (
            <button
              onClick={() => setSelectedSector(null)}
              className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-full transition-colors"
            >
              Clear Filter
            </button>
          )}
        </div>

        <div className={displayedModules.length === 1 ? "flex justify-center" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"}>
          {displayedModules.map((mod, idx) => (
            <PremiumSectorCard
              key={idx}
              mod={mod}
              singleView={displayedModules.length === 1}
              onClick={() => {
                if (mod.path) {
                  window.location.hash = mod.path;
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}