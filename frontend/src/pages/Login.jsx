import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        { email, password },
      );
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setErrorMessage("Email atau password salah.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 style={{ color: "#ff69b4", marginBottom: "24px" }}>Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && (
            <p style={{ color: "red", fontSize: "13px", margin: 0 }}>
              {errorMessage}
            </p>
          )}
          <button
            className="auth-btn"
            type="submit"
            style={{ backgroundColor: "#ffb6c1" }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#aaa" }}>
          Belum punya akun?{" "}
          <Link
            to="/register"
            style={{
              color: "#ff69b4",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
