const express = require('express');
const Seller = require('../models/Seller');
const router = express.Router();

// Get all sellers
router.get('/', async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.json(sellers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new seller
router.post('/', async (req, res) => {
    const seller = new Seller(req.body);
    try {
        const newSeller = await seller.save();
        res.status(201).json(newSeller);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
