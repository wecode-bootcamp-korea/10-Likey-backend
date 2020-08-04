const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  createUser,
  findUserByEmail,
  checkPassword,
} = require("../services/auth");

exports.signUp = async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      const error = new Error("email 중복입니다. 다시 입력해주세요.");
      error.statusCode = 404;
      throw error;
    }

    console.log(email, password, name, phone);
    const hashedPassword = await bcrypt.hash(password, 12);
    const userData = new User({
      email,
      password: hashedPassword,
      name,
      phone,
    });
    await createUser(userData);

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      const error = new Error("A user with this email does not exist");
      error.statusCode = 404;
      throw error;
    }

    const passwordCheck = await checkPassword(password, user.password);

    if (!passwordCheck) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "supersecrettoken",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "WOW", token });
  } catch (err) {
    console.error("[error]", err);
    next(err);
  }
};
