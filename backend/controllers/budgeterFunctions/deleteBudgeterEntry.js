const entryModel = require("../../models/entryModel");

module.exports = async function deleteBudgeterEntry(req, res) {
  const idToDelete = req.params.id;

  try {
    const docExists = await entryModel.findById(idToDelete);

    if (docExists) {
      const response = await entryModel.findByIdAndDelete(idToDelete);
      return res.status(200).json({ msg: "Deletion successful!", document: response });
    } else {
      return res.status(400).json({ msg: "Some error occurred", error });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Some error occurred", error });
  }
};
