const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const pdfroutes = require('./routes/pdfroutes')

dotenv.config(); 

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongo Connected"))
.catch((err)=> console.log("Error occured", err));


app.use('/pdf', pdfroutes);

app.listen(port, ()=>{
    console.log(`Server Running on http://localhost:${port}`);
})