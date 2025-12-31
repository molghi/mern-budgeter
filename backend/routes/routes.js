const express = require("express");
const router = express.Router();
const { createBudgeterEntry, getUserEntries, updateBudgeterEntry, deleteBudgeterEntry, getUserSummary } = require("../controllers/budgeterController");
const { signUp } = require("../controllers/userController");
const auth = require("../middleware/auth");

// POST to /entries --> insert new entry
router.post("/entries", auth, createBudgeterEntry);

// get all user entries
router.get("/entries", auth, getUserEntries);

// update one entry
router.put("/entries", auth, updateBudgeterEntry);

// delete entry
router.delete("/entries/:id", auth, deleteBudgeterEntry);

// get user's totals
router.get("/summary", auth, getUserSummary);

// sign up
router.post("/signup", signUp);

module.exports = router;
