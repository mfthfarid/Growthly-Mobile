// back-end/routes/prediksiRoutes.js
const express = require("express");
const router = express.Router();
const prediksiController = require("../controllers/prediksiController");

// POST /api/predict
router.post("/", prediksiController.predictStatusGizi);

module.exports = router;
