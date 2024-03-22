const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const router = express.Router();

router.post("/register", async(req, res) => {

    const { firstName, lastName, email, password } = req.body;

    try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists'});

    user = new User({
        firstName,
        lastName,
        email,
        password
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
        
    } catch(error) {
    res.status(500).json({ message: 'Server Error' });
    }
});