const userModel = require("../../models/userModel");

module.exports = async function changeUsername(req, res) {
  try {
    const foundUser = await userModel.findOne({ _id: req.user.id });

    if (foundUser) {
      const updatedUser = await userModel
        .findByIdAndUpdate(req.user.id, { name: req.body.newUsername }, { new: true })
        .select("-password"); // remove password field from returned query

      req.user.name = req.body.newUsername;

      return res.status(200).json({ msg: "Username updated!", user: updatedUser });
    } else {
      return res.status(400).json({ msg: "User not found." });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "An error occurred.", error });
  }
};
