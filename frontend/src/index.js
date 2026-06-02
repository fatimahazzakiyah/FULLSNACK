import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// 1. Import BrowserRouter dari react-router-dom
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 2. Bungkus App dengan BrowserRouter di sini */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
