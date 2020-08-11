const express = require("express");
const router = express.Router();
const { signUp, login, kakao } = require("../controllers/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/kakao", kakao, signUp, login);

module.exports = router;
