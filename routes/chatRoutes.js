const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

// Get all chats for a specific ad
router.get('/:adId', async (req, res) => {
    try {
        const chats = await Chat.find({ ad: req.params.adId }).populate('ad buyer');
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new chat
router.post('/', async (req, res) => {
    const chat = new Chat(req.body);
    try {
        const newChat = await chat.save();
        res.status(201).json(newChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
