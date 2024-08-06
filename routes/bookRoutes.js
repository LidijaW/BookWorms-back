const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Dohvaćanje svih knjiga
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Kreiranje nove knjige
router.post('/', async (req, res) => {
  const { title, author, genre, pages, publicationYear, edition, literatureType, educationLevel, year } = req.body;

  try {
    const newBook = new Book({ title, author, genre, pages, publicationYear, edition, literatureType, educationLevel, year });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

