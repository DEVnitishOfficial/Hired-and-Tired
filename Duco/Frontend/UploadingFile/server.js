import express from "express";
import dotenv from "dotenv";
import "./config/cloudinary.js"; 
import uploadRoutes from './routes/upload.routes.js'


dotenv.config();
const app = express();

console.log('my env', process.env.CLOUDINARY_CLOUD_NAME);
console.log('my env', process.env.CLOUDINARY_API_KEY);
console.log('my env', process.env.CLOUDINARY_API_SECRET);

// Middleware
app.use(express.json());

// Routes
app.use("/api", uploadRoutes);  // now POST /api/upload works

// Error handling (optional)
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(3000, ()=> {
  console.log('server is listening at port 3000')
})

export default app;
