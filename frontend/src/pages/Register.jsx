import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  // 🌸 TUGAS TIYA: Memecah state menjadi masing-masing (Controlled Component)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("user"); // Tetap default sebagai pembeli biasa

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🌸 SUBMIT HANDLING: Fungsi pas tombol pendaftaran diklik
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validasi singkat biar gak kosong
    if (!username || !email || !password) {
      setError("Semua kolom wajib diisi ya!");
      return;
    }

    try {
      // 🌸 PORT DISESUAIKAN KE 3000 (Mengikuti API Login milik Aura)
      // Mengirimkan state terpisah ke dalam body request API
      const response = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
        role
      });
      
      if (response.data) {
        setSuccess("Akun FullSnack kamu berhasil dibuat! 🎉 Silakan Login.");
        // Reset masing-masing state setelah berhasil daftar
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Gagal register, coba cek API Backend kelompok!");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      backgroundColor: "#fff0f5" // Soft pink matching login page
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
        width: "350px",
        textAlign: "center",
        border: "2px solid #ffe4ec"
      }}>
        <h2 style={{ color: "#ff85a2", marginBottom: "10px" }}>Daftar Akun</h2>
        <p style={{ color: "#777", fontSize: "14px", marginBottom: "20px" }}>Gabung FullSnack buat borong cemilan manis!</p>

        {/* Notifikasi Status */}
        {error && <div style={{ color: "#e74c3c", marginBottom: "15px", fontSize: "14px", fontWeight: "bold" }}>{error}</div>}
        {success && <div style={{ color: "#2ecc71", marginBottom: "15px", fontSize: "14px", fontWeight: "bold" }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* 🌸 TUGAS TIYA: Kolom Nama diikat ke state 'username' dan 'setUsername' */}
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ color: "#ff85a2", fontSize: "14px", fontWeight: "bold" }}>Nama / Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan nama lengkap"
              style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "10px", border: "1px solid #ffb6c1", boxSizing: "border-box" }}
            />
          </div>

          {/* 🌸 TUGAS TIYA: Kolom Email diikat ke state 'email' dan 'setEmail' */}
          <div style={{ marginBottom: "15px", textAlign: "left" }}>
            <label style={{ color: "#ff85a2", fontSize: "14px", fontWeight: "bold" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "10px", border: "1px solid #ffb6c1", boxSizing: "border-box" }}
            />
          </div>

          {/* 🌸 TUGAS TIYA: Kolom Password diikat ke state 'password' dan 'setPassword' */}
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ color: "#ff85a2", fontSize: "14px", fontWeight: "bold" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Buat password rahasia"
              style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "10px", border: "1px solid #ffb6c1", boxSizing: "border-box" }}
            />
          </div>

          {/* Tombol Submit */}
          <button type="submit" style={{
            backgroundColor: "#ff85a2",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "16px",
            fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(255, 133, 162, 0.2)"
          }}>
            Daftar Sekarang
          </button>
        </form>

        <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
          Sudah punya akun?{" "}
          <Link
            to="/login"
            style={{
              color: "#ff85a2",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}