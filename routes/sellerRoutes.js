import express from 'express';
import Seller from '../models/Seller.js'; 
const sellerRoutes = express.Router();

// Dohvaćanje svih prodavača
sellerRoutes.get('/', async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Kreiranje novog prodavača
sellerRoutes.post('/', async (req, res) => {
    const { firstName, lastName, email } = req.body;

    try {
        const newSeller = new Seller({ firstName, lastName, email });
        await newSeller.save();
        res.status(201).json(newSeller);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default sellerRoutes;
