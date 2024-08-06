const express = require('express');
const Ad = require('../models/Ad');
const router = express.Router();

// Dohvaćanje svih oglasa
router.get('/', async (req, res) => {
    try {
        const ads = await Ad.find()
            .populate('book')
            .populate('seller');
        res.status(200).json(ads);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Kreiranje novog oglasa
router.post('/', async (req, res) => {
    const { adCode, description, publishDate, adType, book, seller } = req.body;

    try {
        const newAd = new Ad({
            adCode,
            description,
            publishDate,
            adType,
            book,
            seller
        });
        await newAd.save();
        res.status(201).json(newAd);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
