import React from "react";
import axios from "axios";

const ProductCard = ({ product, onDelete }) => {
  const handleAddToCart = async () => {
    try {
      // Mengambil token autentikasi yang tersimpan di localStorage browser
      const token = localStorage.getItem("token");

      // Mengirim data dengan nama properti productId agar terbaca oleh backend
      await axios.post(
        "http://localhost:3000/api/cart",
        {
          productId: product.id_product,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Produk berhasil ditambahkan ke keranjang");
    } catch (error) {
      console.error(error);
      alert("Gagal masuk keranjang, cek koneksi API");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ffb6c1",
        borderRadius: "8px",
        padding: "1rem",
        background: "#ffffff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
        [Gambar Produk]
      </div>

      <h4
        style={{
          margin: "0 0 0.5rem 0",
          color: "#333333",
          fontSize: "1.2rem",
          textTransform: "capitalize",
        }}
      >
        {product.nama}
      </h4>

      <p
        style={{
          margin: "0 0 0.5rem 0",
          color: "#ff69b4",
          fontWeight: "bold",
        }}
      >
        Rp {Number(product.harga || 0).toLocaleString("id-ID")}
      </p>

      <p
        style={{
          margin: "0 0 0.8rem 0",
          fontSize: "14px",
          color: "#7f8c8d",
        }}
      >
        Sisa Stok: {product.stok} pcs
      </p>

      {/* Tombol Tambahkan ke Keranjang */}
      <button
        onClick={handleAddToCart}
        style={{
          width: "100%",
          backgroundColor: "#ff69b4",
          color: "#ffffff",
          border: "none",
          padding: "0.6rem 0.8rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          marginBottom: "0.5rem",
        }}
      >
        Tambahkan ke Keranjang
      </button>

      {/* Tombol Hapus Snack */}
      <button
        onClick={() => onDelete(product.id_product)}
        style={{
          width: "100%",
          backgroundColor: "#e74c3c",
          color: "#ffffff",
          border: "none",
          padding: "0.6rem 0.8rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Hapus Snack
      </button>
    </div>
  );
};

export default ProductCard;
