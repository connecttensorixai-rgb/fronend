import { useEffect, useState } from 'react';

export default function EnergyTelemetry({ activeStep = 0 }) {
  // Phase 1 states: wave points for predictive maintenance
  const [wavePoints, setWavePoints] = useState([]);

  // Phase 2 states: bounding boxes for vision
  const [scanActive, setScanActive] = useState(true);

  // Phase 3 states: energy load values
  const [energyLoad, setEnergyLoad] = useState(45);

  // Real-time wave generator for Phase 1
  useEffect(() => {
    if (activeStep !== 0) return;
    let t = 0;
    const interval = setInterval(() => {
      setWavePoints((prev) => {
        const base = Math.sin(t) * 30;
        const noise = (Math.random() - 0.5) * 15;
        const y = 60 + base + noise;
        const next = [...prev, y];
        if (next.length > 30) next.shift();
        return next;
      });
      t += 0.4;
    }, 120);

    return () => clearInterval(interval);
  }, [activeStep]);

  // Toggle scan for Phase 2
  useEffect(() => {
    if (activeStep !== 1) return;
    const interval = setInterval(() => {
      setScanActive((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, [activeStep]);

  // Energy fluctuation for Phase 3
  useEffect(() => {
    if (activeStep !== 2) return;
    const interval = setInterval(() => {
      setEnergyLoad((prev) => {
        const change = (Math.random() - 0.5) * 5;
        let next = prev + change;
        if (next > 85) next = 85;
        if (next < 30) next = 30;
        return next;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[600px] relative bg-white/70 rounded-3xl border border-slate-200/50 overflow-hidden shadow-inner flex flex-col justify-between p-6">
      
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />

      {/* 1. Dashboard Header */}
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${activeStep === 0 ? 'bg-sky-500' : activeStep === 1 ? 'bg-emerald-500' : 'bg-brand-orange'}`}></span>
          <span className="font-mono text-[10px] font-bold text-slate-500 tracking-wider uppercase">
            {activeStep === 0 ? 'DIAGNOSTICS // PREDICTIVE_MAINTENANCE' : activeStep === 1 ? 'VISION // SITE_INTELLIGENCE' : 'GRID // ENERGY_OPTIMIZATION'}
          </span>
        </div>
        <span className="font-mono text-[9px] text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
          SYSTEM_OK
        </span>
      </div>

      {/* 2. Interactive Screens depending on Active Step */}
      <div className="w-full flex-grow flex items-center justify-center relative z-10 py-6">
        
        {/* Screen 1: Predictive Maintenance */}
        <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-500 ${activeStep === 0 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
          <div className="relative w-full aspect-[600/280] h-auto rounded-2xl border border-slate-200/60 bg-slate-50/60 overflow-hidden flex items-center justify-center shadow-inner">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spinFan {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .animate-spin-fan {
                animation: spinFan 3s linear infinite;
                transform-origin: center;
              }
            `}} />

            <svg className="w-full h-full p-2 select-none" viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="blue-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0f2fe" />
                  <stop offset="100%" stopColor="#bae6fd" />
                </linearGradient>
                <linearGradient id="slate-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
              </defs>

              {/* Machinery block */}
              <rect x="40" y="60" width="140" height="120" rx="8" fill="url(#blue-grad-light)" stroke="#7dd3fc" strokeWidth="1.5" />
              <text x="110" y="50" fontFamily="Space Grotesk, sans-serif" fontSize="10" textAnchor="middle" fill="#475569" fontWeight="bold">HEAVY EQUIPMENT ASSET</text>
              
              {/* Inner turbine/fan */}
              <circle cx="110" cy="120" r="40" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="110" cy="120" r="10" fill="#64748b" />
              <g className="animate-spin-fan" style={{ transformOrigin: '110px 120px' }}>
                <path d="M 110,120 L 110,85 A 35,35 0 0,1 125,88 Z" fill="#0ea5e9" opacity="0.8" />
                <path d="M 110,120 L 140,140 A 35,35 0 0,1 125,152 Z" fill="#0ea5e9" opacity="0.8" />
                <path d="M 110,120 L 80,140 A 35,35 0 0,1 80,125 Z" fill="#0ea5e9" opacity="0.8" />
              </g>

              {/* Sensor pickups */}
              <circle cx="150" cy="80" r="4" fill="#ef4444" className="animate-pulse" />
              <line x1="150" y1="80" x2="220" y2="80" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
              
              <circle cx="160" cy="140" r="4" fill="#22c55e" className="animate-pulse" />
              <line x1="160" y1="140" x2="220" y2="140" stroke="#22c55e" strokeWidth="1" strokeDasharray="4 4" />

              {/* Telemetry processing */}
              <rect x="220" y="60" width="180" height="120" rx="8" fill="url(#slate-grad-light)" stroke="#cbd5e1" strokeWidth="1" />
              <text x="310" y="50" fontFamily="Space Grotesk, sans-serif" fontSize="10" textAnchor="middle" fill="#475569" fontWeight="bold">REAL-TIME TELEMETRY</text>

              {/* Waveform box */}
              <rect x="230" y="70" width="160" height="50" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              {wavePoints.length > 0 && (
                <path
                  d={`M ${wavePoints.map((y, idx) => `${235 + idx * 5}, ${75 + (y * 0.3)}`).join(' L ')}`}
                  fill="none"
                  stroke="#0ea5e9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}

              {/* Secondary metrics */}
              <rect x="230" y="130" width="75" height="40" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              <text x="267" y="145" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b">TEMP</text>
              <text x="267" y="160" fontFamily="Space Grotesk, sans-serif" fontSize="12" textAnchor="middle" fill="#ef4444" fontWeight="bold">84°C</text>

              <rect x="315" y="130" width="75" height="40" rx="4" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              <text x="352" y="145" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b">VIBRATION</text>
              <text x="352" y="160" fontFamily="Space Grotesk, sans-serif" fontSize="12" textAnchor="middle" fill="#22c55e" fontWeight="bold">Normal</text>

              {/* Predictive Output */}
              <line x1="400" y1="120" x2="450" y2="120" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="4 4" />
              <rect x="450" y="80" width="120" height="80" rx="8" fill="rgba(14, 165, 233, 0.05)" stroke="#7dd3fc" strokeWidth="1" />
              <text x="510" y="70" fontFamily="Space Grotesk, sans-serif" fontSize="10" textAnchor="middle" fill="#0ea5e9" fontWeight="bold">AI PREDICTION</text>
              
              <circle cx="510" cy="110" r="16" fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth="2" />
              <path d="M 503,110 L 508,115 L 518,105" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              <text x="510" y="145" fontFamily="Space Grotesk, sans-serif" fontSize="10" textAnchor="middle" fill="#16a34a" fontWeight="bold">0% FAIL PROB.</text>
            </svg>
          </div>
          
          <div className="mt-4 flex gap-8 text-center font-mono text-[10px] w-full justify-center text-slate-800">
            <div>
              <div className="font-bold text-sky-600">99.8%</div>
              <div className="text-slate-400">Uptime Predicted</div>
            </div>
            <div>
              <div className="font-bold text-sky-600">12ms</div>
              <div className="text-slate-400">Latency</div>
            </div>
            <div>
              <div className="font-bold text-sky-600">Active</div>
              <div className="text-slate-400">ML Diagnostics</div>
            </div>
          </div>
        </div>

        {/* Screen 2: Vision Site Intelligence */}
        <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-500 ${activeStep === 1 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
          <div className="relative w-full aspect-[600/280] h-auto rounded-2xl border border-slate-200/60 bg-slate-50/60 overflow-hidden flex items-center justify-center shadow-inner">
             <style dangerouslySetInnerHTML={{__html: `
              @keyframes scanSweep {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(160px); opacity: 0; }
              }
              .animate-scan-sweep {
                animation: scanSweep 3s ease-in-out infinite;
              }
            `}} />

            <svg className="w-full h-full p-2 select-none" viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="emerald-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d1fae5" />
                  <stop offset="100%" stopColor="#ecfdf5" />
                </linearGradient>
              </defs>

              {/* Camera Feed Container */}
              <rect x="40" y="40" width="300" height="200" rx="8" fill="url(#emerald-grad-light)" stroke="#6ee7b7" strokeWidth="1.5" />
              <text x="50" y="55" fontFamily="Space Grotesk, sans-serif" fontSize="10" fill="#059669" fontWeight="bold">CAM_04 // SITE_OVERVIEW</text>

              {/* Site Elements (Abstracted) */}
              {/* Construction Crane */}
              <line x1="80" y1="220" x2="80" y2="80" stroke="#94a3b8" strokeWidth="4" />
              <line x1="60" y1="100" x2="180" y2="90" stroke="#94a3b8" strokeWidth="3" />
              <line x1="160" y1="92" x2="160" y2="150" stroke="#94a3b8" strokeWidth="1" />
              <rect x="150" y="150" width="20" height="15" fill="#64748b" />

              {/* Workers (Dots) */}
              <circle cx="220" cy="180" r="5" fill="#f59e0b" />
              <circle cx="260" cy="190" r="5" fill="#f59e0b" />
              <circle cx="280" cy="160" r="5" fill="#ef4444" />

              {/* Bounding Boxes (AI Vision) */}
              {scanActive && (
                <g>
                  {/* Crane Hook BB */}
                  <rect x="145" y="145" width="30" height="25" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  <rect x="145" y="135" width="40" height="10" fill="#10b981" />
                  <text x="148" y="143" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#ffffff" fontWeight="bold">LOAD 98%</text>

                  {/* Worker 1 BB */}
                  <rect x="212" y="165" width="16" height="25" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  <text x="212" y="162" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#10b981" fontWeight="bold">PPE: OK</text>

                  {/* Worker 2 BB */}
                  <rect x="252" y="175" width="16" height="25" fill="none" stroke="#10b981" strokeWidth="1.5" />
                  <text x="252" y="172" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#10b981" fontWeight="bold">PPE: OK</text>

                  {/* Hazard BB */}
                  <rect x="272" y="145" width="16" height="25" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
                  <text x="272" y="142" fontFamily="Space Grotesk, sans-serif" fontSize="6" fill="#ef4444" fontWeight="bold">HAZARD</text>
                </g>
              )}

              {/* Sweeping scan line */}
              <line x1="40" y1="40" x2="340" y2="40" stroke="#10b981" strokeWidth="2" className="animate-scan-sweep" />

              {/* AI Processing Core */}
              <line x1="340" y1="140" x2="400" y2="140" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
              <rect x="400" y="80" width="160" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
              <text x="480" y="100" fontFamily="Space Grotesk, sans-serif" fontSize="10" textAnchor="middle" fill="#475569" fontWeight="bold">VISION TRANSFORMER</text>
              
              <rect x="420" y="120" width="120" height="15" rx="2" fill="#e2e8f0" />
              <rect x="420" y="120" width="110" height="15" rx="2" fill="#10b981" />
              <text x="480" y="131" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#1e293b" fontWeight="bold">PPE COMPLIANCE 95%</text>

              <rect x="420" y="145" width="120" height="15" rx="2" fill="#e2e8f0" />
              <rect x="420" y="145" width="40" height="15" rx="2" fill="#ef4444" />
              <text x="480" y="156" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#1e293b" fontWeight="bold">RISK DETECTIONS: 1</text>

              <rect x="420" y="170" width="120" height="15" rx="2" fill="#e2e8f0" />
              <rect x="420" y="170" width="90" height="15" rx="2" fill="#0ea5e9" />
              <text x="480" y="181" fontFamily="Space Grotesk, sans-serif" fontSize="7" textAnchor="middle" fill="#1e293b" fontWeight="bold">WORKFORCE PROD: 88%</text>
            </svg>
          </div>
          
          <div className="mt-4 flex gap-8 text-center font-mono text-[10px] w-full justify-center text-slate-800">
            <div>
              <div className="font-bold text-emerald-600">Active</div>
              <div className="text-slate-400">Live Tracking</div>
            </div>
            <div>
              <div className="font-bold text-emerald-600">1080p / 60fps</div>
              <div className="text-slate-400">Stream Quality</div>
            </div>
            <div>
              <div className="font-bold text-emerald-600">YOLOv9</div>
              <div className="text-slate-400">Model Arch</div>
            </div>
          </div>
        </div>

        {/* Screen 3: Energy Optimization */}
        <div className={`w-full h-full flex flex-col justify-center items-center transition-all duration-500 ${activeStep === 2 ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}>
          <div className="relative w-full aspect-[600/280] h-auto rounded-2xl border border-slate-200/60 bg-slate-50/60 overflow-hidden flex items-center justify-center shadow-inner">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes dashFlow {
                to { stroke-dashoffset: -20; }
              }
              .animate-dash-flow {
                animation: dashFlow 1s linear infinite;
              }
            `}} />
            <svg className="w-full h-full p-2 select-none" viewBox="0 0 600 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="orange-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffedd5" />
                  <stop offset="100%" stopColor="#fff7ed" />
                </linearGradient>
              </defs>

              {/* Energy Sources */}
              {/* Solar */}
              <rect x="40" y="40" width="80" height="50" rx="6" fill="#fef9c3" stroke="#eab308" strokeWidth="1.5" />
              <text x="80" y="60" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#ca8a04" fontWeight="bold">SOLAR ARRAY</text>
              <text x="80" y="75" fontFamily="Space Grotesk, sans-serif" fontSize="12" textAnchor="middle" fill="#854d0e" fontWeight="bold">32 MW</text>

              {/* Grid */}
              <rect x="40" y="110" width="80" height="50" rx="6" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="80" y="130" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#0284c7" fontWeight="bold">MAIN GRID</text>
              <text x="80" y="145" fontFamily="Space Grotesk, sans-serif" fontSize="12" textAnchor="middle" fill="#0369a1" fontWeight="bold">15 MW</text>

              {/* Wind */}
              <rect x="40" y="180" width="80" height="50" rx="6" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
              <text x="80" y="200" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#16a34a" fontWeight="bold">WIND FARM</text>
              <text x="80" y="215" fontFamily="Space Grotesk, sans-serif" fontSize="12" textAnchor="middle" fill="#15803d" fontWeight="bold">12 MW</text>

              {/* Flow Lines to Central Hub */}
              <path d="M 120,65 L 180,65 L 220,135" fill="none" stroke="#eab308" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow" />
              <path d="M 120,135 L 220,135" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow" />
              <path d="M 120,205 L 180,205 L 220,135" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" className="animate-dash-flow" />

              {/* Central AI Hub */}
              <rect x="220" y="80" width="140" height="110" rx="12" fill="url(#orange-grad-light)" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="290" cy="120" r="25" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
              <text x="290" y="124" fontFamily="Space Grotesk, sans-serif" fontSize="10" textAnchor="middle" fill="#f97316" fontWeight="bold">AI CORE</text>
              <text x="290" y="160" fontFamily="Space Grotesk, sans-serif" fontSize="8" textAnchor="middle" fill="#64748b">LOAD BALANCING</text>
              <text x="290" y="175" fontFamily="Space Grotesk, sans-serif" fontSize="12" textAnchor="middle" fill="#c2410c" fontWeight="bold">59 MW TOTAL</text>

              {/* Flow Line to Site */}
              <path d="M 360,135 L 440,135" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="8 4" className="animate-dash-flow" />

              {/* Site Consumption */}
              <rect x="440" y="70" width="120" height="130" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="500" y="95" fontFamily="Space Grotesk, sans-serif" fontSize="10" textAnchor="middle" fill="#475569" fontWeight="bold">SITE CONSUMPTION</text>
              
              {/* Dynamic Bar chart representing energyLoad state */}
              <rect x="460" y="120" width="15" height="60" fill="#e2e8f0" />
              <rect x="460" y={180 - energyLoad} width="15" height={energyLoad} fill="#f97316" className="transition-all duration-700" />
              
              <rect x="485" y="100" width="15" height="80" fill="#e2e8f0" />
              <rect x="485" y={180 - (energyLoad * 0.8 + 10)} width="15" height={energyLoad * 0.8 + 10} fill="#f97316" className="transition-all duration-700" />
              
              <rect x="510" y="130" width="15" height="50" fill="#e2e8f0" />
              <rect x="510" y={180 - (energyLoad * 0.5 + 5)} width="15" height={energyLoad * 0.5 + 5} fill="#f97316" className="transition-all duration-700" />
              
              <rect x="535" y="110" width="15" height="70" fill="#e2e8f0" />
              <rect x="535" y={180 - (energyLoad * 0.9)} width="15" height={energyLoad * 0.9} fill="#f97316" className="transition-all duration-700" />
            </svg>
          </div>
          
          <div className="mt-4 flex gap-8 text-center font-mono text-[10px] w-full justify-center text-slate-800">
            <div>
              <div className="font-bold text-orange-600">-24.5%</div>
              <div className="text-slate-400">Waste Reduction</div>
            </div>
            <div>
              <div className="font-bold text-orange-600">Dynamic</div>
              <div className="text-slate-400">Routing Mode</div>
            </div>
            <div>
              <div className="font-bold text-orange-600">Optimal</div>
              <div className="text-slate-400">Grid Efficiency</div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Dashboard Footer */}
      <div className="flex items-center justify-between border-t border-slate-200/60 pt-3 font-mono text-[9px] text-slate-400 relative z-10">
        <span>STATUS: MONITORING_MODULE_0{activeStep + 1}</span>
        <span>AI_CORE // ENCRYPTED</span>
      </div>

    </div>
  );
}
