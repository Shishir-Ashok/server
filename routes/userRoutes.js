const { signup, login } = require("../controllers/authController");
const express = require("express");

const router = express.Router();
router.use((req, res, next) => {
  next();
});
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
