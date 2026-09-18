import React, { useEffect, useRef } from 'react';

export default function ParticlesBg() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Handle high DPI displays
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinate globally in viewport coordinates
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Particle class
    class Particle {
      constructor(w, h) {
        this.w = w;
        this.h = h;
        this.reset();
        this.x = Math.random() * w;
        this.y = Math.random() * h;
      }

      reset() {
        this.x = Math.random() * this.w;
        this.y = Math.random() * this.h;
        this.size = Math.random() * 2.5 + 2.0; // size between 2.0 and 4.5px
        this.speedX = (Math.random() - 0.5) * 0.45; // slow movement
        this.speedY = (Math.random() - 0.5) * 0.45;
        this.color = Math.random() > 0.55 ? 'rgba(235, 81, 14, 0.25)' : 'rgba(33, 61, 131, 0.25)';
      }

      update(w, h) {
        this.w = w;
        this.h = h;
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce on boundaries
        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;
      }

      draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
      }
    }

    // Initialize particles
    const particleCount = Math.min(80, Math.floor((width * height) / 16000));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(width, height));
    }

    // Click handler to disperse/push particles in viewport space
    const handleMouseClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      
      particles.forEach(p => {
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 10;
          p.speedX += (dx / dist) * force * 0.3;
          p.speedY += (dy / dist) * force * 0.3;
        }
      });
    };

    window.addEventListener('click', handleMouseClick);

    // Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(width, height);
        particles[i].draw(ctx);

        // Check distance to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (110 - dist) / 110 * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(33, 61, 131, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        // Connect to mouse
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = particles[i].x - mouseRef.current.x;
          const dy = particles[i].y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRef.current.radius) {
            const alpha = (mouseRef.current.radius - dist) / mouseRef.current.radius * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            ctx.strokeStyle = `rgba(235, 81, 14, ${alpha})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
}
