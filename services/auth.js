const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv").config();

const userWithEncodePassword = async ({ email, password, name, phone }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const userData = new User({
    email,
    password: hashedPassword,
    name,
    phone,
  });
  return userData;
};

const createToken = (userId) => {
  const token = jwt.sign({ _id: userId.toString() }, process.env.SECRET_KEY);
  return token;
};

module.exports = { userWithEncodePassword, createToken };
