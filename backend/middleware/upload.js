const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Fungsi filter untuk memastikan hanya file gambar
const fileFilter = (req, file, cb) => {
  console.log("=== FILE INFO ===");
  console.log("originalname:", file.originalname);
  console.log("mimetype:", file.mimetype);
  
  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  console.log("ext:", ext);
  
  const allowedExtensions = ['jpg', 'jpeg', 'png'];

  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Format file salah! Hanya diperbolehkan .jpg, .jpeg, atau .png`), false);
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Batasi 2MB
  fileFilter
 });

module.exports = upload;