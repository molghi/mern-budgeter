const categories = [
  ["Groceries", "groceries"],
  ["Housing (rent, utilities)", "housing"],
  ["Transportation (fuel, public transport)", "transport"],
  ["Food & Dining", "dining"],
  ["Healthcare & Medical", "medical"],
  ["Entertainment (movies, games, hobbies)", "entertainment"],
  ["Shopping & Apparel", "shopping"],
  ["Education (courses, books, tuition)", "education"],
  ["Subscriptions & Memberships", "subscriptions"],
  ["Travel & Vacation", "travel"],
  ["Personal Care", "personal_care"],
  ["Gifts & Donations", "gifts"],
  ["Electronics & Gadgets", "electronics"],
  ["Misc / Other", "misc_other"],
  ["Income", "income"],
];

// ============================================================================

const createBudgeterEntry = require("./budgeterFunctions/createBudgeterEntry");

const getUserEntries = require("./budgeterFunctions/getUserEntries");

const updateBudgeterEntry = require("./budgeterFunctions/updateBudgeterEntry");

const deleteBudgeterEntry = require("./budgeterFunctions/deleteBudgeterEntry");

const getUserSummary = require("./budgeterFunctions/getUserSummary");

// ============================================================================

module.exports = { createBudgeterEntry, getUserEntries, updateBudgeterEntry, deleteBudgeterEntry, getUserSummary, categories };
