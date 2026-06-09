import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Layout({ children, user, onLogout }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav
        style={{
          background: "#ffe4ec",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <b style={{ color: "#ff69b4", fontSize: "20px" }}>
          FullSnack 🍿
        </b>

        <div>
          {user?.role === "user" ? (
            <>
              <Link
                to="/katalog"
                style={{
                  marginRight: "15px",
                  color: "#ff69b4",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Katalog
              </Link>

              <Link
                to="/keranjang"
                style={{
                  marginRight: "15px",
                  color: "#ff69b4",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Keranjang 🛒
              </Link>

              <Link
                to="/riwayat"
                style={{
                  marginRight: "15px",
                  color: "#ff69b4",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Riwayat 📋
              </Link>
            </>
          ) : (
            <span
              style={{
                marginRight: "15px",
                fontWeight: "bold",
                color: "#ff69b4",
              }}
            >
              Dashboard Admin ⚙️
            </span>
          )}

          <button
            onClick={onLogout}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              backgroundColor: "#ff69b4",
              color: "white",
            }}
          >
            Keluar
          </button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;