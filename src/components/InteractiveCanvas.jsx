import React, { useEffect, useRef } from 'react';

export default function InteractiveCanvas({ progress = 0 }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Initialize 80 particles
    const particleCount = 80;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        originX: Math.random() * width,
        originY: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        color: i % 2 === 0 ? '#eb510e' : '#213d83'
      });
    }

    let angle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.005;

      // Determine phase from scroll progress
      // Progress ranges from 0 to 1
      let phase = 0; // 0: network, 1: grid, 2: circle/gear
      if (progress > 0.33 && progress <= 0.66) {
        phase = 1;
      } else if (progress > 0.66) {
        phase = 2;
      }

      particles.forEach((p, idx) => {
        let targetX = p.originX;
        let targetY = p.originY;

        if (phase === 0) {
          // Phase 0: Interconnected Neural Clusters
          // Group particles into 3 small focal nodes
          const clusterIndex = idx % 3;
          const centerX = width * (0.3 + clusterIndex * 0.2);
          const centerY = height * 0.5 + Math.sin(angle + idx) * 30;
          targetX = centerX + Math.cos((idx * 15 * Math.PI) / 180) * 80;
          targetY = centerY + Math.sin((idx * 15 * Math.PI) / 180) * 80;
        } else if (phase === 1) {
          // Phase 1: Machine Vision Grid
          // Layout particles in a perfect rectangular bounding box grid
          const cols = 10;
          const colWidth = 24;
          const rowHeight = 24;
          const startX = width * 0.5 - (cols * colWidth) / 2;
          const startY = height * 0.5 - (8 * rowHeight) / 2;
          const col = idx % cols;
          const row = Math.floor(idx / cols) % 8;
          targetX = startX + col * colWidth;
          targetY = startY + row * rowHeight;
        } else {
          // Phase 2: Rotating Industrial Wave / Gear
          // Make a rotating circular gear outline
          const circleRadius = 110 + (idx % 2 === 0 ? 12 : 0); // gear tooth pattern
          const theta = ((idx / particleCount) * Math.PI * 2) + angle * 1.5;
          targetX = width * 0.5 + Math.cos(theta) * circleRadius;
          targetY = height * 0.5 + Math.sin(theta) * circleRadius;
        }

        // Interpolate towards target (lerp)
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Apply mouse pull
        const mouse = mouseRef.current;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 5;
            p.y += (dy / dist) * force * 5;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw connection lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nearby particles
          let maxDist = 65;
          if (phase === 1) maxDist = 30; // tighter grid lines
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.22;
            ctx.strokeStyle = `rgba(33, 61, 131, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // Draw connection to mouse
      const mouse = mouseRef.current;
      if (mouse.active) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.3;
            ctx.strokeStyle = `rgba(235, 81, 14, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [progress]);

  return (
    <div className="relative w-full h-full min-h-[300px] md:min-h-[450px] bg-slate-100/50 rounded-2xl border border-slate-200/60 overflow-hidden shadow-inner">
      {/* Visual indicators */}
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] text-slate-400 bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded-full select-none">
        CANVAS SCRUBBING ENGINE v1.0
      </div>
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] text-slate-400 bg-white/80 border border-slate-200/50 px-2 py-0.5 rounded-full select-none uppercase">
        Phase {progress <= 0.33 ? '01 // Neural' : progress <= 0.66 ? '02 // Grid' : '03 // Sync'}
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
