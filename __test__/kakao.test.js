const {
  connectDatabase,
  disconnectDatabase,
  customAxios,
  createUser,
} = require("./test_utils/index");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv").config();

describe("카카오 API 통합테스", () => {
  const access_token = "0e37pPCb1_YinSf4nTs6miwOpAc4cweeO3xY_AorDSAAAAFz5q2UzA";

  test("회원가입 > 로그인", async () => {
    let res = await customAxios({
      endpoint: "/auth/kakao",
      method: "POST",
      token: access_token,
    });
    if (res.data.message === "User created") {
      res = await customAxios({
        endpoint: "/auth/kakao",
        method: "POST",
        token: access_token,
      });
    }

    expect(res.data).toHaveProperty("token");
    expect(res.status).toBe(201);
  });
});
