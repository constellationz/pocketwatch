// userRoutes.js
// Routes for the users endpoint

const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(protect, getMe);

module.exports = router;
