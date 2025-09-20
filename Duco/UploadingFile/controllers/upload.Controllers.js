import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Controller: handles upload logic
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload file from local disk to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      resource_type: "auto",    // auto-detect (image, video, etc.)
    });

    // Cleanup local temp file after upload
    fs.unlinkSync(req.file.path);

    return res.json({
      message: "File uploaded successfully",
      url: result.secure_url, // Cloudinary URL
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ error: "Upload failed" });
  }
};
