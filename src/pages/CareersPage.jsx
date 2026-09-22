import React, { useEffect } from 'react';

const openRoles = [
  {
    title: 'AI Engineer',
    description: (
      <>
        <strong className="text-slate-900">TensorixAI</strong> is looking for a talented and motivated{' '}
        <strong className="text-slate-900">AI Engineer</strong> to join our team and build intelligent, scalable, real-world AI solutions.
      </>
    ),
    skills: [
      'Python', 'GitHub', 'Pandas', 'Math', 'Entire ML', 'DL', 'PyTorch',
      'LLM', 'Transformers', 'RAG', 'Vector DB', 'AI Agents', 'API',
      'Fine-tuning', 'Docker', 'MLOps',
    ],
    extra: (
      <>
        We are looking for someone who is{' '}
        <strong className="text-slate-900">curious, self-driven, technically strong, and passionate about AI</strong>.
        The ability to solve complex problems, learn quickly, and work collaboratively is highly valued.
      </>
    ),
    education: (
      <>
        B.Tech., B.E., B.S., M.Tech., M.S., or equivalent in{' '}
        <strong className="text-slate-800">Computer Science, AI, ML, Data Science, Mathematics, or a related field</strong> is preferred.
      </>
    ),
    location: (
      <>
        <strong className="text-slate-800">Hosur Area, Tamil Nadu</strong>. Candidates must be willing to relocate to the Hosur area.
      </>
    ),
    closing:
      'If you are passionate about AI, Machine Learning, Deep Learning, and building next-generation AI products, we would love to hear from you.',
  },
  {
    title: 'Designer',
    description: (
      <>
        We are looking for a talented and versatile <strong className="text-slate-900">Designer</strong> to join our team and contribute to building{' '}
        <strong className="text-slate-900">world-class digital products and experiences</strong>.
      </>
    ),
    skills: [
      'Graphic Design and UI/UX', 'Motion Graphics and Video Editing',
      '3D Design, Modeling and Animation using Blender', 'Adobe Creative Suite',
      'HTML, CSS and JavaScript', 'React, Vue.js, Angular or similar',
      'Web Design and Interactive Experiences', 'Branding, Typography and Visual Identity',
    ],
    extra: (
      <>
        We value <strong className="text-slate-900">creativity, strong design fundamentals, ownership, communication</strong>, and a willingness to learn and adapt.
      </>
    ),
    location: (
      <>
        <strong className="text-slate-800">Hosur Area, Tamil Nadu</strong>.
      </>
    ),
    closing: 'Interested candidates are invited to send their resume and portfolio.',
  },
];

const MAIL_TO = 'connect@tensorixai.com';

function mailtoHref(role) {
  const subject = `Application: ${role.title} — TensorixAI`;
  const body = `Hi TensorixAI team,\n\nI'd like to apply for the ${role.title} role. Please find my resume${role.title === 'Designer' ? ' and portfolio' : ''} attached.\n\nThanks,\n`;
  return `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative min-h-[100dvh]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-brand-blue text-xs font-semibold tracking-wider uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse"></span>
          We're Hiring
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 font-sans leading-tight">
          Build the Future of{' '}
          <span className="text-brand-orange">Applied AI</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 font-serif leading-relaxed max-w-2xl mx-auto">
          We're a small team solving hard, real-world problems across healthcare, manufacturing, agriculture, and beyond.
          If you want your work to ship into production, not just a slide deck, we'd like to hear from you.
        </p>
      </div>


      <div className="max-w-4xl mx-auto space-y-6">
        {openRoles.map((role) => (
          <div
            key={role.title}
            className="group relative flex flex-col rounded-2xl border border-slate-200/50 bg-white/40 backdrop-blur-md p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 hover:border-brand-orange/40"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 font-sans mb-2 group-hover:text-brand-orange transition-colors duration-300">
                  {role.title}
                </h3>
                <p className="text-sm text-slate-600 font-serif leading-relaxed mb-4 max-w-xl">
                  {role.description}
                </p>

                {/* Key Skills */}
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Key Skills</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-slate-600 font-serif leading-relaxed mb-4 max-w-xl">
                  {role.extra}
                </p>

                {role.education && (
                  <p className="text-xs text-slate-500 font-serif leading-relaxed max-w-xl mb-3">
                    <span className="font-semibold text-slate-700">Education: </span>
                    {role.education}
                  </p>
                )}

                <p className="text-xs text-slate-500 font-serif leading-relaxed max-w-xl mb-3">
                  <span className="font-semibold text-slate-700">Location: </span>
                  {role.location}
                </p>

                <p className="text-sm text-slate-600 font-serif leading-relaxed max-w-xl">
                  {role.closing}
                </p>
              </div>

              <a
                href={mailtoHref(role)}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange/90 shadow-sm transition-all whitespace-nowrap"
              >
                Send us a resume
                <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-16 text-center rounded-2xl border border-slate-200/50 bg-white/40 backdrop-blur-md p-10">
        <h3 className="text-xl font-bold text-slate-900 font-sans mb-3">Don't see a fit?</h3>
        <p className="text-slate-600 font-serif mb-6 max-w-xl mx-auto">
          We're always interested in hearing from strong engineers and applied researchers. Reach out and tell us what you'd want to work on.
        </p>
        <a
          href={`mailto:${MAIL_TO}?subject=${encodeURIComponent('General Application — TensorixAI')}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-brand-orange border border-brand-orange/30 hover:bg-brand-orange/5 transition-colors"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}