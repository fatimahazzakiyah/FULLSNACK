import React from "react";

// 🌸 ANGGOTA 3: TIYA - Fitur Hapus Produk dengan API DELETE
// ProductCard menerima fungsi onDelete dari Products.jsx
const ProductCard = ({ product, onDelete }) => {
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
      {/* Tampilan icon dan informasi produk dari komponen ProductCard */}
      <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🍿</div>

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

      {/* Tombol Hapus buatan Tiya - disesuaikan dengan field id_product pada database */}
      <button
        onClick={() => onDelete(product.id_product)}
        style={{
          width: "100%",
          marginTop: "0.5rem",
          backgroundColor: "#e74c3c",
          color: "#ffffff",
          border: "none",
          padding: "0.6rem 0.8rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🗑️ Hapus Snack
      </button>
    </div>
  );
};

export default ProductCard;