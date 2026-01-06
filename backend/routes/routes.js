const express = require("express");
const router = express.Router(); // create router

const {
  createBudgeterEntry,
  getUserEntries,
  updateBudgeterEntry,
  deleteBudgeterEntry,
  getUserSummary,
} = require("../controllers/budgeterController");
const {
  signUp,
  logIn,
  logOut,
  updateCurrentBalance,
  fetchCurrentBalance,
  changeUsername,
  getUsername,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const {
  createPlannerEntry,
  getPlannerEntries,
  updatePlannerEntry,
  deletePlannerEntry,
} = require("../controllers/plannerController");

// ============================================================================

// BUDGETER/TRACKER ENTRIES:
// post to /entries --> insert new entry
router.post("/entries", auth, createBudgeterEntry);

// get all user entries for period
router.get("/entries", auth, getUserEntries);

// update one entry
router.put("/entries", auth, updateBudgeterEntry);

// delete one entry
router.delete("/entries/:id", auth, deleteBudgeterEntry);

// get user's totals for Summary block
router.get("/summary", auth, getUserSummary);

//

// USERS ACTIONS:
// sign up
router.post("/signup", signUp);

// log in
router.post("/login", logIn);

// log out
router.get("/logout", auth, logOut);

// change username
router.post("/username", auth, changeUsername);

// get/fetch username
router.get("/username", auth, getUsername);

//

// OTHER ACTIONS:
// update current balance in Planner
router.post("/balance", auth, updateCurrentBalance);

// fetch current balance in Planner
router.get("/balance", auth, fetchCurrentBalance);

// post to /plannerentries --> insert new Planner entry
router.post("/plannerentries", auth, createPlannerEntry);

// get all user's Planner entries
router.get("/plannerentries", auth, getPlannerEntries);

// update one Planner entry
router.patch("/plannerentries", auth, updatePlannerEntry);

// delete one Planner entry
router.delete("/plannerentries", auth, deletePlannerEntry);

// ============================================================================

module.exports = router;
