const express = require('express');
const multer = require('multer');
const { getPdfById, uploadpdf, allPDFs, askQuestionFromPdf } = require('../controller/pdfcontroller');

const fs = require('fs');
const path = require('path');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const sanitizedName = file.originalname.replace(/\s+/g, '-');
        const uniqueName = Date.now() + '-' + sanitizedName;
        cb(null, uniqueName);
    },
});

// File validation: Only accept PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
        return cb(new Error('Only PDF files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, 
});



router.post('/uploadpdf', upload.single('pdf'), uploadpdf);
router.get('/', allPDFs);
router.get('/:id', getPdfById);
router.post('/ask/:id', askQuestionFromPdf);

module.exports = router;
