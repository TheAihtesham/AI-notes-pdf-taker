const path = require('path');
const PDF = require('../model/pdfmodel');

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
 // Ensures cross-platform compatibility
        const fileUrl = `${baseUrl}/${relativePath}`;

        // Save the file details to the database
        const newPDF = new PDF({
            filename: file.originalname,
            path: relativePath,
            fileUrl,
        });

        await newPDF.save();
        res.status(201).json({ message: 'PDF uploaded successfully', pdf: newPDF });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};
const allPDFs = async(req, res) =>{
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
        const { id } = req.params; // Get the PDF ID from the route parameter

        // Find the PDF document by its ID in the database
        const pdfData = await PDF.findById(id);

        if (!pdfData) {
            return res.status(404).json({ error: 'PDF not found' });
        }

        // Send the PDF data (filename, fileUrl, uploadedAt) as a JSON response
        const { filename, fileUrl, createdAt } = pdfData;
        res.status(200).json({ filename, fileUrl, uploadedAt: createdAt });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error occurred while fetching the PDF' });
    }
};


module.exports = {
    uploadpdf,
    allPDFs,
    getPdfById
    
};
