const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware za parsiranje JSON tijela
app.use(express.json());

const bookRoutes = require('./routes/bookRoutes');
const adRoutes = require('./routes/adRoutes');
const authRoutes = require('./routes/auth');
const sellerRoutes = require('./routes/sellerRoutes');
const userRoutes = require('./routes/userRoutes');

// Konekcija s bazom podataka
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Koristenje ruta
app.use('/books', bookRoutes);
app.use('/ads', adRoutes);
app.use('/auth', authRoutes); // Provjeri da ovo odgovara imenu rute
app.use('/sellers', sellerRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
