import React, { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * PremiumSectorCard
 * Real 3D layering via CSS perspective + preserve-3d: a drifting gradient
 * mesh sits behind the glass surface, the icon badge floats above it on
 * its own z-plane, and the whole stack tilts toward the cursor on hover.
 * Ambient motion (mesh drift, badge bob, glow pulse) runs continuously,
 * independent of hover.
 */
export default function PremiumSectorCard({ mod, onClick, singleView }) {
  const color = mod.color;
  const wrapRef = useRef(null);

  const handleMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotY = (px - 0.5) * 14;
    const rotX = (0.5 - py) * 14;
    el.style.setProperty('--rx', `${rotX}deg`);
    el.style.setProperty('--ry', `${rotY}deg`);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty('--rx', `0deg`);
    el.style.setProperty('--ry', `0deg`);
  };

  return (
    <div
      className={`${singleView ? 'w-full max-w-md mx-auto' : ''}`}
      style={{ perspective: '1400px' }}
    >
      <div
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
        className="group relative h-full cursor-pointer rounded-[28px] transition-transform duration-300 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))',
        }}
      >
        {/* Ambient drifting gradient mesh, sits furthest back */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[28px]"
          style={{ transform: 'translateZ(-60px) scale(1.2)' }}
        >
          <motion.div
            className="absolute h-40 w-40 rounded-full blur-3xl"
            style={{ backgroundColor: color, opacity: 0.3, top: '-10%', left: '-10%' }}
            animate={{ x: [0, 40, 10, 0], y: [0, 20, 40, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute h-32 w-32 rounded-full blur-3xl"
            style={{ backgroundColor: color, opacity: 0.2, bottom: '-10%', right: '-10%' }}
            animate={{ x: [0, -30, -10, 0], y: [0, -15, -35, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Glass surface */}
        <div
          className="absolute inset-0 rounded-[28px] border border-white/70 bg-white/75 backdrop-blur-xl transition-shadow duration-500"
          style={{
            transform: 'translateZ(0px)',
            boxShadow: `0 8px 24px -10px ${color}30, 0 2px 8px rgba(15,23,42,0.06)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            transform: 'translateZ(1px)',
            boxShadow: `0 26px 60px -14px ${color}55, 0 6px 18px rgba(15,23,42,0.1)`,
          }}
        />

        {/* Rim light along the edge */}
        <div
          className="absolute inset-0 rounded-[28px] pointer-events-none"
          style={{
            transform: 'translateZ(1px)',
            background: `linear-gradient(120deg, ${color}55, transparent 30%, transparent 70%, ${color}33)`,
            mixBlendMode: 'overlay',
            opacity: 0.8,
          }}
        />

        {/* Cursor-follow glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            transform: 'translateZ(2px)',
            background: `radial-gradient(180px circle at var(--mx,50%) var(--my,50%), ${color}25, transparent 70%)`,
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 h-1.5 w-full rounded-t-[28px]"
          style={{ transform: 'translateZ(2px)', background: `linear-gradient(90deg, ${color}, ${color}99)` }}
        />

        {/* Content, lifted onto its own z-plane */}
        <div
          className="relative flex h-full flex-col p-8"
          style={{ transform: 'translateZ(24px)' }}
        >
          {/* Floating icon badge, bobs continuously + sits highest in z */}
          <motion.div
            className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              transform: 'translateZ(46px)',
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
              boxShadow: `0 16px 26px -8px ${color}80, 0 4px 10px rgba(15,23,42,0.15)`,
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" className="h-7 w-7" strokeWidth={1.8}>
              {mod.icon}
            </svg>
          </motion.div>

          <div className="flex-1">
            <h3 className="mb-4 font-sans text-xl font-bold text-slate-900 md:text-2xl">
              {mod.title}
            </h3>
            <p className="mb-8 font-serif text-sm leading-relaxed text-slate-600 md:text-base">
              {mod.description}
            </p>
          </div>

          <div className="mt-auto">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-500 group-hover:translate-x-1"
              style={{ backgroundColor: color }}
            >
              Explore
              <svg className="h-4 w-4 transform transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}