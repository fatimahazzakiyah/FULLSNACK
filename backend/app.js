require("dotenv").config();
const db = require("./config/database");

const express = require("express");
const cors = require("cors");
const app = express();

const apiRouter = require("./routes/api");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const time = new Date().toLocaleString("id-ID");
  console.log(`[${time}] ${req.method} request ke: ${req.url}`);
  next();
});

// --- ROUTES ---
app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan!" });
});

app.listen(3000, () => {
  console.log("==============================================");
  console.log("Server FullSnack running on http://localhost:3000");
  console.log("Logger Arra aktif - Memantau aktivitas tim...");
  console.log("==============================================");
});
