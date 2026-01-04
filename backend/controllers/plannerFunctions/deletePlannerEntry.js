const PlannerEntry = require("../../models/plannerEntryModel");

module.exports = async function deletePlannerEntry(req, res) {
  try {
    const foundDoc = await PlannerEntry.findOne({ _id: req.body.id });

    if (foundDoc) {
      await PlannerEntry.findByIdAndDelete(req.body.id);
      return res.status(200).json({ msg: "Entry deleted!" });
    } else {
      return res.status(400).json({ msg: "Entry not found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Some error occurred", error });
  }
};
