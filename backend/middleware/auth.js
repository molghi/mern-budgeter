const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  // check user - check that cookie
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ msg: "Not authorized." });
  }

  // verify user, save user to req var
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Not authorized or smt else.", error });
  }
};
