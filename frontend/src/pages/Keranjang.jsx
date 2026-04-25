import React, { useState } from "react";
import axios from "axios";

export default function Keranjang() {
  // --- STATE & DATA (Bahan-bahan) ---
  const [cartItems, setCartItems] = useState([]); 
  const [user, setUser] = useState({ id: 1 }); 
  const API = "http://localhost:3000/api"; 

  // Fungsi dummy (supaya tidak error saat diklik)
  const setPage = (page) => console.log("Pindah ke halaman", page);
  const calculateTotal = () => 0;

  // --- FUNGSI CHECKOUT ---
  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Keranjang masih kosong!");

    const dataCheckout = {
      user_id: user.id,
      total_harga: calculateTotal(),
      items: cartItems
    };

    axios.post(`${API}/checkout`, dataCheckout)
      .then(res => {
        alert("Checkout Berhasil! Pesanan kamu sedang diproses. 🌸");
        setCartItems([]); // Kosongkan keranjang
        setPage('katalog'); // Balik ke katalog
      })
      .catch(err => alert("Gagal checkout, coba lagi ya!"));
  };

  // --- TAMPILAN (RETURN) ---
  return (
    <div style={{ padding: "50px", textAlign: "center", backgroundColor: "#fffafb", minHeight: "80vh" }}>
      <h2 style={{ color: "#ff69b4", fontWeight: "bold" }}>Keranjang Belanja Kamu 🛒</h2>
      
      {cartItems.length === 0 ? (
        <div style={{ marginTop: "30px" }}>
          <p style={{ color: "#888" }}>Yah, keranjang kamu masih kosong nih. Yuk jajan dulu!</p>
          <button 
            onClick={() => setPage('katalog')}
            style={{ 
              backgroundColor: "#ffb6c1", 
              color: "white", 
              border: "none", 
              padding: "10px 20px", 
              borderRadius: "8px", 
              marginTop: "20px",
              cursor: "pointer"
            }}
          >
            Lihat Katalog
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {/* Kalau nanti ada isinya, muncul di sini */}
          <button 
            className="btn-primary" 
            onClick={handleCheckout}
            style={{ 
              backgroundColor: "#ff69b4", 
              color: "white", 
              border: "none", 
              padding: "12px 25px", 
              borderRadius: "8px", 
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Checkout Sekarang ✨
          </button>
        </div>
      )}
    </div>
  );
}