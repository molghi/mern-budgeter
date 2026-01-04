const mongoose = require("mongoose");
const PlannerEntry = require("../../models/plannerEntryModel");

module.exports = async function updatePlannerEntry(req, res) {
  // get submitted data
  let { entryId, when, amount, title } = req.body;

  // validate
  // -- entryId must be Mongoose type ObjectId
  if (!mongoose.Types.ObjectId.isValid(entryId)) {
    return res.status(400).json({ msg: "Invalid entry ID." });
  }
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

  // db update & return res
  try {
    const updatedDoc = await PlannerEntry.findByIdAndUpdate(
      entryId,
      {
        date: when.trim(),
        amount: Number(amount),
        title: title.toString().trim(),
      },
      { new: true }
    );
    return res.status(200).json({ msg: "Entry updated!", updatedDoc });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "An error occurred.", error });
  }
};
