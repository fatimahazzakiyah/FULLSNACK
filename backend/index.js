const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// DATA SEMENTARA
let products = [
  { id: 1, nama_produk: "Choco Chips", harga: 10000, stok: 10 },
  { id: 2, nama_produk: "Keripik Kentang", harga: 8000, stok: 5 }
];

// GET
app.get("/api/products", (req, res) => {
  res.json(products);
});

// POST (TAMBAH)
app.post("/api/products", (req, res) => {
  const { nama_produk, harga, stok } = req.body;

  const newProduct = {
    id: products.length + 1,
    nama_produk,
    harga,
    stok
  };

  products.push(newProduct);
  res.json({ message: "Produk berhasil ditambahkan" });
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ message: "Produk dihapus" });
});

// UPDATE
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { stok } = req.body;

  products = products.map(p =>
    p.id === id ? { ...p, stok } : p
  );

  res.json({ message: "Produk diupdate" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend FullSnack jalan 🚀");
});