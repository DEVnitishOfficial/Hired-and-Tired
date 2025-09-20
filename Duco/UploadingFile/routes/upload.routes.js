import express from "express";
import upload from "../middlewares/multer.js"; // Multer middleware
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

// Route: /upload
router.post("/upload", upload.single("file"), uploadFile);

export default router;
