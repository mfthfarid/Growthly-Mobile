// routes/dashboardRoutes.js
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/stats", dashboardController.getDashboardStats);
router.get("/trends", dashboardController.getDashboardTrends);

module.exports = router;
