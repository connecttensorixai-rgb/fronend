import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pillars from './components/Pillars';
import Industries from './components/Industries';
import Footer from './components/Footer';
import ParticlesBg from './components/ParticlesBg';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import HealthcarePage from './pages/HealthcarePage';
import FinancialManagementPage from './pages/FinancialManagementPage';
import ManufacturingPage from './pages/ManufacturingPage';
import AgriculturePage from './pages/AgriculturePage';
import SupplyChainPage from './pages/SupplyChainPage';
import EnergyConstructionPage from './pages/EnergyConstructionPage';
import CareersPage from './pages/CareersPage';

// Register GSAP ScrollTrigger plugin globally
gsap.registerPlugin(ScrollTrigger);

// Simple hash-based router
function useHashRoute() {
  const getRoute = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#/about')) return 'about';
    if (hash.startsWith('#/healthcare')) return 'healthcare';
    if (hash.startsWith('#/financial-management')) return 'financial-management';
    if (hash.startsWith('#/manufacturing')) return 'manufacturing';
    if (hash.startsWith('#/agriculture')) return 'agriculture';
    if (hash.startsWith('#/supply-chain')) return 'supply-chain';
    if (hash.startsWith('#/energy-construction')) return 'energy-construction';
    if (hash.startsWith('#/services')) return 'services';
    if (hash.startsWith('#/contact')) return 'contact';
    if (hash.startsWith('#/careers')) return 'careers';
    return 'home';
  };

  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = getRoute();
      setRoute(newRoute);
      // Snap scroll to top instantly on route change
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      // Refresh ScrollTrigger after route change
      setTimeout(() => ScrollTrigger.refresh(), 600);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return route;
}

function App() {
  const route = useHashRoute();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // Store globally so it can be used for route changes
    window.lenis = lenis;

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Bind GSAP ticker directly to Lenis requestAnimationFrame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after DOM load and render
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // Multiple deferred refreshes to ensure layout adjustments settle (fonts, images, etc.)
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (route === 'about') {
    return (
      <div className="relative min-h-[100dvh] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <AboutPage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'healthcare') {
    return (
      <div className="relative min-h-[100dvh] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <HealthcarePage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'manufacturing') {
    return (
      <div className="relative min-h-[100dvh] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <ManufacturingPage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'agriculture') {
    return (
      <div className="relative min-h-[100dvh] bg-white text-slate-900 overflow-x-hidden selection:bg-brand-orange/20 selection:text-brand-orange">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <AgriculturePage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'supply-chain') {
    return (
      <div className="relative min-h-[100dvh] bg-[#F8FAFC] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange blueprint-dots">
        <ParticlesBg />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(33,61,131,0.06),rgba(255,255,255,0))] pointer-events-none -z-20" />



        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <SupplyChainPage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'energy-construction') {
    return (
      <div className="relative min-h-[100dvh] bg-[#F8FAFC] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange blueprint-dots">
        <ParticlesBg />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(33,61,131,0.06),rgba(255,255,255,0))] pointer-events-none -z-20" />



        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <EnergyConstructionPage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'financial-management') {
    return (
      <div className="relative min-h-[100dvh] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <FinancialManagementPage />
        </main>
        <Footer />
      </div>
    );
  }



  if (route === 'services') {
    return (
      <div className="relative min-h-[100dvh] text-slate-900 overflow-x-clip selection:bg-brand-blue/20 selection:text-brand-blue">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <ServicesPage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'contact') {
    return (
      <div className="relative min-h-[100dvh] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <ContactPage />
        </main>
        <Footer />
      </div>
    );
  }

  if (route === 'careers') {
    return (
      <div className="relative min-h-[100dvh] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange">


        <Navbar />
        <main className="relative z-10 px-0 xl:px-8">
          <CareersPage />
        </main>
        <Footer />
      </div>
    );
  }

  // Default: Home page
  return (
    <div className="relative min-h-[100dvh] bg-[#F8FAFC] text-slate-900 overflow-x-clip selection:bg-brand-orange/20 selection:text-brand-orange blueprint-dots">
      {/* Interactive particles background network */}
      <ParticlesBg />

      {/* Decorative noise/gradient backdrop container */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(33,61,131,0.06),rgba(255,255,255,0))] pointer-events-none -z-20" />



      {/* Dynamic page structure */}
      <Navbar />
      <main className="relative z-10 px-0 xl:px-8">
        <Hero />
        <Pillars />
        <Industries />
      </main>
      <Footer />
    </div>
  );
}

export default App;