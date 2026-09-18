import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function CinematicCard({ children, route, className = '', index = 0 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springCfg = { stiffness: 200, damping: 24, mass: 0.5 };
  const mouseXSpring = useSpring(x, springCfg);
  const mouseYSpring = useSpring(y, springCfg);

  // Keep tilt modest — this is the main per-frame cost, so we don't
  // stack a second per-frame-computed gradient/shadow on top of it.
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  // Glare position as plain transforms (cheap) instead of building a
  // new gradient string every frame.
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['-40%', '40%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['-40%', '40%']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={route}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
      whileTap={{ scale: 0.98 }}
      style={{
        rotateX,
        rotateY,
        willChange: 'transform',
      }}
      className={`group/card relative overflow-hidden shadow-md hover:shadow-2xl hover:shadow-brand-orange/10 transition-shadow duration-300 ${className}`}
    >
      {/* Glare: a fixed round gradient div we just translate, instead
          of recomputing a radial-gradient() string on every frame */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-20 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        style={{
          left: glareX,
          top: glareY,
          width: '140%',
          height: '140%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)',
          willChange: 'transform',
        }}
      />

      {/* Static border glow — pure CSS transition, no JS per frame */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl z-20 ring-1 ring-inset ring-transparent group-hover/card:ring-brand-orange/25 transition-all duration-300" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        {children}
      </div>
    </motion.a>
  );
}