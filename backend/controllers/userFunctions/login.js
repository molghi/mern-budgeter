const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async function logIn(req, res) {
  // get submitted data
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(400).json({ msg: "Credentials incomplete: both email and password required." });
  }

  // query db
  try {
    // look if email exists
    const foundUser = await userModel.findOne({ email }); // .find always returns arr -- .findOne conditionally returns boolean

    if (!foundUser) {
      // if email doesn't exist, return error
      return res.status(400).json({ msg: "Invalid credentials." }); // security-wise, printing "Email doesn’t exist" isn't safe
    }

    // if email exists, compare passwords
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordsMatch) {
      // if passwords don't match, return error
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    // if passwords match, sign jwt and return success
    const token = jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
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
    return res.status(200).json({ msg: "User logged in!", name: foundUser.name, email: foundUser.email });
  } catch (error) {
    return res.status(400).json({ msg: "Some error happened", error });
  }
};
