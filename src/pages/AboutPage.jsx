import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


/* ─────────────────────────────────────────────
   About Hero Section
───────────────────────────────────────────── */
function AboutHero() {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const indexRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const rulerRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline (runs once on page load)
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(indexRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(badgeRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo(rulerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out', transformOrigin: 'left' }, '-=0.3')
        .fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power4.out' }, '-=0.5')
        .fromTo(subTitleRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .fromTo(descRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

      // Scroll-triggered scrub to translate/fade columns out of view
      // Animating the outer containers avoids conflicts with the delayed entrance timeline above.
      gsap.to(
        [contentRef.current, leftColumnRef.current],
        {
          y: -60,
          opacity: 0.15,
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom 20%',
            scrub: true,
          }
        }
      );

      gsap.to(panelRef.current, {
        y: -80,
        opacity: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-hero"
      className="relative min-h-[100dvh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Ambient glow accents */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[400px] glow-blue rounded-full pointer-events-none animate-pulse-slow opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] glow-orange rounded-full pointer-events-none animate-pulse-slow opacity-40" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Left — editorial label column */}
          <div ref={leftColumnRef} className="lg:col-span-1 hidden lg:flex flex-col items-center gap-4 self-stretch pt-4">
            <span
              ref={indexRef}
              className="text-[10px] font-bold font-sans uppercase tracking-[0.25em] text-slate-400 [writing-mode:vertical-lr] rotate-180 opacity-0"
            >
              01 — About
            </span>
            <div className="flex-1 w-[1px] bg-gradient-to-b from-slate-300 to-transparent" />
          </div>

          {/* Center — main content */}
          <div ref={contentRef} className="lg:col-span-8">
            {/* Section badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 mb-6 opacity-0"
            >
              <span className="text-[10px] font-bold font-sans tracking-[0.3em] uppercase text-brand-orange">
                —— TensorixAI
              </span>
              <span className="w-12 h-[1px] bg-brand-orange/40" />
              <span className="text-[10px] font-bold font-sans tracking-[0.3em] uppercase text-slate-400">
                Corporate Overview
              </span>
            </div>

            {/* Thin rule */}
            <div
              ref={rulerRef}
              className="h-[1px] bg-gradient-to-r from-brand-orange via-brand-blue/40 to-transparent mb-8 opacity-100 scale-x-0"
              style={{ transformOrigin: 'left' }}
            />

            {/* Main heading */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-7xl md:text-8xl font-bold font-sans tracking-tight leading-[0.95] text-slate-900 mb-6 opacity-0"
            >
              For those
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                who build.
              </span>
            </h1>

            {/* Sub heading — Palantir style em-dash label */}
            <div ref={subTitleRef} className="flex items-start gap-4 mb-8 opacity-0">
              <span className="text-brand-orange font-mono text-lg mt-0.5 flex-shrink-0">—</span>
              <h2 className="text-xl md:text-2xl font-sans text-slate-650 leading-snug font-medium">
                Building Cognitive Operating Systems for Mission-Critical Applications.
              </h2>
            </div>

            {/* Description */}
            <p ref={descRef} className="text-base md:text-lg font-serif text-slate-600 leading-relaxed max-w-2xl mb-12 opacity-0">
              We believe that the next decade of industrial output will not be defined by raw machinery, but by the intelligence that orchestrates it. TensorixAI designs deterministic agentic frameworks that close the loop between data ingestion, critical decision-making, and physical execution in environments where industrial intelligence changes outcomes.
            </p>

            {/* CTAs — Palantir arrow style */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-8 opacity-0">
              <a
                href="#about-vision"
                className="group flex items-center gap-3 text-slate-800 hover:text-brand-orange transition-colors duration-300"
              >
                <span className="text-brand-orange font-mono text-lg group-hover:translate-x-1 transition-transform duration-300">↳</span>
                <span className="text-sm font-bold font-sans tracking-wider uppercase border-b border-slate-300 group-hover:border-brand-orange pb-0.5 transition-colors duration-300">
                  Explore Our Vision
                </span>
              </a>
              <a
                href="#about-mission"
                className="group flex items-center gap-3 text-slate-500 hover:text-brand-blue transition-colors duration-300"
              >
                <span className="text-brand-blue font-mono text-lg group-hover:translate-x-1 transition-transform duration-300">↳</span>
                <span className="text-sm font-bold font-sans tracking-wider uppercase border-b border-slate-200 group-hover:border-brand-blue pb-0.5 transition-colors duration-300">
                  Our Mission
                </span>
              </a>
            </div>
          </div>

          {/* Right — Palantir-style stats panel */}
          <div ref={panelRef} className="lg:col-span-3">
            <div className="border border-slate-200/80 bg-white/50 backdrop-blur-sm rounded-2xl p-6 space-y-6">
              {/* Panel label — technical CAD corner style */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono text-slate-400 tracking-[0.2em] uppercase">[ PANEL // IDENTITY_01 ]</span>
              </div>
              <div className="h-[1px] bg-slate-200" />
              {[
                { label: 'Founded', value: '2024', note: 'Enterprise AI Division' },
                { label: 'Sectors', value: '06', note: 'Active Deployment Domains' },
                { label: 'Uptime SLA', value: '99.9%', note: 'Mission-Critical Guarantee' },
                { label: 'AI Models', value: '15+', note: 'Production Deployments' },
              ].map(({ label, value, note }) => (
                <div key={label} className="flex justify-between items-start py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{label}</div>
                    <div className="text-[10px] font-serif text-slate-400 mt-0.5 max-w-[120px]">{note}</div>
                  </div>
                  <div className="text-2xl font-bold font-sans text-slate-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Vision Section
───────────────────────────────────────────── */
function AboutVision() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const textContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const visionPillars = [
    {
      index: '—— TENET 01',
      heading: 'Determinism over Stochasticity',
      sub: 'Strict Guardrail Architecture',
      body:
        'We engineer agentic workflows with strict mathematical boundaries. In mission-critical systems, hallucination is operational failure. Our proprietary guardrail validation layer guarantees deterministic execution nodes.',
      tag: 'SYS_GUARDRAIL',
      accentColor: 'text-brand-orange',
      borderColor: 'border-brand-orange/20',
      bgColor: 'bg-brand-orange/5',
    },
    {
      index: '—— TENET 02',
      heading: 'Edge-First Execution',
      sub: 'Air-Gapped Neural Processing',
      body:
        'Industrial systems cannot tolerate cloud latency or network disconnects. We compile and optimize our deep learning and computer vision checkpoints to execute on local ruggedized edge nodes and air-gapped arrays.',
      tag: 'LOCAL_ARRAY',
      accentColor: 'text-brand-blue',
      borderColor: 'border-brand-blue/20',
      bgColor: 'bg-brand-blue/5',
    },
    {
      index: '—— TENET 03',
      heading: 'Continuous Diagnostic Synthesis',
      sub: 'Predictive Telemetry Loops',
      body:
        'Operations are fluid. We build machines that continuously monitor themselves, outputting telemetry that feeds back into predictive models, optimizing uptime without manual intervention.',
      tag: 'TELEMETRY_LOOP',
      accentColor: 'text-slate-700',
      borderColor: 'border-slate-300/60',
      bgColor: 'bg-slate-50',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;

    // Heading fade-in ScrollTrigger (triggers before pinning starts)
    const headerTrigger = gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      }
    );

    // Responsive ScrollTrigger for pinning
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let pinTrigger;

    const initScrollTrigger = () => {
      if (mediaQuery.matches) {
        pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: '+=150%', // Scroll distance
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // Map scroll progress to steps: 0, 1, 2
            if (self.progress <= 0.33) {
              setActiveStep(0);
            } else if (self.progress > 0.33 && self.progress <= 0.66) {
              setActiveStep(1);
            } else {
              setActiveStep(2);
            }
          },
        });
      } else {
        // Fallback for mobile
        setScrollProgress(1);
        setActiveStep(0);
      }
    };

    initScrollTrigger();

    const handleResize = () => {
      if (pinTrigger) {
        pinTrigger.kill();
        pinTrigger = null;
      }
      initScrollTrigger();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      headerTrigger.scrollTrigger?.kill();
      headerTrigger.kill();
      if (pinTrigger) pinTrigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="gsap-pin-wrapper">
    <section
      ref={containerRef}
      id="about-vision"
      className="relative md:h-screen w-full bg-transparent overflow-hidden flex flex-col justify-center py-16 md:py-0 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Section header */}
        <div ref={headingRef} className="flex items-start gap-6 mb-12 opacity-0">
          <div className="flex-shrink-0">
            <div className="text-[10px] font-mono text-slate-400 tracking-[0.3em] uppercase mb-2">02 — Vision</div>
            <div className="text-3xl md:text-5xl font-bold font-sans text-slate-900 leading-tight">
              Engineering<br />
              <span className="text-brand-orange">Principles</span>.
            </div>
          </div>
          <div className="flex-1 hidden md:block pt-8">
            <div className="h-[1px] w-full bg-gradient-to-r from-brand-orange/40 to-transparent" />
            <p className="mt-4 text-base font-serif text-slate-500 max-w-xl">
              Core structural standards that separate our air-gapped agentic pipelines and deep vision algorithms from traditional cloud SaaS layers.
            </p>
          </div>
        </div>

        {/* Stepped content blocks */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Progress Tracker line (Desktop only) */}
          <div className="hidden md:flex col-span-1 flex-col items-center h-[350px] relative">
            <div className="w-[1px] h-full bg-slate-200" />
            <div
              className="w-[3px] bg-brand-orange absolute top-0 origin-top transition-all duration-100 rounded-full"
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            />
            {/* Markers */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col justify-between py-2 pointer-events-none">
              {[0, 1, 2].map((idx) => {
                const isActive = activeStep === idx;
                const isPassed = scrollProgress * 2.99 >= idx;
                return (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full border-2 bg-white transition-all duration-300 ${isActive
                      ? 'border-brand-orange scale-125 shadow-[0_0_8px_rgba(235,81,14,0.4)]'
                      : isPassed
                        ? 'border-brand-orange bg-brand-orange'
                        : 'border-slate-300'
                      }`}
                  />
                );
              })}
            </div>
          </div>

          <div
            ref={textContainerRef}
            className="col-span-1 md:col-span-11 relative min-h-auto md:min-h-[380px] flex flex-col md:flex-row md:items-center gap-6 md:gap-0"
          >
            {visionPillars.map((pillar, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={pillar.index}
                  className={`
                    transition-all duration-700 ease-out w-full
                    md:absolute md:inset-y-0 md:left-4 md:right-0 md:flex md:flex-col md:justify-center
                    ${isActive
                      ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
                      : 'opacity-100 translate-y-0 pointer-events-auto scale-100 md:opacity-0 md:translate-y-8 md:scale-95 md:pointer-events-none'
                    }
                    ${isActive ? 'block' : 'block md:hidden'}
                  `}
                >
                  <div
                    className={`group relative border ${pillar.borderColor} ${pillar.bgColor} bg-white/60 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/60`}
                  >
                    {/* Technical corner crosshairs */}
                    <span className="absolute top-3 left-3 text-[10px] text-slate-300 font-mono">+</span>
                    <span className="absolute top-3 right-3 text-[10px] text-slate-300 font-mono">+</span>
                    <span className="absolute bottom-3 left-3 text-[10px] text-slate-300 font-mono">+</span>
                    <span className="absolute bottom-3 right-3 text-[10px] text-slate-300 font-mono">+</span>

                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[9px] font-mono font-bold tracking-[0.25em] uppercase ${pillar.accentColor}`}>
                        {pillar.tag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-medium">
                        {pillar.index}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 mb-2 tracking-tight">
                      {pillar.heading}
                    </h3>
                    <p className={`text-xs font-mono uppercase tracking-wider ${pillar.accentColor} mb-4 font-semibold`}>
                      ↳ {pillar.sub}
                    </p>
                    <p className="text-base md:text-lg font-serif text-slate-650 leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Operational Decision Pipeline (AboutMission)
 ───────────────────────────────────────────── */
function AboutMission() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const sectorPanelRef = useRef(null);
  const ctaRef = useRef(null);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [binaryStrings, setBinaryStrings] = useState([
    "01000001101101000",
    "00010001100000001",
    "01001000010100010"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBinaryStrings(prev => prev.map(str => {
        const arr = str.split('');
        const flipCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < flipCount; i++) {
          const idx = Math.floor(Math.random() * arr.length);
          arr[idx] = arr[idx] === '0' ? '1' : '0';
        }
        return arr.join('');
      }));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  if (particlesRef.current.length === 0) {
    particlesRef.current = Array.from({ length: 12 }, () => ({
      t: Math.random(),
      speed: 0.005 + Math.random() * 0.007,
      sourceIndex: 0,
      targetIndex: Math.floor(Math.random() * 15)
    }));
  }

  const pipelineStages = [
    {
      index: 0,
      title: "Data Ingestion",
      sub: "Transaction Ledger Ingestion",
      tag: "INGEST",
      metric: "Active Stream",
      desc: "Hardened secure ledger listener receiving raw transactions, financial documents, and policies in real-time.",
      details: [
        { label: "Stream ID", val: "TX_STREAM_F8" },
        { label: "Format", val: "JSON / XML / PDF" },
        { label: "Buffer", val: "0% Loss SLA" }
      ]
    },
    {
      index: 1,
      title: "NLP Policy Parsing",
      sub: "Clause & Entity Extraction",
      tag: "PARSE",
      metric: "99.2% Accuracy",
      desc: "LLM parses policies and pulls critical entity structures, identifying transaction limits, recipient categories, and geo-jurisdictions.",
      details: [
        { label: "Model", val: "Llama-3-Hardened" },
        { label: "Entities", val: "NER Regulatory" },
        { label: "Latency", val: "4.8 ms / page" }
      ]
    },
    {
      index: 2,
      title: "Guardrail Verification",
      sub: "Deterministic Audit Check",
      tag: "AUDIT",
      metric: "100% Deterministic",
      desc: "Applies strict mathematical boundaries and anti-money laundering (AML) regulatory compliance thresholds to the parsed transaction data.",
      details: [
        { label: "Engine", val: "Zero-Trust Guardrail" },
        { label: "Rules Count", val: "512 Active Nodes" },
        { label: "SLA Guarantee", val: "Fail-Safe Default" }
      ]
    },
    {
      index: 3,
      title: "Decision Output",
      sub: "Risk Probability Mapping",
      tag: "DECIDE",
      metric: "100% Compliant Verified",
      desc: "The classifier executes the final routing, outputting transaction telemetry logs and generating compliance certificate flags.",
      details: [
        { label: "Decision SLA", val: "Zero Hallucination" },
        { label: "Security Level", val: "Air-Gapped HSM" },
        { label: "Cert Hash", val: "sha256:8f4c..." }
      ]
    }
  ];

  useEffect(() => {
    const container = containerRef.current;

    // Entrance fade-in animations for section items
    const ctx = gsap.context(() => {
      const elements = [headingRef.current, bodyRef.current, sectorPanelRef.current, ctaRef.current];
      elements.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });
    }, container);

    // Responsive ScrollTrigger for pinning
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    let pinTrigger;

    const initScrollTrigger = () => {
      if (mediaQuery.matches) {
        pinTrigger = ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: '+=200%', // Scroll distance
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Map progress to 4 steps (0 to 3)
            const step = Math.min(3, Math.floor(progress * 4));
            setActivePipelineStep(step);
          },
        });
      } else {
        // Fallback for mobile
        setActivePipelineStep(0);
      }
    };

    initScrollTrigger();

    const handleResize = () => {
      if (pinTrigger) {
        pinTrigger.kill();
        pinTrigger = null;
      }
      initScrollTrigger();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      if (pinTrigger) pinTrigger.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Dynamic Canvas: Draws background grid, programmatically animated bezier paths, randomized particle packets, and matrix rain waterfall
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };

    resizeCanvas();

    const fontSize = 10;
    const matrixStartPct = 0.70;
    const matrixEndPct = 0.98;
    let drops = [];

    const chars = '01';

    const getBezier = (t, x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2) => {
      const mt = 1 - t;
      const mt2 = mt * mt;
      const mt3 = mt2 * mt;
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x: mt3 * x1 + 3 * mt2 * t * cp1x + 3 * mt * t2 * cp2x + t3 * x2,
        y: mt3 * y1 + 3 * mt2 * t * cp1y + 3 * mt * t2 * cp2y + t3 * y2
      };
    };

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // Reset buffer using pageBg theme color
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // 1. Grid Background
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.04)';
      ctx.lineWidth = 1;
      const gridGap = 20;
      for (let x = 0; x < w; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 2. Bezier Curves coordinates
      const x_start = w * 0.14;
      const y_start_blue = h * 0.23;
      const y_start_teal = h * 0.50;
      const y_start_orange = h * 0.77;

      const x_end = w * 0.68;
      const y_end_min = h * 0.08;
      const y_end_max = h * 0.92;
      const lane_gap = (y_end_max - y_end_min) / 14;
      const y_ends = Array.from({ length: 15 }, (_, i) => y_end_min + i * lane_gap);

      const cp1x = (startY) => x_start + (x_end - x_start) * 0.35;
      const cp2x = (endY) => x_start + (x_end - x_start) * 0.65;

      // 3. Draw Curves
      const drawFan = (yStart, color, isActive) => {
        y_ends.forEach((yEnd) => {
          ctx.beginPath();
          ctx.moveTo(x_start, yStart);
          ctx.bezierCurveTo(cp1x(yStart), yStart, cp2x(yEnd), yEnd, x_end, yEnd);
          ctx.strokeStyle = isActive ? color : 'rgba(226, 232, 240, 0.7)';
          ctx.lineWidth = isActive ? 1.2 : 0.6;
          ctx.stroke();
        });
      };

      drawFan(y_start_blue, 'rgba(33, 61, 131, 0.12)', activePipelineStep >= 0);
      drawFan(y_start_teal, 'rgba(13, 148, 136, 0.12)', activePipelineStep >= 1);
      drawFan(y_start_orange, 'rgba(235, 81, 14, 0.12)', activePipelineStep >= 2);

      // 4. Draw Flowing Particles along random paths
      const activeSources = [0];
      if (activePipelineStep >= 1) activeSources.push(1);
      if (activePipelineStep >= 2) activeSources.push(2);

      particlesRef.current.forEach((p) => {
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          p.sourceIndex = activeSources[Math.floor(Math.random() * activeSources.length)];
          p.targetIndex = Math.floor(Math.random() * 15);
          p.speed = 0.005 + Math.random() * 0.007;
        }

        let startY = y_start_blue;
        let pColor = '#213D83';
        if (p.sourceIndex === 1) {
          startY = y_start_teal;
          pColor = '#0D9488';
        } else if (p.sourceIndex === 2) {
          startY = y_start_orange;
          pColor = '#EB510E';
        }

        const yEnd = y_ends[p.targetIndex];
        const pos = getBezier(p.t, x_start, startY, cp1x(startY), startY, cp2x(yEnd), yEnd, x_end, yEnd);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = pColor;
        ctx.fill();
      });

      // 5. Draw Binary Rain Waterfall
      const matrixXStart = w * matrixStartPct;
      const matrixXEnd = w * matrixEndPct;
      const matrixW = matrixXEnd - matrixXStart;
      const colsCount = Math.floor(matrixW / fontSize);

      if (drops.length !== colsCount) {
        drops = Array(colsCount).fill(0).map(() => Math.random() * (h / fontSize));
      }

      ctx.font = `bold ${fontSize}px monospace`;

      let activeColor = '#94A3B8';
      if (activePipelineStep === 0) activeColor = '#213D83';
      else if (activePipelineStep === 1) activeColor = '#0D9488';
      else if (activePipelineStep === 2) activeColor = '#EB510E';
      else if (activePipelineStep === 3) {
        const colors = ['#213D83', '#0D9488', '#EB510E', '#22C55E'];
        activeColor = colors[Math.floor(Math.random() * colors.length)];
      }

      for (let i = 0; i < drops.length; i++) {
        const headY = drops[i];
        const trailLength = 12;

        for (let j = 0; j < trailLength; j++) {
          const charY = (headY - j) * fontSize;
          if (charY < 0 || charY > h) continue;

          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = matrixXStart + i * fontSize + 4;
          const opacity = (1 - j / trailLength);

          let charColor;
          if (j === 0) {
            charColor = activeColor;
          } else {
            if (activePipelineStep === 3) {
              charColor = `rgba(34, 197, 94, ${opacity * 0.45})`;
            } else if (activePipelineStep === 2) {
              charColor = `rgba(235, 81, 14, ${opacity * 0.45})`;
            } else if (activePipelineStep === 1) {
              charColor = `rgba(13, 148, 136, ${opacity * 0.45})`;
            } else {
              charColor = `rgba(33, 61, 131, ${opacity * 0.45})`;
            }
          }

          ctx.fillStyle = charColor;
          ctx.fillText(text, x, charY);
        }

        if (headY * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += 0.85;
      }

      ctx.restore();
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activePipelineStep]);

  const currentStage = pipelineStages[activePipelineStep >= 0 ? activePipelineStep : 0];

  // Output Probabilities based on step progress
  const getProbabilities = () => {
    if (activePipelineStep === 0) {
      return [
        { label: 'COMPLIANT_TX', val: 0, pulse: true },
        { label: 'RISK_DETECTED', val: 0, pulse: false },
        { label: 'SUSPICIOUS_PATTERN', val: 0, pulse: false }
      ];
    } else if (activePipelineStep === 1) {
      return [
        { label: 'COMPLIANT_TX', val: 45, pulse: true },
        { label: 'RISK_DETECTED', val: 12, pulse: true },
        { label: 'SUSPICIOUS_PATTERN', val: 5, pulse: true }
      ];
    } else if (activePipelineStep === 2) {
      return [
        { label: 'COMPLIANT_TX', val: 82, pulse: true },
        { label: 'RISK_DETECTED', val: 2.1, pulse: true },
        { label: 'SUSPICIOUS_PATTERN', val: 0.8, pulse: true }
      ];
    } else {
      return [
        { label: 'COMPLIANT_TX', val: 99.5, pulse: false },
        { label: 'RISK_DETECTED', val: 0.3, pulse: false },
        { label: 'SUSPICIOUS_PATTERN', val: 0.2, pulse: false }
      ];
    }
  };

  // Target Y positions at the convergence boundary (right edge: x = 500)
  const lanesCount = 15;
  const laneGap = 13;
  const rightLanes = Array.from({ length: lanesCount }, (_, i) => 15 + i * laneGap);

  return (
    <div className="gsap-pin-wrapper">
    <section
      ref={containerRef}
      id="about-mission"
      className="relative md:h-screen w-full bg-transparent overflow-hidden flex items-center py-16 md:py-0 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left column — mission statement */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div ref={headingRef} className="opacity-0">
              <div className="text-[10px] font-mono text-slate-400 tracking-[0.3em] uppercase mb-4">03 — Mission</div>
              <h2 className="text-4xl md:text-6xl font-bold font-sans text-slate-900 leading-tight mb-8">
                The Mission
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-blue">
                  Doesn't Change.
                </span>
              </h2>
            </div>

            <div ref={bodyRef} className="opacity-0 space-y-6">
              {/* Palantir-style bold pull quote */}
              <div className="border-l-2 border-brand-orange pl-6 py-2">
                <p className="text-xl md:text-2xl font-sans font-semibold text-slate-800 leading-snug">
                  "We build software that empowers financial and industrial institutions
                  to effectively automate compliance, decisions, and risk management."
                </p>
              </div>

              <p className="text-base font-serif text-slate-655 leading-relaxed">
                Every agentic workflow, every deterministic auditing pipeline, every compliance scanner we ship
                serves one underlying objective: <strong className="font-sans text-slate-800">replace manual operational risk with
                  deterministic, AI-governed validation frameworks</strong> that operate at microsecond transaction scale.
              </p>
            </div>
          </div>

          {/* Right column — interactive light blueprint neural flow */}
          <div className="lg:col-span-7" ref={sectorPanelRef}>
            <div className="relative min-h-[320px] select-none z-10 border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xl">
              <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

              {/* Left Nodes Indicators */}
              <div className="absolute left-2.5 right-[86.5%] top-[23%] -translate-y-1/2 text-right z-10 pointer-events-none font-mono text-[9px] tracking-wider select-none whitespace-nowrap font-medium transition-all duration-300">
                <span className={activePipelineStep >= 0 ? "text-[#213D83] drop-shadow-[0_0_2px_rgba(33,61,131,0.25)] font-semibold" : "text-slate-300"}>
                  {binaryStrings[0]}
                </span>
              </div>

              <div className="absolute left-2.5 right-[86.5%] top-[50%] -translate-y-1/2 text-right z-10 pointer-events-none font-mono text-[9px] tracking-wider select-none whitespace-nowrap font-medium transition-all duration-300">
                <span className={activePipelineStep >= 1 ? "text-[#0D9488] drop-shadow-[0_0_2px_rgba(13,148,136,0.25)] font-semibold" : "text-slate-300"}>
                  {binaryStrings[1]}
                </span>
              </div>

              <div className="absolute left-2.5 right-[86.5%] top-[77%] -translate-y-1/2 text-right z-10 pointer-events-none font-mono text-[9px] tracking-wider select-none whitespace-nowrap font-medium transition-all duration-300">
                <span className={activePipelineStep >= 2 ? "text-[#EB510E] drop-shadow-[0_0_2px_rgba(235,81,14,0.25)] font-semibold" : "text-slate-300"}>
                  {binaryStrings[2]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main About Page Composition
───────────────────────────────────────────── */
export default function AboutPage() {
  useEffect(() => {
    // Dynamic SEO Metadata Injection
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription ? metaDescription.getAttribute('content') : '';

    document.title = 'About Us | TensorixAI - Industrial Cognitive Operating Systems';
    const seoDesc = 'Discover TensorixAI: pioneers in deterministic agentic frameworks, air-gapped neural edge arrays, and predictive telemetry loops for advanced industrial decision automation.';

    if (metaDescription) {
      metaDescription.setAttribute('content', seoDesc);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = seoDesc;
      document.head.appendChild(newMeta);
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Background — same as home but NO particles */}
      <div className="fixed inset-0 -z-20 bg-[#F8FAFC] blueprint-dots" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(33,61,131,0.06),rgba(255,255,255,0))] pointer-events-none" />

      {/* Sections */}
      <AboutHero />
      <AboutVision />
      <AboutMission />

      {/* Bottom spacer to lead into footer */}
      {/* <div className="h-24" /> */}
    </>
  );
}
