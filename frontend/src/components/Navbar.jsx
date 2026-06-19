import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {

  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout(); //  Menjalankan fungsi logout bawaan context untuk hapus token
    alert("Kamu berhasil logout dari FullSnack! 🍿");
    navigate("/login"); 
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#fff0f5", // Soft pink tema FullSnack
      borderBottom: "2px solid #ffe4ec"
    }}>
      {/* Logo Toko */}
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#ff85a2" }}>FullSnack 🍿</Link>
      </div>

      {/* Menu Navigasi */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#555", fontWeight: "500" }}>Katalog</Link>
        <Link to="/riwayat" style={{ textDecoration: "none", color: "#555", fontWeight: "500" }}>Riwayat</Link>

        {/* 🌸 TUGAS TIYA: Jika token ada, ganti tombol "Login" menjadi "Logout" dengan onClick={logout} */}
        {token ? (
          
          <button 
            onClick={handleLogoutClick}
            style={{
              backgroundColor: "#ff69b4",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(255, 105, 180, 0.2)"
            }}
          >
            Logout 🚪
          </button>
        ) : (
          // JIKA USER BELUM LOGIN (TOKEN KOSONG)
          <Link 
            to="/login"
            style={{
              backgroundColor: "#ff85a2",
              color: "white",
              padding: "8px 16px",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              boxShadow: "0 2px 5px rgba(255, 133, 162, 0.2)"
            }}
          >
            Login ✨
          </Link>
        )}
      </div>
    </nav>
  );
}