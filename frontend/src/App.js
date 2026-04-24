import React, { useState } from "react";
import "./App.css";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Katalog from "./pages/Katalog";
import Keranjang from "./pages/Keranjang";

function App() {
  const [user, setUser] = useState(null); 
  const [activePage, setActivePage] = useState("katalog"); 

  if (!user) {
    return <Login onLogin={(data) => setUser(data)} />;
  }

  return (
    <div>
      <nav style={{ background: "#ffe4ec", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b style={{ color: "#ff69b4", fontSize: "20px" }}>FullSnack 🍿</b>
        <div>
          {user.role === "user" ? (
            <>
              <span 
                onClick={() => setActivePage("katalog")} 
                style={{ 
                  marginRight: "15px", 
                  cursor: "pointer", 
                  color: "#ff69b4",
                  fontWeight: activePage === "katalog" ? "bold" : "normal",
                  borderBottom: activePage === "katalog" ? "2px solid #ff69b4" : "none"
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
                  fontWeight: activePage === "keranjang" ? "bold" : "normal",
                  borderBottom: activePage === "keranjang" ? "2px solid #ff69b4" : "none"
                }}
              >
                Keranjang 🛒
              </span>
            </>
          ) : (
            <span style={{ marginRight: "15px", fontWeight: "bold", color: "#ff69b4" }}>Dashboard Admin ⚙️</span>
          )}
          <button onClick={() => setUser(null)} style={{ cursor: "pointer" }}>Keluar</button>
        </div>
      </nav>

      <div style={{ padding: "20px" }}>
        {user.role === "admin" ? (
          <Admin /> 
        ) : (
          activePage === "katalog" ? <Katalog /> : <Keranjang />
        )}
      </div>
    </div>
  );
}

export default App;