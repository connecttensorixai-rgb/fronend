import React from 'react';
import LogoLoop from './ui/LogoLoop';

// 1. Rigidfab Logo (Green style or Slate style)
export function RigidfabLogo({ className = "h-8 w-auto", ...props }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      <svg className="h-8 w-8 aspect-square shrink-0" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="6" />
        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" />
        <path d="M70 135 V65 H105 C122 65, 122 95, 105 95 H70" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M98 95 L125 135" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M120 65 H150" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
        <path d="M120 95 H140" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
        <defs>
          <path id="textPathTop" d="M 28 100 A 72 72 0 0 1 172 100" fill="none" />
          <path id="textPathBottom" d="M 172 100 A 72 72 0 0 1 28 100" fill="none" />
        </defs>
        <text className="fill-current font-sans font-black text-[12px] tracking-wider">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            RIGIDFAB ENGINEERS
          </textPath>
        </text>
        <text className="fill-current font-sans font-black text-[12px] tracking-wider">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            SHAPING THE FUTURE
          </textPath>
        </text>
      </svg>
      <span className="font-sans font-bold uppercase tracking-widest text-sm text-slate-800 dark:text-slate-200">RIGIDFAB</span>
    </div>
  );
}

// 2. Jova Metcraft Logo (Gold style or Slate style)
export function JovaMetcraftLogo({ className = "h-8 w-auto", ...props }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} {...props}>
      <svg className="h-8 w-8 aspect-square shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 8 C70 8, 85 15, 85 45 C85 70, 50 92, 50 92 C50 92, 15 70, 15 45 C15 15, 30 8, 50 8 Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
        <path d="M32 60 C32 68, 42 68, 42 60 V35 L51 52 L60 35 V68" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-sans font-extrabold uppercase tracking-widest text-sm text-slate-800 dark:text-slate-200">JOVA METCRAFT</span>
        <span className="font-serif text-[7px] text-slate-500 tracking-wider uppercase mt-0.5">EXCELLENCE IN METAL CRAFTING</span>
      </div>
    </div>
  );
}

// 3. Nexus Industries
export function NexusLogo({ className = "h-8 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg className="h-8 w-8 aspect-square shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="10" stroke="currentColor" strokeWidth="5" />
        <path d="M35 50 H65 M50 35 V65" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </svg>
      <span className="font-sans font-bold uppercase tracking-widest text-sm text-slate-800 dark:text-slate-200">NEXUS</span>
    </div>
  );
}

// 4. Vertex Automation
export function VertexLogo({ className = "h-8 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg className="h-8 w-8 aspect-square shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 15 L85 75 H15 Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
        <circle cx="50" cy="50" r="10" fill="currentColor" />
      </svg>
      <span className="font-sans font-bold uppercase tracking-widest text-sm text-slate-800 dark:text-slate-200">VERTEX</span>
    </div>
  );
}

// 5. Apex Robotics
export function ApexLogo({ className = "h-8 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg className="h-8 w-8 aspect-square shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 80 V20 L50 45 L80 20 V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans font-bold uppercase tracking-widest text-sm text-slate-800 dark:text-slate-200">APEX ROBOTICS</span>
    </div>
  );
}

// 6. Aero-Fab System
export function AeroFabLogo({ className = "h-8 w-auto" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg className="h-8 w-8 aspect-square shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="5" />
        <path d="M25 50 H75 M50 25 L75 50 L50 75" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans font-bold uppercase tracking-widest text-sm text-slate-800 dark:text-slate-200">AERO-FAB</span>
    </div>
  );
}

export default function PartnerMarquee() {
  const logos = [
    { node: <RigidfabLogo className="h-8 text-slate-400/80 hover:text-emerald-600 transition-colors duration-300" /> },
    { node: <JovaMetcraftLogo className="h-8 text-slate-400/80 hover:text-amber-500 transition-colors duration-300" /> },
    { node: <NexusLogo className="h-8 text-slate-400/80 hover:text-sky-600 transition-colors duration-300" /> },
    { node: <VertexLogo className="h-8 text-slate-400/80 hover:text-purple-600 transition-colors duration-300" /> },
    { node: <ApexLogo className="h-8 text-slate-400/80 hover:text-rose-600 transition-colors duration-300" /> },
    { node: <AeroFabLogo className="h-8 text-slate-400/80 hover:text-indigo-600 transition-colors duration-300" /> }
  ];

  return (
    <section className="w-full py-12 border-y border-slate-200/60 bg-slate-50/50 backdrop-blur-sm overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
          Trusted by Industrial Leaders & Enterprises
        </p>
      </div>
      <div className="w-full relative px-10">
        <LogoLoop 
          logos={logos} 
          speed={60} 
          gap={80} 
          logoHeight={36} 
          fadeOut={true} 
          pauseOnHover={true}
        />
      </div>
    </section>
  );
}
