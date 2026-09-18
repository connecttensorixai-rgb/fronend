import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectorVisual from './SectorVisuals';
import { CinematicCard } from './CinematicCard';

gsap.registerPlugin(ScrollTrigger);

export default function Industries() {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const industries = [
    {
      name: 'Healthcare',
      image: '/images/sectors/healthcare.jpg',
      route: '#/healthcare',
      desc: 'Deploying agentic diagnostic assistants and NLP pipelines to synthesize clinical reports, reduce administrative physician load, and optimize patient pathways.',
    },
    {
      name: 'Manufacturing',
      image: '/images/sectors/manufacturing.jpg',
      route: '#/manufacturing',
      desc: 'Integrating real-time Deep Learning networks and high-definition computer vision to automate visual quality control, track materials, and support high-speed precision robotics.',
      isBlue: true
    },
    {
      name: 'Agriculture',
      image: '/images/sectors/agriculture.jpg',
      route: '#/agriculture',
      desc: 'Leveraging computer vision models on edge devices (drones, smart machinery) for yield monitoring, plant health checks, and autonomous soil hydration analysis.',
    },

    {
      name: 'Supply Chain',
      image: '/images/sectors/supply-chain.jpg',
      route: '#/supply-chain',
      desc: 'Powering autonomous port logistics, shipping traffic flow optimization, and end-to-end container tracking utilizing neural visual networks and predictive delivery modeling.',
    },
    {
      name: 'Energy & Consumption',
      image: '/images/sectors/energy.jpg',
      route: '#/energy-construction',
      desc: 'Optimizing resource grid distribution and automating mechanical diagnostic assessments across solar, wind, and traditional infrastructure grids using ML forecasting.',
      isBlue: true
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    let pinTween;
    // Each card's precomputed "centered" scroll progress (0..1),
    // calculated once per layout instead of measured every frame.
    let cardTargetProgress = [];

    // How far the row needs to scroll so the LAST card's center actually
    // reaches the viewport's center. This is intentionally different from
    // (scrollWidth - clientWidth): that raw figure only scrolls until the
    // row's right edge touches the viewport's right edge, which — thanks to
    // the container's own right padding — is *less* distance than centering
    // the last card actually requires. Scrolling stops early, so the last
    // card never gets pulled fully into view; it sits cut off at the edge.
    const computeAmountToScroll = () => {
      const clientWidth = window.innerWidth;
      const rawAmount = scrollContainer.scrollWidth - clientWidth;
      const lastEl = cardRefs.current[cardRefs.current.length - 1];
      if (!lastEl) return rawAmount;

      const lastCenterOffset = lastEl.offsetLeft + lastEl.offsetWidth / 2;
      const neededForLastCenter = lastCenterOffset - clientWidth / 2;

      // Never scroll less than the raw amount (would leave a gap/blank
      // space at the end); never scroll less than 0.
      return Math.max(rawAmount, neededForLastCenter, 0);
    };

    const computeCardTargets = (amountToScroll) => {
      const clientWidth = window.innerWidth;
      cardTargetProgress = cardRefs.current.map((el) => {
        if (!el || !amountToScroll) return 0;
        const cardCenterOffset = el.offsetLeft + el.offsetWidth / 2;
        // Scroll x needed so this card sits at viewport center:
        // x = clientWidth/2 - cardCenterOffset  (x is negative as we scroll)
        const neededX = clientWidth / 2 - cardCenterOffset;
        const progress = -neededX / amountToScroll;
        return Math.min(Math.max(progress, 0), 1);
      });

      // The very first card can still fall just short of a clean 0
      // depending on layout — pin it so it's never penalized for being
      // "unreachable" right at the start of scroll.
      if (cardTargetProgress.length > 0) {
        cardTargetProgress[0] = 0;
      }
    };

    const applyCardTransforms = (progress) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = cardTargetProgress[i] ?? 0;
        const distance = Math.abs(progress - target);
        // 0.18 = how much scroll-progress "width" each card's focus
        // window spans; tune this to make the front/back transition
        // faster or slower.
        const proximity = 1 - Math.min(distance / 0.18, 1);

        const scale = 0.84 + proximity * 0.16;   // 0.84 -> 1.0
        const opacity = 0.5 + proximity * 0.5;   // 0.5 -> 1.0
        const rotateY = (1 - proximity) * (progress < target ? 12 : -12);
        const y = (1 - proximity) * 18;           // slight lift when centered

        gsap.set(el, {
          scale,
          opacity,
          rotateY,
          y: -y,
          transformPerspective: 1000,
        });
      });
    };

    const initScrollTrigger = () => {
      if (mediaQuery.matches) {
        const amountToScroll = computeAmountToScroll();

        computeCardTargets(amountToScroll);
        applyCardTransforms(0);

        pinTween = gsap.fromTo(scrollContainer,
          { x: 0 },
          {
            x: () => -computeAmountToScroll(),
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${computeAmountToScroll()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => applyCardTransforms(self.progress),
              onRefresh: () => {
                const freshAmount = computeAmountToScroll();
                computeCardTargets(freshAmount);
                applyCardTransforms(0);
              },
            }
          }
        );
      } else {
        gsap.set(scrollContainer, { x: 0 });
        cardRefs.current.forEach((el) => el && gsap.set(el, { scale: 1, opacity: 1, rotateY: 0, y: 0 }));
      }
    };

    initScrollTrigger();

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Images loading asynchronously can change scrollContainer's width
    // after our initial calculation, which shortens the pin's scroll
    // distance and leaves the last card unreachable. Wait for every
    // image in the row to finish loading, then recompute.
    const imgs = scrollContainer.querySelectorAll('img');
    const pendingImages = Array.from(imgs).filter((img) => !img.complete);
    let loadedCount = 0;
    const onImageLoad = () => {
      loadedCount += 1;
      if (loadedCount === pendingImages.length) {
        ScrollTrigger.refresh();
      }
    };
    pendingImages.forEach((img) => {
      img.addEventListener('load', onImageLoad);
      img.addEventListener('error', onImageLoad);
    });

    const handleResize = () => {
      if (pinTween) {
        pinTween.scrollTrigger?.kill();
        pinTween.kill();
        pinTween = null;
      }
      initScrollTrigger();
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (pinTween) {
        pinTween.scrollTrigger?.kill();
        pinTween.kill();
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(refreshTimer);
      pendingImages.forEach((img) => {
        img.removeEventListener('load', onImageLoad);
        img.removeEventListener('error', onImageLoad);
      });
    };
  }, []);

  return (
    <div className="gsap-pin-wrapper">
      <div ref={containerRef} id="services" className="relative lg:h-screen bg-transparent lg:overflow-hidden flex items-center py-16 lg:py-0">
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-brand-orange/5 to-brand-blue/5 blur-[140px] pointer-events-none rounded-full"></div>

      <div ref={scrollContainerRef} className="flex flex-nowrap items-center px-6 lg:px-12 gap-6 sm:gap-8 h-full relative z-10 w-fit overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory py-6 lg:py-0 scroll-smooth max-w-full" style={{ perspective: '1200px' }}>

        <div className="w-[280px] sm:w-[380px] md:w-[480px] shrink-0 flex flex-col justify-center pr-6 sm:pr-8 border-r border-slate-200 snap-center">
          <div className="text-brand-blue text-xs font-semibold tracking-widest uppercase mb-3 font-sans">
            Industry Applications
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6 font-sans leading-tight">
            Domain-Specific Deployment
          </h2>
          <p className="text-lg text-slate-600 font-serif leading-relaxed">
            We adapt our cognitive agentic workflows and visual networks for critical sectors,
            ensuring high compliance, high speed, and zero latency.
            Scroll to bring each sector into focus.
          </p>
        </div>

        {industries.map((ind, idx) => (
          <div
            key={ind.name}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="shrink-0"
          >
            <CinematicCard
              route={ind.route}
              index={idx}
              className="block w-[280px] sm:w-[340px] h-[400px] sm:h-[420px] glass-card glass-card-hover p-4 sm:p-5 rounded-2xl border border-slate-100 flex flex-col justify-between cursor-pointer snap-center"
            >
              <div>
                <SectorVisual src={ind.image} alt={ind.name} accent={ind.isBlue ? 'blue' : 'orange'} />

                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-2xl font-bold text-slate-900 font-sans hover:text-brand-orange transition-colors">
                    {ind.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 shrink-0 ml-3">
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-slate-600 font-serif leading-relaxed text-sm px-1">
                  {ind.desc}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-sans text-slate-400 px-1">
                <span>View technical briefing</span>
                <svg className="w-4 h-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </CinematicCard>
          </div>
        ))}

      </div>
    </div>
    </div>
  );
}