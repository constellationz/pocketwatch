// userModel.js
// Schema for the user resource

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

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
    password: {
      type: String,
      required: [true, "Password field required"],
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch(error) {
    return next(error)
  }
})

module.exports = mongoose.model("User", userSchema);
