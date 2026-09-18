import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [currentRoute, setCurrentRoute] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/about')) setCurrentRoute('about');
      else if (hash.startsWith('#/services')) setCurrentRoute('services');
      else if (hash.startsWith('#/healthcare')) setCurrentRoute('healthcare');
      else if (hash.startsWith('#/financial-management')) setCurrentRoute('financial-management');
      else if (hash.startsWith('#/manufacturing')) setCurrentRoute('manufacturing');
      else if (hash.startsWith('#/agriculture')) setCurrentRoute('agriculture');
      else if (hash.startsWith('#/supply-chain')) setCurrentRoute('supply-chain');
      else if (hash.startsWith('#/contact')) setCurrentRoute('contact');
      else setCurrentRoute('home');
    };
    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    return () => window.removeEventListener('hashchange', checkRoute);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Nav items adapt to the current page
  const navItems = [
    {
      label: 'Home',
      href: '#/',
      onClick: () => {
        window.location.hash = '#/';
      },
    },
    {
      label: 'About',
      href: '#/about',
      onClick: () => {
        window.location.hash = '#/about';
      },
    },
    {
      label: 'Services',
      href: '#/services',
      onClick: () => {
        window.location.hash = '#/services';
      },
    },
    {
      label: 'Contact',
      href: '#/contact',
      onClick: () => {
        window.location.hash = '#/contact';
      },
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* 5-Layer Progressive Blur Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-24">
        <div className="progressive-blur-layer blur-l1 inset-0 absolute"></div>
        <div className="progressive-blur-layer blur-l2 inset-0 absolute"></div>
        <div className="progressive-blur-layer blur-l3 inset-0 absolute"></div>
        <div className="progressive-blur-layer blur-l4 inset-0 absolute"></div>
        <div className="progressive-blur-layer blur-l5 inset-0 absolute"></div>
      </div>

      {/* Solid/Semi-transparent color overlay depending on scroll */}
      <div className={`absolute inset-0 -z-10 transition-colors duration-500 ${scrolled ? 'bg-white/80 border-b border-slate-200/50' : 'bg-transparent'
        }`} />

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#/"
          onClick={(e) => { e.preventDefault(); window.location.hash = '#/'; }}
          className="flex items-center space-x-2 group"
        >
          <div
            className="text-3xl md:text-4xl font-bold font-sans tracking-tight leading-none"
            style={{ filter: 'drop-shadow(14px 22px 6px rgba(15,23,42,0.3))' }}
          >
            <span className="text-brand-orange transition-colors duration-300">ten</span>
            <span className="text-brand-blue transition-colors duration-300">s</span>
            <span className="text-brand-orange transition-colors duration-300">orix</span>
            <span className="text-brand-blue transition-colors duration-300">AI</span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, idx) => {
            const isActive =
              (item.label === 'Home' && currentRoute === 'home') ||
              (item.label === 'About' && currentRoute === 'about') ||
              (item.label === 'Services' && (currentRoute === 'services' || currentRoute === 'healthcare' || currentRoute === 'financial-management' || currentRoute === 'manufacturing' || currentRoute === 'agriculture' || currentRoute === 'supply-chain')) ||
              (item.label === 'Contact' && currentRoute === 'contact');

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); item.onClick(); }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ '--sans-weight': hoveredIdx === idx ? 700 : 400 }}
                className={`var-sans text-base py-2 relative transition-colors duration-300 ${isActive ? 'text-brand-orange' : 'text-slate-700 hover:text-slate-900'
                  }`}
              >
                {item.label}
                {/* Active indicator underline */}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange transition-all duration-300 ${isActive ? 'w-full' : 'w-0'
                    }`}
                />
              </a>
            );
          })}
        </div>

        {/* Call to Action & Hamburger Menu */}
        <div className="flex items-center space-x-4">
          <a
            href="#/contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/contact';
              setMobileMenuOpen(false);
            }}
            className="hidden sm:relative sm:inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-full group bg-gradient-to-br from-brand-orange to-brand-blue hover:text-white text-slate-800 focus:ring-4 focus:outline-none focus:ring-brand-orange/30"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0 font-serif">
              Get In Touch
            </span>
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl border border-slate-200/50 bg-white/70 backdrop-blur-md hover:bg-slate-50 text-slate-800 hover:text-brand-orange transition-all focus:outline-none focus:ring-2 focus:ring-brand-orange/30 z-50 relative"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-md md:hidden transition-all duration-500 flex flex-col justify-between pt-28 px-6 pb-12 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-6">
          {navItems.map((item) => {
            const isActive =
              (item.label === 'Home' && currentRoute === 'home') ||
              (item.label === 'About' && currentRoute === 'about') ||
              (item.label === 'Services' && (currentRoute === 'services' || currentRoute === 'healthcare' || currentRoute === 'financial-management' || currentRoute === 'manufacturing' || currentRoute === 'agriculture' || currentRoute === 'supply-chain')) ||
              (item.label === 'Contact' && currentRoute === 'contact');

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  item.onClick();
                  setMobileMenuOpen(false);
                }}
                className={`text-2xl font-bold font-sans tracking-tight py-3 border-b border-slate-100 transition-colors ${
                  isActive ? 'text-brand-orange' : 'text-slate-800 hover:text-brand-orange'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div>
          <a
            href="#/contact"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/contact';
              setMobileMenuOpen(false);
            }}
            className="relative w-full inline-flex items-center justify-center p-0.5 overflow-hidden text-base font-medium rounded-full group bg-gradient-to-br from-brand-orange to-brand-blue hover:text-white text-slate-800 focus:ring-4 focus:outline-none focus:ring-brand-orange/30"
          >
            <span className="relative w-full text-center px-6 py-3.5 transition-all ease-in duration-75 bg-white rounded-full group-hover:bg-opacity-0 font-serif">
              Get In Touch
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
}