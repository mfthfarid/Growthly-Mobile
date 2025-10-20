const express = require("express");
const router = express.Router();
const {
  addBalita,
  getBalita,
  updateBalita,
  deleteBalita,
} = require("../controllers/balitacontroller");

// Tambah balita
router.post("/", addBalita);

// Ambil semua balita (opsional filter by id_orangtua)
router.get("/", getBalita);

// Update balita
router.put("/:id_balita", updateBalita);

// Hapus balita
router.delete("/:id_balita", deleteBalita);

module.exports = router;
