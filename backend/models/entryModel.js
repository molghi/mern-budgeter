const mongoose = require("mongoose");

const entrySchema = mongoose.Schema(
  {
    // id is auto-assigned
    userId: {
      type: mongoose.Schema.ObjectId, // linking two tables
      ref: "User",
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
    note: {
      type: String,
      required: false,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", entrySchema);
