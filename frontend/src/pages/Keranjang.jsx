import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Keranjang() {
  const [cartItems, setCartItems] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [totalBayar, setTotalBayar] = useState(0);
  const API = "http://localhost:3000/api";

  const fetchCart = () => {
    axios
      .get(`${API}/cart`)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.harga * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return alert("Keranjang masih kosong!");
    }

    const total = calculateTotal();

    const dataCheckout = {
      id_user: 1,
      total_harga: total,
      alamat: "Alamat Arra",
    };

    axios
      .post(`${API}/cart/checkout`, dataCheckout)
      .then(() => {
        setTotalBayar(total);
        setIsSuccess(true);
        setCartItems([]);
      })
      .catch(() => alert("Gagal checkout!"));
  };

  // TAMPILAN JIKA CHECKOUT BERHASIL
  if (isSuccess) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center",
          backgroundColor: "#fffafb",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "20px",
            display: "inline-block",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            border: "2px solid #ff69b4",
          }}
        >
          <h1 style={{ color: "#ff69b4" }}>
            Pesanan Berhasil Dibuat!
          </h1>

          <p style={{ fontSize: "18px", color: "#555" }}>
            Mohon siapkan uang tunai sebesar:
          </p>

          <h2
            style={{
              fontSize: "32px",
              color: "#333",
              margin: "20px 0",
            }}
          >
            Rp {totalBayar.toLocaleString("id-ID")}
          </h2>

          <p style={{ color: "#888" }}>
            Snack kamu akan segera diproses oleh tim kami.
          </p>

          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: "#ffb6c1",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Kembali Belanja
          </button>
        </div>
      </div>
    );
  }

  // HALAMAN KERANJANG
  return (
    <div
      style={{
        padding: "50px",
        textAlign: "center",
        backgroundColor: "#fffafb",
      }}
    >
      <h2
        style={{
          color: "#ff69b4",
          fontWeight: "bold",
        }}
      >
        Keranjang Belanja Kamu
      </h2>

      {cartItems.length === 0 ? (
        <p
          style={{
            color: "#888",
            marginTop: "30px",
          }}
        >
          Yah, keranjang kosong. Yuk jajan!
        </p>
      ) : (
        <div
          style={{
            marginTop: "30px",
            maxWidth: "600px",
            margin: "30px auto",
          }}
        >
          {cartItems.map((item) => (
            <div
              key={item.id_cart}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>
                {item.nama} (x{item.quantity})
              </span>

              <span>
                Rp{" "}
                {(item.harga * item.quantity).toLocaleString(
                  "id-ID"
                )}
              </span>
            </div>
          ))}

          <h3
            style={{
              textAlign: "right",
              color: "#ff69b4",
              marginTop: "20px",
            }}
          >
            Total: Rp {calculateTotal().toLocaleString("id-ID")}
          </h3>

          <button
            onClick={handleCheckout}
            style={{
              backgroundColor: "#ff69b4",
              color: "white",
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Checkout Sekarang
          </button>
        </div>
      )}
    </div>
  );
}
