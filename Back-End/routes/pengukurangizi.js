const express = require("express");
const router = express.Router();
const pengukuranController = require("../controllers/pengukurangizicontroller");

router.get("/stats", pengukuranController.getGiziStats);
// Tambah pengukuran
router.post("/", pengukuranController.addPengukuran);

// Ambil semua pengukuran
router.get("/", pengukuranController.getPengukuran);

// Ambil per balita
router.get("/balita/:id_balita", pengukuranController.getPengukuranByBalita);

// Update pengukuran
router.put("/:id_gizi", pengukuranController.updatePengukuran);

// Hapus pengukuran
router.delete("/:id_gizi", pengukuranController.deletePengukuran);

module.exports = router;
