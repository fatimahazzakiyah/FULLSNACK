import React from "react";

export default function Keranjang() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2 style={{ color: "#ff69b4" }}>Keranjang Belanja Kamu 🛒</h2>
      <p style={{ color: "#888" }}>Yah, keranjang kamu masih kosong nih. Yuk jajan dulu! </p>
      <button style={{ backgroundColor: "#ffb6c1", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", marginTop: "20px" }}>
        Lihat Katalog
      </button>
    </div>
  );
}