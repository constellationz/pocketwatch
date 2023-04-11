// userRoutes.js
// Routes for the users endpoint

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateEmail,
  updatePassword,
  forgotPassword,
  requestEmailVerification,
  verifyEmail,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser);

router.route("/login").post(loginUser);

router.route("/updateEmail").post(protect, updateEmail);

router.route("/updatePassword").post(protect, updatePassword);

router.route("/requestEmailVerification").post(protect, requestEmailVerification);

router.route("/verifyEmail").post(verifyEmail);

router.route("/forgotPassword").post(forgotPassword);

router.route("/me").get(protect, getMe);

module.exports = router;
