const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Upload = require("../config/upload");

// API thêm người dùng mới
router.post("/add", Upload.single("avatar"), async (req, res) => {
  try {
    const { file } = req;
    const urlImages = `${req.protocol}://${req.get("host")}/uploads/${
      file.filename
    }`;
    const newUser = new User(req.body);
    newUser.avatar = urlImages;
    const result = await newUser.save();
    res.status(200).json({
      status: 200,
      message: "Add successful!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

// API lấy danh sách người dùng
router.get("/list", async (req, res) => {
  try {
    const result = await User.find({});
    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// API lấy người dùng theo ID
router.get("/getbyid/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(400).json({
        status: 400,
        message: "ID not found!",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
      const rs = await result.save();
      res.send(rs);
    } else {
      res.status(400).json({
        status: 400,
        message: "ID not found!",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(400).json({
        status: 200,
        message: "Delete successful !",
        data: result,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Delete default !",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
