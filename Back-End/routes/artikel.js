const express = require("express");
const router = express.Router();
const artikelController = require("../controllers/artikelcontroller");

router.get("/stats", artikelController.getArtikelStats);

router.post("/", artikelController.upload, artikelController.addArtikel);

router.get("/", artikelController.getArtikel);
router.get("/:id_artikel", artikelController.getArtikelById);

router.put(
  "/:id_artikel",
  artikelController.upload,
  artikelController.updateArtikel
);

router.delete("/:id_artikel", artikelController.deleteArtikel);

module.exports = router;
