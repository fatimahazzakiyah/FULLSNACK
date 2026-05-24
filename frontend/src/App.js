import React, { useState, useEffect } from "react";
feature-fe-productlist
import axios from "axios";

main
import "./App.css";
import Products from "./components/Products";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Katalog from "./pages/Katalog";
import Keranjang from "./pages/Keranjang";
import Riwayat from "./pages/Riwayat";
import Footer from "./components/Footer";

function App() {
feature-fe-productlist
  const [user, setUser] = useState(null); 
  const [activePage, setActivePage] = useState("katalog"); 
  const [products, setProducts] = useState([]);

  // Fungsi untuk ambil data produk dari backend
  const fetchProducts = () => {
    axios.get("http://localhost:3000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Apakah kamu yakin ingin menghapus snack manis ini? 🥺")) {
      try {
        // Mengirim request DELETE ke backend berdasarkan ID produk
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        alert("Snack berhasil dihapus dari database! ✨");
        fetchProducts(); // Refresh list produk
      } catch (error) {
        console.error("Gagal menghapus produk:", error);
        alert("Gagal menghapus produk dari database.");
      }
    }


  // Ambil data user dari localStorage saat pertama kali app dibuka
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [activePage, setActivePage] = useState("katalog");

  // Simpan user ke localStorage setiap login
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
main
  };

  if (!user) {
    return <Login onLogin={(data) => setUser(data)} />;
  }

  return (
    <div>
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
          {user.role === "user" ? (
            <>
              <span
                onClick={() => setActivePage("katalog")}
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                  color: "#ff69b4",
                  fontWeight:
                    activePage === "katalog" ? "bold" : "normal",
                  borderBottom:
                    activePage === "katalog"
                      ? "2px solid #ff69b4"
                      : "none",
                }}
              >
                Katalog
              </span>

              <span
                onClick={() => setActivePage("keranjang")}
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                  color: "#ff69b4",
                  fontWeight:
                    activePage === "keranjang" ? "bold" : "normal",
                  borderBottom:
                    activePage === "keranjang"
                      ? "2px solid #ff69b4"
                      : "none",
                }}
              >
                Keranjang 🛒
              </span>

              <span
                onClick={() => setActivePage("riwayat")}
                style={{
                  marginRight: "15px",
                  cursor: "pointer",
                  color: "#ff69b4",
                  fontWeight:
                    activePage === "riwayat" ? "bold" : "normal",
                  borderBottom:
                    activePage === "riwayat"
                      ? "2px solid #ff69b4"
                      : "none",
                }}
              >
                Riwayat 📋
              </span>
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
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Keluar
          </button>
        </div>
      </nav>

      <div style={{ padding: "20px" }}>
feature-fe-productlist
      {user.role === "admin" ? (
        <Admin /> 
      ) : (
          <>
            {activePage === "katalog" && (
              <Products productsList={products} onDeleteProduct={handleDeleteProduct} />
            )}
            {activePage === "keranjang" && <Keranjang />}
            {activePage === "riwayat" && <Riwayat user={user} />} 
          </>
        )}
    </div>
    <Footer />

        {user.role === "admin" ? (
          <Admin />
        ) : (
          <>
            {activePage === "katalog" && <Katalog />}
            {activePage === "keranjang" && <Keranjang />}
            {activePage === "riwayat" && <Riwayat user={user} />}
          </>
        )}
      </div>

      <Footer />
main
    </div>
  );
}

export default App;