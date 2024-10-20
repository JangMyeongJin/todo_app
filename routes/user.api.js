const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

// 회원가입
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

module.exports = router;