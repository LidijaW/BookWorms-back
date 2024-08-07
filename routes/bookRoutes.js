import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Dohvaćanje svih knjiga
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Kreiranje nove knjige
router.post('/', async (req, res) => {
    const { title, author, publishDate } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            publishDate
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
