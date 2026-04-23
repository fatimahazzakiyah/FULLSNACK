import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:3000/api";

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
        </div>
      </nav>
      {page === "katalog" ? <Katalog /> : <Cart />}
    </div>
  );
};

const Katalog = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setProducts(res.data));
  }, []);

  const addToCart = (product) => {
    axios
      .post(`${API}/cart`, { product_id: product.id, quantity: 1 })
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
    axios
      .get(`${API}/cart`)
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetch cart:", err));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const deleteItem = (id) => {
    axios.delete(`${API}/cart/${id}`).then(() => loadCart());
  };

  const handleCheckout = () => {
    if (window.confirm("Yakin ingin checkout semua jajanan ini? ")) {
      axios
        .post(`${API}/checkout`)
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
                    <td className="col-produk">{item.nama_produk}</td>
                    <td className="col-harga">
                      Rp {item.harga?.toLocaleString()}
                    </td>
                    <td className="col-qty">{item.quantity}</td>
                    <td className="col-aksi">
                      <button
                        className="delete-btn"
                        onClick={() => deleteItem(item.cart_id)}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOMBOL CHECKOUT DI SINI */}
          <div className="checkout-section">
            <button
              className="btn-primary checkout-btn"
              onClick={handleCheckout}
            >
              Checkout Sekarang 
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Wah, keranjang kamu masih kosong nih... </p>
          <button
            className="btn-primary"
            style={{ marginTop: "20px" }}
            onClick={() => window.location.reload()}
          >
            Cari Jajanan Yuk!
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
