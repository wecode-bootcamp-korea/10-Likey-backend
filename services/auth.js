const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv").config();
const axios = require("axios");
const { createOrUpdateUser } = require("../DAO/user");

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
  const token = jwt.sign({ _id: userId.toString() }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const kakaoLoginInfo = async (token) => {
  let userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  userInfo = userInfo.data;

  return userInfo;
};

const createUserData = async (userInput) => {
  const userData = await userWithEncodePassword(userInput);
  return await createOrUpdateUser(userData);
};

module.exports = {
  userWithEncodePassword,
  createToken,
  kakaoLoginInfo,
  createUserData,
};
