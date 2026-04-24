import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // Logika Role: Jika email mengandung 'admin', masuk sebagai admin
    if (email.includes("admin")) {
      onLogin({ email, role: "admin" });
    } else {
      onLogin({ email, role: "user" });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div style={{ display: "inline-block", padding: "30px", border: "2px solid #ffb6c1", borderRadius: "15px", backgroundColor: "#fff5f7" }}>
        <h2 style={{ color: "#ff69b4" }}>{isRegister ? "Daftar Akun" : "Masuk Ke FullSnack"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && <input placeholder="Nama Lengkap" style={{ display: "block", margin: "10px auto", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} />}
          <input name="email" placeholder="Email" style={{ display: "block", margin: "10px auto", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} required />
          <input name="password" type="password" placeholder="Password" style={{ display: "block", margin: "10px auto", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} required />
          <button type="submit" style={{ backgroundColor: "#ffb6c1", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", width: "100%" }}>
            {isRegister ? "Daftar" : "Masuk"}
          </button>
        </form>
        <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: "pointer", fontSize: "12px", color: "#ff69b4", marginTop: "15px" }}>
          {isRegister ? "Sudah punya akun? Login di sini" : "Belum punya akun? Register di sini"}
        </p>
      </div>
    </div>
  );
}