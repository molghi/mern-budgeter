const PlannerEntry = require("../../models/plannerEntryModel");

module.exports = async function getPlannerEntries(req, res) {
  const entries = await PlannerEntry.find({ userId: req.user.id });

  return res.status(200).json({ msg: "Planner entries returned", documents: entries });
};
