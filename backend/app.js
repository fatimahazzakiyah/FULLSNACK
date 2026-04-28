require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes/api");

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- STATIC FOLDER (Buat nampilin gambar snack) ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- HUBUNGKAN KE ROUTES ---
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Backend FullSnack Berhasil Jalan! 🌸</h1>");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n✅ Server FULLSNACK Running on http://localhost:${PORT}`);
  console.log(`✅ Cek Keranjang di: http://localhost:${PORT}/api/cart\n`);
});
