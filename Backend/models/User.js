const mongoose = require("mongoose");
const { emailRegex } = require("../utils/regexUtils");

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true, trim: true },
    lname: { type: String, required: true, trim: true },
    email: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => {
          return emailRegex.test(value);
        },
        message: (props) => {
          return `${props.value} is not a valid email!`;
        },
      },
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verificationToken: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedAt: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
