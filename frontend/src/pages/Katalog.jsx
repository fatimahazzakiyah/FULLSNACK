import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

export default function Katalog() {
  const [products, setProducts] = useState([]);

  // Ambil data dari database Reree
  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Fungsi Tambah ke Keranjang (Masukin ke dalam sini aja biar rapi)
  const addToCart = (product) => {
    alert(`Berhasil memasukkan ${product.nama} ke keranjang! 🛒`);
    console.log("Data produk:", product);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#ff69b4" }}>Our Snack Collection 🌸</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {products.map((p) => (
          <div key={p.id_product} style={{ border: "2px solid #ffe4ec", padding: "20px", borderRadius: "20px", width: "250px", backgroundColor: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" }}>
            <h3 style={{ color: "#ff69b4" }}>{p.nama}</h3>
            <p style={{ color: "#ffb6c1", fontWeight: "bold" }}>Rp {p.harga}</p>
            <p style={{ fontSize: "12px" }}>Tersedia: {p.stok}</p>
            
            {/* INI YANG PENTING: Tambahkan onClick di bawah ini */}
            <button 
              onClick={() => addToCart(p)} 
              style={{ backgroundColor: "#ffb6c1", color: "white", border: "none", padding: "10px 15px", borderRadius: "10px", cursor: "pointer", width: "100%" }}
            >
              Tambah Ke Keranjang
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}