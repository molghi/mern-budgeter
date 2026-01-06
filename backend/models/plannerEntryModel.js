const mongoose = require("mongoose");

// Planner Entry model

const plannerEntrySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId, // connecting two tables (1)
      ref: "User", // connecting two tables (2)
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlannerEntry", plannerEntrySchema);
