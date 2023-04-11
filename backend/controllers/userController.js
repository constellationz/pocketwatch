// userController.js
// Controllers for user functionality

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Missing fields");
  }

  // Make sure user doesn't already exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // If the user couldn't be created, throw an error
  if (!user) {
    res.status(400);
    throw new Error("User could not be created");
  }

  res.status(201).json(generateUserLogin(user));
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing fields");
  }

  // If the user doesn't exist or the password is incorrect, throw an error
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid login");
  }

  res.status(200).json(generateUserLogin(user));
});

// @desc    Update email (protected)
// @route   POST /api/users/updateEmail
// @access  Private
const updateEmail = asyncHandler(async (req, res) => {
  const { currPassword, email } = req.body;
  if (!currPassword || !email) {
    res.status(400);
    throw new Error("Missing fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  if (!(await bcrypt.compare(currPassword, req.user.password))) {
    res.status(401);
    throw new Error("Current password incorrect");
  }

  // Save edited user
  req.user.email = email;
  req.user.save().then(savedUser => {
    res.status(200).json(savedUser);
  });
});

// @desc    Update password (protected)
// @route   POST /api/users/updatePassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currPassword, newPassword } = req.body;
  if (!currPassword || !newPassword) {
    res.status(400);
    throw new Error("Missing fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  if (!(await bcrypt.compare(currPassword, req.user.password))) {
    res.status(401);
    throw new Error("Current password incorrect");
  }

  // Save edited user
  req.user.password = newPassword;
  req.user.save().then(savedUser => {
    res.status(200).json(savedUser);
  });
});

// @desc    Forgot password
// @route   POST /api/users/forgotPassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
});

// @desc    Request email verification (protected)
// @route   POST /api/users/requestEmailVerification
// @access  Private
const requestEmailVerification = asyncHandler(async (req, res) => {

});

// @desc    Verify email (public)
// @route   POST /api/users/verifyEmail
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {

});

// @desc    Get user data
// @route   POST /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate a login response for a user
const generateUserLogin = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  }
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateEmail,
  updatePassword,
  forgotPassword,
  requestEmailVerification,
  verifyEmail,
  getMe,
};
