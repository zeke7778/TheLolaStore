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
// ✅ CORS — FULLY FIXED (Express 5 Safe)
// -------------------------
app.use(
  cors({
    origin: [
      "https://thelolastore.vercel.app",
      "https://the-lola-store.vercel.app",
      "https://the-lola-store-do0o9bkpj-zekes-projects-1fad8d1e.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ❗ Do NOT use: app.options("*") — BREAKS Express 5, causes PathError

app.use(express.json());

// -------------------------
// ✅ SERVE UPLOADS FOLDER FOR IMAGES
// -------------------------
app.use("/uploads", express.static("uploads"));

// -------------------------
// ✅ ROUTES
// -------------------------
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// -------------------------
// ✅ CONNECT DATABASE
// -------------------------
connectDB();

// -------------------------
// TEST ROUTE
// -------------------------
app.get("/", (req, res) => {
  res.send("The Lola Store API is running...");
});

// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
