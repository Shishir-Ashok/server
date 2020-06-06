const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: [true, "Username already taken"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide with a mail"],
  },
  password: { type: String, required: [true, "Please provide a password"] },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide username"],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
      message: "Passowrd doesn't match",
    },
  },

  forms: { type: Array, default: [] },
  createdAt: { type: Date, default: new Date() },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  passwordToMatch,
  password
) {
  return await bcrypt.compare(passwordToMatch, password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
