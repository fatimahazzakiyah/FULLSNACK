import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post(
        "http://localhost:3000/api/login",
        {
          email,
          password,
        }
      );

      alert("Login berhasil!");

      console.log(res.data);

      onLogin(
        res.data.user || {
          email,
          role: "user",
        }
      );

    } catch (err) {
      console.log("ERROR :", err);

      if (
        err.response &&
        err.response.status === 401
      ) {
        setErrorMessage(
          "Email atau Password salah! ❌"
        );
      } else {
        setErrorMessage(
          err.response?.data?.message ||
          "Terjadi kesalahan sistem."
        );
      }
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "30px",
          border: "2px solid #ffb6c1",
          borderRadius: "15px",
          backgroundColor: "#fff5f7",
        }}
      >
        <h2
          style={{
            color: "#ff69b4",
          }}
        >
          Login FullSnack
        </h2>

        {errorMessage && (
          <div
            style={{
              color: "#721c24",
              backgroundColor: "#f8d7da",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "13px",
            }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "#ffb6c1",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}