import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, ShieldCheck, TrendingUp, Workflow, Database, CheckCircle2, ChevronRight, BrainCircuit } from 'lucide-react';
import img1 from '../assets/finance_stock_1.png';
import img2 from '../assets/finance_stock_2.png';
import img3 from '../assets/finance_stock_3.png';
import img4 from '../assets/finance_stock_4.png';
import img5 from '../assets/finance_stock_5.png';
import { Helmet } from 'react-helmet';

gsap.registerPlugin(ScrollTrigger);

export default function FinancialManagementPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Animation - Palantir style stark reveal
      gsap.from('.hero-element', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });

      // Sticky Scrollytelling Images (Jhey's Content Reveal)
      const sections = gsap.utils.toArray('.reveal-section');

      sections.forEach((section, index) => {
        const img = section.querySelector('.reveal-img');
        const text = section.querySelector('.reveal-text');
        const isEven = index % 2 !== 0;

        // Image animation (slides in from side and fades up)
        gsap.to(img, {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: true,
          }
        });

        // Text animation (slides up and fades in)
        gsap.to(text, {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "center center",
            scrub: true,
          }
        });
      });

      // Reveal grid items
      gsap.from('.tech-item', {
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Financial Intelligence Analytics",
      desc: "Gain real-time visibility into enterprise financial performance through AI-powered dashboards and predictive insights.",
      icon: <Activity className="w-5 h-5 text-slate-700 mt-0.5" />,
      benefits: ["Real-time business intelligence", "Faster financial decisions", "Improved operational efficiency", "Data-driven forecasting"]
    },
    {
      title: "Predictive Financial Forecasting",
      desc: "Tensorix AI uses Machine Learning to forecast revenue, expenses, cash flow, and business performance with higher accuracy.",
      icon: <TrendingUp className="w-5 h-5 text-slate-700 mt-0.5" />,
      benefits: ["Smarter financial planning", "Reduced business risks", "Improved budgeting accuracy", "Better growth forecasting"]
    },
    {
      title: "Fraud Detection & Risk Intelligence",
      desc: "Tensorix AI continuously monitors transactions and operational activities to identify anomalies, suspicious behaviour, and financial risks in real time.",
      icon: <ShieldCheck className="w-5 h-5 text-slate-700 mt-0.5" />,
      benefits: ["Real-time fraud detection", "Risk reduction", "Enhanced financial security", "Automated compliance monitoring"]
    },
    {
      title: "Workflow Automation & Financial Operations",
      desc: "Automate approvals, reporting, invoice processing, reconciliation, and operational workflows using AI-powered automation systems.",
      icon: <Workflow className="w-5 h-5 text-slate-700 mt-0.5" />,
      benefits: ["Reduced manual workload", "Faster financial operations", "Increased operational productivity", "Streamlined business processes"]
    },
    {
      title: "Enterprise Data Integration",
      desc: "Tensorix AI integrates ERP systems, accounting platforms, operational data, and financial tools into one centralized intelligence ecosystem.",
      icon: <Database className="w-5 h-5 text-slate-700 mt-0.5" />,
      benefits: ["Unified financial visibility", "Centralized enterprise intelligence", "Improved reporting accuracy", "Faster operational coordination"]
    }
  ];

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-white text-slate-900 pt-24 pb-20 selection:bg-slate-900 selection:text-white font-sans">

      <Helmet>
        <title>Financial Management AI | Tensorix AI</title>
        <meta name="description" content="AI financial management platform and enterprise finance AI solutions. Automate workflows, improve forecasting, and unlock real-time financial intelligence." />
        <meta name="keywords" content="AI financial management platform, enterprise finance AI, financial intelligence software, AI business analytics, predictive financial platform, AI workflow automation, enterprise operational intelligence, financial risk monitoring" />
      </Helmet>

      {/* Palantir-style Grid Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10 border-b border-slate-200">
        <div className="mb-6 hero-element">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-slate-500 uppercase flex items-center gap-2">
            <BrainCircuit className="w-3.5 h-3.5" /> Financial Management AI
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8 hero-element">
          {/* <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-900 text-white flex items-center justify-center rounded-2xl shadow-md shrink-0">
            <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-14 md:h-14 text-white fill-none stroke-current" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 50,15 L 85,75 L 15,75 Z" />
              <line x1="50" y1="15" x2="50" y2="75" />
              <path d="M 30,55 L 70,55" />
              <path d="M 40,35 L 60,35" />
              <line x1="15" y1="85" x2="85" y2="85" strokeWidth="8" />
            </svg>
          </div> */}
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.05] max-w-5xl">
            AI-Powered Financial Intelligence & Enterprise Operations
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl hero-element font-light leading-relaxed mb-12">
          Tensorix AI helps enterprises modernize financial operations using Artificial Intelligence, Machine Learning, predictive analytics, and real-time operational intelligence. The platform enables organizations to automate financial workflows, improve decision-making, detect anomalies, and gain complete visibility across enterprise financial ecosystems.
        </p>

        <div className="inline-block p-6 border border-slate-900 bg-slate-50 hero-element relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-slate-900"></div>
          <p className="font-medium text-lg leading-relaxed text-slate-900 pr-8">
            "Transform financial operations into intelligent, automated, and data-driven systems."
          </p>
        </div>
      </div>

      {/* Scrollytelling Section (Jhey Reveal Style) */}
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <main className="flex flex-col gap-24 md:gap-0">

          {features.map((feature, idx) => {
            const isEven = idx % 2 !== 0;
            const images = [img1, img2, img3, img4, img5];

            return (
              <section key={idx} className={`reveal-section min-h-[100vh] grid gap-8 md:gap-16 items-center grid-cols-1 md:grid-cols-2 ${isEven ? 'md:grid-auto-flow-dense' : ''}`}>

                {/* Image */}
                <img
                  src={images[idx]}
                  alt={feature.title}
                  className={`reveal-img w-[280px] md:w-[400px] max-w-[90vw] justify-self-center h-auto object-cover opacity-0 ${isEven ? 'md:col-start-2 translate-x-[100px]' : 'md:col-start-1 -translate-x-[100px]'}`}
                  style={{
                    clipPath: 'polygon(0 10%, 10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%)',
                    scale: 1.1
                  }}
                />

                {/* Text */}
                <div className={`reveal-text z-10 bg-slate-50/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg border border-slate-200 md:sticky md:bottom-[40%] static translate-y-[50px] opacity-0 ${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white border border-slate-100 p-2 rounded-full shadow-sm">{feature.icon}</div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">{feature.title}</h2>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed mb-6 first-line:uppercase first-line:font-bold first-line:text-brand-blue">
                    {feature.desc}
                  </p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </section>
            );
          })}

        </main>
      </div>

      {/* Tech Stack Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200 bg-slate-50">
        <div className="mb-16 max-w-4xl">
          <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase block mb-4">Enterprise Architecture</span>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight mb-6">
            An AI-powered financial intelligence ecosystem built for modern enterprise operations.
          </h2>
          <p className="text-lg text-slate-600 font-light leading-relaxed">
            Tensorix AI is an enterprise AI financial management platform designed for predictive analytics and intelligent workflow automation. Unlike traditional financial software, Tensorix AI combines highly advanced technologies to create autonomous and intelligent financial operations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-slate-200 tech-grid">
          {[
            'Artificial Intelligence', 'Machine Learning', 'Natural Language Processing',
            'Predictive Analytics', 'Real-Time Intelligence', 'Workflow Automation'
          ].map((tech, idx) => (
            <div key={idx} className="tech-item p-8 border-b border-r border-slate-200 bg-white flex flex-col justify-center items-start group hover:bg-slate-900 hover:text-white transition-colors duration-300">
              <span className="font-mono text-[10px] text-slate-400 group-hover:text-slate-500 block mb-2 tracking-widest">0{idx + 1}</span>
              <h4 className="text-lg font-semibold">{tech}</h4>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
