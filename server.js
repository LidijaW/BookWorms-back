import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/adRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:8081",
    "https://book-worms-frontend.vercel.app",
    "https://book-worms-frontend-git-master-lidijas-projects-91a47c65.vercel.app",
    "https://book-worms-frontend-b7uwa38mw-lidijas-projects-91a47c65.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/bookworms/auth", authRoutes);
app.use("/bookworms/books", bookRoutes);
app.use("/bookworms/ads", adRoutes);
app.use("/bookworms/sellers", sellerRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });
