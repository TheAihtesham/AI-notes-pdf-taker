'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-white min-h-screen flex flex-col justify-center items-center text-center px-6" id="hero">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <p className="text-blue-600 font-semibold text-sm mb-3">✨ Powered by Gemini AI</p>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Turn PDFs into <span className="text-blue-600">Conversations</span> with AI
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Upload any PDF and instantly ask questions. Get smart, accurate answers and summaries — no more endless scrolling.
        </p>

 
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg shadow-md transition"
        >
          Get Started
        </Link>

        
      </motion.div>
    </section>
  );
}
