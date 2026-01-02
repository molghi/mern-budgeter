const mongoose = require("mongoose");

// create schema blueprint
const userModel = mongoose.Schema(
  {
    // id is auto-assigned
    name: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"], // check that submitted email is valid email
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

// export and instantiate model
module.exports = mongoose.model("User", userModel);
