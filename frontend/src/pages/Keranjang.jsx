import React, { useState } from "react";
import axios from "axios";

export default function Keranjang() {
  // --- INI "BAHAN-BAHAN" YANG TADI ILANG (DEFINISIKAN DI SINI) ---
  const [cartItems, setCartItems] = useState([]); // Buat cartItems & setCartItems
  const [user, setUser] = useState({ id: 1 }); // Buat data user dummy
  const API = "http://localhost:3000/api"; // Buat alamat API
  const setPage = (page) => console.log("Pindah ke halaman", page); // Buat fungsi pindah halaman
  const calculateTotal = () => 0; // Buat fungsi hitung total
  // --------------------------------------------------------------

  const handleCheckout = () => {
  if (cartItems.length === 0) return alert("Keranjang masih kosong!");

  const dataCheckout = {
    user_id: user.id, // ID dari user yang sedang login
    total_harga: calculateTotal(), // Fungsi hitung total belanjaan
    items: cartItems // Daftar barang yang dibeli
  };

  axios.post(`${API}/checkout`, dataCheckout)
    .then(res => {
      alert("Checkout Berhasil! Pesanan kamu sedang diproses. 🌸");
      setCartItems([]); // Kosongkan tampilan keranjang di frontend
      setPage('katalog'); // Balikkan user ke katalog setelah belanja
    })
    .catch(err => alert("Gagal checkout, coba lagi ya!"));
};
import React from "react";

export default function Keranjang() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2 style={{ color: "#ff69b4" }}>Keranjang Belanja Kamu 🛒</h2>
      <p style={{ color: "#888" }}>Yah, keranjang kamu masih kosong nih. Yuk jajan dulu! </p>
      <button style={{ backgroundColor: "#ffb6c1", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", marginTop: "20px" }}>
        Lihat Katalog
      </button>
      <button className="btn-primary" onClick={handleCheckout}>Checkout Sekarang ✨
      </button>
    </div>
  );
}
}