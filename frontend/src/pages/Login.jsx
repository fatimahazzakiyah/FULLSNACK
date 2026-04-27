import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const username = e.target.username?.value;

  try {
    if (isRegister) {
      const res = await axios.post("http://localhost:3000/api/register", {
        username,
        email,
        password,
      });

      alert("Register berhasil!");
      console.log(res.data);

      e.target.reset();
      setIsRegister(false);

    } else {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      alert("Login berhasil!");
      console.log(res.data);

      onLogin(res.data.user || { email, role: "user" });
    }
  } catch (err) {
    console.log("ERROR:", err);
    alert("Gagal! cek console");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <div style={{ display: "inline-block", padding: "30px", border: "2px solid #ffb6c1", borderRadius: "15px", backgroundColor: "#fff5f7" }}>
        <h2 style={{ color: "#ff69b4" }}>{isRegister ? "Daftar Akun" : "Masuk Ke FullSnack"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input 
              name="username"
              placeholder="Nama Lengkap" 
              style={{ display: "block", margin: "10px auto", padding: "10px", borderRadius: "8px", border: "1px solid #ddd" }} 
              required
            />
          )}
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