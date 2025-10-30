const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authcontroller");
const { login } = require("../controllers/authcontroller");
const { lupaPassword } = require("../controllers/authcontroller");
const { updateProfile } = require("../controllers/authcontroller");
const { updatePassword } = require("../controllers/authcontroller");

// Endpoint Register
router.post("/register", register);

router.post("/login", login);

router.post("/lupa-password", lupaPassword);

router.put("/updatePassword/:id_user", updatePassword);

router.put("/updateProfile/:id_user", updateProfile);

module.exports = router;
