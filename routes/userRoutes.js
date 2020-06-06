const { signup, login } = require("../controllers/authController");
const express = require("express");

const router = express.Router();

router.use("/signup", signup);
router.use("/login", login);

module.exports = router;
