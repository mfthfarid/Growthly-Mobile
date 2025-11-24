// back-end/routes/rekomendasiRoutes.js
const express = require("express");
const router = express.Router();
const rekomendasiController = require("../controllers/rekomendasiController");

// POST /api/recommend-food
router.post("/", rekomendasiController.recommendFood);

module.exports = router;
