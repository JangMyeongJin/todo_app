const express = require("express");
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

// 회원가입
router.post("/", userController.createUser);

// login
router.post("/login", userController.loginUser);

// token 비교
// 미들웨어를 이용해서 다음 호출될 함수를 지정 할 수 있음
router.get("/session", authController.authhenticate, userController.getUser);

module.exports = router;