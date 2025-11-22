import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

// -------------------------
// ✅ CORS — FIXED FOR VERСEL FRONTEND & RENDER BACKEND
// -------------------------
const allowedOrigins = [
  "https://the-lola-store.vercel.app",
  "https://thelolastore.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked: " + origin));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// -------------------------
// EXPRESS MIDDLEWARE
// -------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------------------
// 📁 SERVE UPLOADS FOLDER (STATIC IMAGES)
// -------------------------
app.use("/uploads", express.static("uploads"));

// -------------------------
// API ROUTES
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// -------------------------
// CONNECT DB
// -------------------------
connectDB();

// -------------------------
// DEFAULT ROUTE
// -------------------------
app.get("/", (req, res) => {
  res.send("The Lola Store API is running...");
});

// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
