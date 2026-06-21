import React from "react";
import { Link } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>
          Silakan login terlebih dahulu untuk mengakses Dashboard FullSnack
        </h2>

        <Link to="/login">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#ffb6c1",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Login Sekarang
          </button>
        </Link>
      </div>
    );
  }

  return children;
}