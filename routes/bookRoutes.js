import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Fetching all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.getBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Creating a new book
router.post("/", async (req, res) => {
  const { title, author, publishDate, genre, edition, literatureType, educationLevel, year } = req.body;

  try {
    const newBook = await Book.createBook({
      title,
      author,
      publishDate,
      genre,
      edition,
      literatureType,
      educationLevel,
      year
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
