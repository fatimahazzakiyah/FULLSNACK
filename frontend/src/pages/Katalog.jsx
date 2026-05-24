import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000/api" });

export default function Katalog({ onDeleteProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addToCart = (product) => {
    console.log("Mencoba kirim data:", product); 

    api
      .post("/cart", {
        id_product: product.id_product,
        quantity: 1,
      })
      .then((res) => {
        console.log("Respon Berhasil:", res.data);
        alert(`Berhasil memasukkan ${product.nama} ke keranjang!`);
      })
      .catch((err) => {
        console.error(
          "Error API:",
          err.response ? err.response.data : err.message,
        );
        alert("Gagal masuk keranjang, cek Console!");
      });
  };
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#ff69b4" }}>Our Snack Collection 🌸</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id_product}
            style={{
              border: "2px solid #ffe4ec",
              padding: "20px",
              borderRadius: "20px",
              width: "250px",
              backgroundColor: "white",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            }}
          >
            {/* 🔥 IMAGE */}
            {p.image ? (
              <img
                src={`http://localhost:3000/uploads/${p.image}`}
                alt={p.nama}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  height: "150px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffe4ec",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  color: "#ff69b4",
                  fontSize: "12px",
                }}
              >
                No Image
              </div>
            )}

            <h3 style={{ color: "#ff69b4" }}>{p.nama}</h3>

            <p style={{ color: "#ffb6c1", fontWeight: "bold" }}>Rp {p.harga}</p>

            <p style={{ fontSize: "12px" }}>Tersedia: {p.stok}</p>

            <button
              onClick={() => addToCart(p)}
              style={{
                backgroundColor: "#ffb6c1",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "10px", 
              }}
            >
              Tambah Ke Keranjang
            </button>

            <button
              onClick={() => onDeleteProduct(p.id_product)}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              🗑️ Hapus Snack
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}