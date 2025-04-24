const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  chunks: {
    type: [String], // Array of text chunks
    default: []     // Defaults to empty array
  }
}, { timestamps: true });

module.exports = mongoose.model('PDF', pdfSchema);
