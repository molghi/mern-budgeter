const express = require("express");
const router = express.Router();
const { createBudgeterEntry, getUserEntries } = require("../controllers/budgeterController");

// POST to /entries --> insert new entry
router.post("/entries", createBudgeterEntry);

router.get("/entries", getUserEntries);

module.exports = router;
