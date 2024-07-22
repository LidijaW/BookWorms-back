const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: String,
    pages: Number,
    publicationYear: Number,
    edition: String,
    literatureType: String,
    educationLevel: String,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
