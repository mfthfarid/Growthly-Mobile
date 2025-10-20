const express = require("express");
const router = express.Router();
const pengukuranController = require("../controllers/pengukurangizicontroller");

// Tambah pengukuran
router.post("/", pengukuranController.addPengukuran);

// Ambil semua pengukuran
router.get("/", pengukuranController.getPengukuran);

// Update pengukuran
router.put("/:id_gizi", pengukuranController.updatePengukuran);

// Hapus pengukuran
router.delete("/:id_gizi", pengukuranController.deletePengukuran);

module.exports = router;
