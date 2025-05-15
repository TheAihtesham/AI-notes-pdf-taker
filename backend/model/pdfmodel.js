const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',  required: false
  },
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
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('PDF', pdfSchema);
