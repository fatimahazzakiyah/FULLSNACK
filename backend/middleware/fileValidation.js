const validateFile = (req, res, next) => {
    console.log("Aura: Sedang memeriksa file...");

    if (!req.file) {
        return res.status(400).json({ message: "File gambar wajib diunggah!" });
    }

    console.log("Ukuran file:", req.file.size, "bytes");

    // Size Limit saja, validasi format sudah di upload.js
    const maxSize = 2 * 1024 * 1024;
    if (req.file.size > maxSize) {
        return res.status(400).json({ message: "Ukuran file terlalu besar! Maksimal adalah 2MB" });
    }

    console.log("Satpam: File lolos validasi!");
    next();
};

module.exports = validateFile;