const express = require('express');
const Ad = require('../models/Ad');
const router = express.Router();

// Get all ads
router.get('/', async (req, res) => {
    try {
        const ads = await Ad.find().populate('book seller');
        res.json(ads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new ad
router.post('/', async (req, res) => {
    const ad = new Ad(req.body);
    try {
        const newAd = await ad.save();
        res.status(201).json(newAd);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
