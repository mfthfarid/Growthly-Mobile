const jwt = require("jsonwebtoken");
const { Orangtua } = require("../models");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Payload JWT:", decoded);
    req.user = decoded; // simpan payload JWT ke req.user

    // 🧩 Jika user adalah orangtua, ambil datanya dari DB
    if (decoded.role === "orangtua" && decoded.id_user) {
      const orangtua = await Orangtua.findOne({
        where: { id_user: decoded.id_user },
      });
      if (orangtua) {
        req.Orangtua = orangtua; // biar bisa diakses di controller
      }
    }

    next();
  } catch (err) {
    console.error("Error verifikasi token:", err);
    return res.status(403).json({ message: "Token tidak valid" });
  }
};

module.exports = verifyToken;
