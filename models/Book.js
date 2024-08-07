import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    edition: {
        type: String,
        required: true
    },
    literatureType: {
        type: String,
        required: true
    },
    educationLevel: String,
    year: Number
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
