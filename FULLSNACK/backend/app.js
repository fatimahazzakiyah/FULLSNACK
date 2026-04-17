require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const apiRouter = require("./routes/api");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", apiRouter);

// Listener
app.listen(3000, () => {
  console.log("Server FullSnack running on http://localhost:3000");
});
