import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import bookRoutes from './routes/bookRoutes.js';
import adRoutes from './routes/adRoutes.js';
import authRoutes from './routes/auth.js';
import sellerRoutes from './routes/sellerRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

// Middleware za parsiranje JSON tijela
app.use(express.json());

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
app.use('/auth', authRoutes);
app.use('/sellers', sellerRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
