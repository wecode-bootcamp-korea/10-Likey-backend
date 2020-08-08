const {
  createToken,
  kakaoLoginInfo,
  createUserData,
} = require("../services/auth");
const { errorGenerator } = require("../utils/");
const User = require("../models//user");
const bcrypt = require("bcryptjs");

const signUp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) errorGenerator("email 중복입니다. 다시 입력해주세요.", 404);

    await createUserData(req.body);

    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email = null, password = null } = req.body;

    if (!email || !password) errorGenerator("Invalid inputs", 400);

    const user = await User.findOne({ email });
    if (!user) errorGenerator("User not found", 404);

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) errorGenerator("Wrong password", 404);

    const token = createToken(user._id);

    res.status(201).json({ message: "WOW", token });
  } catch (err) {
    next(err);
  }
};

const kakaoSignUp = async (req, res, next) => {
  try {
    const { kakaoToken } = req.query;
    const userInfo = await kakaoLoginInfo(kakaoToken);
    const {
      id,
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = userInfo;

    const user = await User.findOne({ kakaoId: id });
    if (user) errorGenerator("회원가입 된 사용자 입니다.", 404);

    const userData = {
      kakaoId: id,
      email,
      name: nickname,
      password: email + id,
    };

    await createUserData(userData);

    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

const kakaoLogin = async (req, res, next) => {
  try {
    const { kakaoToken } = req.query;
    const kakaoUserInfo = await kakaoLoginInfo(kakaoToken);
    const { id } = kakaoUserInfo;

    const user = await User.findOne({ kakaoId: id });
    if (!user) errorGenerator("회원가입 해주세요.", 404);

    const token = createToken(user._id);

    res.status(201).json({ message: "WOW", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, login, kakaoSignUp, kakaoLogin };
