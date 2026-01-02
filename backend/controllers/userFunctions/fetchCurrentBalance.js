const userModel = require("../../models/userModel");

module.exports = async function fetchCurrentBalance(req, res) {
  try {
    const foundUser = await userModel.findOne({ _id: req.user.id });
    return res.status(200).json({ msg: "Balance fetched successfully!", balance: foundUser.balance });
  } catch (error) {
    console.error(error);
  }
};
