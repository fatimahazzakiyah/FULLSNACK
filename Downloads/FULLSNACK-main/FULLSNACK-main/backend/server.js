const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Tempat simpan data produk sementara (di memori server)
let products = []; 

// 1. API: AMBIL SEMUA PRODUK (Untuk nampilin di tabel)
app.get('/api/products', (req, res) => {
    res.json(products);
});

// 2. API: TAMBAH PRODUK BARU
app.post('/api/products', (req, res) => {
    const { name, price, stock } = req.body;
    const newProduct = { id: Date.now().toString(), name, price, stock };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 3. API: HAPUS PRODUK
app.delete('/api/products/:id', (req, res) => {
    products = products.filter(p => p.id !== req.params.id);
    res.json({ message: "Berhasil dihapus" });
});

// 4. API: EDIT PRODUK
app.put('/api/products/:id', (req, res) => {
    const { name, price, stock } = req.body;
    const index = products.findIndex(p => p.id === req.params.id);
    if (index !== -1) {
        products[index] = { id: req.params.id, name, price, stock };
        res.json(products[index]);
    }
});

// --- JALANKAN SERVER ---
app.listen(5000, () => {
    console.log("Server running on port 5000");
});