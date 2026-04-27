const validateFile = (req, res, next) => {
    console.log("Satpam Aura: Sedang memeriksa file...");

    // 1. Cek apakah file ada
    if (!req.file) {
        console.log("❌ Satpam: Tidak ada file yang diupload!");
        return res.status(400).json({ message: "File gambar wajib diunggah!" });
    }

    console.log("Ukuran file:", req.file.size, "bytes");

    // 2. Mimetype Check (Hanya JPEG dan PNG)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(req.file.mimetype)) {
        console.log("Satpam: Format file tidak didukung!", req.file.mimetype);
        return res.status(400).json({ 
            message: "Format file salah! Hanya diperbolehkan .jpg, .jpeg, atau .png" 
        });
    }

    // 3. Size Limit (Maksimal 2MB)
    const maxSize = 2 * 1024 * 1024; // 2 MegaBytes
    if (req.file.size > maxSize) {
        console.log("Satpam: Ukuran file melebihi batas 2MB!");
        return res.status(400).json({ message: "Ukuran file terlalu besar! Maksimal adalah 2MB" });
    }

    console.log("Satpam: File lolos validasi, lanjut ke proses simpan.");
    next();
};

module.exports = validateFile;