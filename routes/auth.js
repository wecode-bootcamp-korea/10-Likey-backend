const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  kakaoLogin,
  kakaoSignUp,
} = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/kakao/signup", kakaoSignUp);
router.post("/kakao/login", kakaoLogin);
module.exports = router;
