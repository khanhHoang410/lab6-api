// routes/userRoutes.js
var express = require("express");
var router = express.Router();
const modelUser = require("../models/user");
const JWT = require("jsonwebtoken");
const SECRECT_KEY = "dailk";

// Xử lý POST request đến "/checkLogin"
router.post("/checkLogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await modelUser.findOne({ username, password });

    console.log(user);
    if (user) {
      // Tạo token JWT nếu tìm thấy user
      const token = JWT.sign({ id: user._id }, SECRECT_KEY, {
        expiresIn: "1h",
      });
      const refreshToken = JWT.sign({ id: user._id }, SECRECT_KEY, {
        expiresIn: "1h",
      });
      res.json({
        status: 200,
        message: "Đăng nhập thành công !",
        data: user,
        token: token,
        refreshToken: refreshToken,
      });
    } else {
      res.json({
        status: 200,
        message: "Đăng nhập that bai !",
        data: [],
      });
    }
  } catch (error) {
    // console.error(error);
    // return res.status(500).json({ message: "Server error" });
  }
});

// Export đúng router
module.exports = router;
