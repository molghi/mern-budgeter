const mongoose = require("mongoose");

// Budgeter/Tracker Entry model

const entrySchema = mongoose.Schema(
  {
    // id is auto-assigned
    userId: {
      type: mongoose.Schema.ObjectId, // connecting two tables (1)
      ref: "User", // connecting two tables (2)
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    dateProper: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
