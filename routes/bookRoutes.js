import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// GET sve knjige ili filtriraj po naslovu, autoru ili žanru
router.get("/", async (req, res) => {
  try {
    const query = req.query.query ? req.query.query.toLowerCase() : "";
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST nova knjiga
router.post("/", async (req, res) => {
  const {
    title,
    author,
    genre,
    pages,
    publicationYear,
    edition,
    literatureType,
    educationLevel,
    year,
    description,
  } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      pages,
      publicationYear,
      edition,
      literatureType,
      educationLevel,
      year,
      description,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
