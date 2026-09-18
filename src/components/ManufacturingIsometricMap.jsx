import React from 'react';
import { motion } from 'framer-motion';

const Plate = ({ children, zOffset }) => (
  <motion.div
    className="absolute top-1/2 left-1/2 w-full h-full bg-white border border-slate-800"
    style={{
      marginLeft: '-50%',
      marginTop: '-50%',
      transformStyle: 'preserve-3d',
    }}
    animate={{
      z: zOffset
    }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {/* Very thin crisp edge front-right */}
    <div className="absolute top-full left-0 w-full h-[3px] bg-slate-200 border-x border-b border-slate-800 origin-top [transform:rotateX(-90deg)]" />
    {/* Very thin crisp edge front-left */}
    <div className="absolute top-0 right-full w-[3px] h-full bg-slate-300 border-y border-l border-slate-800 origin-right [transform:rotateY(-90deg)]" />
    {children}
  </motion.div>
);

function getLineStyles(nx, ny, cx, cy, cz) {
  const dx = cx - nx;
  const dy = cy - ny;
  const dz = cz;

  const floorLength = Math.sqrt(dx * dx + dy * dy);
  const totalLength = Math.sqrt(floorLength * floorLength + dz * dz);

  const theta = Math.atan2(dy, dx) * (180 / Math.PI);
  const phi = Math.atan2(dz, floorLength) * (180 / Math.PI);

  return {
    width: `${totalLength}px`,
    transformOrigin: '0 0',
    transform: `rotateZ(${theta}deg) rotateY(${-phi}deg)`
  };
}

// -------------------------------------------------------------
// Floating Card Content Renderers (Blueprint Dashboard Style)
// -------------------------------------------------------------

const WireframeMDS = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <line x1="10" y1="10" x2="90" y2="10" stroke="#f1f5f9" strokeWidth="0.8" />
    <line x1="10" y1="25" x2="90" y2="25" stroke="#f1f5f9" strokeWidth="0.8" />
    <line x1="10" y1="40" x2="90" y2="40" stroke="#f1f5f9" strokeWidth="0.8" />
    <line x1="10" y1="55" x2="90" y2="55" stroke="#e2e8f0" strokeWidth="0.8" />
    <line x1="15" y1="5" x2="15" y2="60" stroke="#94a3b8" strokeWidth="0.8" />
    <path d="M 15,45 Q 30,15 45,35 T 75,18 T 90,30" strokeWidth="1.2" />
    <rect x="22" y="35" width="5" height="20" fill="slate-100" strokeWidth="0.8" />
    <rect x="37" y="20" width="5" height="35" fill="slate-100" strokeWidth="0.8" />
    <rect x="52" y="42" width="5" height="13" fill="slate-100" strokeWidth="0.8" />
    <rect x="67" y="25" width="5" height="30" fill="slate-100" strokeWidth="0.8" />
    <rect x="82" y="35" width="5" height="20" fill="slate-100" strokeWidth="0.8" />
  </svg>
);

const WireframePLM = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <rect x="5" y="8" width="24" height="16" fill="white" strokeWidth="0.8" />
    <rect x="38" y="8" width="24" height="16" fill="white" strokeWidth="0.8" />
    <rect x="71" y="8" width="24" height="16" fill="white" strokeWidth="0.8" />

    <rect x="21" y="42" width="24" height="16" fill="white" strokeWidth="0.8" />
    <rect x="55" y="42" width="24" height="16" fill="white" strokeWidth="0.8" />

    <path d="M 29,16 L 38,16" />
    <polygon points="38,16 34,14 34,18" fill="currentColor" stroke="none" />

    <path d="M 62,16 L 71,16" />
    <polygon points="71,16 67,14 67,18" fill="currentColor" stroke="none" />

    <path d="M 83,24 L 83,34 L 67,34 L 67,42" />
    <polygon points="67,42 65,38 69,38" fill="currentColor" stroke="none" />

    <path d="M 45,50 L 55,50" />
    <polygon points="55,50 51,48 51,52" fill="currentColor" stroke="none" />

    <circle cx="83" cy="50" r="6" strokeDasharray="2,1" strokeWidth="0.8" />
    <circle cx="83" cy="50" r="2.5" strokeWidth="0.8" />

    <line x1="9" y1="13" x2="25" y2="13" strokeWidth="0.5" />
    <line x1="9" y1="18" x2="20" y2="18" strokeWidth="0.5" />
    <line x1="42" y1="13" x2="58" y2="13" strokeWidth="0.5" />
  </svg>
);

const WireframeMES = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <line x1="5" y1="8" x2="95" y2="8" strokeWidth="1.2" />
    <line x1="5" y1="20" x2="95" y2="20" strokeWidth="0.8" />

    <line x1="12" y1="14" x2="40" y2="14" strokeWidth="0.8" />
    <line x1="55" y1="14" x2="70" y2="14" strokeWidth="0.8" />
    <line x1="80" y1="14" x2="90" y2="14" strokeWidth="0.8" />

    <rect x="8" y="25" width="6" height="6" fill="white" strokeWidth="0.8" />
    <polyline points="9,28 11,30 13,26" strokeWidth="0.8" />
    <line x1="20" y1="28" x2="50" y2="28" strokeWidth="0.6" />
    <rect x="58" y="26" width="20" height="4" fill="slate-100" strokeWidth="0.5" />
    <circle cx="88" cy="28" r="2" fill="currentColor" stroke="none" />
    <line x1="5" y1="35" x2="95" y2="35" stroke="#f1f5f9" strokeWidth="0.5" />

    <rect x="8" y="40" width="6" height="6" fill="white" strokeWidth="0.8" />
    <polyline points="9,43 11,45 13,41" strokeWidth="0.8" />
    <line x1="20" y1="43" x2="45" y2="43" strokeWidth="0.6" />
    <rect x="58" y="41" width="12" height="4" fill="slate-100" strokeWidth="0.5" />
    <circle cx="88" cy="43" r="2" fill="currentColor" stroke="none" />
    <line x1="5" y1="50" x2="95" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />

    <rect x="8" y="55" width="6" height="6" fill="white" strokeWidth="0.8" />
    <line x1="20" y1="58" x2="40" y2="58" strokeWidth="0.6" />
    <rect x="58" y="56" width="5" height="4" fill="slate-100" strokeWidth="0.5" />
    <circle cx="88" cy="58" r="2" fill="none" strokeWidth="0.8" />
    <line x1="5" y1="65" x2="95" y2="65" stroke="#f1f5f9" strokeWidth="0.5" />
  </svg>
);

const WireframeFDC = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <line x1="10" y1="15" x2="90" y2="15" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3,2" />
    <line x1="10" y1="55" x2="90" y2="55" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3,2" />
    <line x1="10" y1="35" x2="90" y2="35" stroke="#94a3b8" strokeWidth="0.8" />

    <line x1="10" y1="10" x2="10" y2="60" stroke="#e2e8f0" strokeWidth="0.8" />
    <line x1="30" y1="10" x2="30" y2="60" stroke="#f1f5f9" strokeWidth="0.8" />
    <line x1="50" y1="10" x2="50" y2="60" stroke="#f1f5f9" strokeWidth="0.8" />
    <line x1="70" y1="10" x2="70" y2="60" stroke="#f1f5f9" strokeWidth="0.8" />
    <line x1="90" y1="10" x2="90" y2="60" stroke="#e2e8f0" strokeWidth="0.8" />

    <path d="M 10,35 Q 20,38 30,28 T 50,33 T 60,11 T 70,45 T 80,34 T 90,36" strokeWidth="1.2" />
    <circle cx="60" cy="11" r="4" stroke="#ef4444" strokeWidth="1" fill="#ef4444" fillOpacity="0.2" />
    <line x1="60" y1="11" x2="60" y2="25" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="1,1" />
  </svg>
);

const WireframeERP = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <rect x="5" y="8" width="42" height="24" fill="white" strokeWidth="0.8" />
    <line x1="10" y1="14" x2="30" y2="14" strokeWidth="0.8" />
    <line x1="10" y1="20" x2="20" y2="20" strokeWidth="0.5" />
    <line x1="10" y1="25" x2="38" y2="25" strokeWidth="0.5" />

    <rect x="53" y="8" width="42" height="24" fill="white" strokeWidth="0.8" />
    <line x1="58" y1="14" x2="78" y2="14" strokeWidth="0.8" />
    <line x1="58" y1="20" x2="88" y2="20" strokeWidth="0.5" />
    <path d="M 75,26 L 85,20 L 90,24" strokeWidth="0.8" />

    <rect x="5" y="38" width="90" height="24" fill="white" strokeWidth="0.8" />
    <line x1="10" y1="56" x2="90" y2="56" strokeWidth="0.5" />
    <path d="M 10,56 L 25,48 L 40,51 L 55,42 L 70,45 L 85,40 L 90,44 L 90,56 Z" fill="#f8fafc" stroke="none" />
    <path d="M 10,56 L 25,48 L 40,51 L 55,42 L 70,45 L 85,40 L 90,44" strokeWidth="1" />
  </svg>
);

const WireframePredictive = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <line x1="10" y1="58" x2="50" y2="58" strokeWidth="0.6" />
    <line x1="10" y1="10" x2="10" y2="58" strokeWidth="0.6" />

    <path d="M 10,15 C 20,15 25,48 50,53" strokeWidth="1.2" />
    <path d="M 10,25 C 20,25 25,50 50,54" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.6" />
    <line x1="30" y1="10" x2="30" y2="58" strokeWidth="0.5" strokeDasharray="1,1" />

    <rect x="58" y="10" width="36" height="48" fill="white" strokeWidth="0.8" />
    <line x1="64" y1="18" x2="88" y2="18" strokeWidth="0.8" />

    <path d="M 68,36 C 68,32 72,32 72,36 C 72,38 71,40 69,42 L 67,49 C 66,51 64,51 63,49 C 62,47 62,45 63,43 Z" strokeWidth="0.8" />
    <circle cx="70" cy="34" r="1.5" />

    <line x1="78" y1="35" x2="90" y2="35" strokeWidth="0.8" />
    <line x1="78" y1="42" x2="88" y2="42" strokeWidth="0.5" strokeDasharray="1,1" />
    <line x1="78" y1="47" x2="86" y2="47" strokeWidth="0.5" />
  </svg>
);

const WireframeSupply = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <path d="M 5,20 C 25,20 15,5 30,10 C 45,15 35,5 50,15 C 65,25 55,5 75,10 C 95,15 85,25 95,45" stroke="#f8fafc" strokeWidth="0.8" />
    <path d="M 5,45 C 25,45 35,35 50,55 C 65,65 75,55 95,50" stroke="#f8fafc" strokeWidth="0.8" />

    <circle cx="20" cy="25" r="3" fill="white" strokeWidth="1.2" />
    <circle cx="45" cy="40" r="3.5" fill="white" strokeWidth="1.2" />
    <circle cx="75" cy="20" r="3" fill="white" strokeWidth="1.2" />
    <circle cx="85" cy="50" r="2.5" fill="white" strokeWidth="1.2" />

    <path d="M 20,25 Q 32,30 45,40" strokeWidth="1" strokeDasharray="2,1" />
    <path d="M 45,40 Q 60,30 75,20" strokeWidth="1" strokeDasharray="2,1" />
    <path d="M 75,20 Q 80,35 85,50" strokeWidth="1" strokeDasharray="2,1" />
  </svg>
);

const ClipboardPerson = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <circle cx="20" cy="22" r="6" />
    <path d="M 6,38 C 6,30 11,30 20,30 C 29,30 34,30 34,38" />
    <line x1="20" y1="30" x2="20" y2="38" />

    <rect x="48" y="10" width="44" height="48" fill="white" strokeWidth="0.8" />
    <rect x="64" y="6" width="12" height="6" fill="white" strokeWidth="0.8" />

    <circle cx="58" cy="20" r="2" />
    <circle cx="70" cy="25" r="2" />
    <circle cx="82" cy="18" r="2" />

    <line x1="58" y1="20" x2="70" y2="25" strokeWidth="0.6" />
    <line x1="70" y1="25" x2="82" y2="18" strokeWidth="0.6" />

    <line x1="54" y1="35" x2="86" y2="35" strokeWidth="0.6" />
    <line x1="54" y1="41" x2="80" y2="41" strokeWidth="0.6" />
    <line x1="54" y1="47" x2="75" y2="47" strokeWidth="0.6" strokeDasharray="1,1" />
  </svg>
);

const WireframeTwin = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <polygon points="50,10 85,25 85,55 50,60 15,55 15,25" fill="white" strokeWidth="0.8" />
    <line x1="50" y1="10" x2="50" y2="60" strokeWidth="0.8" />
    <line x1="50" y1="35" x2="15" y2="25" strokeWidth="0.8" />
    <line x1="50" y1="35" x2="85" y2="25" strokeWidth="0.8" />

    <line x1="32" y1="17" x2="32" y2="47" strokeWidth="0.5" strokeDasharray="1,1" />
    <line x1="68" y1="17" x2="68" y2="47" strokeWidth="0.5" strokeDasharray="1,1" />

    <circle cx="50" cy="22" r="2" fill="currentColor" stroke="none" />
    <path d="M 50,22 Q 68,27 68,37" strokeWidth="0.6" strokeDasharray="2,1" />
    <circle cx="32" cy="30" r="2" />
  </svg>
);

const WireframeML = () => (
  <svg viewBox="0 0 100 70" className="w-full h-full text-slate-800 fill-none stroke-current" strokeWidth="1">
    <rect x="25" y="10" width="50" height="40" fill="white" strokeWidth="1" />
    <rect x="35" y="18" width="30" height="24" fill="#f8fafc" strokeWidth="0.8" />

    <line x1="25" y1="18" x2="18" y2="18" strokeWidth="1" />
    <line x1="25" y1="26" x2="18" y2="26" strokeWidth="1" />
    <line x1="25" y1="34" x2="18" y2="34" strokeWidth="1" />
    <line x1="25" y1="42" x2="18" y2="42" strokeWidth="1" />

    <line x1="75" y1="18" x2="82" y2="18" strokeWidth="1" />
    <line x1="75" y1="26" x2="82" y2="26" strokeWidth="1" />
    <line x1="75" y1="34" x2="82" y2="34" strokeWidth="1" />
    <line x1="75" y1="42" x2="82" y2="42" strokeWidth="1" />

    <line x1="38" y1="10" x2="38" y2="4" strokeWidth="1" />
    <line x1="50" y1="10" x2="50" y2="4" strokeWidth="1" />
    <line x1="62" y1="10" x2="62" y2="4" strokeWidth="1" />

    <line x1="38" y1="50" x2="38" y2="56" strokeWidth="1" />
    <line x1="50" y1="50" x2="50" y2="56" strokeWidth="1" />
    <line x1="62" y1="50" x2="62" y2="56" strokeWidth="1" />

    <circle cx="43" cy="30" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="50" cy="24" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="50" cy="36" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="57" cy="30" r="1.5" fill="currentColor" stroke="none" />

    <line x1="43" y1="30" x2="50" y2="24" strokeWidth="0.5" />
    <line x1="43" y1="30" x2="50" y2="36" strokeWidth="0.5" />
    <line x1="50" y1="24" x2="57" y2="30" strokeWidth="0.5" />
    <line x1="50" y1="36" x2="57" y2="30" strokeWidth="0.5" />
  </svg>
);

// -------------------------------------------------------------
// Floor Buildings/Structures Renderers (Blueprint SVG style)
// -------------------------------------------------------------

const FloorFactorySVG = () => (
  <svg viewBox="0 0 80 80" className="w-20 h-20 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <rect x="15" y="40" width="50" height="30" fill="white" />
    <polygon points="15,40 25,30 25,40 35,30 35,40 45,30 45,40 65,40 65,70 15,70" fill="white" />

    <rect x="20" y="48" width="8" height="8" strokeWidth="0.8" />
    <line x1="24" y1="48" x2="24" y2="56" strokeWidth="0.8" />
    <line x1="20" y1="52" x2="28" y2="52" strokeWidth="0.8" />

    <rect x="32" y="48" width="8" height="8" strokeWidth="0.8" />
    <line x1="36" y1="48" x2="36" y2="56" strokeWidth="0.8" />
    <line x1="32" y1="52" x2="40" y2="52" strokeWidth="0.8" />

    <rect x="48" y="52" width="12" height="18" fill="white" />
    <line x1="54" y1="52" x2="54" y2="70" />

    <rect x="58" y="20" width="5" height="20" fill="white" />
    <line x1="58" y1="24" x2="63" y2="24" />

    <path d="M 60.5,16 Q 58,10 62,5 T 60,0" strokeDasharray="2,2" strokeWidth="1" />
    <path d="M 62,18 Q 65,13 61,9 T 64,3" strokeDasharray="2,2" strokeWidth="1" opacity="0.5" />
  </svg>
);

const FloorGreenhouseSVG = () => (
  <svg viewBox="0 0 80 80" className="w-20 h-20 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <rect x="15" y="40" width="50" height="30" fill="#f4fbf7" />
    <polygon points="15,40 40,15 65,40" fill="#86efac" fillOpacity="0.45" />

    <line x1="40" y1="15" x2="40" y2="70" />
    <line x1="27" y1="28" x2="27" y2="70" />
    <line x1="53" y1="28" x2="53" y2="70" />
    <line x1="15" y1="55" x2="65" y2="55" />

    <path d="M 23,65 C 23,61 27,61 27,65" strokeWidth="1" />
    <path d="M 33,63 C 33,59 37,59 37,63" strokeWidth="1" />
    <path d="M 57,66 C 57,62 61,62 61,66" strokeWidth="1" />
    <path d="M 47,64 C 47,60 51,60 51,64" strokeWidth="1" />
  </svg>
);

const FloorRobotSVG = () => (
  <svg viewBox="0 0 50 50" className="w-12 h-12 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <polygon points="10,45 40,45 35,40 15,40" fill="white" />
    <circle cx="25" cy="38" r="4" fill="white" />
    <line x1="25" y1="38" x2="18" y2="22" strokeWidth="2" />
    <circle cx="18" cy="22" r="3" fill="white" />
    <line x1="18" y1="22" x2="32" y2="15" strokeWidth="2" />
    <circle cx="32" cy="15" r="2.5" fill="white" />

    <path d="M 32,15 L 35,21 M 32,15 L 38,18" />
    <rect x="35" y="20" width="6" height="6" fill="white" strokeWidth="0.8" />
    <path d="M 38,20 L 38,26" strokeWidth="0.5" />
    <path d="M 12,33 A 15,15 0 0,1 23,23" strokeDasharray="1.5,1.5" strokeWidth="0.8" opacity="0.5" />
  </svg>
);

const FloorMachineSVG = () => (
  <svg viewBox="0 0 50 50" className="w-12 h-12 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <rect x="8" y="15" width="34" height="30" fill="white" />
    <rect x="12" y="19" width="14" height="10" fill="#f8fafc" strokeWidth="0.8" />
    <line x1="15" y1="24" x2="23" y2="24" strokeWidth="0.5" />
    <circle cx="21" cy="21" r="0.8" fill="currentColor" stroke="none" />

    <circle cx="32" cy="21" r="1.5" fill="white" />
    <circle cx="37" cy="21" r="1.5" fill="white" />
    <circle cx="32" cy="26" r="1.5" fill="white" />

    <rect x="2" y="35" width="6" height="5" fill="white" />
    <rect x="42" y="35" width="6" height="5" fill="white" />
    <line x1="8" y1="37" x2="42" y2="37" />
  </svg>
);

const FloorShelfSVG = () => (
  <svg viewBox="0 0 50 60" className="w-14 h-16 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <rect x="5" y="5" width="40" height="50" fill="none" />
    <line x1="5" y1="22" x2="45" y2="22" />
    <line x1="5" y1="38" x2="45" y2="38" />
    <line x1="5" y1="5" x2="5" y2="55" strokeWidth="2" />
    <line x1="45" y1="5" x2="45" y2="55" strokeWidth="2" />

    <rect x="8" y="12" width="10" height="10" fill="white" strokeWidth="0.8" />
    <rect x="20" y="14" width="8" height="8" fill="white" strokeWidth="0.8" />
    <rect x="30" y="10" width="12" height="12" fill="white" strokeWidth="0.8" />

    <rect x="10" y="30" width="14" height="8" fill="white" strokeWidth="0.8" />
    <rect x="28" y="28" width="12" height="10" fill="white" strokeWidth="0.8" />

    <rect x="8" y="47" width="8" height="8" fill="white" strokeWidth="0.8" />
    <rect x="18" y="45" width="10" height="10" fill="white" strokeWidth="0.8" />
    <rect x="32" y="47" width="10" height="8" fill="white" strokeWidth="0.8" />
  </svg>
);

const FloorServerSVG = () => (
  <svg viewBox="0 0 40 60" className="w-10 h-16 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <rect x="5" y="5" width="30" height="50" fill="white" />
    <rect x="8" y="10" width="24" height="10" fill="#f8fafc" strokeWidth="0.8" />
    <line x1="11" y1="13" x2="29" y2="13" strokeDasharray="1,1" strokeWidth="0.6" />
    <line x1="11" y1="17" x2="20" y2="17" strokeWidth="0.6" />
    <circle cx="27" cy="17" r="1" fill="currentColor" stroke="none" />

    <rect x="8" y="25" width="24" height="10" fill="#f8fafc" strokeWidth="0.8" />
    <line x1="11" y1="28" x2="29" y2="28" strokeDasharray="1,1" strokeWidth="0.6" />
    <line x1="11" y1="32" x2="20" y2="32" strokeWidth="0.6" />
    <circle cx="27" cy="32" r="1" fill="currentColor" stroke="none" />

    <rect x="8" y="40" width="24" height="10" fill="#f8fafc" strokeWidth="0.8" />
    <line x1="11" y1="43" x2="29" y2="43" strokeDasharray="1,1" strokeWidth="0.6" />
    <line x1="11" y1="47" x2="20" y2="47" strokeWidth="0.6" />
    <circle cx="27" cy="47" r="1" fill="currentColor" stroke="none" />

    <path d="M 5,15 Q 1,30 5,45" strokeDasharray="1.5,1.5" strokeWidth="0.8" opacity="0.5" />
  </svg>
);

const FloorConveyorSVG = () => (
  <svg viewBox="0 0 60 25" className="w-16 h-6 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <rect x="5" y="8" width="50" height="8" fill="white" rx="4" />
    <circle cx="10" cy="12" r="2.5" />
    <circle cx="22" cy="12" r="2.5" />
    <circle cx="34" cy="12" r="2.5" />
    <circle cx="46" cy="12" r="2.5" />
    <rect x="25" y="0" width="10" height="8" fill="white" strokeWidth="0.8" />
    <line x1="25" y1="4" x2="35" y2="4" strokeWidth="0.5" />
  </svg>
);

const FloorCoinsSVG = () => (
  <svg viewBox="0 0 30 40" className="w-6 h-8 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <ellipse cx="10" cy="32" rx="8" ry="3" fill="white" />
    <path d="M 2,32 L 2,38 A 8,3 0 0,0 18,38 L 18,32" fill="white" />
    <ellipse cx="10" cy="38" rx="8" ry="3" />

    <ellipse cx="20" cy="25" rx="8" ry="3" fill="white" />
    <path d="M 12,25 L 12,31 A 8,3 0 0,0 28,31 L 28,25" fill="white" />
    <ellipse cx="20" cy="31" rx="8" ry="3" />

    <ellipse cx="12" cy="15" rx="8" ry="3" fill="white" />
    <path d="M 4,15 L 4,21 A 8,3 0 0,0 20,21 L 20,15" fill="white" />
    <ellipse cx="12" cy="21" rx="8" ry="3" />
  </svg>
);

const FloorCubeSVG = () => (
  <svg viewBox="0 0 40 40" className="w-8 h-8 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <polygon points="20,5 35,13 35,29 20,37 5,29 5,13" fill="white" />
    <line x1="20" y1="5" x2="20" y2="37" />
    <line x1="20" y1="21" x2="5" y2="13" />
    <line x1="20" y1="21" x2="35" y2="13" />
    <circle cx="20" cy="21" r="3" fill="white" />
  </svg>
);

const FloorDeskSVG = () => (
  <svg viewBox="0 0 60 40" className="w-14 h-10 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <polygon points="5,25 55,25 50,37 10,37" fill="white" />
    <line x1="12" y1="37" x2="12" y2="25" />
    <line x1="48" y1="37" x2="48" y2="25" />

    <rect x="22" y="10" width="16" height="10" fill="white" strokeWidth="1" />
    <line x1="30" y1="20" x2="30" y2="25" strokeWidth="1.5" />

    <polygon points="8,12 20,10 20,18 8,20" fill="white" />
    <line x1="16" y1="19" x2="16" y2="25" />

    <polygon points="40,10 52,12 52,20 40,18" fill="white" />
    <line x1="44" y1="19" x2="44" y2="25" />

    <line x1="24" y1="23" x2="36" y2="23" strokeWidth="0.8" />
  </svg>
);

const FloorPersonSVG = () => (
  <svg viewBox="0 0 40 40" className="w-10 h-10 overflow-visible text-slate-800 fill-none stroke-current" strokeWidth="1.2">
    <circle cx="20" cy="20" r="16" fill="white" />
    <circle cx="20" cy="15" r="4.5" />
    <path d="M 11,28 C 11,22 15,22 20,22 C 25,22 29,22 29,28" />
    <path d="M 4,20 A 16,16 0 0,1 36,20" strokeDasharray="2,2" strokeWidth="0.8" opacity="0.5" />
  </svg>
);

// -------------------------------------------------------------
// Component Entry Point (Controlled dynamically by scrollProgress)
// -------------------------------------------------------------

export default function ManufacturingIsometricMap({ scrollProgress = 0 }) {

  const floorNodes = [
    { id: 'mds', x: 180, y: 300, type: 'factory', step: 0, renderer: FloorFactorySVG, isLarge: true },
    { id: 'mes', x: 280, y: 180, type: 'machine', step: 1, renderer: FloorMachineSVG },
    { id: 'plm', x: 180, y: 500, type: 'person-circle', step: 0, renderer: FloorPersonSVG },
    { id: 'fdc', x: 450, y: 280, type: 'machine', step: 1, renderer: FloorMachineSVG },
    { id: 'erp', x: 650, y: 280, type: 'factory', step: 0, renderer: FloorFactorySVG, isLarge: true },

    { id: 'predictive', x: 380, y: 480, type: 'robot', step: 2, renderer: FloorRobotSVG },
    { id: 'supply', x: 650, y: 480, type: 'shelf', step: 2, renderer: FloorShelfSVG },
    { id: 'scientist', x: 450, y: 650, type: 'desk', step: 2, renderer: FloorDeskSVG },
    { id: 'twin', x: 720, y: 480, type: 'greenhouse', step: 1, renderer: FloorGreenhouseSVG, isLarge: true },
    { id: 'ai', x: 720, y: 650, type: 'server-rack', step: 2, renderer: FloorServerSVG },

    { id: 'conveyor', x: 280, y: 550, type: 'conveyor', step: 1, renderer: FloorConveyorSVG },
    { id: 'cube', x: 500, y: 420, type: 'cube', step: 1, renderer: FloorCubeSVG },
    { id: 'coins', x: 580, y: 420, type: 'coins', step: 1, renderer: FloorCoinsSVG },
    { id: 'machine2', x: 550, y: 180, type: 'machine', step: 1, renderer: FloorMachineSVG },
  ];

  const floatingCards = [
    { id: 'mds', label: 'MDS', customIcon: WireframeMDS, target: 'mds', cx: 80, cy: 180, cz: 140, step: 0 },
    { id: 'mes', label: 'MES', customIcon: WireframeMES, target: 'mes', cx: 160, cy: 50, cz: 160, step: 1 },
    { id: 'plm', label: 'PLM', customIcon: WireframePLM, target: 'plm', cx: 60, cy: 600, cz: 120, step: 0 },

    { id: 'fdc', label: 'FDC', customIcon: WireframeFDC, target: 'fdc', cx: 400, cy: 50, cz: 170, step: 1 },
    { id: 'erp', label: 'ERP', customIcon: WireframeERP, target: 'erp', cx: 680, cy: 50, cz: 150, step: 0 },

    { id: 'predictive', label: 'PREDICTIVE MAINT', customIcon: WireframePredictive, target: 'predictive', cx: 320, cy: 300, cz: 140, step: 2 },
    { id: 'supply', label: 'SUPPLY CHAIN OPT', customIcon: WireframeSupply, target: 'supply', cx: 700, cy: 320, cz: 130, step: 1 },

    { id: 'scientist', label: 'DATA SCIENTIST', customIcon: ClipboardPerson, target: 'scientist', cx: 300, cy: 740, cz: 120, step: 2 },
    { id: 'twin', label: 'DIGITAL TWIN CTRL', customIcon: WireframeTwin, target: 'twin', cx: 800, cy: 300, cz: 140, step: 1 },
    { id: 'ai', label: 'MACHINE LEARNING', customIcon: WireframeML, target: 'ai', cx: 800, cy: 740, cz: 120, step: 2 },
  ];

  // Stack separation targets (collapsed close to top plate, explodes out on scroll)
  // Layer 4 (top) is the anchor at Z=0. Lower layers shift down:
  const zPlate4 = 0;
  const zPlate3 = -100 * scrollProgress;
  const zPlate2 = -200 * scrollProgress;
  const zPlate1 = -300 * scrollProgress;

  // Floating cards rise up to their heights as scroll progresses
  // Connector lines fade in as cards separate from floor
  const cardOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.5));
  const lineOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.3) / 0.5));

  return (
    <div
      className="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden font-sans select-none"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative w-[800px] h-[800px] transform scale-[0.38] sm:scale-[0.65] md:scale-[0.8] lg:scale-[0.95] flex-shrink-0 origin-center transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="isometric-3d-container relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateX: 60, rotateZ: -45, scale: 1.0 }}
          transition={{ duration: 0.5 }}
        >
          {/* LAYER 1: Logic Gates Pattern */}
          <Plate zOffset={zPlate1}>
            <div className="absolute inset-0 p-4 select-none opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="gates" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 1,4 L 5,4 M 5,2 L 5,6 C 8,6 10,4 10,4 C 10,4 8,2 5,2 Z M 10,4 L 14,4" fill="none" stroke="#1e293b" strokeWidth="0.4" />
                  <path d="M 3,11 L 7,11 M 7,9 Q 9,11 7,13 Q 11,13 13,11 Q 11,9 7,9 M 13,11 L 15,11" fill="none" stroke="#1e293b" strokeWidth="0.4" />
                  <path d="M 0,7.5 L 15,7.5 M 7.5,0 L 7.5,15" fill="none" stroke="#1e293b" strokeWidth="0.15" strokeDasharray="1,1" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gates)" />
              </svg>
            </div>
          </Plate>

          {/* LAYER 2: Dots Grid */}
          <Plate zOffset={zPlate2}>
            <div className="absolute inset-0 p-6 flex items-center justify-center opacity-30">
              <div className="w-[92%] h-[92%] grid grid-cols-[repeat(16,1fr)] gap-1.5">
                {Array.from({ length: 256 }).map((_, i) => {
                  const isBlack = (i * 7 + 3) % 5 > 2;
                  return (
                    <div key={i} className={`w-full pt-[100%] rounded-full border border-slate-800/80 ${isBlack ? 'bg-slate-800' : 'bg-white'}`} />
                  );
                })}
              </div>
            </div>
          </Plate>

          {/* LAYER 3: Tracks */}
          <Plate zOffset={zPlate3}>
            <div className="absolute inset-0 p-10">
              <div className="w-full h-full border border-slate-800/60 relative">
                <svg className="absolute inset-0 w-full h-full">
                  <path d="M 10% 20% L 90% 20% L 90% 80% L 10% 80% Z" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                  <path d="M 30% 20% L 30% 80%" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                  <path d="M 70% 20% L 70% 80%" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                  <path d="M 10% 50% L 90% 50%" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
                </svg>
              </div>
            </div>
          </Plate>

          {/* LAYER 4: Factory Floor & Connections (Fixed top plate at Z=0) */}
          <Plate zOffset={zPlate4}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Network tracks */}
              <path d="M 180 300 L 650 300 M 180 500 L 750 500 M 280 180 L 280 700 M 450 280 L 450 650 M 650 180 L 650 500" fill="none" stroke="#1e293b" strokeWidth="1" opacity="0.25" />

              {/* Clean grey circular border outline around nodes matching Palantir style */}
              {floorNodes.map((node, i) => (
                <circle key={i} cx={node.x} cy={node.y} r={node.isLarge ? 38 : 26} fill="none" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3,2" />
              ))}
            </svg>

            {floorNodes.map((node, i) => {
              const NodeRenderer = node.renderer;

              return (
                <div
                  key={i}
                  className={`floor-node absolute border border-slate-800 bg-white flex items-center justify-center rounded-full shadow-sm
                    ${node.isLarge ? 'w-20 h-20 -ml-10 -mt-10' : 'w-12 h-12 -ml-6 -mt-6'}`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute [transform:rotateX(-90deg)_rotateY(-45deg)] origin-bottom flex flex-col items-center justify-end pb-1 z-10 scale-90">
                    <NodeRenderer />
                  </div>
                </div>
              );
            })}
          </Plate>

          {/* LAYER 5: Floating Dashboards & Connecting lines (Expanding Z offset) */}
          <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            {floatingCards.map((card, i) => {
              const targetNode = floorNodes.find(n => n.id === card.target);
              const floorZOffset = 0; // Floor plate is at Z=0
              const CardContent = card.customIcon;
              const currentZ = card.cz * scrollProgress;

              return (
                <React.Fragment key={i}>

                  {/* Floating Dashboard Frame */}
                  <motion.div
                    className="floating-card absolute w-32 h-24 bg-white border border-slate-900 flex flex-col pointer-events-auto shadow-lg"
                    style={{
                      left: `${card.cx}px`,
                      top: `${card.cy}px`,
                      marginLeft: '-64px',
                      marginTop: '-48px',
                      transformStyle: 'preserve-3d',
                    }}
                    animate={{
                      z: currentZ,
                      opacity: cardOpacity
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  >
                    {/* 3D crisp thin edges */}
                    <div className="absolute top-full left-0 w-full h-[3px] bg-slate-200 border-x border-b border-slate-900 origin-top [transform:rotateX(-90deg)]" />
                    <div className="absolute top-0 right-full w-[3px] h-full bg-slate-300 border-y border-l border-slate-900 origin-right [transform:rotateY(-90deg)]" />

                    {/* Window Controls */}
                    <div className="flex items-center gap-1 px-1.5 py-1 border-b border-slate-900 bg-slate-50">
                      <div className="w-1.5 h-1.5 rounded-full border bg-slate-300 border-slate-800" />
                      <div className="w-1.5 h-1.5 rounded-full border bg-slate-300 border-slate-800" />
                      <div className="w-1.5 h-1.5 rounded-full border bg-slate-300 border-slate-800" />
                    </div>

                    {/* Dashboard graphic */}
                    <div className="flex-1 p-1 bg-transparent overflow-hidden">
                      <CardContent />
                    </div>

                    {/* Descriptive Tag */}
                    <div className="absolute -bottom-3 -right-1 border border-slate-900 bg-slate-900 text-white text-[7.5px] font-mono font-bold px-1.5 py-[0.5px] whitespace-nowrap">
                      {card.label}
                    </div>
                  </motion.div>

                  {/* 3D solid connecting lines that grow with card Z separation */}
                  <div className="absolute z-10" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div
                      className="connector-line absolute bg-slate-900 origin-left"
                      style={{
                        height: '1px',
                        left: `${targetNode.x}px`,
                        top: `${targetNode.y}px`,
                        transformStyle: 'preserve-3d',
                        transform: `translateZ(${floorZOffset}px) ` + getLineStyles(targetNode.x, targetNode.y, card.cx, card.cy, currentZ - floorZOffset).transform,
                        width: getLineStyles(targetNode.x, targetNode.y, card.cx, card.cy, currentZ - floorZOffset).width,
                        marginTop: '-0.5px',
                      }}
                      animate={{
                        opacity: lineOpacity
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>

                </React.Fragment>
              );
            })}
          </div>

        </motion.div>
      </div>
    </div>
  );
}
