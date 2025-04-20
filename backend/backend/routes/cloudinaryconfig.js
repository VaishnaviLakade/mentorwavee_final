// cloudinaryUpload.js (in your Express backend)

const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials (preferably using environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "chat", // optional if you're using presets
    });
    res.json({ url: uploadedResponse.secure_url });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
