const express = require("express");
const { registerUser } = require("../controllers/user");
const router = express.Router();
router.get("/register", registerUser);

module.exports = router;