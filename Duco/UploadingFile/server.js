import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", uploadRoutes);  // now POST /api/upload works

// Error handling (optional)
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export default app;
