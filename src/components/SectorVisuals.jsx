import React from 'react';

export default function SectorVisual({ src, alt, accent = 'orange' }) {
  const accentColor = accent === 'blue' ? '#638cff' : '#eb510e';

  return (
    <div className="sv-panel group/img relative w-full h-40 sm:h-44 rounded-xl mb-6 sm:mb-8 overflow-hidden">
      {/* Pure CSS hover zoom — GPU-accelerated transform, no JS,
          no infinite animation loop running in the background */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover/img:scale-115 transition-transform duration-700 ease-out will-change-transform"
      />

      {/* Cinematic color grade — subtle, keeps real color */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(9,13,22,0.05) 0%, rgba(9,13,22,0.2) 55%, rgba(9,13,22,0.5) 100%)',
        }}
      />
      <div className="sv-grid opacity-30" />

      {/* Vertical scan sweep — cheap CSS keyframe animation from index.css */}
      <div className="sv-scan" />

      {/* Accent glow line, brightens on hover — pure CSS */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 sv-pulse group-hover/img:h-1.5 transition-all duration-300"
        style={{ background: accentColor, boxShadow: `0 0 16px 2px ${accentColor}` }}
      />

      <div className="sv-vignette rounded-xl" />
      <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/5 transition-colors duration-300" />
    </div>
  );
}