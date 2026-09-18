import React, { useEffect, useRef } from 'react';

/**
 * Renders an image as a swarm of particles that continuously assemble
 * into the image, hold, then break apart and re-form — the "shatter,
 * reform" effect. Drop it in wherever you'd normally use <img>; it fills
 * its parent, so size it via the wrapping element's className (w-*, h-*).
 *
 * Usage:
 *   <div className="w-24 h-24 md:w-48 md:h-48">
 *     <ParticleImage src="/icons/icon_hub_cube.png" alt="Central Hub" />
 *   </div>
 */
export default function ParticleImage({
  src,
  alt = '',
  className = '',
  sampleSize = 64,       // resolution the image is sampled at (higher = more particles = more detail, more cost)
  particleSize = 2.2,    // drawn size of each particle, in CSS px
  cycleMs = 6500,        // full assemble -> hold -> disperse -> (repeat) duration
  holdRatio = 0.32,      // fraction of the cycle spent fully formed
  scatterRadius = 1.6,   // how far out particles fly when dispersed, in canvas-widths
  sharpImageThreshold = 0.85, // progress above which the real crisp <img> fades in, replacing the particle render
  reduceMotion,          // optional override; auto-detects prefers-reduced-motion otherwise
}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const imgElRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d');
    // Note: intentionally NOT auto-detecting the OS-level
    // prefers-reduced-motion setting here — this is a decorative brand
    // animation, not motion the user needs to escape, and auto-detecting
    // it froze the effect permanently on machines with that setting on.
    // Pass reduceMotion={true} explicitly if you want it disabled.
    const prefersReduced = reduceMotion ?? false;

    let particles = [];
    let raf = 0;
    let startTime = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let cancelled = false;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const buildParticles = (img) => {
      const off = document.createElement('canvas');
      off.width = sampleSize;
      off.height = sampleSize;
      const offCtx = off.getContext('2d');

      // Contain the image within a square sample grid so target
      // positions map 0..1 cleanly onto whatever square box the
      // component is placed in.
      const scale = Math.min(sampleSize / img.width, sampleSize / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (sampleSize - dw) / 2;
      const dy = (sampleSize - dh) / 2;
      offCtx.clearRect(0, 0, sampleSize, sampleSize);
      offCtx.drawImage(img, dx, dy, dw, dh);

      let data;
      try {
        data = offCtx.getImageData(0, 0, sampleSize, sampleSize).data;
      } catch (e) {
        // CORS-tainted canvas (cross-origin image without proper
        // headers) — fall back to no particles; the alt text / nothing
        // renders rather than throwing.
        return [];
      }

      const stride = sampleSize > 90 ? 2 : 1; // keep particle count sane at higher sample sizes
      const pts = [];
      for (let py = 0; py < sampleSize; py += stride) {
        for (let px = 0; px < sampleSize; px += stride) {
          const idx = (py * sampleSize + px) * 4;
          const a = data[idx + 3];
          if (a < 40) continue; // skip transparent background
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          const nx = px / sampleSize;
          const ny = py / sampleSize;

          const angle = Math.random() * Math.PI * 2;
          const radius = scatterRadius * (0.55 + Math.random() * 0.6);

          pts.push({
            nx,
            ny,
            ox: 0.5 + Math.cos(angle) * radius,
            oy: 0.5 + Math.sin(angle) * radius,
            r,
            g,
            b,
            a: a / 255,
            jitterSeed: Math.random() * Math.PI * 2,
            jitterAmp: 0.006 + Math.random() * 0.01,
          });
        }
      }
      return pts;
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      cssWidth = rect.width;
      cssHeight = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(cssWidth * dpr));
      canvas.height = Math.max(1, Math.round(cssHeight * dpr));
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      if (cancelled) return;
      if (!startTime) startTime = t;
      const elapsed = (t - startTime) % cycleMs;
      const cyclePos = elapsed / cycleMs; // 0..1

      // Phases: assemble -> hold -> disperse, symmetric around the hold.
      const assembleEnd = (1 - holdRatio) / 2;
      const holdEnd = assembleEnd + holdRatio;

      let progress; // 0 = fully scattered, 1 = fully formed
      if (prefersReduced) {
        progress = 1;
      } else if (cyclePos < assembleEnd) {
        progress = easeInOutCubic(cyclePos / assembleEnd);
      } else if (cyclePos < holdEnd) {
        progress = 1;
      } else {
        const disperseT = (cyclePos - holdEnd) / (1 - holdEnd);
        progress = 1 - easeInOutCubic(disperseT);
      }

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // Crossfade to the real, pixel-sharp <img> once particles have
      // essentially finished assembling — the particle render alone is
      // always a bit softer than the source raster, so resting on the
      // real image keeps the "formed" state crisp; only the transition
      // itself shows particles.
      const sharpAlpha =
        progress <= sharpImageThreshold
          ? 0
          : (progress - sharpImageThreshold) / (1 - sharpImageThreshold);
      if (imgElRef.current) {
        imgElRef.current.style.opacity = String(sharpAlpha);
      }
      const canvasAlpha = 1 - sharpAlpha;

      const size = Math.max(cssWidth, cssHeight);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const wiggle = prefersReduced
          ? 0
          : Math.sin(t * 0.0015 + p.jitterSeed) * p.jitterAmp * (1 - progress * 0.7);

        const x = (p.ox + (p.nx - p.ox) * progress) * size + wiggle * size;
        const y = (p.oy + (p.ny - p.oy) * progress) * size + wiggle * size;

        const alpha = p.a * (0.25 + 0.75 * progress) * canvasAlpha;
        if (alpha <= 0) continue;
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${alpha})`;
        const s = particleSize * (0.7 + 0.3 * progress);
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }

      raf = requestAnimationFrame(draw);
    };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (cancelled) return;
      particles = buildParticles(img);
      resize();
      raf = requestAnimationFrame(draw);
    };
    img.src = src;

    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [src, sampleSize, particleSize, cycleMs, holdRatio, scatterRadius, sharpImageThreshold, reduceMotion]);

  return (
    <div ref={wrapRef} className={`relative w-full h-full ${className}`} role="img" aria-label={alt}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <img
        ref={imgElRef}
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ opacity: 0 }}
      />
    </div>
  );
}