const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authcontroller");
const { login } = require("../controllers/authcontroller");
const { lupaPassword } = require("../controllers/authcontroller");

// Endpoint Register
router.post("/register", register);

router.post("/login", login);

router.post("/lupa-password", lupaPassword);

module.exports = router;
