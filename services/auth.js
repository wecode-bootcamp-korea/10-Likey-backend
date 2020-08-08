const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv").config();
const axios = require("axios");

const userWithEncodePassword = async ({
  kakaoId,
  email,
  password,
  name,
  phone,
}) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const userData = new User({
    kakaoId,
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

const kakaoLoginInfo = async (kakaoToken) => {
  const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
    },
  });

  return data;
};

const createUserData = async (userInput) => {
  const userData = await userWithEncodePassword(userInput);
  return userData.save();
};

module.exports = {
  userWithEncodePassword,
  createToken,
  kakaoLoginInfo,
  createUserData,
};
