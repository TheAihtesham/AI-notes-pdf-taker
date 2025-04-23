import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Question = () => {
    return (
        <section id="faq" className="py-16 bg-white text-center px-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto text-left space-y-6">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is PDFSense?</AccordionTrigger>
                        <AccordionContent>
                            PDFSense is an AI-powered web app that lets you upload PDFs, read their content, summarize them, and ask questions based on the document.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger>Is my uploaded data safe?</AccordionTrigger>
                        <AccordionContent>
                            Yes. Your PDFs are handled securely and are not stored permanently. They are only used temporarily to generate responses.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger>What types of PDFs are supported?</AccordionTrigger>
                        <AccordionContent>
                            PDFSense supports most text-based PDFs. Scanned image PDFs may not work accurately unless OCR is applied beforehand.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                        <AccordionTrigger>How does the AI answer questions from my PDF?</AccordionTrigger>
                        <AccordionContent>
                            The AI extracts and splits the PDF content into chunks, then uses Gemini AI to answer questions based on semantic understanding.
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                        <AccordionTrigger>Is PDFSense free to use?</AccordionTrigger>
                        <AccordionContent>
                            Currently, PDFSense offers a free tier. Premium plans with additional features may be introduced in the future.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    )
}

export default Question
