const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const pdfParse = require('pdf-parse');
const PDF = require('../model/pdfmodel');

// Ask a question from Gemini
const askQuestionFromPdf = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params)
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const pdfData = await PDF.findOne({ _id: id, user: req.user._id });

    if (!pdfData) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const contextText = pdfData.chunks.join('\n');
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Context: ${contextText}\n\nQuestion: ${question}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.candidates?.length) {
      return res.status(400).json({ error: data.error?.message || 'Gemini API failed' });
    }

    const answer = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer });
  } catch (err) {
    console.error('Error in askQuestionFromPdf:', err.stack || err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadpdf = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user._id;


    if (!file) {
      return res.status(400).json({ error: 'No PDF uploaded' });
    }

    const validMimeTypes = ['application/pdf'];
    if (!validMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const relativePath = path.join('uploads', file.filename).replace(/\\/g, '/');
    const fileUrl = `${baseUrl}/${relativePath}`;

    const pdfBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(pdfBuffer);
    const chunkSize = 500;

    const chunks = [];
    for (let i = 0; i < pdfData.text.length; i += chunkSize) {
      chunks.push(pdfData.text.substring(i, i + chunkSize));
    }

    const newPDF = new PDF({
      user: req.user._id,
      filename: file.originalname,
      path: relativePath,
      fileUrl,
      chunks,
    });

    await newPDF.save();

    res.status(201).json({ message: 'PDF uploaded successfully', pdf: newPDF });
  } catch (err) {
    console.error('Error in uploadpdf:', err.stack || err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Get all PDFs for the logged-in user
const allPDFs = async (req, res) => {
  try {
    let pdfs;
    pdfs = await PDF.find({ user: req.user._id }).sort({ createdAt: -1 });
  
    res.status(200).json(pdfs);
  } catch (err) {
    console.error('Error fetching PDFs:', err.stack || err);
    res.status(500).json({ error: 'Failed to fetch PDFs' });
  }
};

// Get PDF by ID
const getPdfById = async (req, res) => {
  try {
    const { id } = req.params;
    const pdfData = await PDF.findOne({ _id: id, user: req.user._id });

    if (!pdfData) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const { filename, fileUrl, uploadedAt, chunks } = pdfData;
    res.status(200).json({ filename, fileUrl, uploadedAt, chunks });
  } catch (err) {
    console.error('Error fetching PDF by ID:', err.stack || err);
    res.status(500).json({ error: 'Error occurred while fetching the PDF' });
  }
};

module.exports = {
  uploadpdf,
  allPDFs,
  getPdfById,
  askQuestionFromPdf,
};
