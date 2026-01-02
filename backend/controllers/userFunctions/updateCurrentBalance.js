const mongoose = require("mongoose");
const userModel = require("../../models/userModel");

module.exports = async function updateCurrentBalance(req, res) {
  if (!req.body.currentBalance) {
    return res.status(400).json({ msg: "No balance submitted." });
  }

  // get submitted data
  const newBalance = +req.body.currentBalance;
  if (isNaN(newBalance)) {
    return res.status(400).json({ msg: "New balance must be positive number." });
  }

  // query db to find user
  const foundUser = await userModel.findOne({ _id: req.user.id });

  if (!foundUser) {
    return res.status(400).json({ msg: "User not found." });
  }

  // query db to update balance
  const updatedUser = await userModel.findByIdAndUpdate(
    new mongoose.Types.ObjectId(req.user.id),
    { balance: newBalance },
    { new: true }
  );

  // return res
  return res.status(200).json({ msg: "Balance updated!", balance: updatedUser.balance });
};
