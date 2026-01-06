const userModel = require("../../models/userModel");

module.exports = async function getUsername(req, res) {
  try {
    const foundUser = await userModel.findOne({ _id: req.user.id });

    if (!foundUser) {
      return res.status(400).json({ msg: "User not found.", error });
    }

    req.user.name = foundUser.name;

    return res.status(200).json({ msg: "Username fetched!", username: foundUser.name });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "An error occurred.", error });
  }
};
