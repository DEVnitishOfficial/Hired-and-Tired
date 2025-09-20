import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");
// process.cwd ---> returns project root folder from where server.js file is running

// ensure uploads dir exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// recursive ---> if the root folder not exist then it will create that as well

const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".mp4", ".mp3"]);

// Disk storage with unique filenames and sanitized extension
const storage = multer.diskStorage({
    // cb(error, filePath)
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = allowedExt.has(ext) ? ext : ".bin"; // fallback
    cb(null, `${uuidv4()}${safeExt}`);
    // cb(error, filename)
  },
});

// fileFilter checks extension (case-insensitive). For stronger validation,
// check file signature after upload or use memoryStorage + file-type.
function fileFilter(_req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExt.has(ext)) {
    return cb(new Error(`Unsupported file type ${ext}`), false);
  }
  cb(null, true);
  //cb(error, acceptFile(it accept boolean either true or false) )
}

export const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 209,715,200 bytes
  fileFilter,
});

// the above given options accept multer it's defined the officail npm package see below for ref:

//     Key	                   Description
// dest or storage	       Where to store the files
// fileFilter	           Function to control which files are accepted
// limits	               Limits of the uploaded data
// preservePath	           Keep the full path of files instead of just the base name






// 🔍 How Multer Works (with diskStorage)

// In your current setup, Multer saves the uploaded file to the server’s filesystem (/uploads folder).

// After saving, Multer adds extra info about the file into req.file.

// Example of req.file (with disk storage):


// {
//   "fieldname": "file",
//   "originalname": "mypic.png",
//   "encoding": "7bit",
//   "mimetype": "image/png",
//   "destination": "uploads/",
//   "filename": "8a7b1a2e-23c3-48aa-b914-ef44d7779f6d.png",
//   "path": "uploads/8a7b1a2e-23c3-48aa-b914-ef44d7779f6d.png",
//   "size": 34567
// }

// Notice:
// 👉 req.file.path is the absolute/relative path to the actual file on disk.
