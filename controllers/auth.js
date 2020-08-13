const {
  createToken,
  kakaoLoginInfo,
  createUserData,
} = require("../services/auth");
const { errorHandler } = require("../utils/");
const User = require("../models//user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  try {
    const { email, kakaoId } = req.kakaoInfo ? req.kakaoInfo : req.body;

    if (req.kakaoInfo) {
      const user = await User.findOne({ kakaoId });
      if (user) {
        next();
      } else {
        await createUserData(req.kakaoInfo);
        res.status(201).json({ message: "User created" });
      }
    }

    if (!req.kakaoInfo) {
      const user = await User.findOne({ email });
      if (user) errorHandler("email 중복입니다. 다시 입력해주세요.", 404);
      else {
        await createUserData(req.body);
        res.status(201).json({ message: "User created" });
      }
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email = null, password = null, kakaoId = null } = req.kakaoInfo
      ? req.kakaoInfo
      : req.body;

    let user;
    if (req.kakaoInfo) {
      user = await User.findOne({ kakaoId });

      if (!user) errorHandler("Kakao User not found", 404);
    }

    if (!req.kakaoInfo) {
      if (!email || !password) errorHandler("Invalid inputs", 400);

      user = await User.findOne({ email });

      if (!user) errorHandler("User not found", 404);

      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck) errorHandler("Wrong password", 404);
    }

    const token = createToken(user._id);

    res.status(201).json({ message: "WOW", token });
  } catch (err) {
    next(err);
  }
};

const kakao = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    const userInfo = await kakaoLoginInfo(token);
    const {
      id,
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = userInfo;

    const userData = {
      kakaoId: id,
      email,
      id,
      name: nickname,
      password: email + id,
      social: "kakao",
    };
    req.kakaoInfo = userData;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, login, kakao };
