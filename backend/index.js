const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pdfroutes = require('./routes/pdfroutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://ai-notes-pdf-taker.vercel.app',
  'https://ai-notes-pdf-taker-3vzc.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
     
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  })
);


app.use((req, res, next) => {
  console.log('Origin:', req.headers.origin);
  next();
});

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdf', pdfroutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
