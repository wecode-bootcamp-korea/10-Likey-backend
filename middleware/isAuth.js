const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    const decodedToken = jwt.verify(token, "supersecrettoken");

    req.userId = decodedToken._id;
    next();
  } catch (err) {
    err.message = "Not authenticaed";
    err.statsuCode = 401;
    next(err);
  }
};
