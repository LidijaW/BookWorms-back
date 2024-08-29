import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/adRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import db from "./firebase.js"; // Import the Firestore instance

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

// Protected routes
app.use("/books", authMiddleware, bookRoutes);
app.use("/ads", authMiddleware, adRoutes);
app.use("/sellers", authMiddleware, sellerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
