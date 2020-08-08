const { createOrUpdateUser, findUserByEmail } = require("../DAO/user");
const { userWithEncodePassword, createToken } = require("../services/auth");
const { checkPassword, errorHandler } = require("../utils/");

const signUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) errorHandler("email 중복입니다. 다시 입력해주세요.", 400);

    const userData = await userWithEncodePassword(req.body);

    await createOrUpdateUser(userData);

    res.status(201).json({ message: "User created" });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email = null, password = null } = req.body;

    if (!email || !password) errorHandler("Invalid inputs", 400);

    const user = await findUserByEmail(email);

    if (!user) errorHandler("User not found", 404);

    const passwordCheck = await checkPassword(password, user.password);

    if (!passwordCheck) errorHandler("Wrong password", 404);

    const token = createToken(user._id);

    res.status(201).json({ message: "WOW", token });
  } catch (err) {
    next(err);
  }
};

module.exports = { signUp, login };
