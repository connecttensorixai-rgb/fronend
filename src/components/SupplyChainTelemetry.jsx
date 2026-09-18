import React, { useEffect, useState } from 'react';

export default function SupplyChainTelemetry({ activeStep = 0 }) {
  // We will rely more on CSS animations for smoother performance, 
  // but keep state for dynamic data changes.
  const [demandData, setDemandData] = useState([40, 55, 45, 70, 60, 85, 95]);
  const [vendorRisk, setVendorRisk] = useState(0);

  // Dynamic Data Updates
  useEffect(() => {
    if (activeStep !== 1) return;
    const interval = setInterval(() => {
      setDemandData((prev) => {
        const next = [...prev];
        next.shift();
        next.push(50 + Math.random() * 40);
        return next;
      });
      setVendorRisk((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Helper for smooth SVG line generation
  const createSmoothPath = (data, width, height, startX, startY) => {
    if (data.length === 0) return '';
    const stepX = width / (data.length - 1);
    const points = data.map((y, i) => ({ x: startX + i * stepX, y: startY + height - (y / 100) * height }));
    
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q ${points[i].x},${points[i].y} ${xc},${yc}`;
    }
    path += ` T ${points[points.length - 1].x},${points[points.length - 1].y}`;
    return path;
  };

  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[600px] relative bg-white/80 rounded-3xl border border-slate-200/60 overflow-hidden shadow-xl flex flex-col justify-between p-6">
      
      {/* Blueprint Grid Background - High Tech Minimalist */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />

      {/* Global CSS for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes radarSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .anim-radar { animation: radarSpin 4s linear infinite; transform-origin: center; }
        
        @keyframes dashMove { to { stroke-dashoffset: -24; } }
        .anim-dash { animation: dashMove 1.5s linear infinite; }

        @keyframes agvMove1 {
          0%, 100% { transform: translate(70px, 90px); }
          25% { transform: translate(250px, 90px); }
          50% { transform: translate(250px, 160px); }
          75% { transform: translate(70px, 160px); }
        }
        .anim-agv-1 { animation: agvMove1 12s linear infinite; }

        @keyframes agvMove2 {
          0%, 100% { transform: translate(250px, 160px); }
          25% { transform: translate(70px, 160px); }
          50% { transform: translate(70px, 90px); }
          75% { transform: translate(250px, 90px); }
        }
        .anim-agv-2 { animation: agvMove2 12s linear infinite; }

        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(14, 165, 233, 0.4)); }
          50% { filter: drop-shadow(0 0 8px rgba(14, 165, 233, 0.8)); }
        }
        .anim-glow { animation: pulseGlow 2s ease-in-out infinite; }
      `}} />

      {/* 1. Dashboard Header */}
      <div className="flex items-center justify-end border-b border-slate-200/80 pb-3 relative z-10">
        <div className="flex gap-2">
          <span className="w-1 h-3 bg-slate-300 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
          <span className="w-1 h-3 bg-slate-300 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></span>
          <span className="w-1 h-3 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></span>
        </div>
      </div>

      {/* 2. Interactive Screens */}
      <div className="w-full flex-grow flex items-center justify-center relative z-10 py-6">
        
        {/* =========================================
            SCREEN 1: GLOBAL LOGISTICS (Step 0)
            ========================================= */}
        <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${activeStep === 0 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
          <div className="relative w-full aspect-[600/280] h-auto rounded-2xl border border-slate-200/80 bg-[#f8fafc] overflow-hidden flex items-center justify-center shadow-md">
            <svg className="w-full h-full p-0 select-none" viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="radar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Radar Center Coordinate */}
              <g transform="translate(180, 140)">
                {/* Radar Rings */}
                <circle cx="0" cy="0" r="40" fill="url(#radar-grad)" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="0" cy="0" r="80" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="0" cy="0" r="120" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                <circle cx="0" cy="0" r="160" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 8" />
                
                {/* Crosshairs */}
                <line x1="-170" y1="0" x2="170" y2="0" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="-170" x2="0" y2="170" stroke="#e2e8f0" strokeWidth="1" />
                
                {/* Radar Sweep */}
                <path d="M 0,0 L 160,0 A 160,160 0 0,1 113,113 Z" fill="url(#radar-grad)" className="anim-radar" />

                {/* Logistics Nodes */}
                {/* Node 1 (Origin) */}
                <g transform="translate(-60, 40)">
                  <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" className="anim-glow" />
                  <circle cx="0" cy="0" r="4" fill="#0ea5e9" />
                  <text x="0" y="24" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#475569" fontWeight="bold">SHANGHAI_HUB</text>
                </g>

                {/* Node 2 (Transfer) */}
                <g transform="translate(40, -50)">
                  <circle cx="0" cy="0" r="10" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="0" cy="0" r="3" fill="#f59e0b" />
                  <text x="0" y="-14" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#475569" fontWeight="bold">LON_PORT</text>
                </g>

                {/* Node 3 (Destination) */}
                <g transform="translate(100, 60)">
                  <circle cx="0" cy="0" r="12" fill="#ffffff" stroke="#10b981" strokeWidth="2" className="anim-glow" />
                  <circle cx="0" cy="0" r="4" fill="#10b981" />
                  <text x="0" y="22" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#475569" fontWeight="bold">NY_WH_01</text>
                </g>

                {/* Active Routes */}
                <path d="M -60,40 Q -10,-5 40,-50" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4" className="anim-dash" />
                <path d="M 40,-50 Q 80,5 100,60" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" className="anim-dash" />
              </g>

              {/* Data Overlays (Right Side) */}
              <g transform="translate(380, 40)">
                <rect x="0" y="0" width="180" height="200" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                
                {/* Header */}
                <rect x="0" y="0" width="180" height="30" fill="#f8fafc" rx="8" />
                <text x="15" y="19" fontFamily="Space Grotesk, sans-serif" fontSize="9" fill="#0f172a" fontWeight="bold">REAL-TIME TELEMETRY</text>
                <circle cx="160" cy="15" r="3" fill="#10b981" className="animate-pulse" />

                {/* Stat 1 */}
                <text x="15" y="55" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#64748b" fontWeight="bold">ACTIVE SHIPMENTS</text>
                <text x="165" y="55" fontFamily="Space Grotesk, sans-serif" fontSize="12" fill="#0ea5e9" fontWeight="bold" textAnchor="end">12,408</text>
                <line x1="15" y1="65" x2="165" y2="65" stroke="#e2e8f0" strokeWidth="1" />

                {/* Stat 2 */}
                <text x="15" y="85" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#64748b" fontWeight="bold">NETWORK LATENCY</text>
                <text x="165" y="85" fontFamily="Space Grotesk, sans-serif" fontSize="12" fill="#10b981" fontWeight="bold" textAnchor="end">24 ms</text>
                <line x1="15" y1="95" x2="165" y2="95" stroke="#e2e8f0" strokeWidth="1" />

                {/* Live Feed Event */}
                <text x="15" y="115" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#64748b" fontWeight="bold">LATEST DISPATCH</text>
                <rect x="15" y="125" width="150" height="60" rx="4" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
                <text x="25" y="140" fontFamily="Space Grotesk, sans-serif" fontSize="8" fill="#0f172a" fontWeight="bold">TRK-5022 (Auto-Routed)</text>
                <text x="25" y="155" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#64748b">Origin: LON_PORT</text>
                <text x="25" y="170" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#64748b">Status: ON SCHEDULE</text>
              </g>
            </svg>
          </div>
          
          <div className="mt-4 flex gap-8 text-center font-mono text-[10px] w-full justify-center text-slate-700">
            <div>
              <div className="font-bold text-sky-600">Global</div>
              <div className="text-slate-500">Coverage</div>
            </div>
            <div>
              <div className="font-bold text-sky-600">24/7</div>
              <div className="text-slate-500">Active Tracking</div>
            </div>
            <div>
              <div className="font-bold text-sky-600">Zero-Delay</div>
              <div className="text-slate-500">Routing Mode</div>
            </div>
          </div>
        </div>


        {/* =========================================
            SCREEN 2: PREDICTIVE INTELLIGENCE (Step 1)
            ========================================= */}
        <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${activeStep === 1 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
          <div className="relative w-full aspect-[600/280] h-auto rounded-2xl border border-slate-200/80 bg-[#f8fafc] overflow-hidden flex items-center justify-center shadow-md">
             
            <svg className="w-full h-full p-0 select-none" viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="chart-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.01" />
                </linearGradient>
                <linearGradient id="pred-zone" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Demand Forecasting Chart (Left) */}
              <g transform="translate(40, 30)">
                <rect x="0" y="0" width="360" height="220" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                
                <text x="20" y="25" fontFamily="Space Grotesk, sans-serif" fontSize="10" fill="#64748b" fontWeight="bold">AI DEMAND FORECASTING</text>
                
                {/* Chart Grid */}
                {[40, 80, 120, 160].map(y => (
                  <line key={y} x1="20" y1={y} x2="340" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                ))}
                
                {/* Y-Axis Labels */}
                {['100k', '75k', '50k', '25k'].map((label, idx) => (
                  <text key={idx} x="15" y={42 + idx * 40} fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#94a3b8" textAnchor="end">{label}</text>
                ))}

                {/* Chart Data Line & Fill */}
                <path 
                  d={`${createSmoothPath(demandData, 300, 120, 25, 40)} L 325,160 L 25,160 Z`} 
                  fill="url(#chart-fill)" 
                  className="transition-all duration-700 ease-in-out" 
                />
                <path 
                  d={createSmoothPath(demandData, 300, 120, 25, 40)} 
                  fill="none" 
                  stroke="#9333ea" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  className="transition-all duration-700 ease-in-out" 
                />

                {/* Data Points */}
                {demandData.map((y, idx) => (
                  <circle 
                    key={`pt-${idx}`} 
                    cx={25 + idx * (300 / (demandData.length - 1))} 
                    cy={40 + 120 - (y / 100) * 120} 
                    r="4" 
                    fill="#ffffff" 
                    stroke="#9333ea" 
                    strokeWidth="2" 
                    className="transition-all duration-700 ease-in-out" 
                  />
                ))}

                {/* Prediction Horizon Overlay */}
                <rect x="220" y="40" width="120" height="120" fill="url(#pred-zone)" />
                <line x1="220" y1="30" x2="220" y2="170" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
                <text x="230" y="32" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#9333ea" fontWeight="bold">PREDICTIVE AI HORIZON</text>

                {/* Analysis Tag */}
                <rect x="230" y="70" width="100" height="30" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                <text x="238" y="82" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#64748b">Forecast Trend</text>
                <text x="238" y="93" fontFamily="Space Grotesk, sans-serif" fontSize="9" fill="#10b981" fontWeight="bold">▲ 14.5% SURGE</text>
              </g>

              {/* Vendor Intelligence Panel (Right) */}
              <g transform="translate(420, 30)">
                <rect x="0" y="0" width="140" height="220" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                
                <text x="15" y="25" fontFamily="Space Grotesk, sans-serif" fontSize="9" fill="#64748b" fontWeight="bold">VENDOR RISK INDEX</text>
                <line x1="15" y1="35" x2="125" y2="35" stroke="#e2e8f0" strokeWidth="1" />

                {/* Vendor 1 */}
                <g transform="translate(15, 50)">
                  <text x="0" y="0" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#0f172a" fontWeight="bold">Supplier Alpha</text>
                  <text x="110" y="0" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#10b981" fontWeight="bold" textAnchor="end">LOW</text>
                  <rect x="0" y="8" width="110" height="6" rx="3" fill="#f1f5f9" />
                  <rect x="0" y="8" width="90" height="6" rx="3" fill="#10b981" />
                </g>

                {/* Vendor 2 */}
                <g transform="translate(15, 85)">
                  <text x="0" y="0" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#0f172a" fontWeight="bold">Supplier Beta</text>
                  <text x="110" y="0" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#f59e0b" fontWeight="bold" textAnchor="end">MED</text>
                  <rect x="0" y="8" width="110" height="6" rx="3" fill="#f1f5f9" />
                  <rect x="0" y="8" width="60" height="6" rx="3" fill="#f59e0b" />
                </g>

                {/* Vendor 3 */}
                <g transform="translate(15, 120)">
                  <text x="0" y="0" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#0f172a" fontWeight="bold">Supplier Gamma</text>
                  <text x="110" y="0" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#ef4444" fontWeight="bold" textAnchor="end">HIGH</text>
                  <rect x="0" y="8" width="110" height="6" rx="3" fill="#f1f5f9" />
                  <rect x="0" y="8" width="30" height="6" rx="3" fill="#ef4444" />
                </g>

                {/* Dynamic Alert Banner */}
                <g transform="translate(15, 160)">
                  <rect x="0" y="0" width="110" height="40" rx="4" fill={vendorRisk === 0 ? "#ecfdf5" : vendorRisk === 1 ? "#fffbeb" : "#fef2f2"} stroke={vendorRisk === 0 ? "#10b981" : vendorRisk === 1 ? "#f59e0b" : "#ef4444"} strokeWidth="1" className="transition-colors duration-500" />
                  <circle cx="12" cy="12" r="3" fill={vendorRisk === 0 ? "#10b981" : vendorRisk === 1 ? "#f59e0b" : "#ef4444"} className="animate-pulse" />
                  <text x="22" y="14" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#0f172a" fontWeight="bold">AI SYSTEM ALERT</text>
                  <text x="8" y="28" fontFamily="Space Grotesk, sans-serif" fontSize="6.5" fill="#475569">
                    {vendorRisk === 0 ? "Supply chain optimal." : vendorRisk === 1 ? "Beta capacity constrained." : "Gamma shipment delayed!"}
                  </text>
                </g>
              </g>

            </svg>
          </div>
          
          <div className="mt-4 flex gap-8 text-center font-mono text-[10px] w-full justify-center text-slate-700">
            <div>
              <div className="font-bold text-purple-600">96.4%</div>
              <div className="text-slate-500">Forecast Accuracy</div>
            </div>
            <div>
              <div className="font-bold text-purple-600">Automated</div>
              <div className="text-slate-500">Risk Mitigation</div>
            </div>
            <div>
              <div className="font-bold text-purple-600">Live</div>
              <div className="text-slate-500">Vendor Scoring</div>
            </div>
          </div>
        </div>


        {/* =========================================
            SCREEN 3: AUTONOMOUS OPERATIONS (Step 2)
            ========================================= */}
        <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${activeStep === 2 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
          <div className="relative w-full aspect-[600/280] h-auto rounded-2xl border border-slate-200/80 bg-[#f8fafc] overflow-hidden flex items-center justify-center shadow-md">
            
            <svg className="w-full h-full p-0 select-none" viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              
              {/* Floor Plan Container */}
              <g transform="translate(40, 30)">
                <rect x="0" y="0" width="340" height="220" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                <text x="20" y="25" fontFamily="Space Grotesk, sans-serif" fontSize="9" fill="#10b981" fontWeight="bold">AUTONOMOUS WAREHOUSE FLOORPLAN</text>
                <line x1="20" y1="35" x2="320" y2="35" stroke="#f1f5f9" strokeWidth="1" />

                {/* Warehouse Grid / Shelving Units (Highly Structured) */}
                <g stroke="#cbd5e1" strokeWidth="1" fill="#f8fafc">
                  {[...Array(3)].map((_, col) => (
                    [...Array(4)].map((_, row) => (
                      <g key={`${col}-${row}`} transform={`translate(${40 + col * 90}, ${55 + row * 40})`}>
                        <rect x="0" y="0" width="60" height="20" rx="3" />
                        {/* Shelf details (boxes) */}
                        <rect x="5" y="5" width="10" height="10" rx="1" fill={Math.random() > 0.5 ? "#10b981" : "#e2e8f0"} stroke="none" />
                        <rect x="20" y="5" width="10" height="10" rx="1" fill={Math.random() > 0.2 ? "#10b981" : "#e2e8f0"} stroke="none" />
                        <rect x="35" y="5" width="15" height="10" rx="1" fill="#e2e8f0" stroke="none" />
                      </g>
                    ))
                  ))}
                </g>

                {/* AGV Tracks (Dashed Lines) */}
                <path d="M 20,90 L 320,90 M 20,130 L 320,130 M 20,170 L 320,170" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 70,45 L 70,205 M 160,45 L 160,205 M 250,45 L 250,205" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />

                {/* Animated AGV Robots */}
                <g className="anim-agv-1">
                  <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  <text x="12" y="3" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#0f172a" fontWeight="bold">AGV-A</text>
                </g>

                <g className="anim-agv-2">
                  <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#0ea5e9" stroke="#0284c7" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="3" fill="#ffffff" />
                  <text x="12" y="3" fontFamily="Space Grotesk, sans-serif" fontSize="7" fill="#0f172a" fontWeight="bold">AGV-B</text>
                </g>
              </g>

              {/* Operations Analytics Panel (Right) */}
              <g transform="translate(400, 30)">
                <rect x="0" y="0" width="160" height="220" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
                
                <text x="15" y="25" fontFamily="Space Grotesk, sans-serif" fontSize="9" fill="#64748b" fontWeight="bold">OPERATIONS CENTER</text>
                <line x1="15" y1="35" x2="145" y2="35" stroke="#e2e8f0" strokeWidth="1" />

                {/* Circular Progress (Warehouse Capacity) */}
                <g transform="translate(80, 85)">
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                  {/* Static stroke for demo, since SVG circle animation requires precise math we'll use a fixed value that looks good */}
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="188.4" strokeDashoffset="47" strokeLinecap="round" transform="rotate(-90)" />
                  <text x="0" y="2" fontFamily="Space Grotesk, sans-serif" fontSize="14" fill="#0f172a" fontWeight="bold" textAnchor="middle">75%</text>
                  <text x="0" y="12" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#64748b" textAnchor="middle">CAPACITY</text>
                </g>

                {/* Task Queue list */}
                <g transform="translate(15, 140)">
                  <text x="0" y="0" fontFamily="Space Grotesk, sans-serif" fontSize="8" fill="#0f172a" fontWeight="bold">LIVE DISPATCH QUEUE</text>
                  
                  <rect x="0" y="10" width="130" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx="10" cy="19" r="3" fill="#10b981" />
                  <text x="20" y="21" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#475569">Pick Order #9422 (Zone B)</text>
                  
                  <rect x="0" y="32" width="130" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx="10" cy="41" r="3" fill="#f59e0b" />
                  <text x="20" y="43" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#475569">Restock Palette #11A</text>

                  <rect x="0" y="54" width="130" height="18" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
                  <circle cx="10" cy="63" r="3" fill="#0ea5e9" />
                  <text x="20" y="65" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#475569">Auto-Procure PO-2900</text>
                </g>
              </g>

            </svg>
          </div>
          
          <div className="mt-4 flex gap-8 text-center font-mono text-[10px] w-full justify-center text-slate-700">
            <div>
              <div className="font-bold text-emerald-600">Zero-Touch</div>
              <div className="text-slate-500">Warehouse Ops</div>
            </div>
            <div>
              <div className="font-bold text-emerald-600">Real-Time</div>
              <div className="text-slate-500">Inventory Sync</div>
            </div>
            <div>
              <div className="font-bold text-emerald-600">+45%</div>
              <div className="text-slate-500">Fulfillment Speed</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
