module.exports = async function logOut(req, res) {
  // clear cookie
  res.cookie("token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 0, // expires immediately
    // expires: new Date(0), // expires immediately
    path: "/",
  });

  // return success
  return res.status(200).json({ msg: "User logged out!", name: "", email: "" });
};
