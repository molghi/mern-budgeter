const PlannerEntry = require("../../models/plannerEntryModel");

module.exports = async function createPlannerEntry(req, res) {
  // receive data
  let { when, amount, title } = req.body;

  // validate
  // -- when must be real date
  const entryDate = new Date(when.trim());
  if (isNaN(entryDate.getTime()) || entryDate.getFullYear() < 1970) {
    return res.status(400).json({ msg: "Date must be real date and after 1970." });
  }
  // -- amount must be number
  amount = Number(amount);
  if (isNaN(amount)) {
    return res.status(400).json({ msg: "Amount must be number." });
  }
  // -- title must be string, truthy
  title = title.toString().trim();
  if (title.length < 3) {
    return res.status(400).json({ msg: "Title must be string. 3 chars min." });
  }

  // db insert & return res
  try {
    const insertedDoc = await PlannerEntry.create({ userId: req.user.id, date: when.trim(), amount, title });
    return res.status(200).json({ msg: "Planner entry created!", document: insertedDoc });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "There was an error.", error });
  }
};
