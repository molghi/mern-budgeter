const entryModel = require("../../models/entryModel");

module.exports = async function getUserEntries(req, res) {
  try {
    const response = await entryModel.find();
    return res.status(200).json({ msg: "Returning user entries", documents: response });
  } catch (error) {
    console.error("OOPS!", error);
    return res.status(400).json({ msg: "Some error occurred", error });
  }
};
