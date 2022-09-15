const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: "first Name is required!",
    },
    lastName: {
      type: String,
      required: "last Name is required!",
    },
    email: {
      type: String,
      // required: "email is required!",
    },
    googleId: {
      type: String,
      required: "googleId is required!",
    },
    displayName: {
      type: String,
      required: true,
      required: "display Name is required!",
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      // required: "Password is required!",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);