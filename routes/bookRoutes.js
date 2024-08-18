import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// Dohvaćanje svih knjiga
router.get('/', async (req, res) => {
    try {
        const books = await Book.getBooks();
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
        //tocan kod: jer nije kontstruktor nego je funkcija
        await Book.createBook(
            req.body
        );
        //remove this everywhere
        //await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;
