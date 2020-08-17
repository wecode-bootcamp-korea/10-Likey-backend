const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { errorGenerator } = require("../utils");

module.exports = async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const { _id } = decodedToken;

    const user = await User.findOne({ _id });
    if (!user) errorGenerator("Not found User", "404");

    req.user = user;
    next();
  } catch (err) {
    err.message = "Not authenticaed";
    err.statsuCode = 401;
    next(err);
  }
};
