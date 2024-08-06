const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    adCode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    adType: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller', // Provjeri da je referenca ispravna
        required: true
    }
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
