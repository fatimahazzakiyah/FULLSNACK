const jwt = require("jsonwebtoken");
 
const SECRET_KEY = "fullsnack_secret_key";
 
// ✅ MIDDLEWARE 1: verifyToken
// Cek apakah user sudah login (token valid)
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Akses ditolak! Silakan login dulu ❌" });
  }
 
  const token = authHeader.split(" ")[1];
 
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // data user tersimpan di req.user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau sudah expired ❌" });
  }
}
 
// ✅ MIDDLEWARE 2: isAdmin
// Hanya boleh diakses admin
function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses ditolak! Hanya admin yang bisa ❌" });
  }
  next();
}
 
// ✅ MIDDLEWARE 3: isUser
// Hanya boleh diakses user biasa (bukan admin)
function isUser(req, res, next) {
  if (!req.user || req.user.role !== "user") {
    return res.status(403).json({ message: "Akses ditolak! Hanya user yang bisa ❌" });
  }
  next();
}
 
module.exports = { verifyToken, isAdmin, isUser, SECRET_KEY };