import React from 'react';
import { motion } from 'framer-motion';
import {
    Wrench, TriangleAlert, ZapOff,
    CalendarDays, Factory, CheckCircle2,
    Cloud, Wifi, Activity,
    BrainCircuit, Cpu, BarChart3, Search
} from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "REACTIVE\nMANAGEMENT",
        desc: "CORRECTIVE MEASURES\nAFTER A CONSUMPTION SPIKE",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100/50 border border-blue-200 flex items-center justify-center">
                <Wrench className="absolute top-4 left-4 w-8 h-8 text-slate-500 -rotate-45" />
                <TriangleAlert className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-red-400 z-10" />
                <ZapOff className="absolute bottom-6 right-6 w-10 h-10 text-slate-700" />
                <div className="absolute top-8 right-6 w-3 h-3 bg-yellow-400 rotate-45"></div>
                <div className="absolute bottom-10 left-6 w-2 h-2 bg-slate-400 rounded-full"></div>
            </div>
        )
    },
    {
        id: 2,
        title: "PREVENTIVE\nMANAGEMENT",
        desc: "REGULAR ENERGY AUDITS\nTO REDUCE WASTE",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100/50 border border-blue-200 flex items-center justify-center">
                <CalendarDays className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 text-slate-600" />
                <Factory className="absolute bottom-8 left-6 w-12 h-12 text-slate-800" />
                <div className="absolute bottom-10 right-6 flex flex-col gap-1">
                    <CheckCircle2 className="w-5 h-5 text-green-500 bg-white rounded-full" />
                    <CheckCircle2 className="w-5 h-5 text-green-500 bg-white rounded-full" />
                </div>
                <div className="absolute top-6 right-8 w-3 h-3 bg-yellow-400 rotate-45"></div>
            </div>
        )
    },
    {
        id: 3,
        title: "PREDICTIVE\nMANAGEMENT",
        desc: "USE OF SENSORS AND SOFTWARE\nTO PREDICT SPIKES",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100/50 border border-blue-200 flex items-center justify-center">
                <Cloud className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 text-slate-600" />
                <Wifi className="absolute top-10 right-4 w-8 h-8 text-blue-500" />
                <Activity className="absolute bottom-10 left-6 w-10 h-10 text-blue-600" />
                <div className="absolute bottom-8 right-8 w-10 h-8 border-2 border-slate-700 rounded-sm flex items-center justify-center bg-white">
                    <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse"></div>
                </div>
                <svg className="absolute top-14 left-1/2 -translate-x-1/2 w-12 h-12 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </div>
        )
    },
    {
        id: 4,
        title: "PRESCRIPTIVE\nMANAGEMENT",
        desc: "MACHINE LEARNING PREDICTS\nCONSUMPTION AND IDENTIFIES SOLUTIONS",
        icon: (
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100/50 border border-blue-200 flex items-center justify-center">
                <BrainCircuit className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-20 text-slate-600" />
                <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-8 h-8 text-yellow-500 bg-white rounded-sm" />
                <BarChart3 className="absolute bottom-6 left-6 w-10 h-10 text-blue-500" />
                <Search className="absolute bottom-8 right-6 w-8 h-8 text-yellow-600" />
                <div className="absolute top-4 right-10 w-3 h-3 bg-yellow-400 rotate-45"></div>
            </div>
        )
    }
];

export default function EnergyProcessDiagram() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 12 } }
    };

    const arrowVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 50, delay: 0.5 } }
    };

    return (
        <div className="w-full py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Energy & Consumption Evolution</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Transitioning from reactive fixes to AI-driven prescriptive autonomy.
                    </p>
                </div>

                <motion.div
                    className="flex flex-col xl:flex-row items-center justify-between gap-8 xl:gap-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {steps.map((step, index) => (
                        <React.Fragment key={step.id}>

                            {/* Step Card */}
                            <motion.div variants={itemVariants} className="flex flex-col items-center text-center w-full max-w-[280px]">
                                {/* Icon Container */}
                                <motion.div
                                    className="mb-6 relative"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {step.icon}
                                    {/* Decorative dashed line at bottom */}
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-px border-b-2 border-dashed border-blue-200"></div>
                                </motion.div>

                                {/* Title */}
                                <h3 className="text-base md:text-lg font-bold text-slate-800 whitespace-pre-line leading-tight mb-3">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[10px] md:text-xs font-semibold text-blue-500/80 whitespace-pre-line tracking-wide">
                                    {step.desc}
                                </p>
                            </motion.div>

                            {/* Arrow separator (hidden on mobile, visible on desktop) */}
                            {index < steps.length - 1 && (
                                <motion.div variants={arrowVariants} className="hidden xl:block text-slate-400">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                            )}

                            {/* Arrow separator (visible on mobile, hidden on desktop) */}
                            {index < steps.length - 1 && (
                                <motion.div variants={arrowVariants} className="block xl:hidden text-slate-400 my-4 rotate-90">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </motion.div>
                            )}

                        </React.Fragment>
                    ))}
                </motion.div>

            </div>
        </div>
    );
}
