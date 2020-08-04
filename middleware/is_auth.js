const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecrettoken");
  } catch (err) {
    err.statusCode = 500;
    throw error;
  }

  req.userEmail = decodedToken.email;
  next();
};
