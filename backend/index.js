const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/database"); // Koneksi dari file Aura
const upload = require("./middleware/upload"); // Multer
const fileValidation = require("./middleware/fileValidation"); // Validasi Aura

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Biar bisa baca form-data

const PORT = 5000;

// Route untuk tambah produk (Disini Validasi Aura bekerja!)
app.post("/api/products", upload.single("image"), fileValidation, (req, res) => {
  const { nama, harga, stok } = req.body;
  const image = req.file ? req.file.filename : null;

  // Cek apakah data teks dikirim
  if (!nama || !harga || !stok) {
    return res.status(400).json({ message: "Semua kolom (nama, harga, stok) wajib diisi! ❌" });
  }

  const query = "INSERT INTO products (nama, harga, stok, image) VALUES (?, ?, ?, ?)";
  db.query(query, [nama, harga, stok, image], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal masuk database", error: err.message });
    }
    res.status(201).json({ 
      message: "Produk berhasil ditambahkan! ✨", 
      id: result.insertId 
    });
  });
});

// Panggil Routes lain (seperti Auth)
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("<h1>Backend FullSnack Berhasil Jalan!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Coba tes POST ke http://localhost:5000/api/products`);
});