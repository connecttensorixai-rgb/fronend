import React, { useState } from 'react';
import { CheckCircle2, Send, ArrowLeft, Upload, Loader2 } from 'lucide-react';

// Set VITE_HR_API_URL in .env to the HR server address. Applications are saved in the HR tool (Firestore).
const HR_API = (import.meta.env.VITE_HR_API_URL || '').replace(/\/+$/, '');
const MAX_MB = 5;
const PDF_TYPE = 'application/pdf';
const DOCX_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const ALLOWED = [PDF_TYPE, DOCX_TYPE];

const EXPERIENCE_OPTIONS = [
    'Fresher', 'Less than 1 year', '1 to 2 years', '2 to 3 years',
    '3 to 5 years', '5 to 8 years', '8 to 12 years', '12+ years',
];
const NOTICE_OPTIONS = ['Yes', 'No', 'Served'];
const PHONE_RE = /^\d{10}$/; // exactly 10 digits

const HAS_LWD = (n) => n === 'Yes' || n === 'Served'; // Yes = serving notice, Served = notice already completed
const todayISO = () => new Date().toISOString().slice(0, 10);

const validators = {
    name: (v) => (v.trim().length < 2 ? 'Full name is required' : ''),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address'),
    phone: (v) => (PHONE_RE.test(v) ? '' : 'Phone number must be exactly 10 digits'),
    experience: (v) => (v ? '' : 'Please select your experience'),
    noticePeriod: (v) => (v ? '' : 'Please select Yes, No or Served'),
    faceToFace: (v) => (v ? '' : 'Please select Yes or No'),
};

const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result).split(',')[1]);
        r.onerror = () => reject(new Error('Could not read the resume file'));
        r.readAsDataURL(file);
    });

/* ---------- Resume auto-fill (runs in the browser, best effort) ---------- */

async function extractText(file) {
    const buf = await file.arrayBuffer();
    if (file.type === PDF_TYPE) {
        const pdfjs = await import('pdfjs-dist');
        const worker = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
        pdfjs.GlobalWorkerOptions.workerSrc = worker;
        const pdf = await pdfjs.getDocument({ data: buf }).promise;
        let text = '';
        for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            content.items.forEach((it) => {
                text += it.str + (it.hasEOL ? '\n' : ' ');
            });
            text += '\n';
        }
        return text;
    }
    if (file.type === DOCX_TYPE) {
        const mammoth = await import('mammoth');
        return (await (mammoth.default || mammoth).extractRawText({ arrayBuffer: buf })).value;
    }
    throw new Error('unsupported'); // legacy .doc
}

const NOT_NAME = /resume|curriculum|vitae|profile|summary|objective|contact|email|phone|address|career|portfolio/i;

function parseResume(text) {
    const out = {};
    const email = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
    if (email) out.email = email[0];

    const phones = text.match(/\+?\d[\d\s().-]{8,16}\d/g) || [];
    for (const p of phones) {
        const digits = p.replace(/\D/g, '');
        if (digits.length >= 10 && digits.length <= 13) {
            const ten = digits.slice(-10);
            if (/^[6-9]/.test(ten)) {
                out.phone = ten;
                break;
            }
        }
    }


    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean).slice(0, 12);
    for (const line of lines) {
        const words = line.split(/\s+/);
        if (
            words.length >= 2 && words.length <= 4 &&
            /^[A-Za-z.'\- ]+$/.test(line) &&
            !NOT_NAME.test(line)
        ) {
            out.name = line === line.toUpperCase()
                ? line.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
                : line;
            break;
        }
    }
    return out;
}

/* ---------- UI helpers ---------- */

const inputCls =
    'w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm text-slate-900 outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20';

function Field({ label, k, type = 'text', required = true, placeholder, data, set, errors, ...rest }) {
    return (
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {label}{required && <span className="text-brand-orange"> *</span>}
            </label>
            <input type={type} value={data[k]} onChange={set(k)} placeholder={placeholder} className={inputCls} {...rest} />
            {errors[k] && <p className="text-xs text-red-600 mt-1">{errors[k]}</p>}
        </div>
    );
}

export default function ApplyForm({ role, source }) {
    const [data, setData] = useState({
        name: '', email: '', phone: '', experience: '',
        noticePeriod: '', lastWorkingDay: '', faceToFace: '', link: '', website: '', // website = honeypot
    });
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error
    const [message, setMessage] = useState('');
    const [parse, setParse] = useState({ state: 'idle', text: '' }); // idle | reading | done | failed
    const onPhone = (e) => {
        const v = e.target.value.replace(/\D/g, '').slice(0, 10);
        setData((d) => ({ ...d, phone: v }));
        setErrors((er) => ({ ...er, phone: '' }));
    };

    const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

    const onFile = async (e) => {
        const f = e.target.files[0] || null;
        setFile(f);
        setErrors((er) => ({ ...er, resume: '' }));
        if (!f || !ALLOWED.includes(f.type) || f.size > MAX_MB * 1024 * 1024) {
            setParse({ state: 'idle', text: '' });
            return;
        }
        setParse({ state: 'reading', text: '' });
        try {
            const found = parseResume(await extractText(f));
            const keys = Object.keys(found);
            if (keys.length === 0) throw new Error('nothing found');
            // only fill fields the candidate has not typed yet
            setData((d) => {
                const next = { ...d };
                keys.forEach((k) => { if (!d[k]) next[k] = found[k]; });
                return next;
            });
            setParse({ state: 'done', text: 'We filled in what we could from your resume. Please check the details and complete the rest.' });
        } catch (err) {
            setParse({ state: 'failed', text: "We couldn't read details from this resume. No problem, please fill in the form and apply." });
        }
    };

    const validate = () => {
        const errs = {};
        Object.keys(validators).forEach((k) => {
            const m = validators[k](data[k]);
            if (m) errs[k] = m;
        });
        if (HAS_LWD(data.noticePeriod) && !data.lastWorkingDay) errs.lastWorkingDay = data.noticePeriod === 'Served' ? 'Please enter the last working day of your served notice' : 'Please enter your last working day';
        if (role.portfolio && !data.link.trim()) errs.link = 'Portfolio link is required for this role';
        if (!file) errs.resume = 'Please upload your resume';
        else if (!ALLOWED.includes(file.type)) errs.resume = 'Only PDF or DOCX files are accepted';
        else if (file.size > MAX_MB * 1024 * 1024) errs.resume = `File must be under ${MAX_MB} MB`;
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (data.website) return; // bot
        if (!validate()) return;
        if (!HR_API) {
            setStatus('error');
            setMessage('Application service is not configured yet. Please email connect@tensorixai.com.');
            return;
        }
        setStatus('submitting');
        try {
            // multipart form -> HR server /api/apply (field names match the server)
            const body = new FormData();
            body.append('job_id', role.id);
            body.append('name', data.name.trim());
            body.append('email', data.email.trim());
            body.append('phone', data.phone);
            body.append('experience', data.experience);
            body.append('notice', data.noticePeriod);
            body.append('last_working_day', HAS_LWD(data.noticePeriod) ? data.lastWorkingDay : '');
            body.append('face_to_face', data.faceToFace);
            body.append('link', role.portfolio ? data.link : '');
            body.append('source', source || '');
            body.append('resume', file, file.name);
            const res = await fetch(`${HR_API}/api/apply`, { method: 'POST', body });
            const out = await res.json().catch(() => ({}));
            if (res.ok && out.ok) {
                setStatus('success');
            } else {
                setStatus('error');
                setMessage(out.detail || out.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setStatus('error');
            setMessage('Could not submit your application. Please check your connection and try again.');
        }
    };

    if (status === 'success') {
        return (
            <div className="pt-32 pb-24 px-6 max-w-xl mx-auto text-center min-h-[100dvh]">
                <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-slate-900 mb-3">Application received</h1>
                <p className="text-slate-600 font-serif mb-8">
                    Thanks for applying for <strong>{role.title}</strong>. Our team will review your resume and get back to you.
                </p>
                <a href="#/careers" className="text-brand-orange font-semibold">View other openings</a>
            </div>
        );
    }

    const common = { data, set, errors };

    return (
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-2xl mx-auto min-h-[100dvh]">
            <a href="#/careers" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-brand-orange mb-6">
                <ArrowLeft className="w-4 h-4" /> All openings
            </a>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Apply: {role.title}</h1>
            <p className="text-slate-600 font-serif mb-8">
                Upload your resume first and we'll try to fill in your details. Fields marked * are required.
            </p>

            <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-slate-200/50 bg-white/40 backdrop-blur-md p-6 md:p-8">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">Position</label>
                    <input value={`${role.title} (${role.id})`} readOnly className={`${inputCls} bg-slate-100`} />
                </div>

                {/* Resume first, so details can be auto-filled */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Resume (PDF or DOCX, max {MAX_MB} MB)<span className="text-brand-orange"> *</span>
                    </label>
                    <label className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white/70 px-4 py-4 cursor-pointer hover:border-brand-orange">
                        <Upload className="w-5 h-5 text-slate-500" />
                        <span className="text-sm text-slate-600 truncate">{file ? file.name : 'Choose file'}</span>
                        <input type="file" accept=".pdf,.docx" className="hidden" onChange={onFile} />
                    </label>
                    {errors.resume && <p className="text-xs text-red-600 mt-1">{errors.resume}</p>}
                    {parse.state === 'reading' && (
                        <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Reading your resume…
                        </p>
                    )}
                    {parse.state === 'done' && <p className="text-xs text-green-700 mt-2">{parse.text}</p>}
                    {parse.state === 'failed' && <p className="text-xs text-amber-700 mt-2">{parse.text}</p>}
                </div>

                <Field label="Full name" k="name" {...common} />
                <Field label="Email" k="email" type="email" {...common} />

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Mobile number<span className="text-brand-orange"> *</span>
                    </label>
                    <div className="flex gap-2">
                        <span className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-700 whitespace-nowrap">
                            🇮🇳 +91
                        </span>
                        <input
                            type="tel"
                            inputMode="numeric"
                            autoComplete="tel-national"
                            maxLength={10}
                            value={data.phone}
                            onChange={onPhone}
                            placeholder="10-digit mobile number" pattern="[0-9]{10}" title="Exactly 10 digits"
                            className={inputCls}
                        />
                    </div>
                    {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Total experience<span className="text-brand-orange"> *</span>
                    </label>
                    <select value={data.experience} onChange={set('experience')} className={inputCls}>
                        <option value="">Select</option>
                        {EXPERIENCE_OPTIONS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                        ))}
                    </select>
                    {errors.experience && <p className="text-xs text-red-600 mt-1">{errors.experience}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                            Notice period<span className="text-brand-orange"> *</span>
                        </label>
                        <select value={data.noticePeriod} onChange={(e) => setData((d) => ({ ...d, noticePeriod: e.target.value, lastWorkingDay: '' }))} className={inputCls}>
                            <option value="">Select</option>
                            {NOTICE_OPTIONS.map((o) => (
                                <option key={o} value={o}>{o}</option>
                            ))}
                        </select>
                        {errors.noticePeriod && <p className="text-xs text-red-600 mt-1">{errors.noticePeriod}</p>}
                    </div>

                    {data.noticePeriod === 'Yes' && (
                        <Field label="Last working day (LWD)" k="lastWorkingDay" type="date" min={todayISO()} {...common} />
                    )}
                    {data.noticePeriod === 'Served' && (
                        <Field label="Last working day (LWD) of served notice" k="lastWorkingDay" type="date" max={todayISO()} {...common} />
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Are you available for a face-to-face interview?<span className="text-brand-orange"> *</span>
                    </label>
                    <select value={data.faceToFace} onChange={set('faceToFace')} className={inputCls}>
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {errors.faceToFace && <p className="text-xs text-red-600 mt-1">{errors.faceToFace}</p>}
                </div>

                {role.portfolio && (
                    <Field label="Portfolio link" k="link" placeholder="https://" {...common} />
                )}

                {/* honeypot */}
                <input tabIndex={-1} autoComplete="off" value={data.website} onChange={set('website')} className="hidden" aria-hidden="true" />

                {status === 'error' && <p className="text-sm text-red-600">{message}</p>}

                <button
                    type="submit"
                    disabled={status === 'submitting' || parse.state === 'reading'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-brand-orange hover:bg-brand-orange/90 disabled:opacity-60 transition-all"
                >
                    {status === 'submitting' ? 'Submitting…' : <>Submit application <Send className="w-4 h-4" /></>}
                </button>
            </form>
        </div>
    );
}