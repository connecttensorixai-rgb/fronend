import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, User, Mail, Phone, Building2, ChevronDown, Send, CheckCircle2, X } from 'lucide-react';
import API from '../utils/api';

export default function ContactPage() {

  const DEPARTMENTS = [
    'Healthcare',
    'Manufacturing',
    'Defence Technologies',
    'Agriculture',
    'Financial Management',
    'Life Sciences',
    'Supply Chain',
    'Utilities',
    'TensorixAi for Builders',
    'Energy & Construction',
  ];

  const ContactForm = () => {
    const [formState, setFormState] = useState('idle'); // idle, submitting, success, error
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      department: '',
      message: ''
    });
    const [fieldErrors, setFieldErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    // ── Validation helpers ──
    const validators = {
      name: (value) => {
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s.'-]+$/.test(value.trim())) return 'Name can only contain letters, spaces, dots, hyphens';
        return '';
      },
      email: (value) => {
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
        return '';
      },
      phone: (value) => {
        if (!value.trim()) return 'Phone number is required';
        const digits = value.replace(/\D/g, '');
        if (digits.length !== 10) return 'Phone number must be exactly 10 digits';
        return '';
      },
      department: (value) => {
        if (!value) return 'Please select a department';
        if (!DEPARTMENTS.includes(value)) return 'Please select a valid department';
        return '';
      },
      message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      },
    };

    const validateField = (name, value) => {
      const validator = validators[name];
      return validator ? validator(value) : '';
    };

    const validateAllFields = () => {
      const errors = {};
      let hasError = false;
      Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) {
          errors[key] = error;
          hasError = true;
        }
      });
      setFieldErrors(errors);
      // Mark all fields as touched
      const allTouched = {};
      Object.keys(formData).forEach((key) => { allTouched[key] = true; });
      setTouchedFields(allTouched);
      return !hasError;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateAllFields()) {
        return; // stop — inline errors are now shown
      }

      setFormState('submitting');
      setErrorMessage('');

      try {
        await API.post('/contacts', formData);
        setFormState('success');
        setFormData({ name: '', email: '', phone: '', department: '', message: '' });
        setFieldErrors({});
        setTouchedFields({});
      } catch (error) {
        console.error('Contact form submission error:', error);
        const message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Something went wrong. Please try again later.';
        setErrorMessage(message);
        setFormState('error');
      }
    };

    const handleChange = (e) => {
      let { name, value } = e.target;

      if (name === 'phone') {
        // Only allow numbers and limit to 10 digits
        value = value.replace(/\D/g, '').slice(0, 10);
      }

      setFormData({ ...formData, [name]: value });

      // Live-clear error once the user fixes it
      if (touchedFields[name]) {
        const error = validateField(name, value);
        setFieldErrors((prev) => ({ ...prev, [name]: error }));
      }
    };

    const handleBlur = (e) => {
      const { name, value } = e.target;
      setTouchedFields((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Helper: input border class based on error state
    const inputClass = (fieldName) => {
      const base =
        'w-full px-5 py-4 bg-white/50 border rounded-2xl outline-none transition-all duration-300 placeholder:text-slate-400 group-hover:bg-white/80';
      if (touchedFields[fieldName] && fieldErrors[fieldName]) {
        return `${base} border-red-400 focus:ring-2 focus:ring-red-400/20 focus:border-red-500`;
      }
      return `${base} border-slate-200 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500`;
    };

    // ── Inline error message component ──
    const FieldError = ({ field }) => {
      if (!touchedFields[field] || !fieldErrors[field]) return null;
      return (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs font-semibold mt-1.5 ml-1 flex items-center gap-1"
        >
          <AlertTriangle size={12} />
          {fieldErrors[field]}
        </motion.p>
      );
    };

    return (
      <div className="pt-32 pb-24 min-h-[100dvh] relative">
        <AnimatePresence>
          {(formState === 'success' || formState === 'error') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-[2rem] p-8 md:p-12 max-w-md w-full shadow-2xl relative text-center border border-slate-100"
              >
                <button
                  onClick={() => setFormState('idle')}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${formState === 'success' ? 'bg-orange-100' : 'bg-red-100'}`}>
                  {formState === 'success' ? (
                    <CheckCircle2 className="text-orange-600 w-10 h-10" />
                  ) : (
                    <AlertTriangle className="text-red-600 w-10 h-10" />
                  )}
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">
                  {formState === 'success' ? 'Message Sent!' : 'Oops!'}
                </h3>
                <p className="text-slate-600 mb-8 text-lg font-medium">
                  {formState === 'success' 
                    ? 'Thank you for reaching out. Our team will get back to you within 24 hours.' 
                    : errorMessage || 'Something went wrong. Please try again later.'}
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className={`w-full px-8 py-4 text-white rounded-xl font-bold transition-all ${
                    formState === 'success' 
                      ? 'bg-[#EA580C] hover:bg-[#D44D0A] shadow-[0_10px_20px_rgba(234,88,12,0.2)] hover:shadow-[0_15px_30px_rgba(234,88,12,0.4)]'
                      : 'bg-red-600 hover:bg-red-700 shadow-[0_10px_20px_rgba(220,38,38,0.2)] hover:shadow-[0_15px_30px_rgba(220,38,38,0.4)]'
                  }`}
                >
                  {formState === 'success' ? 'Done' : 'Try Again'}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Side: Info & Map */}
            <div className="space-y-12">
              <div>
                <h1 className="text-5xl md:text-6xl font-sans font-bold text-slate-900 tracking-tight mb-6">
                  Let's <span className="text-brand-orange">Connect</span>
                </h1>
                <p className="text-lg text-slate-600 font-serif max-w-md leading-relaxed">
                  Whether you're looking to transform your industry with AI or have a specific inquiry, our team of experts is here to help you navigate the future.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Phone Number</h3>
                    <p className="text-slate-600 text-lg">+91 8903903230</p>

                    <p className="text-slate-500 text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start space-x-5">
                    <div className="w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Phone Number</h3>
                      <p className="text-slate-600 text-lg">+91 9566658186</p>

                      <p className="text-slate-500 text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-5">
                  <div className="w-14 h-14 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-brand-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Location</h3>
                    <p className="text-slate-600 text-lg">Plot No 5, 3rd floor, behind Ramraj Cotton, STEP Colony, </p>
                    <p className="text-slate-600 text-lg">Amirtha Nagar, Hosur, Tamil Nadu 635126</p>
                  </div>
                </div>
              </div>

              {/* Location Map */}
              <div className="w-full h-72 md:h-80 rounded-3xl overflow-hidden border border-slate-200/50 shadow-sm relative group bg-slate-100">
                <div className="absolute inset-0 bg-slate-200 animate-pulse -z-10" />
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.4974877793697!2d77.80954577515023!3d12.746171519780415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae7124bcbcdfa7%3A0xa3ea9e3ee8bfccf3!2stensorixAI!5e0!3m2!1sen!2sin!4v1784710401472!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-90 group-hover:opacity-100 transition-opacity duration-500 filter grayscale-[50%] contrast-125"
                  title="Office Location Map"
                ></iframe>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/5 rounded-bl-full -z-10" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-blue/5 rounded-tr-full -z-10" />

              <h2 className="text-3xl font-bold text-slate-900 mb-8 font-sans">Send us a message</h2>

              <form onSubmit={handleSubmit} className="space-y-6 text-left max-w-3xl mx-auto" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 ml-1 flex items-center gap-2">
                      <User size={14} className="text-orange-600" />
                      Full Name
                    </label>
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="John Doe"
                        className={inputClass('name')}
                      />
                    </div>
                    <FieldError field="name" />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 ml-1 flex items-center gap-2">
                      <Mail size={14} className="text-orange-600" />
                      Email Address
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="john@example.com"
                        className={inputClass('email')}
                      />
                    </div>
                    <FieldError field="email" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 ml-1 flex items-center gap-2">
                      <Phone size={14} className="text-orange-600" />
                      Phone Number
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="10-digit phone number"
                        className={inputClass('phone')}
                      />
                    </div>
                    <FieldError field="phone" />
                  </div>

                  {/* Department Dropdown */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 ml-1 flex items-center gap-2">
                      <Building2 size={14} className="text-orange-600" />
                      Department
                    </label>
                    <div className="relative group">
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputClass('department')} appearance-none cursor-pointer ${!formData.department ? 'text-slate-400' : 'text-slate-900'
                          }`}
                      >
                        <option value="" disabled>Select a department</option>
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                    </div>
                    <FieldError field="department" />
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 ml-1 flex items-center gap-2">
                    <Send size={14} className="text-orange-600 rotate-45" />
                    Message
                  </label>
                  <div className="relative group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="4"
                      placeholder="Tell us about your project..."
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>
                  <FieldError field="message" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-5 bg-[#EA580C] hover:bg-[#D44D0A] disabled:bg-slate-400 text-white rounded-2xl font-black text-lg tracking-wide transition-all shadow-[0_20px_40px_rgba(234,88,12,0.3)] hover:shadow-[0_25px_50px_rgba(234,88,12,0.5)] flex items-center justify-center gap-3 mt-4"
                >
                  {formState === 'submitting' ? (
                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} className="rotate-45" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return <ContactForm />;
}
