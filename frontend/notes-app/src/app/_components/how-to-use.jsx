

import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "1. Upload Your PDF",
    description: "Click the upload button to choose your PDF file. PDFSense will securely store and process your document.",
  },
  {
    step: "2. Preview the PDF",
    description: "View the content of your uploaded PDF using our smooth built-in previewer.",
  },
  {
    step: "3. Ask Questions",
    description: "Type any question about the PDF content. Our AI will scan and provide accurate answers instantly.",
  },
  {
    step: "4. Get a Summary",
    description: "Need a quick overview? Just click the 'Summarize' button to generate a concise summary.",
  },

];

export default function HowToUse() {
  return (
    <section className="w-full py-20 px-6 bg-gray-50" id="how-to-use">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">How to Use PDFSense</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Follow these simple steps to get the most out of your AI-powered PDF assistant.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((item, index) => (
            <Card key={index} className="text-left shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{item.step}</h3>
                <p className="text-gray-700">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
