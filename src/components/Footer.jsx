import React from 'react';
import { Mail, Zap, Phone, MapPin } from 'lucide-react';
import LogoLoop from './ui/LogoLoop';
import rigidfabLogoImg from '../assets/rigidfab.png';
import jovaMetcraftLogoImg from '../assets/jova_metcraft.png';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18v-8.4H5.67V18h2.67zM7.01 8.48c.93 0 1.5-.61 1.5-1.38-.02-.78-.57-1.37-1.48-1.37s-1.5.59-1.5 1.37c0 .77.57 1.38 1.46 1.38h.02zM18.34 18v-4.83c0-2.58-1.38-3.79-3.22-3.79-1.48 0-2.15.82-2.52 1.39v-1.17h-2.67c.04.75 0 8.4 0 8.4h2.67v-4.69c0-.25.02-.5.09-.68.2-.5.65-1.02 1.42-1.02.99 0 1.4.76 1.4 1.87V18h2.83z" />
  </svg>
);

// Authentic Instagram glyph: rounded-square camera body, lens ring, flash dot
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="6" stroke="white" strokeWidth="2" />
    <circle cx="12" cy="12" r="4.6" stroke="white" strokeWidth="2" />
    <circle cx="17.4" cy="6.6" r="1.15" fill="white" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const logos = [
  {
    glowColor: '30, 64, 110', // navy blue, matches the RF shield's ring text and border
    node: (
      <img
        src={rigidfabLogoImg}
        alt="Rigidfab"
        className="h-[calc(var(--logoloop-logoHeight)*1.35)] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    )
  },
  {
    glowColor: '212, 160, 60', // warm gold, matches Jova Metcraft's crest tones
    node: (
      <img
        src={jovaMetcraftLogoImg}
        alt="Jova Metcraft"
        className="h-[var(--logoloop-logoHeight)] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    )
  }
];

const BrandText = ({ segments }) => (
  <>
    {segments.map((seg, i) => (
      <span key={i} className={seg.color === 'blue' ? 'text-brand-blue' : 'text-brand-orange'}>
        {seg.text}
      </span>
    ))}
  </>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 relative z-20 overflow-hidden">

      {/* ── Capabilities Linear Marquee Strip (Replaced with PartnerMarquee) ── */}
      <div className="relative border-b border-slate-100 py-6 overflow-hidden bg-slate-50/20">
        <LogoLoop 
          logos={logos} 
          speed={50} 
          gap={80} 
          logoHeight={32} 
          fadeOut={true} 
          pauseOnHover={true}
        />
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-3xl md:text-4xl font-bold font-sans tracking-tight mb-4 leading-none">
              <span className="text-brand-orange">ten</span>
              <span className="text-brand-blue">s</span>
              <span className="text-brand-orange">orix</span>
              <span className="text-brand-blue">AI</span>
            </div>
            <p className="text-sm text-slate-600 font-serif max-w-sm leading-relaxed">
              Industrializing generative agent workflows, computer vision checkpoints, and deep learning diagnostics.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 tracking-widest text-xs uppercase">Explore</h4>
            <ul className="space-y-4 text-sm font-sans font-medium">
              <li><a href="#/" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Ho', color: 'orange' }, { text: 'm', color: 'blue' }, { text: 'e', color: 'orange' }]} /></a></li>
              <li><a href="#/about" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'A', color: 'orange' }, { text: 'bo', color: 'blue' }, { text: 'ut', color: 'orange' }]} /></a></li>
              <li><a href="#/services" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Ser', color: 'orange' }, { text: 'vi', color: 'blue' }, { text: 'ces', color: 'orange' }]} /></a></li>
              <li><a href="#/contact" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Con', color: 'orange' }, { text: 'ta', color: 'blue' }, { text: 'ct', color: 'orange' }]} /></a></li>
              <li><a href="#/careers" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Ca', color: 'orange' }, { text: 're', color: 'blue' }, { text: 'ers', color: 'orange' }]} /></a></li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 tracking-widest text-xs uppercase">Sectors</h4>
            <ul className="space-y-4 text-sm font-sans">
              <li><a href="#/healthcare" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Heal', color: 'orange' }, { text: 'th', color: 'blue' }, { text: 'care', color: 'orange' }]} /></a></li>
              <li><a href="#/manufacturing" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Manu', color: 'orange' }, { text: 'fac', color: 'blue' }, { text: 'turing', color: 'orange' }]} /></a></li>
              <li><a href="#/agriculture" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Agri', color: 'orange' }, { text: 'cul', color: 'blue' }, { text: 'ture', color: 'orange' }]} /></a></li>
              <li><a href="#/financial-management" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Finan', color: 'orange' }, { text: 'cial ', color: 'blue' }, { text: 'Management', color: 'orange' }]} /></a></li>
              <li><a href="#/supply-chain" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Sup', color: 'orange' }, { text: 'ply ', color: 'blue' }, { text: 'Chain', color: 'orange' }]} /></a></li>
              <li><a href="#/energy-construction" className="hover:opacity-80 transition-opacity"><BrandText segments={[{ text: 'Ener', color: 'orange' }, { text: 'gy & ', color: 'blue' }, { text: 'Consumption', color: 'orange' }]} /></a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 tracking-widest text-xs uppercase">Connect</h4>
            <div className="flex gap-4 mb-6">
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes socialGradientDrift {
                  0%, 100% { background-position: 0% 50%; }
                  50% { background-position: 100% 50%; }
                }
                .social-gradient-drift {
                  background-size: 220% 220%;
                  animation: socialGradientDrift 5s ease-in-out infinite;
                }
                @keyframes socialGlowPulse {
                  0%, 100% { opacity: 0.45; transform: scale(1); }
                  50% { opacity: 0.75; transform: scale(1.12); }
                }
                .social-glow-pulse {
                  animation: socialGlowPulse 3.2s ease-in-out infinite;
                }
                @keyframes socialFloat {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-3px); }
                }
                .social-float {
                  animation: socialFloat 3.6s ease-in-out infinite;
                }
              `}} />

              {/* LinkedIn — authentic flat brand blue */}
              <a
                href="https://www.linkedin.com/company/tensorixai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group social-float relative w-11 h-11 transition-transform duration-500 hover:-translate-y-1.5 hover:scale-110"
              >
                <div
                  className="social-glow-pulse absolute -inset-2 rounded-2xl blur-lg pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #0A66C2 0%, transparent 70%)' }}
                />
                <div
                  className="relative w-11 h-11 flex items-center justify-center rounded-2xl shadow-lg shadow-[#0A66C2]/25 group-hover:shadow-[#0A66C2]/45 transition-shadow duration-500"
                  style={{ background: '#0A66C2' }}
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                  <LinkedinIcon className="relative z-10 w-5 h-5 text-white" />
                </div>
              </a>

              {/* Instagram — authentic diagonal brand gradient, slowly animated */}
              <a
                href="https://www.instagram.com/tensorix_ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group social-float relative w-11 h-11 transition-transform duration-500 hover:-translate-y-1.5 hover:scale-110"
                style={{ animationDelay: '0.6s' }}
              >
                <div
                  className="social-glow-pulse absolute -inset-2 rounded-2xl blur-lg pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #D62976 0%, transparent 70%)', animationDelay: '0.4s' }}
                />
                <div
                  className="social-gradient-drift relative w-11 h-11 flex items-center justify-center rounded-2xl shadow-lg shadow-[#D62976]/25 group-hover:shadow-[#D62976]/45 transition-shadow duration-500"
                  style={{ backgroundImage: 'linear-gradient(45deg, #FEDA75, #FA7E1E, #D62976, #962FBF, #4F5BD5, #FA7E1E, #FEDA75)' }}
                >
                  <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
                  <InstagramIcon className="relative z-10 w-5 h-5" />
                </div>
              </a>

            </div>
            <a
              href="mailto:contact@tensorixai.com"
              className="flex items-center gap-2 text-slate-700 hover:text-[#EA580C] transition-colors text-sm"
            >
              <Mail size={16} />
              <span>connect@tensorixai.com</span>
            </a>
            <a
              href="mailto:info@tensorixai.com"
              className="flex items-center gap-2 text-slate-700 hover:text-[#EA580C] transition-colors text-sm"
            >
              <Mail size={16} />
              <span>info@tensorixai.com</span>
            </a>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="tel:+919566041928"
                className="flex items-center gap-2 text-slate-700 hover:text-[#EA580C] transition-colors text-sm"
              >
                <Phone size={16} />
                <span>+91 9566041928</span>
              </a>
              <a
                href="tel:+918903903230"
                className="flex items-center gap-2 text-slate-700 hover:text-[#EA580C] transition-colors text-sm"
              >
                <Phone size={16} />
                <span>+91 8903903230</span>
              </a>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot+No+5,+3rd+floor,+behind+Ramraj+Cotton,+STEP+Colony,+Amirtha+Nagar,+Hosur,+Tamil+Nadu+635126"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-slate-700 hover:text-[#EA580C] transition-colors text-sm"
            >
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span><span className="font-semibold text-slate-900">Head Office:</span> Plot No 5, 3rd floor, behind Ramraj Cotton, STEP Colony, Amirtha Nagar, Hosur, Tamil Nadu 635126</span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Plot+No+4,+Krishna+Garden,+Motham+Agraharam,+ESI+Ring+Road,+Hosur+635126,+Tamil+Nadu.+India"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-slate-700 hover:text-[#EA580C] transition-colors text-sm"
            >
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span><span className="font-semibold text-slate-900">Registered Office:</span> Plot No 7, Krishna Garden, Motham Agraharam, ESI Ring Road, Hosur 635126, Tamil Nadu. India</span>
            </a>

            {/* Google Maps Iframe */}
            <div className="mt-6 rounded-xl overflow-hidden border border-slate-100 h-40 w-full group relative">
              <div className="absolute inset-0 bg-[#EA580C]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.4974877793697!2d77.80954577515023!3d12.746171519780415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae7124bcbcdfa7%3A0xa3ea9e3ee8bfccf3!2stensorixAI!5e0!3m2!1sen!2sin!4v1784710401472!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              ></iframe>
            </div>


          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-[#EA580C]" />
            <p>© 2026 TensorixAI. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;