import express from "express";
import { upload } from "../middlewares/multer.js";
import { uploadFile } from "../controllers/upload.Controllers.js";

const router = express.Router();

// Route: /upload
router.post("/upload", upload.single("file"), uploadFile);

export default router;
