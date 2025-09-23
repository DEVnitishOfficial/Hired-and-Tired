
import express from "express";
import dotenv from "dotenv";
import productRoutes from "./product.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Root
app.get("/", (req, res) => {
  res.send("ShopEasy Inventory API is running 🚀");
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
