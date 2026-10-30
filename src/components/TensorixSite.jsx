import { useEffect, useRef } from 'react';
import css from '../tensorix/site.css?raw';
import markup from '../tensorix/markup.html?raw';
import initTensorix from '../tensorix/init.js';

// Renders the tensaiweb.html pages (Home, TEHTER, Case Studies) inside a Shadow DOM,
// so their original CSS stays pixel-identical and never clashes with Tailwind.
export default function TensorixSite() {
  const hostRef = useRef(null);

  useEffect(() => {
    if (import.meta.env.VITE_LEADS_URL) window.__TX_LEADS_URL__ = import.meta.env.VITE_LEADS_URL;
    const host = hostRef.current;
    const root = host.shadowRoot || host.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>${css}</style><div class="tx-root">${markup}</div>`;
    const dlg = root.getElementById('dm');
    if (dlg) dlg.setAttribute('data-lenis-prevent', '');
    const cleanup = initTensorix(root, host);
    return () => {
      cleanup();
      root.innerHTML = '';
    };
  }, []);

  return <div ref={hostRef} />;
}
