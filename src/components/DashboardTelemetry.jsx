  import React, { useEffect, useState } from 'react';

  export default function DashboardTelemetry({ activeStep = 0 }) {
    const [localActiveStep, setLocalActiveStep] = useState(activeStep);

    useEffect(() => {
      setLocalActiveStep(activeStep);
    }, [activeStep]);

    // Phase 1 states: logs
    const [logs, setLogs] = useState([
      'SYSTEM: Initializing cognitive agents...',
      'AGENT // router: Parsing administrative intent...',
    ]);

    // Phase 2 states: scan toggle
    const [scanOk, setScanOk] = useState(true);

    // Phase 3 states: wave points
    const [wavePoints, setWavePoints] = useState([]);

    // Log ticker for Phase 1
    useEffect(() => {
      if (localActiveStep !== 0) return;
      const pool = [
        'AGENT // auditor: Extracting PDF legal metadata...',
        'COMPLIANCE: Verified Clause 14.b - no flags raised.',
        'AGENT // exec: Generating document ledger hash...',
        'DB // saas: Syncing administrative records...',
        'SYSTEM: Operational overhead reduced by 85%.',
        'AGENT // router: Listening for legal draft uploads...',
        'AGENT // auditor: Compliance check initialized on draft_v3.pdf...',
      ];
      let counter = 0;
      const interval = setInterval(() => {
        setLogs((prev) => {
          const next = [...prev, pool[counter % pool.length]];
          if (next.length > 6) next.shift(); // keep log short
          return next;
        });
        counter++;
      }, 2500);

      return () => clearInterval(interval);
    }, [localActiveStep]);

    // Scan toggler for Phase 2
    useEffect(() => {
      if (localActiveStep !== 1) return;
      const interval = setInterval(() => {
        setScanOk((prev) => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }, [localActiveStep]);

    // Real-time wave generator for Phase 3
    useEffect(() => {
      if (localActiveStep !== 2) return;
      let t = 0;
      const interval = setInterval(() => {
        setWavePoints((prev) => {
          // Generate a smooth wave point
          const base = Math.sin(t) * 45;
          const noise = (Math.random() - 0.5) * 12;
          const y = 80 + base + noise;
          const next = [...prev, y];
          if (next.length > 25) next.shift();
          return next;
        });
        t += 0.45;
      }, 150);

      return () => clearInterval(interval);
    }, [localActiveStep]);

    return (
      <div className="w-full h-full min-h-[350px] md:min-h-[500px] relative bg-white/70 rounded-3xl border border-slate-200/50 overflow-hidden shadow-inner flex flex-col justify-between p-6">
        
        {/* Blueprint grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />

        {/* 1. Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-start border-b border-slate-200/60 pb-3 relative z-10 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 0, label: '01. ORCHESTRATION' },
              { id: 1, label: '02. QC_VISION' },
              { id: 2, label: '03. DIAGNOSTICS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setLocalActiveStep(tab.id)}
                className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md transition-all ${
                  localActiveStep === tab.id
                    ? 'bg-brand-orange/10 text-brand-orange border border-brand-orange/30 shadow-sm'
                    : 'bg-slate-100/80 text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Interactive Screens depending on Active Step */}
        <div className="w-full flex-grow flex items-center justify-center relative z-10 py-6">
          
          {/* Screen 1: Agentic workflow logs & charts */}
          <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-500 ${localActiveStep === 0 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
            <div className="relative w-full aspect-[2.5] h-auto rounded-2xl border border-slate-200/60 bg-slate-50/60 overflow-hidden flex items-center justify-center shadow-inner">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes scanlineMove {
                  0%, 100% { transform: translateY(-12px); }
                  50% { transform: translateY(32px); }
                }
                .animate-scanline {
                  animation: scanlineMove 3s ease-in-out infinite;
                }
              `}} />

              <svg className="w-full h-full p-2 select-none" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* DEFINITIONS */}
                <defs>
                  <linearGradient id="input-grad-s1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="ledger-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffedd5" />
                    <stop offset="100%" stopColor="#fed7aa" />
                  </linearGradient>
                </defs>

                {/* STAGE BRACKETS */}
                {/* 1. Ingestion */}
                <path d="M 20,208 L 20,212 L 140,212 L 140,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="80" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">INGESTION</text>

                {/* 2. Cognitive Analysis */}
                <path d="M 160,208 L 160,212 L 360,212 L 360,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="260" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">COGNITIVE PROCESSING</text>

                {/* 3. Secure Ledger */}
                <path d="M 380,208 L 380,212 L 580,212 L 580,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="480" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">SECURE LEDGER</text>


                {/* 1. INPUT STAGE */}
                <text x="57" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="bold" letterSpacing="0.05em">Input Request</text>
                
                {/* Box */}
                <rect x="20" y="55" width="75" height="80" rx="8" fill="url(#input-grad-s1)" stroke="#cbd5e1" strokeWidth="1.5" />
                
                {/* Sheet of Paper (Draft Doc) */}
                <rect x="38" y="70" width="38" height="48" rx="2" fill="#ffffff" stroke="#64748b" strokeWidth="1" />
                <line x1="44" y1="78" x2="68" y2="78" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="44" y1="84" x2="62" y2="84" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="44" y1="90" x2="70" y2="90" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="44" y1="96" x2="56" y2="96" stroke="#cbd5e1" strokeWidth="1.5" />
                
                <text x="57" y="147" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#475569" fontWeight="bold">draft_v3.pdf</text>

                {/* Scanline */}
                <g className="animate-scanline">
                  <line x1="32" y1="80" x2="82" y2="80" stroke="#eb510e" strokeWidth="1.2" strokeDasharray="2 1" />
                </g>


                {/* 2. COGNITIVE CORE */}
                {/* NLP Router */}
                <circle cx="180" cy="95" r="16" fill="rgba(33, 61, 131, 0.08)" stroke="#213d83" strokeWidth="1.2" className="animate-node-pulse" />
                <circle cx="180" cy="95" r="6" fill="#213d83" />
                <text x="180" y="125" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#475569" fontWeight="bold">NLP Router</text>

                {/* Auditor Agent */}
                <circle cx="300" cy="65" r="15" fill="rgba(235, 81, 14, 0.08)" stroke="#eb510e" strokeWidth="1.2" />
                {/* Magnifying Glass Icon */}
                <line x1="303" y1="68" x2="309" y2="74" stroke="#eb510e" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="298" cy="60" r="5" stroke="#eb510e" strokeWidth="1.5" fill="none" />
                <text x="300" y="93" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#475569" fontWeight="bold">Auditor Agent</text>

                {/* Execution Agent */}
                <circle cx="300" cy="125" r="15" fill="rgba(33, 61, 131, 0.08)" stroke="#213d83" strokeWidth="1.2" />
                {/* Key Icon */}
                <line x1="292" y1="125" x2="308" y2="125" stroke="#213d83" strokeWidth="1.5" />
                <circle cx="292" cy="125" r="3.5" stroke="#213d83" strokeWidth="1.5" fill="none" />
                <line x1="304" y1="125" x2="304" y2="129" stroke="#213d83" strokeWidth="1.5" />
                <line x1="308" y1="125" x2="308" y2="129" stroke="#213d83" strokeWidth="1.5" />
                <text x="300" y="153" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#475569" fontWeight="bold">Execution Agent</text>


                {/* 3. SYSTEM DB & SECURE LEDGER */}
                {/* DB Sync Server */}
                <ellipse cx="420" cy="80" rx="14" ry="5" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.2" />
                <path d="M 406,80 L 406,110 A 14,5 0 0,0 434,110 L 434,80 Z" fill="rgba(203, 213, 225, 0.6)" stroke="#64748b" strokeWidth="1.2" />
                <path d="M 406,90 Q 420,95 434,90" stroke="#64748b" strokeWidth="1.2" fill="none" />
                <path d="M 406,100 Q 420,105 434,100" stroke="#64748b" strokeWidth="1.2" fill="none" />
                <path d="M 406,110 Q 420,115 434,110" stroke="#64748b" strokeWidth="1.2" fill="none" />
                <text x="420" y="125" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#475569" fontWeight="bold">DB Sync</text>

                {/* Secure Blockchain Ledger Cube */}
                <polygon points="525,75 540,83 525,91 510,83" fill="#ffe3d1" stroke="#eb510e" strokeWidth="1.2" />
                <polygon points="510,83 525,91 525,111 510,103" fill="#eb510e" stroke="#c23d00" strokeWidth="1.2" opacity="0.8" />
                <polygon points="525,91 540,83 540,103 525,111" fill="#f97316" stroke="#eb510e" strokeWidth="1.2" opacity="0.9" />
                {/* Verified Badge seal */}
                <path d="M 521,93 L 524,96 L 529,90" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="525" y="125" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#475569" fontWeight="bold">Secure Ledger</text>


                {/* ACTIVE SIGNAL PATHS (MARCHING ANTS) */}
                {/* Ingestion to Router */}
                <line x1="95" y1="95" x2="164" y2="95" stroke="#eb510e" strokeWidth="1" strokeDasharray="4 6" className="animate-flow-dash" />
                
                {/* Router to Agents */}
                <path d="M 196,95 Q 240,75 285,67" stroke="#eb510e" strokeWidth="1" strokeDasharray="4 6" fill="none" className="animate-flow-dash" />
                <path d="M 196,95 Q 240,115 285,123" stroke="#213d83" strokeWidth="1" strokeDasharray="4 6" fill="none" className="animate-flow-dash" />
                
                {/* Agents to DB Sync */}
                <path d="M 315,65 Q 360,75 406,93" stroke="#eb510e" strokeWidth="1" strokeDasharray="4 6" fill="none" className="animate-flow-dash" />
                <path d="M 315,125 Q 360,115 406,97" stroke="#213d83" strokeWidth="1" strokeDasharray="4 6" fill="none" className="animate-flow-dash" />
                
                {/* DB to Ledger */}
                <line x1="438" y1="95" x2="509" y2="95" stroke="#eb510e" strokeWidth="1" strokeDasharray="4 6" className="animate-flow-dash" />
              </svg>
            </div>
            
          </div>

          {/* Screen 2: Deep Learning CNN Visualizer */}
          <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-500 ${localActiveStep === 1 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
            <div className="relative w-full aspect-[2.5] h-auto rounded-2xl border border-slate-200/60 bg-slate-50/60 overflow-hidden flex items-center justify-center shadow-inner">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes flowDash {
                  to {
                    stroke-dashoffset: -20;
                  }
                }
                .animate-flow-dash {
                  animation: flowDash 1.5s linear infinite;
                }
                @keyframes kernelScan {
                  0%, 100% { transform: translate(0px, 0px); }
                  25% { transform: translate(12px, -8px); }
                  50% { transform: translate(-8px, 15px); }
                  75% { transform: translate(8px, 8px); }
                }
                .animate-kernel-scan {
                  animation: kernelScan 6s ease-in-out infinite;
                }
                @keyframes nodePulse {
                  0%, 100% { r: 3.5px; opacity: 0.7; }
                  50% { r: 4.8px; opacity: 1; }
                }
                .animate-node-pulse {
                  animation: nodePulse 2s ease-in-out infinite;
                }
              `}} />

              <svg className="w-full h-full p-2 select-none" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* DEFINITIONS */}
                <defs>
                  <linearGradient id="input-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f1f5f9" />
                    <stop offset="100%" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="softmax-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffe4e6" />
                    <stop offset="100%" stopColor="#fecdd3" />
                  </linearGradient>
                </defs>

                {/* STAGE BRACKETS */}
                {/* 1. Feature Extraction */}
                <path d="M 20,208 L 20,212 L 330,212 L 330,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="175" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">FEATURE EXTRACTION</text>

                {/* 2. Classification */}
                <path d="M 350,208 L 350,212 L 475,212 L 475,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="412.5" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">CLASSIFICATION</text>

                {/* 3. Probabilistic Distribution */}
                <path d="M 495,208 L 495,212 L 585,212 L 585,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="540" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">PROBABILISTIC DISTRIBUTION</text>


                {/* 1. INPUT LAYER */}
                <text x="57" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="bold" letterSpacing="0.05em">Input</text>
                
                {/* Input Steel Beam Canvas Box */}
                <rect x="20" y="55" width="75" height="80" rx="8" fill="url(#input-grad)" stroke="#cbd5e1" strokeWidth="1.5" />
                
                {/* 3D Isometric H-Beam Girder */}
                <g transform="translate(26, 68)">
                  {/* Back face shadow */}
                  <path d="M 15,35 L 45,15 L 45,45 L 15,65 Z" fill="#94a3b8" opacity="0.4" />
                  {/* Bottom flange */}
                  <path d="M 5,50 L 35,30 L 55,30 L 25,50 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                  <path d="M 5,50 L 5,55 L 25,55 L 25,50 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
                  <path d="M 25,50 L 25,55 L 55,55 L 55,30 L 25,50 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
                  {/* Web */}
                  <path d="M 22,20 L 22,42 L 28,42 L 28,20 Z" fill="#64748b" stroke="#475569" strokeWidth="1" />
                  {/* Top flange */}
                  <path d="M 5,20 L 35,0 L 55,0 L 25,20 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />
                  <path d="M 5,20 L 5,25 L 25,25 L 25,20 Z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
                  <path d="M 25,20 L 25,25 L 55,25 L 55,0 L 25,20 Z" fill="#64748b" stroke="#475569" strokeWidth="1" />
                </g>
                <text x="57" y="147" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#475569" fontWeight="bold">H-Beam</text>

                {/* Kernel scan box */}
                <g className="animate-kernel-scan">
                  <rect x="42" y="78" width="16" height="16" fill="none" stroke="#eb510e" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="42" y="74" fontFamily="Space Grotesk, sans-serif" fontSize="6.5" fill="#eb510e" fontWeight="bold">Kernel</text>
                  
                  {/* Dashed projections to Conv Layer 1 */}
                  <line x1="58" y1="78" x2="143" y2="60" stroke="rgba(235, 81, 14, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="58" y1="94" x2="143" y2="105" stroke="rgba(235, 81, 14, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                </g>


                {/* 2. STAGE 1: CONVOLUTION + RELU 1 */}
                <text x="146" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="semibold">Pooling</text>
                
                {/* Overlapping feature maps 1 */}
                <g stroke="#213d83" strokeWidth="1" opacity="0.8">
                  {/* Map 0 (back) */}
                  <polygon points="125,75 150,65 150,110 125,120" fill="rgba(33, 61, 131, 0.08)" />
                  {/* Map 1 */}
                  <polygon points="131,70 156,60 156,105 131,115" fill="rgba(33, 61, 131, 0.15)" />
                  {/* Map 2 */}
                  <polygon points="137,65 162,55 162,100 137,110" fill="rgba(33, 61, 131, 0.22)" />
                  {/* Map 3 (front) */}
                  <polygon points="143,60 168,50 168,95 143,105" fill="rgba(33, 61, 131, 0.3)" />
                </g>
                <text x="146" y="128" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#64748b" fontWeight="semibold">Convolution + ReLU</text>

                {/* White pooling box on front map */}
                <polygon points="153,65 161,62 161,70 153,73" fill="rgba(255, 255, 255, 0.4)" stroke="#ffffff" strokeWidth="1" />
                {/* Connection projection to Stage 2 */}
                <line x1="161" y1="66" x2="200" y2="75" stroke="rgba(33, 61, 131, 0.2)" strokeWidth="0.8" strokeDasharray="2 2" />


                {/* 3. STAGE 2: CONVOLUTION + RELU 2 */}
                <text x="217" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="semibold">Pooling</text>
                
                {/* Overlapping feature maps 2 */}
                <g stroke="#213d83" strokeWidth="1" opacity="0.8">
                  <polygon points="200,80 220,72 220,107 200,115" fill="rgba(33, 61, 131, 0.08)" />
                  <polygon points="205,76 225,68 225,103 205,111" fill="rgba(33, 61, 131, 0.15)" />
                  <polygon points="210,72 230,64 230,99 210,107" fill="rgba(33, 61, 131, 0.22)" />
                  <polygon points="215,68 235,60 235,95 215,103" fill="rgba(33, 61, 131, 0.3)" />
                </g>
                <text x="217" y="128" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#64748b" fontWeight="semibold">Convolution + ReLU</text>

                {/* White pooling box on front map */}
                <polygon points="219,82 227,79 227,87 219,90" fill="rgba(255, 255, 255, 0.4)" stroke="#ffffff" strokeWidth="1" />
                {/* Connection projection to Stage 3 */}
                <line x1="227" y1="83" x2="260" y2="85" stroke="rgba(33, 61, 131, 0.2)" strokeWidth="0.8" strokeDasharray="2 2" />


                {/* 4. STAGE 3: CONVOLUTION + RELU 3 */}
                <text x="274" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="semibold">Pooling</text>
                
                {/* Overlapping feature maps 3 */}
                <g stroke="#213d83" strokeWidth="0.8" opacity="0.8">
                  <polygon points="260,85 276,79 276,105 260,111" fill="rgba(33, 61, 131, 0.08)" />
                  <polygon points="264,82 280,76 280,102 264,108" fill="rgba(33, 61, 131, 0.15)" />
                  <polygon points="268,79 284,73 284,99 268,105" fill="rgba(33, 61, 131, 0.22)" />
                  <polygon points="272,76 288,70 288,96 272,102" fill="rgba(33, 61, 131, 0.3)" />
                </g>
                <text x="274" y="128" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#64748b" fontWeight="semibold">Convolution + ReLU</text>

                {/* White pooling box on front map */}
                <polygon points="280,84 286,82 286,88 280,90" fill="rgba(255, 255, 255, 0.4)" stroke="#ffffff" strokeWidth="1" />
                {/* Connection projection to Flatten Layer */}
                <line x1="286" y1="85" x2="320" y2="105" stroke="rgba(33, 61, 131, 0.2)" strokeWidth="0.8" strokeDasharray="2 2" />


                {/* 5. FLATTEN LAYER */}
                <text x="322" y="185" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="bold">Flatten Layer</text>
                
                {/* Vertical flatten blocks */}
                <g>
                  {[52, 62, 72, 82, 92, 102, 112, 122, 132, 142, 152, 162].map((yf, idx) => (
                    <rect
                      key={`flat-${yf}`}
                      x="320"
                      y={yf}
                      width="5"
                      height="7"
                      rx="1"
                      fill={idx % 3 === 0 ? "#eb510e" : idx % 3 === 1 ? "#213d83" : "#64748b"}
                      opacity="0.8"
                    />
                  ))}
                </g>


                {/* DENSE WEB CONNECTIONS */}
                {/* Flatten to Red Neurons (Layer 2) */}
                {[52, 62, 72, 82, 92, 102, 112, 122, 132, 142, 152, 162].map((yf) => (
                  [48, 62, 76, 90, 104, 118, 132, 146, 160, 174].map((yr) => (
                    <line key={`f-l2-${yf}-${yr}`} x1="325" y1={yf + 3.5} x2="360" y2={yr} stroke="rgba(33, 61, 131, 0.05)" strokeWidth="0.4" />
                  ))
                ))}

                {/* Red Neurons to Blue Neurons (Layer 3) */}
                {[48, 62, 76, 90, 104, 118, 132, 146, 160, 174].map((yr) => (
                  [55, 73, 91, 109, 127, 145, 163].map((yb) => (
                    <line key={`l2-l3-${yr}-${yb}`} x1="360" y1={yr} x2="395" y2={yb} stroke="rgba(33, 61, 131, 0.05)" strokeWidth="0.4" />
                  ))
                ))}

                {/* Blue Neurons to Orange Neurons (Layer 4) */}
                {[55, 73, 91, 109, 127, 145, 163].map((yb) => (
                  [70, 96, 122, 148].map((yo) => (
                    <line key={`l3-l4-${yb}-${yo}`} x1="395" y1={yb} x2="430" y2={yo} stroke="rgba(33, 61, 131, 0.05)" strokeWidth="0.4" />
                  ))
                ))}

                {/* Orange Neurons to Pink Neurons (Layer 5) */}
                {[70, 96, 122, 148].map((yo) => (
                  [85, 109, 133].map((yp) => (
                    <line key={`l4-l5-${yo}-${yp}`} x1="430" y1={yo} x2="465" y2={yp} stroke="rgba(33, 61, 131, 0.05)" strokeWidth="0.4" />
                  ))
                ))}


                {/* HIGHLIGHTED SIGNAL FLOW PATHS */}
                <line x1="325" y1="105.5" x2="360" y2="118" stroke="#eb510e" strokeWidth="1" strokeDasharray="4 6" className="animate-flow-dash" />
                <line x1="360" y1="118" x2="395" y2="109" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 6" className="animate-flow-dash" />
                <line x1="395" y1="109" x2="430" y2="122" stroke="#f97316" strokeWidth="1" strokeDasharray="4 6" className="animate-flow-dash" />
                <line x1="430" y1="122" x2="465" y2="109" stroke="#ec4899" strokeWidth="1" strokeDasharray="4 6" className="animate-flow-dash" />


                {/* 6. NEURONS (FULLY CONNECTED LAYER) */}
                {/* Layer 2 (Red Neurons) */}
                {[48, 62, 76, 90, 104, 118, 132, 146, 160, 174].map((yr, idx) => (
                  <circle
                    key={`n2-${yr}`}
                    cx="360"
                    cy={yr}
                    r="3.5"
                    fill="#f87171"
                    stroke="#ef4444"
                    strokeWidth="0.8"
                    className={idx % 2 === 0 ? "animate-node-pulse" : ""}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  />
                ))}

                {/* Layer 3 (Blue Neurons) */}
                {[55, 73, 91, 109, 127, 145, 163].map((yb, idx) => (
                  <circle
                    key={`n3-${yb}`}
                    cx="395"
                    cy={yb}
                    r="3.5"
                    fill="#60a5fa"
                    stroke="#3b82f6"
                    strokeWidth="0.8"
                    className={idx % 3 === 0 ? "animate-node-pulse" : ""}
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  />
                ))}

                {/* Layer 4 (Orange Neurons) */}
                {[70, 96, 122, 148].map((yo, idx) => (
                  <circle
                    key={`n4-${yo}`}
                    cx="430"
                    cy={yo}
                    r="3.5"
                    fill="#fb923c"
                    stroke="#f97316"
                    strokeWidth="0.8"
                    className={idx % 2 === 1 ? "animate-node-pulse" : ""}
                    style={{ animationDelay: `${idx * 0.25}s` }}
                  />
                ))}

                {/* Layer 5 (Pink Neurons) */}
                {[85, 109, 133].map((yp, idx) => (
                  <circle
                    key={`n5-${yp}`}
                    cx="465"
                    cy={yp}
                    r="3.5"
                    fill="#f472b6"
                    stroke="#ec4899"
                    strokeWidth="0.8"
                    className="animate-node-pulse"
                    style={{ animationDelay: `${idx * 0.3}s` }}
                  />
                ))}

                <text x="412.5" y="185" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="bold">Fully Connected Layer</text>


                {/* 7. SOFTMAX OUTPUT / PROBABILITIES */}
                <text x="516" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="bold" letterSpacing="0.05em">Output</text>

                {/* Connection lines from final pink neurons to output box */}
                <line x1="465" y1="85" x2="495" y2="72" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="465" y1="109" x2="495" y2="92" stroke="rgba(236, 72, 153, 0.5)" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="465" y1="133" x2="495" y2="112" stroke="rgba(236, 72, 153, 0.3)" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Output Softmax Container */}
                <rect x="495" y="55" width="42" height="65" rx="5" fill="url(#softmax-grad)" stroke="#f43f5e" strokeWidth="1.2" />
                
                {/* Values inside softmax box */}
                <text x="516" y="71" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" fill="#f43f5e" fontWeight="bold" textAnchor="middle">0.2</text>
                <text x="516" y="91" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" fill="#f43f5e" fontWeight="bold" textAnchor="middle">0.7</text>
                <text x="516" y="111" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" fill="#f43f5e" fontWeight="bold" textAnchor="middle">0.1</text>
                
                <text x="516" y="133" fontFamily="Space Grotesk, sans-serif" fontSize="6.2" textAnchor="middle" fill="#64748b" fontWeight="semibold">SoftMax Activation</text>
                <text x="516" y="140" fontFamily="Space Grotesk, sans-serif" fontSize="6.2" textAnchor="middle" fill="#64748b" fontWeight="semibold">Function</text>

                {/* Dotted lines from values to labels */}
                <line x1="537" y1="68" x2="555" y2="68" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="537" y1="88" x2="555" y2="88" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="537" y1="108" x2="555" y2="108" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Labels on the right */}
                <text x="558" y="71" fontFamily="Space Grotesk, sans-serif" fontSize="8" fill="#64748b" fontWeight="medium">I-Beam</text>
                <text x="558" y="91" fontFamily="Space Grotesk, sans-serif" fontSize="8.5" fill="#eb510e" fontWeight="bold">H-Beam</text>
                <text x="558" y="111" fontFamily="Space Grotesk, sans-serif" fontSize="8" fill="#64748b" fontWeight="medium">Plate</text>
              </svg>
            </div>
            
          </div>

          {/* Screen 3: Industrial maintenance wave and gauge */}
          <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-500 ${localActiveStep === 2 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
            <div className="relative w-full aspect-[2.5] h-auto rounded-2xl border border-slate-200/60 bg-slate-50/60 overflow-hidden flex items-center justify-center shadow-inner">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes spinGear {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
                .animate-spin-gear {
                  animation: spinGear 8s linear infinite;
                  transform-origin: 65px 75px;
                }
              `}} />

              <svg className="w-full h-full p-2 select-none" viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* DEFINITIONS */}
                <defs>
                  <linearGradient id="input-grad-s3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e2e8f0" />
                    <stop offset="100%" stopColor="#94a3b8" />
                  </linearGradient>
                </defs>

                {/* STAGE BRACKETS */}
                {/* 1. Sensor Acquisition */}
                <path d="M 20,208 L 20,212 L 125,212 L 125,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="72.5" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">SENSOR ACQUISITION</text>

                {/* 2. Signal Processing */}
                <path d="M 145,208 L 145,212 L 440,212 L 440,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="292.5" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">SIGNAL PROCESSING</text>

                {/* 3. Predictive Inference */}
                <path d="M 460,208 L 460,212 L 580,212 L 580,208" stroke="#cbd5e1" strokeWidth="1" />
                <text x="520" y="224" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b" fontWeight="600" letterSpacing="0.05em">PREDICTIVE INFERENCE</text>


                {/* 1. SENSOR ACQUISITION (MECHANICAL SOURCE) */}
                <text x="65" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="bold" letterSpacing="0.05em">Sensor Source</text>
                
                {/* Asset Box */}
                <rect x="20" y="55" width="90" height="80" rx="8" fill="url(#input-grad-s3)" stroke="#cbd5e1" strokeWidth="1.5" />
                
                {/* 3D Isometric Machine Spindle & Gear */}
                <g transform="translate(0, 5)">
                  {/* Spindle Base */}
                  <polygon points="35,100 75,80 95,95 55,115" fill="#64748b" stroke="#475569" strokeWidth="1" />
                  <polygon points="35,100 35,105 55,120 55,115" fill="#475569" stroke="#334155" strokeWidth="1" />
                  <polygon points="55,115 55,120 95,105 95,95" fill="#334155" stroke="#1e293b" strokeWidth="1" />
                  
                  {/* Cylinder Spindle */}
                  <rect x="45" y="60" width="40" height="28" fill="rgba(148, 163, 184, 0.8)" stroke="#475569" strokeWidth="1" />
                  <ellipse cx="65" cy="60" rx="20" ry="8" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />

                  {/* Rotating Spindle Gear (Cog) */}
                  <g className="animate-spin-gear">
                    <circle cx="65" cy="75" r="12" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
                    <circle cx="65" cy="75" r="4" fill="#94a3b8" />
                    {/* Teeth */}
                    <rect x="63" y="60" width="4" height="6" rx="1" fill="#475569" />
                    <rect x="63" y="84" width="4" height="6" rx="1" fill="#475569" />
                    <rect x="50" y="73" width="6" height="4" rx="1" fill="#475569" />
                    <rect x="74" y="73" width="6" height="4" rx="1" fill="#475569" />
                    <rect x="63" y="72" width="4" height="6" rx="1" fill="#475569" transform="rotate(45 65 75)" />
                    <rect x="63" y="72" width="4" height="6" rx="1" fill="#475569" transform="rotate(-45 65 75)" />
                  </g>
                </g>
                
                <text x="65" y="147" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#cbd5e1" fontWeight="bold">Machine Joint</text>

                {/* Telemetry Sensor Pickup point */}
                <circle cx="65" cy="65" r="4" fill="#eb510e" className="animate-pulse" />
                <line x1="65" y1="65" x2="150" y2="95" stroke="rgba(235, 81, 14, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />


                {/* 2. SIGNAL PROCESSING */}
                <text x="292.5" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="semibold">Signal Analytics</text>

                {/* Vibration Spectrum waveform block */}
                <rect x="150" y="55" width="160" height="80" rx="8" fill="rgba(248, 250, 252, 0.5)" stroke="#cbd5e1" strokeWidth="1" />
                <text x="160" y="70" fontFamily="Space Grotesk, sans-serif" fontSize="7.2" fill="#64748b" fontWeight="bold">VIBRATION SPECTRUM</text>
                {/* Dynamic Oscillating Wave Path directly linked to wavePoints */}
                {wavePoints.length > 0 && (
                  <path
                    d={`M ${wavePoints.map((y, idx) => `${155 + idx * 6}, ${55 + (y * 0.35)}`).join(' L ')}`}
                    fill="none"
                    stroke="#eb510e"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                  />
                )}

                {/* Thermal Trend Heat Map block */}
                <rect x="330" y="55" width="100" height="80" rx="8" fill="rgba(248, 250, 252, 0.5)" stroke="#cbd5e1" strokeWidth="1" />
                <text x="340" y="70" fontFamily="Space Grotesk, sans-serif" fontSize="7.2" fill="#64748b" fontWeight="bold">THERMAL MATRIX</text>
                
                {/* Grid of thermal sensor values */}
                <g transform="translate(10, 2)">
                  <rect x="335" y="80" width="12" height="12" rx="2" fill="#f87171" className="animate-pulse" />
                  <rect x="350" y="80" width="12" height="12" rx="2" fill="#fb923c" />
                  <rect x="365" y="80" width="12" height="12" rx="2" fill="#facc15" />
                  <rect x="380" y="80" width="12" height="12" rx="2" fill="#4ade80" />

                  <rect x="335" y="96" width="12" height="12" rx="2" fill="#fb923c" />
                  <rect x="350" y="96" width="12" height="12" rx="2" fill="#f87171" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <rect x="365" y="96" width="12" height="12" rx="2" fill="#4ade80" />
                  <rect x="380" y="96" width="12" height="12" rx="2" fill="#facc15" />

                  <rect x="335" y="112" width="12" height="12" rx="2" fill="#4ade80" />
                  <rect x="350" y="112" width="12" height="12" rx="2" fill="#facc15" />
                  <rect x="365" y="112" width="12" height="12" rx="2" fill="#f87171" className="animate-pulse" style={{ animationDelay: '1s' }} />
                  <rect x="380" y="112" width="12" height="12" rx="2" fill="#fb923c" />
                </g>


                {/* 3. PREDICTIVE INFERENCE */}
                <text x="520" y="42" fontFamily="Space Grotesk, sans-serif" fontSize="9" textAnchor="middle" fill="#1e293b" fontWeight="bold" letterSpacing="0.05em">Diagnostics</text>

                {/* Connection projection beams from analyzers to Diagnostic Core */}
                <line x1="310" y1="95" x2="460" y2="95" stroke="rgba(235, 81, 14, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="430" y1="95" x2="460" y2="95" stroke="rgba(33, 61, 131, 0.15)" strokeWidth="0.8" strokeDasharray="2 2" />

                {/* Diagnostic core container */}
                <rect x="460" y="55" width="115" height="80" rx="8" fill="rgba(33, 61, 131, 0.08)" stroke="#213d83" strokeWidth="1.2" />
                
                <text x="517.5" y="70" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#213d83" fontWeight="bold">ML Predictor</text>

                {/* Sensor stats readouts */}
                <text x="470" y="86" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#475569" fontWeight="semibold">Health: 98.4%</text>
                <text x="470" y="98" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#eb510e" fontWeight="semibold">Spindle: 4.2Hz</text>
                <text x="470" y="110" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#475569" fontWeight="semibold">Temp: 64 °C</text>
                
                {/* Alert Status Dot */}
                <circle cx="550" cy="98" r="4" fill="#22c55e" className="animate-pulse" />
                <text x="550" y="112" fontFamily="Space Grotesk, sans-serif" fontSize="6" textAnchor="middle" fill="#22c55e" fontWeight="bold">SAFE</text>
                
                <text x="517.5" y="147" fontFamily="Space Grotesk, sans-serif" fontSize="7.5" textAnchor="middle" fill="#475569" fontWeight="bold">Diagnostic Core</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
