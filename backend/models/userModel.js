// userModel.js
// Schema for the user resource

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field required"],
    },
    email: {
      type: String,
      required: [true, "Email field required"],
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: [true, "Password field required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
