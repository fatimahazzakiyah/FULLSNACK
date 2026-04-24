import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Admin from "./pages/Admin";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

const App = () => {
  const [page, setPage] = useState("katalog");

  return (
    <div>
      <nav className="navbar">
        <div className="nav-brand">
          <span>🍿</span> FullSnack
        </div>

        <div className="nav-links">
          <button className="nav-btn" onClick={() => setPage("katalog")}>
            Katalog
          </button>

          <button className="nav-btn" onClick={() => setPage("keranjang")}>
            🛒
          </button>

          <button className="nav-btn" onClick={() => setPage("admin")}>
            Admin
          </button>
        </div>
      </nav>

      {page === "katalog" && <Katalog />}
      {page === "keranjang" && <Cart />}
      {page === "admin" && <Admin />}
    </div>
  );
};

const Katalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("ERROR PRODUCTS:", err));
  }, []);

  const addToCart = (product) => {
    api.post("/cart", { product_id: product.id, quantity: 1 })
      .then((res) => alert(res.data.message))
      .catch(() => alert("Gagal menambah ke keranjang!"));
  };

  return (
    <div className="container">
      <h2 className="section-title">Our Snack Collection 🌸</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <div className="card-content">
              <h3>{p.nama_produk}</h3>
              <p className="price">Rp {p.harga?.toLocaleString()}</p>
              <small className="desc">{p.deskripsi}</small>
            </div>

            <button className="btn-primary" onClick={() => addToCart(p)}>
              Tambah Ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Cart = () => {
  const [items, setItems] = useState([]);

  const loadCart = () => {
    api.get("/cart")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetch cart:", err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const deleteItem = (id) => {
    api.delete(`/cart/${id}`).then(() => loadCart());
  };

  const handleCheckout = () => {
    if (window.confirm("Yakin ingin checkout semua jajanan ini? ")) {
      api.post("/checkout")
        .then((res) => {
          alert(res.data.message);
          loadCart();
        })
        .catch(() => alert("Checkout gagal!"));
    }
  };

  return (
    <div className="container">
      <h2 className="section-title">Keranjang Belanja 🌸</h2>

      {items.length > 0 ? (
        <>
          <div className="table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Qty</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr key={item.cart_id}>
                    <td>{item.nama_produk}</td>
                    <td>Rp {item.harga?.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button onClick={() => deleteItem(item.cart_id)}>
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={handleCheckout}>
            Checkout Sekarang
          </button>
        </>
      ) : (
        <p>Keranjang kosong</p>
      )}
    </div>
  );
};

export default App;