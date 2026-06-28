import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:3000/api/register", {
        nama: username,
        email,
        password,
      });
      setSuccess("Akun berhasil dibuat. Silakan login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal melakukan registrasi.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 style={{ color: "#ff69b4", marginBottom: "24px" }}>Daftar Akun</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            className="auth-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nama"
            required
          />
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="auth-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {error && (
            <p style={{ color: "red", fontSize: "13px", margin: 0 }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", fontSize: "13px", margin: 0 }}>
              {success}
            </p>
          )}
          <button
            className="auth-btn"
            type="submit"
            style={{ backgroundColor: "#ff85a2" }}
          >
            Daftar
          </button>
        </form>
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#aaa" }}>
          Sudah punya akun?{" "}
          <Link
            to="/login"
            style={{
              color: "#ff69b4",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
