const express = require("express");
const router = express.Router();
const { createBudgeterEntry, getUserEntries, updateBudgeterEntry, deleteBudgeterEntry, getUserSummary } = require("../controllers/budgeterController");

// POST to /entries --> insert new entry
router.post("/entries", createBudgeterEntry);

// get all user entries
router.get("/entries", getUserEntries);

// update one entry
router.put("/entries", updateBudgeterEntry);

// delete entry
router.delete("/entries/:id", deleteBudgeterEntry);

// get user's totals
router.get("/summary", getUserSummary);

module.exports = router;
