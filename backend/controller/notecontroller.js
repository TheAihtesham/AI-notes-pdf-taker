const Note = require('../model/note');

const saveNote = async (req, res) => {
    const { pdfId, content } = req.body;
    const userId = req.user._id;

    if (!pdfId) {
        return res.status(400).json({ error: 'pdfId is required' });
    }

    try {
        const existingNote = await Note.findOne({ pdfId, user: userId });

        if (existingNote) {
            existingNote.content = content;
            existingNote.updatedAt = Date.now();
            await existingNote.save();
            return res.status(200).json({ message: 'Note updated', note: existingNote });
        }

        const newNote = await Note.create({ pdfId, content, user: userId });
        res.status(201).json({ message: 'Note saved', note: newNote });
    } catch (err) {
        console.error('Error saving note:', err.stack || err);
        res.status(500).json({ error: 'Failed to save note' });
    }
};


const getNote = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    console.log('pdfId:', id, 'userId:', userId);

    try {
        const note = await Note.findOne({ pdfId: id, user: userId });
        console.log('Fetched note:', note);

        if (!note) {
            return res.status(200).json({
              note: null,
              message: 'No note yet for this PDF',
            });
          }
        res.status(200).json(note);
    } catch (err) {
        console.error('Error fetching note:', err.stack || err);
        res.status(500).json({ error: 'Failed to get note' });
    }
};

module.exports = {
    saveNote,
    getNote
}