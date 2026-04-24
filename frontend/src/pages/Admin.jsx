import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ nama_produk: "", harga: "", stok: "" });

  // 🌸 STYLE (Pink Pastel Theme)
  const inputStyle = {
    margin: "5px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ffb6c1",
    outline: "none",
  };

  const buttonPrimary = {
    padding: "10px 20px",
    margin: "5px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ffb6c1",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const buttonDanger = {
    ...buttonPrimary,
    backgroundColor: "#ff6b81",
  };

  const buttonUpdate = {
    ...buttonPrimary,
    backgroundColor: "#ffaec9",
  };

  // 1. FUNGSI AMBIL DATA
  const fetchProducts = () => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Gagal ambil data:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. FUNGSI TAMBAH PRODUK
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Kita bungkus datanya agar sesuai dengan kolom database Reree ('nama', bukan 'nama_produk')
    const dataKirim = {
      nama: form.nama_produk, // Mengirim state nama_produk ke kolom 'nama'
      harga: form.harga,
      stok: form.stok
    };

    api.post("/products", dataKirim)
      .then(() => {
        alert("Produk berhasil ditambah!");
        setForm({ nama_produk: "", harga: "", stok: "" }); 
        fetchProducts(); // Refresh tabel
      })
      .catch((err) => {
        console.log(err);
        alert("Gagal tambah produk!");
      });
  };

  // 3. FUNGSI HAPUS PRODUK (PENTING: Menggunakan id_product)
  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus produk ini?")) {
      api.delete(`/products/${id}`)
        .then(() => {
          alert("Produk berhasil dihapus!");
          fetchProducts();
        })
        .catch((err) => alert("Gagal hapus! Periksa koneksi database."));
    }
  };

  // 4. FUNGSI UPDATE STOK
  const handleUpdateStock = (id, stokBaru) => {
    api.put(`/products/${id}`, { stok: Number(stokBaru) })
      .then(() => {
        alert("Stok diperbarui! ✅");
        fetchProducts();
      })
      .catch((err) => alert("Gagal update stok!"));
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#ff69b4", textAlign: "center" }}>Admin Dashboard ⚙️</h1>

      {/* FORM TAMBAH PRODUK */}
      <div style={{ backgroundColor: "#fff5f7", padding: "20px", borderRadius: "15px", marginBottom: "30px" }}>
        <h3 style={{ color: "#ff69b4", marginTop: "0" }}>Tambah Menu Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <input 
            style={inputStyle}
            placeholder="Nama Produk"
            value={form.nama_produk}
            onChange={(e) => setForm({ ...form, nama_produk: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            placeholder="Harga"
            type="number"
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            placeholder="Stok"
            type="number"
            value={form.stok}
            onChange={(e) => setForm({ ...form, stok: e.target.value })}
            required
          />
          <button style={buttonPrimary} type="submit">Tambah Produk</button>
        </form>
      </div>

      {/* TABEL STOK */}
      <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white", borderRadius: "10px", overflow: "hidden" }}>
        <thead style={{ backgroundColor: "#ffe4ec", color: "#ff69b4" }}>
          <tr>
            <th style={{ padding: "15px", textAlign: "left" }}>Nama Produk</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Harga</th>
            <th style={{ padding: "15px", textAlign: "left" }}>Stok</th>
            <th style={{ padding: "15px", textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id_product} style={{ borderBottom: "1px solid #ffe4ec" }}>
              <td style={{ padding: "15px" }}>{p.nama}</td>
              <td style={{ padding: "15px" }}>Rp {p.harga}</td>
              <td style={{ padding: "15px" }}>
                <input
                  type="number"
                  defaultValue={p.stok}
                  onChange={(e) => (p.stok_input = e.target.value)}
                  style={{ width: "60px", padding: "5px", borderRadius: "5px", border: "1px solid #ddd" }}
                />
              </td>
              <td style={{ padding: "15px", textAlign: "center" }}>
                <button
                  style={buttonUpdate}
                  onClick={() => handleUpdateStock(p.id_product, p.stok_input || p.stok)}
                >
                  Update
                </button>
                <button
                  style={buttonDanger}
                  onClick={() => handleDelete(p.id_product)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}