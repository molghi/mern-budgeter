const express = require("express");
const router = express.Router();
const {
  createBudgeterEntry,
  getUserEntries,
  updateBudgeterEntry,
  deleteBudgeterEntry,
  getUserSummary,
} = require("../controllers/budgeterController");
const { signUp, logIn, logOut, updateCurrentBalance, fetchCurrentBalance } = require("../controllers/userController");
const auth = require("../middleware/auth");
const { createPlannerEntry, getPlannerEntries } = require("../controllers/plannerController");

// ============================================================================

// ENTRIES
// post to /entries --> insert new entry
router.post("/entries", auth, createBudgeterEntry);

// get all user entries
router.get("/entries", auth, getUserEntries);

// update one entry
router.put("/entries", auth, updateBudgeterEntry);

// delete entry
router.delete("/entries/:id", auth, deleteBudgeterEntry);

// get user's totals
router.get("/summary", auth, getUserSummary);

//

// USERS
// sign up
router.post("/signup", signUp);

// log in
router.post("/login", logIn);

// log out
router.get("/logout", auth, logOut);

//

// ACTIONS
// update current balance
router.post("/balance", auth, updateCurrentBalance);

// fetch current balance
router.get("/balance", auth, fetchCurrentBalance);

// post to /plannerentries --> insert new planner entry
router.post("/plannerentries", auth, createPlannerEntry);

router.get("/plannerentries", auth, getPlannerEntries);

// ============================================================================

module.exports = router;
