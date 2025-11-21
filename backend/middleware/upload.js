import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// -----------------------------
// CLOUDINARY STORAGE
// -----------------------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "lola-store",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
      transformation: [
        { width: 800, height: 800, crop: "limit" }
      ]
    };
  },
});

// -----------------------------
// MULTER UPLOAD
// -----------------------------
const upload = multer({
  storage,

  limits: { fileSize: 5 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, and WEBP files allowed"));
    }

    cb(null, true);
  },
});

// Debug logs for Render errors
upload._handleFile = ((orig) => (req, file, cb) => {
  orig.call(upload, req, file, (err, info) => {
    if (err) {
      console.error("UPLOAD ERROR:", err);
      return cb(err);
    }
    console.log("UPLOAD SUCCESS:", info);
    cb(null, info);
  });
})(upload._handleFile);

export default upload;
