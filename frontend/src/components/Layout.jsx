import React from "react";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main style={{ flex: 1, padding: "20px" }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;