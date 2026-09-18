import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import ParticleImage from './ParticleImage';

const STEP_MS = 1200;    // time between each line/card starting to appear (must be >= DRAW_MS + CARD_MS)
const DRAW_MS = 600;     // how long one line takes to draw
const CARD_MS = 450;     // how long one card takes to fade/scale in, AFTER its line finishes
const PAUSE_MS = 1200;   // pause after everything has appeared before looping

export default function ServiceRadialGraph({ onNodeClick }) {
  const containerRef = useRef(null);
  const hubRef = useRef(null);
  const nodesRef = useRef([]);
  const floatTweensRef = useRef([]);
  const linesCacheRef = useRef([]); // last computed positions, for change-detection
  const [lines, setLines] = useState([]);
  const [activeStep, setActiveStep] = useState(0); // how many nodes/lines are revealed, in order

  const sectors = [
    {
      name: 'Healthcare',
      img: '/icons/icon_healthcare_1779810397679.png',
      posClass: 'md:top-[12%] md:left-[16%]',
      color: '#06b6d4'
    },
    {
      name: 'Manufacturing',
      img: '/icons/icon_manufacturing_1779810417710.png',
      posClass: 'md:top-[16%] md:right-[16%]',
      color: '#6366f1'
    },
    {
      name: 'Agriculture',
      img: '/icons/icon_agriculture_1779810433526.png',
      posClass: 'md:top-[40%] md:left-[6%]',
      color: '#22c55e'
    },
    {
      name: 'Financial Management',
      img: '/icons/icon_financial_1779810446185.png',
      posClass: 'md:top-[43%] md:right-[6%]',
      color: '#f59e0b'
    },
    {
      name: 'Supply Chain',
      img: '/icons/icon_supply_chain_1779810462951.png',
      posClass: 'md:bottom-[14%] md:left-[21%]',
      color: '#ec4899'
    },
    {
      name: 'Energy & Consumption',
      img: '/icons/icon_energy_1779810477656.png',
      posClass: 'md:bottom-[11%] md:right-[21%]',
      color: '#ef4444'
    }
  ];

  const computeLines = useCallback(() => {
    const container = containerRef.current;
    const hubEl = hubRef.current;
    if (!container || !hubEl) return;
    if (window.innerWidth < 768) {
      if (linesCacheRef.current.length !== 0) {
        linesCacheRef.current = [];
        setLines([]);
      }
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const hubRect = hubEl.getBoundingClientRect();
    const hubX = hubRect.left + hubRect.width / 2 - containerRect.left;
    const hubY = hubRect.top + hubRect.height / 2 - containerRect.top;

    const next = nodesRef.current.map((el, i) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const nx = r.left + r.width / 2 - containerRect.left;
      const ny = r.top + r.height / 2 - containerRect.top;
      return { id: i, x1: hubX, y1: hubY, x2: nx, y2: ny };
    }).filter(Boolean);

    const prev = linesCacheRef.current;
    const EPS = 0.4;
    const changed =
      next.length !== prev.length ||
      next.some((n, i) => {
        const p = prev[i];
        return (
          !p ||
          Math.abs(p.x1 - n.x1) > EPS ||
          Math.abs(p.y1 - n.y1) > EPS ||
          Math.abs(p.x2 - n.x2) > EPS ||
          Math.abs(p.y2 - n.y2) > EPS
        );
      });

    if (changed) {
      linesCacheRef.current = next;
      setLines(next);
    }
  }, []);

  useEffect(() => {
    computeLines();
    const settleTimer = setTimeout(computeLines, 400);

    const ro = new ResizeObserver(() => computeLines());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', computeLines);

    const driftTimer = setInterval(computeLines, 200);

    return () => {
      clearTimeout(settleTimer);
      clearInterval(driftTimer);
      ro.disconnect();
      window.removeEventListener('resize', computeLines);
    };
  }, [computeLines]);

  useEffect(() => {
    let timer;

    const tick = () => {
      setActiveStep((prev) => {
        if (prev >= sectors.length) {
          timer = setTimeout(() => setActiveStep(0), PAUSE_MS);
          return prev;
        }
        return prev + 1;
      });
    };

    timer = setTimeout(tick, STEP_MS);

    return () => clearTimeout(timer);
  }, [activeStep, sectors.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hub-center',
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.5)' }
      );

      const hubEl = document.querySelector('.hub-center');
      if (hubEl) {
        const tween = gsap.to(hubEl, {
          y: '+=15',
          duration: 2.5 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        });
        hubEl.addEventListener('mouseenter', () => tween.pause());
        hubEl.addEventListener('mouseleave', () => tween.play());
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const justRevealedIndex = activeStep - 1;
    if (justRevealedIndex < 0) return;
    const el = nodesRef.current[justRevealedIndex];
    if (!el || floatTweensRef.current[justRevealedIndex]) return;

    const lineDelay = lines.length > 0 ? DRAW_MS : 0;
    const startFloat = setTimeout(() => {
      const tween = gsap.to(el, {
        y: '+=15',
        duration: 2.5 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      floatTweensRef.current[justRevealedIndex] = tween;
      el.addEventListener('mouseenter', () => tween.pause());
      el.addEventListener('mouseleave', () => tween.play());
    }, lineDelay + CARD_MS);

    return () => clearTimeout(startFloat);
  }, [activeStep, lines.length]);

  useEffect(() => {
    if (activeStep !== 0) return;
    floatTweensRef.current.forEach((tween) => tween && tween.kill());
    floatTweensRef.current = [];
  }, [activeStep]);

  const snakePath = (x1, y1, x2, y2, seed) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy) || 1;
    const nx = -dy / dist;
    const ny = dx / dist;
    const bend = Math.min(dist * 0.28, 70);
    const wobble = (seed % 2 === 0 ? 1 : -1);

    const c1x = x1 + dx * 0.32 + nx * bend * wobble;
    const c1y = y1 + dy * 0.32 + ny * bend * wobble;
    const c2x = x1 + dx * 0.68 - nx * bend * wobble;
    const c2y = y1 + dy * 0.68 - ny * bend * wobble;

    return `M${x1},${y1} C${c1x},${c1y} ${c2x},${c2y} ${x2},${y2}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto h-auto md:h-[92vh] min-h-[500px] md:min-h-[820px] mt-24 mb-12 flex flex-col md:block items-center justify-center"
    >
      <style>{`
        @keyframes tensorix-spin { to { transform: rotate(360deg); } }
        @keyframes tensorix-spin-reverse { to { transform: rotate(-360deg); } }
        @keyframes tensorix-shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[2.5rem]">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#f7f8fc',
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(33,61,131,0.09) 1px, transparent 0)',
            backgroundSize: '26px 26px'
          }}
        />
        <div
          className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, #eb510e55, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-40"
          style={{ background: 'radial-gradient(circle, #213d8355, transparent 70%)' }}
        />
      </div>

      <svg
        className="hidden md:block absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {sectors.map((sector, i) => (
            <linearGradient key={sector.name} id={`tensorixLineGradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eb510e" stopOpacity="0.6" />
              <stop offset="100%" stopColor={sector.color} stopOpacity="0.7" />
            </linearGradient>
          ))}
        </defs>
        {lines.map((line) => {
          const d = snakePath(line.x1, line.y1, line.x2, line.y2, line.id);
          const isDrawn = line.id < activeStep;
          const color = sectors[line.id]?.color || '#213d83';

          return (
            <g key={line.id}>
              <path
                d={d}
                fill="none"
                stroke={`url(#tensorixLineGradient-${line.id})`}
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="1"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: isDrawn ? 0 : 1,
                  transition: `stroke-dashoffset ${DRAW_MS}ms ease`,
                  filter: isDrawn ? `drop-shadow(0 0 4px ${color}66)` : 'none'
                }}
              />

              {isDrawn && (
                <circle r="4" fill={color} opacity="0.9" style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                  <animateMotion
                    dur={`${2.6 + (line.id % 3) * 0.5}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              )}

              {isDrawn && (
                <>
                  <circle cx={line.x2} cy={line.y2} r="5" fill={color} opacity="0.9" />
                  <circle cx={line.x2} cy={line.y2} r="9" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="r" values="7;13;7" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                </>
              )}
            </g>
          );
        })}
      </svg>

      <div className="absolute -top-20 md:-top-24 left-0 w-full text-center z-40 px-4">
        <h2 className="text-3xl md:text-5xl font-bold font-sans text-slate-900 mb-2 md:mb-3 tracking-tight">Modules of Tensorix AI</h2>
        <p className="text-slate-600 font-serif text-base md:text-xl">A Complete Guide to Core Agentic Workflows</p>
      </div>

      <div ref={hubRef} className="relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-30 mb-8 md:mb-0 mt-8 md:mt-0">
        <div
          className="absolute inset-0 -m-6 md:-m-10 rounded-[2rem] pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, #eb510e, #213d83, #eb510e)',
            opacity: 0.35,
            filter: 'blur(6px)',
            animation: 'tensorix-spin 8s linear infinite'
          }}
        />
        <div
          className="absolute inset-0 -m-3 md:-m-5 rounded-[1.75rem] pointer-events-none"
          style={{
            background: 'conic-gradient(from 180deg, #213d83, #eb510e, #213d83)',
            opacity: 0.25,
            filter: 'blur(4px)',
            animation: 'tensorix-spin-reverse 11s linear infinite'
          }}
        />

        <div className="hub-center relative flex flex-col items-center justify-center p-6 md:p-9 rounded-3xl bg-gradient-to-br from-white via-white to-slate-50 backdrop-blur-xl border border-white shadow-[0_20px_60px_rgba(33,61,131,0.25)] hover:shadow-[0_25px_70px_rgba(235,81,14,0.3)] transition-all duration-500">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/70 pointer-events-none" />

          <div className="absolute w-28 h-28 md:w-56 md:h-56 rounded-full pointer-events-none" style={{ boxShadow: '0 0 0 0 rgba(235,81,14,0.4)', animation: 'tensorix-shimmer 3s ease-in-out infinite' }} />

          <div className="w-24 h-24 md:w-48 md:h-48 relative z-10 drop-shadow-xl">
            <ParticleImage
              src="/icons/icon_hub_cube.png"
              alt="Central Hub"
              cycleMs={6500}
              holdRatio={0.32}
              scatterRadius={1.6}
            />
          </div>
          <div className="mt-4 px-6 py-2.5 rounded-xl border border-brand-orange/20 bg-white/70 shadow-lg shadow-[#213d83]/10 relative z-10 inline-block">
            <motion.span
              className="text-xs md:text-lg font-bold font-sans tracking-wide leading-normal whitespace-nowrap"
              style={{
                background: 'linear-gradient(90deg, #eb510e, #213d83, #eb510e)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
              }}
              animate={{ backgroundPosition: ['0% 0', '200% 0'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              Tensorix Core
            </motion.span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:block w-full max-w-sm sm:max-w-lg md:max-w-none px-4 md:px-0">
        {sectors.map((sector, i) => {
          const isRevealed = i < activeStep;
          const color = sector.color;
          return (
            <div
              key={sector.name}
              ref={el => nodesRef.current[i] = el}
              className={`relative md:absolute z-20 flex flex-col items-center justify-center group ${sector.posClass}`}
              style={{
                opacity: isRevealed ? 1 : 0,
                transform: isRevealed ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)',
                transition: `opacity ${CARD_MS}ms ease, transform ${CARD_MS}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
                transitionDelay: isRevealed && lines.length > 0 ? `${DRAW_MS}ms` : '0ms',
                pointerEvents: isRevealed ? 'auto' : 'none'
              }}
            >
              <div
                onClick={() => {
                  if (onNodeClick) {
                    onNodeClick(sector.name);
                  } else {
                    if (sector.name === 'Manufacturing') window.location.hash = '#/manufacturing';
                    else if (sector.name === 'Agriculture') window.location.hash = '#/agriculture';
                  }
                }}
                className="w-full md:w-44 h-36 md:h-48 rounded-2xl bg-white/80 backdrop-blur-md border border-white flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer relative overflow-hidden"
                style={{
                  boxShadow: `0 10px 28px -6px ${color}33, 0 2px 8px rgba(15,23,42,0.06)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 18px 40px -8px ${color}66, 0 4px 12px rgba(15,23,42,0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 10px 28px -6px ${color}33, 0 2px 8px rgba(15,23,42,0.06)`;
                }}
              >
                <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }} />

                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/70 to-transparent pointer-events-none" />

                <div
                  className="absolute top-3 left-3 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold text-white z-10"
                  style={{ backgroundColor: color }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: `radial-gradient(circle, ${color}22, transparent 70%)` }}
                  />
                  <div className="w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 relative drop-shadow-lg">
                    <ParticleImage
                      src={sector.img}
                      alt={sector.name}
                      cycleMs={7000 + i * 400}
                      holdRatio={0.35}
                      scatterRadius={1.3}
                      sampleSize={90}
                      particleSize={1.3}
                    />
                  </div>
                </div>

                <div className="mt-3 text-center z-10 w-full">
                  <span
                    className="text-[10px] md:text-xs font-bold font-sans px-2.5 py-1 rounded-full block truncate text-white shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    {sector.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}