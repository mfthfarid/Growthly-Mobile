// back-end/routes/prediksiRoutes.js
const express = require("express");
const router = express.Router();
const prediksiController = require("../controllers/prediksiController");
const rekomendasiController = require("../controllers/rekomendasiController");

// POST /api/predict
router.post("/", prediksiController.predictStatusGizi);
// POST /api/recommend-food
router.post("/", rekomendasiController.recommendFood);

module.exports = router;
