const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true // Ensures filename is always provided
    },
    path: {
        type: String,
        required: true // Ensures the path is always provided
    },
    fileUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v); // Simple URL validation
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('PDF', pdfSchema);
