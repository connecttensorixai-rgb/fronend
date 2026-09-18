import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Plane, Radio, Thermometer, Map, Globe, Zap } from 'lucide-react';

import imgCard1 from '../assets/agriculture-card1.jpeg';
import imgCard2 from '../assets/agricalture-card2.jpeg';
import imgCard3 from '../assets/agriculture-card3.jpeg';
import imgCard4 from '../assets/agriculture-card5.jpeg';
import imgCard5 from '../assets/agri_trend_2.png';
import imgCard6 from '../assets/agriculture-crad6.jpeg';
import imgHero from '../assets/agriculture-herosection.jpeg';

const AGRI_TRENDS = [
  {
    id: 1,
    title: 'Crop Disease Detection',
    desc: 'Tensorix AI uses Computer Vision and AI models to identify crop diseases early through drone imagery, satellite monitoring, and real-time field analysis.',
    benefits: ['Early disease prevention', 'Reduced crop loss', 'Faster farm decisions', 'Improved crop quality'],
    image: imgCard1,
    icon: Plane,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    ring: 'border-blue-500'
  },
  {
    id: 2,
    title: 'AI Yield Prediction ',
    desc: 'Tensorix AI analyzes weather, soil, crop history, and farm data to accurately predict agricultural yield and optimize harvest planning. ',
    benefits: ['Better production forecasting', 'Improved farm planning', 'Reduced operational risks', 'Higher agricultural productivity'],
    image: imgCard2,
    icon: Radio,
    color: 'text-purple-500',
    bg: 'bg-purple-100',
    ring: 'border-purple-500'
  },
  {
    id: 3,
    title: 'Smart Irrigation Systems ',
    desc: 'Tensorix AI automates irrigation using real-time soil moisture, climate data, and AI-driven water optimization models.',
    benefits: ['Water conservation', 'Optimized cycles', 'Increased efficiency', 'Sustainable ops'],
    image: imgCard3,
    icon: Thermometer,
    color: 'text-green-500',
    bg: 'bg-green-100',
    ring: 'border-green-500'
  },
  {
    id: 4,
    title: 'Weather Intelligence ',
    desc: 'Tensorix AI delivers real-time weather analytics and predictive climate insights to support better agricultural decision-making.',
    benefits: ['Improved crop planning', 'Weather risk prediction', 'Better harvest timing', 'Reduced climate impact'],
    image: imgCard4,
    icon: Map,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
    ring: 'border-orange-500'
  },
  {
    id: 5,
    title: 'Soil Health Analytics ',
    desc: 'Tensorix AI monitors soil nutrients, moisture, and fertility levels to improve crop health and farming productivity. ',
    benefits: ['Better soil management', 'Improved crop growth', 'Optimized fertilizer usage', 'Sustainable farming practices'],
    image: imgCard5,
    icon: Globe,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
    ring: 'border-indigo-500'
  },
  {
    id: 6,
    title: 'Precision Farming Automation ',
    desc: 'Tensorix AI automates farming operations using AI, IoT, sensors, and predictive analytics for smarter agricultural management.',
    benefits: ['Automated farm operations', 'Increased productivity', 'Reduced manual effort', 'Data-driven farming decisions '],
    image: imgCard6,
    icon: Zap,
    color: 'text-teal-500',
    bg: 'bg-teal-100',
    ring: 'border-teal-500'
  }
];

export default function AgricultureTrends() {
  return (
    <div className="w-full relative overflow-hidden flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-16">

      <div className="max-w-4xl text-center mb-10 sm:mb-12 lg:mb-16 relative z-10 px-2">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tighter uppercase italic"
        >
          The Future of AI in <span className="text-green-600">Agriculture</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Explore the cutting-edge innovations transforming the global food landscape through agentic intelligence and advanced robotics.
        </motion.p>
      </div>

      {/* ── MOBILE / TABLET: Vertical Card Grid (visible below lg) ── */}
      <div className="w-full max-w-5xl lg:hidden relative z-10">
        {/* Central Hub - mobile */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex justify-center mb-8 sm:mb-10"
        >
          <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-4 shadow-2xl overflow-hidden group border-4 border-white">
            <div className="absolute inset-0 opacity-40">
              <img src={imgHero} alt="Agriculture AI" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-slate-900/60" />
            <div className="relative z-10">
              <Sprout className="text-green-400 mx-auto mb-2" size={24} />
              <h3 className="text-white font-black uppercase tracking-widest text-[10px] sm:text-xs leading-tight text-center">
                Emerging Trends & Innovations
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {AGRI_TRENDS.map((trend, idx) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-lg border border-slate-100 group-hover:border-green-500 transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start gap-3 sm:gap-4 mb-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${trend.bg} flex items-center justify-center border-2 ${trend.ring} shadow-md shrink-0 group-hover:scale-110 transition-transform relative`}>
                    <trend.icon className={trend.color} size={18} />
                    <span className={`absolute -right-2 -top-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full ${trend.bg} ${trend.color} text-[10px] font-black flex items-center justify-center border ${trend.ring} shadow-sm z-10`}>
                      {trend.id}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 text-sm sm:text-base uppercase italic mb-1 group-hover:text-green-600 transition-colors tracking-tight">{trend.title}</h4>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed">{trend.desc}</p>
                  </div>
                </div>
                {trend.benefits && (
                  <div className="flex flex-wrap gap-1 mb-3 mt-auto">
                    {trend.benefits.map((benefit, i) => (
                      <span key={i} className={`text-[9px] px-2 py-0.5 rounded-full ${trend.bg} ${trend.color} border border-slate-100`}>
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}
                <div className="w-full h-24 sm:h-32 rounded-xl overflow-hidden bg-slate-50">
                  <img src={trend.image} alt={trend.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: Orbital Layout (visible at lg+) ── */}
      <div className="relative w-full max-w-[1536px] mx-auto hidden lg:flex justify-center items-center min-h-[1200px] z-10">

        {/* Central Hub */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute z-20 flex flex-col items-center justify-center"
        >
          <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-slate-300 animate-[spin_30s_linear_infinite]" />
          <div className="absolute w-[320px] h-[320px] rounded-full border border-slate-200 animate-[spin_40s_linear_infinite_reverse]" />

          <div className="relative w-[220px] h-[220px] rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-6 shadow-2xl overflow-hidden group border-4 border-white">
            <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
              <img src={imgHero} alt="Agriculture AI" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-slate-900/60" />
            <div className="relative z-10">
              <Sprout className="text-green-400 mx-auto mb-3" size={32} />
              <h3 className="text-white font-black uppercase tracking-widest text-sm leading-tight text-center">
                Emerging Trends & Innovations
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Nodes connecting lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '1200px' }}>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {[
            "M 50% 50% Q 40% 40%, 30% 20%",
            "M 50% 50% L 20% 50%",
            "M 50% 50% Q 40% 60%, 30% 80%"
          ].map((path, i) => (
            <React.Fragment key={`left-line-${i}`}>
              <motion.path d={path} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: i * 0.2 }} />
              <motion.path d={path} stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10,20" fill="none" initial={{ pathLength: 0, strokeDashoffset: 0 }} whileInView={{ pathLength: 1, strokeDashoffset: -100 }} transition={{ strokeDashoffset: { repeat: Infinity, duration: 3, ease: "linear" }, pathLength: { duration: 1, delay: i * 0.2 } }} />
            </React.Fragment>
          ))}
          {[
            "M 50% 50% Q 60% 40%, 70% 20%",
            "M 50% 50% L 80% 50%",
            "M 50% 50% Q 60% 60%, 70% 80%"
          ].map((path, i) => (
            <React.Fragment key={`right-line-${i}`}>
              <motion.path d={path} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6 + (i * 0.2) }} />
              <motion.path d={path} stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="10,20" fill="none" initial={{ pathLength: 0, strokeDashoffset: 0 }} whileInView={{ pathLength: 1, strokeDashoffset: 100 }} transition={{ strokeDashoffset: { repeat: Infinity, duration: 3, ease: "linear" }, pathLength: { duration: 1, delay: 0.6 + (i * 0.2) } }} />
            </React.Fragment>
          ))}
        </svg>

        {/* Left Nodes */}
        <div className="absolute left-0 top-0 bottom-0 w-[38%] flex flex-col justify-around py-10 z-10">
          {AGRI_TRENDS.slice(0, Math.ceil(AGRI_TRENDS.length / 2)).map((trend, idx) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              viewport={{ once: true }}
              transition={{
                x: { delay: idx * 0.2, duration: 0.5 },
                opacity: { delay: idx * 0.2, duration: 0.5 },
                y: { repeat: Infinity, duration: 4 + idx, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-4 justify-end group cursor-pointer ${idx === 1 ? 'mr-0' : 'mr-8'}`}
            >
              <div className="bg-white p-3 lg:p-4 xl:p-5 rounded-2xl shadow-xl border border-slate-100 group-hover:border-green-500 transition-all duration-300 w-full max-w-[280px] xl:max-w-[340px] text-left flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-full h-24 xl:h-32 rounded-xl overflow-hidden bg-slate-50">
                  <img src={trend.image} alt={trend.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg uppercase italic mb-1 group-hover:text-green-600 transition-colors tracking-tight">{trend.title}</h4>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{trend.desc}</p>
                  {trend.benefits && (
                    <div className="mt-2 flex flex-wrap justify-start gap-1">
                      {trend.benefits.map((benefit, i) => (
                        <span key={i} className={`text-[9px] xl:text-[10px] px-2 py-0.5 rounded-full ${trend.bg} ${trend.color} border border-slate-100 whitespace-nowrap`}>
                          {benefit}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className={`w-14 h-14 rounded-full ${trend.bg} flex items-center justify-center border-2 ${trend.ring} shadow-lg relative shrink-0 group-hover:scale-110 transition-transform`}>
                <trend.icon className={trend.color} size={24} />
                <span className={`absolute -right-3 top-0 w-7 h-7 rounded-full ${trend.bg} ${trend.color} text-xs font-black flex items-center justify-center border ${trend.ring} shadow-sm z-10`}>
                  {trend.id}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Nodes */}
        <div className="absolute right-0 top-0 bottom-0 w-[38%] flex flex-col justify-around py-10 z-10">
          {AGRI_TRENDS.slice(Math.ceil(AGRI_TRENDS.length / 2)).map((trend, idx) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, y: [0, 10, 0] }}
              viewport={{ once: true }}
              transition={{
                x: { delay: 0.6 + (idx * 0.2), duration: 0.5 },
                opacity: { delay: 0.6 + (idx * 0.2), duration: 0.5 },
                y: { repeat: Infinity, duration: 4 + idx, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-4 justify-start group cursor-pointer ${idx === 1 ? 'ml-0' : 'ml-8'}`}
            >
              <div className={`w-14 h-14 rounded-full ${trend.bg} flex items-center justify-center border-2 ${trend.ring} shadow-lg relative shrink-0 group-hover:scale-110 transition-transform`}>
                <trend.icon className={trend.color} size={24} />
                <span className={`absolute -left-3 top-0 w-7 h-7 rounded-full ${trend.bg} ${trend.color} text-xs font-black flex items-center justify-center border ${trend.ring} shadow-sm z-10`}>
                  {trend.id}
                </span>
              </div>
              <div className="bg-white p-3 lg:p-4 xl:p-5 rounded-2xl shadow-xl border border-slate-100 group-hover:border-green-500 transition-all duration-300 w-full max-w-[280px] xl:max-w-[340px] text-left flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-full h-24 xl:h-32 rounded-xl overflow-hidden bg-slate-50">
                  <img src={trend.image} alt={trend.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg uppercase italic mb-1 group-hover:text-green-600 transition-colors tracking-tight">{trend.title}</h4>
                  <p className="text-slate-500 text-xs font-medium leading-relaxed">{trend.desc}</p>
                  {trend.benefits && (
                    <div className="mt-2 flex flex-wrap justify-start gap-1">
                      {trend.benefits.map((benefit, i) => (
                        <span key={i} className={`text-[9px] xl:text-[10px] px-2 py-0.5 rounded-full ${trend.bg} ${trend.color} border border-slate-100 whitespace-nowrap`}>
                          {benefit}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
