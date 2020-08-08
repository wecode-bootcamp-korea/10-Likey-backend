const User = require("../models/user");

const createOrUpdateUser = (userData) => {
  return userData.save();
};

const findUserById = (_id) => {
  return User.findOne({ _id });
};

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

module.exports = { createOrUpdateUser, findUserById, findUserByEmail };
