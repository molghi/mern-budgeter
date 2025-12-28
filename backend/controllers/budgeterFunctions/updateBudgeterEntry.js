const entryModel = require("../../models/entryModel");

module.exports = async function updateBudgeterEntry(req, res) {
  const idToUpdate = req.body.id;

  try {
    const docExists = await entryModel.findById(idToUpdate);

    if (docExists) {
      const response = await entryModel.findByIdAndUpdate(
        idToUpdate,
        {
          amount: +req.body.amount,
          category: req.body.category.trim(),
          date: req.body.date.trim(),
          note: req.body.note.trim(),
        },
        { new: true }
      );

      return res.status(200).json({ msg: "Update successful!", document: response });
    } else {
      return res.status(400).json({ msg: "Some error occurred" });
    }
  } catch (error) {
    return res.status(400).json({ msg: "Some error occurred", error });
  }
};
