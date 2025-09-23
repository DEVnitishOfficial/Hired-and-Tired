// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";


console.log('my env>>> API KEY', process.env.CLOUDINARY_API_KEY);
console.log('my env>>> API_SECRET', process.env.CLOUDINARY_API_SECRET);
console.log('my env>>> API CLOUD NAME', process.env.CLOUDINARY_CLOUD_NAME);
// load from .env for security
cloudinary.config({

 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
