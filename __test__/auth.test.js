const {
  connectDatabase,
  disconnectDatabase,
  customAxios,
  createUser,
} = require("./test_utils/index");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

describe("회원가입 > 로그인", () => {
  beforeAll(async () => {
    await connectDatabase();
  });
  afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
    await disconnectDatabase();
  });

  const testUser = createUser("test", "1234", "test", "test");

  test("회원가입", async () => {
    const res = await customAxios({
      endpoint: "/auth/signup",
      method: "POST",
      data: testUser,
    });

    let testingUser = testUser;

    const { email, name, phone, password } = testingUser;
    let dbUser = await User.findOne({ email });

    const passwordCheck = await bcrypt.compare(password, dbUser.password);

    testingUser = { email, name, phone };

    dbUser = { email: dbUser.email, name: dbUser.name, phone: dbUser.phone };

    expect(testingUser).toEqual(dbUser);
    expect(passwordCheck).toBeTruthy();
    expect(res.status).toBe(201);
  });

  test("로그인", async () => {
    const { email, password } = testUser;
    const testingUser = { email, password };

    const res = await customAxios({
      endpoint: "/auth/login",
      method: "POST",
      data: testingUser,
    });

    expect(res.data.token).toBeTruthy();
    expect(res.status).toBe(201);
  });
});
