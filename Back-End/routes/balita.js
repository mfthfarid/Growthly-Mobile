// routes/balita.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware"); // ✅ import middleware

const {
  addBalita,
  getBalita,
  updateBalita,
  deleteBalita,
  getBalitaStats,
  getBalitaByOrangtua,
} = require("../controllers/balitacontroller");

// Gunakan verifyToken di SEMUA route yang butuh autentikasi
router.get("/stats", verifyToken, getBalitaStats);
router.post("/", verifyToken, addBalita);
router.get("/", verifyToken, getBalita);
router.put("/:id_balita", verifyToken, updateBalita);
router.delete("/:id_balita", verifyToken, deleteBalita);
router.get("/mybalita", verifyToken, getBalitaByOrangtua);

module.exports = router;
