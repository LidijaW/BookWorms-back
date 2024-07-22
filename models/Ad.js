const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    adCode: { type: String, required: true, unique: true },
    description: String,
    publishDate: { type: Date, default: Date.now },
    adType: { type: String, enum: ['sale', 'exchange', 'donation'], required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true }
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;
