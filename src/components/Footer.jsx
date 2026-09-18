import React from 'react';
import { Mail, Zap, Phone, MapPin } from 'lucide-react';
import LogoLoop from './ui/LogoLoop';
import rigidfabLogoImg from '../assets/rigidfab.png';
import jovaMetcraftLogoImg from '../assets/jova_metcraft.png';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const logos = [
  {
    node: (
      <img
        src={rigidfabLogoImg}
        alt="Rigidfab"
        className="h-[calc(var(--logoloop-logoHeight)*1.35)] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    )
  },
  {
    node: (
      <img
        src={jovaMetcraftLogoImg}
        alt="Jova Metcraft"
        className="h-[var(--logoloop-logoHeight)] w-auto object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    )
  }
];

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
            <ul className="space-y-4 text-slate-700 text-sm font-sans font-medium">
              <li><a href="#/" className="hover:text-[#EA580C] transition-colors">Home</a></li>
              <li><a href="#/about" className="hover:text-[#EA580C] transition-colors">About</a></li>
              <li><a href="#/services" className="hover:text-[#EA580C] transition-colors">Services</a></li>
              <li><a href="#/contact" className="hover:text-[#EA580C] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 tracking-widest text-xs uppercase">Sectors</h4>
            <ul className="space-y-4 text-slate-700 text-sm">
              <li><a href="#/healthcare" className="hover:text-[#EA580C] transition-colors">Healthcare</a></li>
              <li><a href="#/manufacturing" className="hover:text-[#EA580C] transition-colors">Manufacturing</a></li>
              <li><a href="#/agriculture" className="hover:text-[#EA580C] transition-colors">Agriculture</a></li>
              <li><a href="#/financial-management" className="hover:text-[#EA580C] transition-colors">Financial Management</a></li>
              <li><a href="#/supply-chain" className="hover:text-[#EA580C] transition-colors">Supply Chain</a></li>
              <li><a href="#/energy-construction" className="hover:text-[#EA580C] transition-colors">Energy & Consumption</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6 tracking-widest text-xs uppercase">Connect</h4>
            <div className="flex gap-3 mb-6">
              <a href="https://www.linkedin.com/company/tensorixai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 hover:border-[#EA580C]/50 hover:text-[#EA580C] text-slate-700 transition-all">
                <LinkedinIcon className="w-4 h-4" />
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