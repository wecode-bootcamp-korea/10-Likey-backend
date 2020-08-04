const User = require("../models/user");
const bcrypt = require("bcryptjs");

async function createUser(userData) {
  return userData.save();
}

async function findUserByEmail(email) {
  return User.findOne({ email });
}

async function checkPassword(userData, password) {
  return bcrypt.compare(userData, password);
}

module.exports = { createUser, findUserByEmail, checkPassword };
