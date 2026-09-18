import React from 'react';

export default function ModuleCard({ mod, onClick, singleView }) {
  const Icon = mod.icon;

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col h-full rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer overflow-hidden ${singleView ? 'w-full max-w-md' : ''}`}
    >
      {/* Top accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${mod.barGradient}`} />

      {/* Watermark icon, oversized + faint, top-right */}
      <Icon
        className={`absolute -top-2 -right-2 w-32 h-32 ${mod.watermarkColor} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500`}
        strokeWidth={1.2}
      />

      <div className="relative z-10 flex flex-col h-full p-8">
        {/* Icon badge */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${mod.badgeGradient} shadow-lg ${mod.shadowColor}`}>
          <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
        </div>

        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 mb-4">
            {mod.title}
          </h3>
          <p className="text-sm md:text-base text-slate-600 font-serif leading-relaxed mb-8">
            {mod.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${mod.badgeGradient} shadow-md ${mod.shadowColor} transition-transform duration-300 group-hover:gap-3`}>
            Explore
            <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}