import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController.js";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Save in uploads folder
    },
    filename: function (req, file, cb) {
        // Sanitize file name
        const safeName = file.originalname.replace(/\s+/g, "_");
        cb(null, safeName);
    }
});

// Restrict uploads to only PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files allowed!"), false);
    }
};

const upload = multer({ storage, fileFilter });

// Upload single PDF
router.post("/upload", (req, res, next) => {
    upload.single("file")(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, uploadFile);

export default router;
