const path = require('path');
const PDF = require('../model/pdfmodel');
const fs = require('fs');
const pdfParse = require('pdf-parse'); 

const askQuestionFromPdf = async (req, res) => {
    try {
        const { id } = req.params;
        const { question } = req.body;
        console.log(`Received question for PDF ${id}: ${question}`);

        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        const pdfData = await PDF.findById(id);
        if (!pdfData) {
            return res.status(404).json({ error: 'PDF not found' });
        }

        const contextText = pdfData.chunks.join('\n');

        // Construct payload for Gemini API
        const payload = {
            contents: [{
                parts: [{
                    text: `Context: ${contextText}\n\nQuestion: ${question}`
                }]
            }]
        };

        // Call Gemini API
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );

        const data = await response.json();
        console.log('Gemini API Response:', data);

        // Check if the API response is successful
        if (!response.ok) {
            console.error('Gemini API error:', data);
            return res.status(400).json({ error: `Gemini API error: ${data.error || 'Unknown error'}` });
        }

        if (!data.candidates || !data.candidates.length) {
            console.error('No candidates in Gemini response:', data);
            return res.status(400).json({ error: 'No candidates found in Gemini response' });
        }

        const answer = data.candidates[0].content.parts[0].text;
        res.status(200).json({ answer });

    } catch (err) {
        console.error('Internal error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// File upload handler
const uploadpdf = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ err: "No PDF uploaded" });
        }

        // Validate that the uploaded file is a PDF
        const validMimeTypes = ['application/pdf'];
        if (!validMimeTypes.includes(file.mimetype)) {
            return res.status(400).json({ err: "Only PDF files are allowed" });
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const relativePath = path.join('uploads', file.filename).replace(/\\/g, '/');
        const fileUrl = `${baseUrl}/${relativePath}`;

        // Extract text from the uploaded PDF file
        const pdfBuffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(pdfBuffer);

        const extractedText = pdfData.text;
        const chunkSize = 500;

        // Split the extracted text into chunks
        const chunks = [];
        for (let i = 0; i < extractedText.length; i += chunkSize) {
            chunks.push(extractedText.substring(i, i + chunkSize));
        }

        // Save the file details and text chunks to the database
        const newPDF = new PDF({
            filename: file.originalname,
            path: relativePath,
            fileUrl,
            chunks
        });

        await newPDF.save();
        res.status(201).json({ message: 'PDF uploaded successfully', pdf: newPDF });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Get all PDFs handler
const allPDFs = async (req, res) => {
    try {
        const allPDFs = await PDF.find().sort({ uploadedAt: -1 });
        res.status(200).json(allPDFs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch PDFs" });
    }
};

// Get PDF by ID handler
const getPdfById = async (req, res) => {
    try {
        const { id } = req.params;
        const pdfData = await PDF.findById(id);

        if (!pdfData) {
            return res.status(404).json({ error: 'PDF not found' });
        }

        const { filename, fileUrl, uploadedAt, chunks } = pdfData;
        res.status(200).json({ filename, fileUrl, uploadedAt, chunks });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error occurred while fetching the PDF' });
    }
};

module.exports = {
    uploadpdf,
    allPDFs,
    getPdfById,
    askQuestionFromPdf
};
