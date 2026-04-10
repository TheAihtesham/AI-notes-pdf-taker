'use client';

import { motion } from 'framer-motion';
import { MousePointerClick, Zap, ShieldCheck, FileSearch } from 'lucide-react';

const features = [
    {
        title: "Contextual Intelligence",
        description: "Our AI doesn't just read; it understands. Select specific paragraphs to get deep insights and context-aware explanations.",
        icon: <MousePointerClick className="w-6 h-6 text-blue-600" />,
        className: "md:col-span-2",
        bg: "bg-blue-50/50"
    },
    {
        title: "Instant Summaries",
        description: "Get the gist of a 50-page document in seconds.",
        icon: <Zap className="w-6 h-6 text-amber-600" />,
        className: "md:col-span-1",
        bg: "bg-amber-50/50"
    },
    {
        title: "Bank-Grade Security",
        description: "Your documents are encrypted and never used for training. Privacy is our default setting.",
        icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
        className: "md:col-span-1",
        bg: "bg-emerald-50/50"
    },
    {
        title: "Persistent Workspace",
        description: "All your uploaded PDFs and previous AI conversations are saved in your dashboard. Pick up exactly where you left off, anytime, on any device.",
        icon: <div className="text-xl">📁</div>, // Using an emoji or Folder icon
        className: "md:col-span-2",
        bg: "bg-indigo-50/50"
    }
];

export default function FeatureShowcase() {
    return (
        <section className="w-full py-24 px-6 bg-[#F9FAFB]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div className="max-w-xl">
                        <h2 className="text-blue-600 font-semibold mb-2">Capabilities</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                            Powerful tools to supercharge your reading experience.
                        </h3>
                    </div>
                    <p className="text-slate-600 md:max-w-xs text-sm leading-relaxed">
                        Stop wasting hours on manual research. PDFSense uses Gemini AI to turn static files into dynamic knowledge bases.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`p-8 rounded-3xl border border-slate-200 bg-white hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md ${f.className}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl ${f.bg} flex items-center justify-center mb-6`}>
                                {f.icon}
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h4>
                            <p className="text-slate-600 leading-relaxed">
                                {f.description}
                            </p>

                            {/* Decorative "UI Element" inside card */}
                            <div className="mt-8 pt-6 border-t border-slate-50">
                                <div className="flex gap-2">
                                    <div className="h-1.5 w-8 rounded-full bg-slate-100"></div>
                                    <div className="h-1.5 w-16 rounded-full bg-slate-100"></div>
                                    <div className="h-1.5 w-12 rounded-full bg-blue-100"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}