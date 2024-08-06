require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const adRoutes = require('./routes/adRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const bookRoutes = require('./routes/bookRoutes'); // Ovdje uvoziš bookRoutes

const app = express();

app.use(cors({ 
    origin: 'http://localhost:8081/',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/ads', adRoutes);
app.use('/sellers', sellerRoutes);
app.use('/books', bookRoutes); 

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Could not connect to Database'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
