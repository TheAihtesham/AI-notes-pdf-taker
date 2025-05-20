const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pdfroutes = require('./routes/pdfroutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: 'https://ai-notes-pdf-taker-fmrq.vercel.app',  // ⚠️ Use your frontend URL here
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB connected');
    
    // ✅ Start server only after successful DB connection
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

app.use('/pdf', pdfroutes);
