import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/auth.js';
import adRoutes from './routes/adRoutes.js';
import sellerRoutes from './routes/sellerRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use('/auth', authRoutes);

// Protected routes
app.use('/books', authMiddleware, bookRoutes);
app.use('/ads', authMiddleware, adRoutes);
app.use('/sellers', authMiddleware, sellerRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});
