const express = require("express");
const router = express.Router();
const makananController = require("../controllers/makanancontroller");

router.get("/stats", makananController.getMakananStats);

// Tambah makanan (dengan foto)
router.post("/", makananController.upload, makananController.addMakanan);

// Ambil semua makanan
router.get("/", makananController.getMakanan);

router.get("/:id_makanan", makananController.getMakananById); //

// Update makanan
router.put(
  "/:id_makanan",
  makananController.upload,
  makananController.updateMakanan
);

// Hapus makanan
router.delete("/:id_makanan", makananController.deleteMakanan);

module.exports = router;
