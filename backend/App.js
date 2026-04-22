const express = require("express");
const cors = require("cors");
const app = express();
const apiRoutes = require("./routes/api");

app.use(cors()); // Pastikan ini di atas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server FULLSNACK Running on http://localhost:3000 ✅");
});
