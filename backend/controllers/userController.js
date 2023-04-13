// userController.js
// Controllers for user functionality

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { 
  sendEmail,
  sendEmailIfVerified,
} = require("../util/email");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const clientURL = process.env.CLIENT_URL
const jwtSecret = process.env.JWT_SECRET

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
  const { password, newEmail } = req.body;
  if (!password || !newEmail) {
    res.status(400);
    throw new Error("Missing fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  if (!(await bcrypt.compare(password, req.user.password))) {
    res.status(401);
    throw new Error("Incorrect password");
  }

  if (newEmail == req.user.email) {
    res.status(400);
    throw new Error("New email cannot be the same as old email");
  }

  // Send an email letting the user know that their email was just changed
  sendEmailIfVerified(
    req.user, 
    "Email Updated", 
    {
      name: req.user.name,
    },
    "../templates/emailUpdated.handlebars"
  );

  // Save edited user
  req.user.email = newEmail;
  req.user.emailVerified = false;
  req.user.save().then(savedUser => {
    res.status(200).json(savedUser);
  });
});

// @desc    Update password (protected)
// @route   POST /api/users/updatePassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;
  if (!password || !newPassword) {
    res.status(400);
    throw new Error("Missing fields");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  if (!(await bcrypt.compare(password, req.user.password))) {
    res.status(401);
    throw new Error("Incorrect password");
  }

  if (await bcrypt.compare(newPassword, req.user.password)) {
    res.status(400);
    throw new Error("New password cannot be the same as old password");
  }

  // Send an email letting the user know that their password was just changed
  sendEmailIfVerified(
    req.user, 
    "Password Updated", 
    {
      name: req.user.name,
    },
    "../templates/passwordUpdated.handlebars"
  );

  // Save edited user
  req.user.password = newPassword;
  req.user.save().then(savedUser => {
    res.status(200).json(savedUser);
  });
});

// @desc    Request a password reset
// @route   POST /api/users/requestPasswordReset
// @access  Public
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Missing fields");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email not registered");
  }

  // Generate a passord reset token and email it to the user
  const resetToken = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: "1h",
  });
  const link = `${clientURL}/api/user/resetPassword?token=${resetToken}`;
  sendEmail(
    user.email, 
    "Password Reset Request for Pocketwatch", 
    {
      name: user.name,
      link: link,
    },
    "../templates/resetPassword.handlebars"
  );

  res.sendStatus(200);
});

// @desc    Reset a password
// @route   POST /api/users/resetPassword
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    res.status(400);
    throw new Error("Missing fields");
  }

  // Invalid tokens are bad requests
  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch {
    res.status(400);
    throw new Error("Bad Token");
  }

  // If the token id is malformed, this is a bad request
  if (!ObjectId.isValid(decoded.id)) {
    res.status(400);
    throw new Error("Bad request");
  }

  // If the token email doesn't match the current email, this token is invalid
  const user = await User.findOne({ _id: new ObjectId(decoded.id) });
  if (!user || decoded.email != user.email) {
    res.status(401);
    throw new Error("Not authorized");
  }

  user.password = newPassword
  user.save().then(() => {
    res.sendStatus(200);
  });
});

// @desc    Request email verification (protected)
// @route   POST /api/users/requestEmailVerification
// @access  Private
const requestEmailVerification = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  if (req.user.emailVerified) {
    res.status(400);
    throw new Error("Email already verified");
  }

  // Generate an email verification token and email it to the user
  const verifyToken = jwt.sign({ id: req.user._id, email: req.user.email }, jwtSecret, {
    expiresIn: "1h",
  });
  const link = `${clientURL}/api/user/verifyEmail?token=${verifyToken}`;
  sendEmail(
    req.user.email, 
    "Email Verification Request for Pocketwatch", 
    {
      name: req.user.name,
      link: link,
    },
    "../templates/verifyEmail.handlebars"
  );

  req.user.save().then(() => {
    res.sendStatus(200);
  });
});

// @desc    Verify email (public)
// @route   POST /api/users/verifyEmail
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(400);
    throw new Error("Missing fields");
  }

  // Invalid tokens are bad requests
  let decoded;
  try {
    decoded = jwt.verify(token, jwtSecret);
  } catch {
    res.status(400);
    throw new Error("Bad Token");
  }

  // If the token id is malformed, this is a bad request
  if (!ObjectId.isValid(decoded.id)) {
    res.status(400);
    throw new Error("Bad request");
  }

  // If the token email doesn't match the current email, this token is invalid
  const user = await User.findOne({ _id: new ObjectId(decoded.id) });
  if (!user || decoded.email != user.email) {
    res.status(401);
    throw new Error("Not authorized");
  }

  user.emailVerified = true;
  user.save().then(() => {
    res.sendStatus(200);
  });
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
    token: generateLoginToken(user._id),
  }
}

// Generate JWT for login
const generateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const generatePasswordResetToken = (id, email) => {
};

module.exports = {
  registerUser,
  loginUser,
  updateEmail,
  updatePassword,
  requestPasswordReset,
  resetPassword,
  requestEmailVerification,
  verifyEmail,
  getMe,
};
