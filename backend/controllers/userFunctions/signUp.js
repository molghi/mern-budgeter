const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async function signUp(req, res) {
  // get sent data
  const { email, password, passwordConfirm } = req.body;
  if (!email.trim() || !password.trim() || !passwordConfirm.trim()) {
    return res.status(400).json({ msg: "Request body incomplete. Required: email, password, password confirmation." });
  }

  // validate:
  // -- email is valid and unique email --> handled by Mongoose model validators
  // -- passwords longer than 8 chars
  if (password.trim().length < 8) {
    return res.status(400).json({ msg: "Password not long enough. 8 chars min." });
  }
  // -- passwords match
  if (password !== passwordConfirm) {
    return res.status(400).json({ msg: "Passwords do not match." });
  }
  // -- password has only allowed chars
  if (/[^a-zA-Z0-9!@#$%&*?]/.test(password)) {
    return res.status(400).json({ msg: "Password with disallowed symbols." });
  }

  try {
    // compose object for insertion
    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    const userData = {
      name: email.trim().split("@")[0], // slice name out of email
      email: email.trim(),
      password: hashedPassword, // hash pw
    };

    // db insert: need name,email,password
    const createdUser = await userModel.create(userData);

    // to log in as well, sign jwt and send it thru httpOnly
    const token = jwt.sign(
      {
        id: createdUser._id,
        email: createdUser.email,
        name: createdUser.name,
      },
      process.env.JWT_SECRET, // encrypt w/ secret key
      { expiresIn: "1d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // expires in 1 day
      path: "/",
    });

    // return res
    return res.status(201).json({ msg: "User created!", name: userData.name, email: userData.email });
  } catch (error) {
    console.error("OOPS!", error);
    return res.status(400).json({ msg: "Some error occurred.", error });
  }
};
