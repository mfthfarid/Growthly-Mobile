const express = require("express");
const router = express.Router();
const orangtuaController = require("../controllers/orangtuacontroller");

// CRUD Orangtua
router.get("/stats", orangtuaController.getOrangtuaStats);
router.post("/", orangtuaController.addOrangtua);
router.get("/", orangtuaController.getOrangtua);
router.get("/:id_orangtua", orangtuaController.getOrangtuaById);
router.put("/:id_orangtua", orangtuaController.updateOrangtua);
router.delete("/:id_orangtua", orangtuaController.deleteOrangtua);

module.exports = router;
