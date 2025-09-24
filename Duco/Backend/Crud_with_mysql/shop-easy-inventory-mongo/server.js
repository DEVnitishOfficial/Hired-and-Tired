
import express from "express";
import { connectToDB } from "./config/db.js";
import productRoutes from './routes/routes.Product.js'
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Root
app.get("/", (req, res) => {
  res.send("ShopEasy Inventory API (MongoDB) is running 🚀");
});

app.listen(process.env.PORT, async() => {
    await connectToDB()
    console.log(`server is litening at port ${process.env.PORT}`)
})

