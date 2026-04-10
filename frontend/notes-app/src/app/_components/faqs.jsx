'use client';

import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from 'framer-motion'

const faqs = [
    {
        question: "What exactly is PDFSense?",
        answer: "PDFSense is an intelligent document assistant. It uses Gemini AI to analyze your PDFs, allowing you to extract summaries, ask complex questions, and find specific information without manual reading."
    },
    {
        question: "Is my uploaded data safe?",
        answer: "Security is built into our core. Your documents are encrypted during transmission and are only used to provide the context needed for your specific session."
    },
    {
        question: "What types of PDFs are supported?",
        answer: "We support all standard text-based PDFs. For the best experience, ensure your document has selectable text. We are currently working on OCR support for scanned images."
    },
    {
        question: "How does the AI process the documents?",
        answer: "We use a technique called RAG (Retrieval-Augmented Generation). Your PDF is securely indexed into small context chunks, which the Gemini AI then uses to generate high-accuracy responses."
    },
    {
        question: "Is PDFSense free to use?",
        answer: "Yes, we offer a generous free tier for individuals. We believe everyone should have access to smarter document tools."
    }
];

const Question = () => {
    return (
        <section id="faq" className="py-24 bg-white px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-blue-600 font-semibold tracking-wide uppercase text-sm mb-3">Support</h2>
                    <h3 className="text-4xl font-extrabold text-slate-900 mb-4">Common Questions</h3>
                    <p className="text-slate-600">Everything you need to know about the platform and security.</p>
                </div>

                {/* Accordion Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-[#F9FAFB] rounded-3xl p-4 md:p-8 border border-slate-100"
                >
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem 
                                key={index} 
                                value={`item-${index}`}
                                className="border-none bg-white rounded-2xl px-6 py-1 shadow-sm border border-transparent hover:border-blue-100 transition-all"
                            >
                                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-blue-600 hover:no-underline py-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

                
            </div>
        </section>
    )
}

export default Question