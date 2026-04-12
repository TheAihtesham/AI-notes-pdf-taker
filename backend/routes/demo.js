// backend/routes/demo.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const pdfParse = require('pdf-parse');
const PDF = require('../model/pdfmodel');

const router = express.Router();

// Use disk storage just like your main upload (so file.path works)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
});

// POST /demo/upload
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No PDF uploaded' });

    const baseUrl = `https://${req.get('host')}`;
    const relativePath = path.join('uploads', file.filename).replace(/\\/g, '/');
    const fileUrl = `${baseUrl}/${relativePath}`;

    const pdfBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(pdfBuffer);

    const chunkSize = 500;
    const chunks = [];
    for (let i = 0; i < pdfData.text.length; i += chunkSize) {
      chunks.push(pdfData.text.substring(i, i + chunkSize));
    }

    // Store with user: null to mark it as a guest upload
    const newPDF = new PDF({
      user: null,
      filename: file.originalname,
      path: relativePath,
      fileUrl,
      chunks,
    });

    await newPDF.save();

    res.status(201).json({
      docId: newPDF._id,
      filename: file.originalname,
    });
  } catch (err) {
    console.error('Demo upload error:', err.stack || err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// POST /demo/ask
router.post('/ask', async (req, res) => {
  try {
    const { docId, question } = req.body;
    if (!docId || !question)
      return res.status(400).json({ error: 'docId and question are required' });

    // Find by _id only — no user check since it's a guest doc
    const pdfData = await PDF.findOne({ _id: docId, user: null });

    if (!pdfData) {
      return res.status(404).json({ error: 'Demo PDF not found' });
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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
    console.error('Demo ask error:', err.stack || err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;