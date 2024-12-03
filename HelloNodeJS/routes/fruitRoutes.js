var express = require("express");
var router = express.Router();
const modelFruit = require("../models/fruit");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource Fruit test");
});

// Add data
router.post("/add", async (req, res) => {
  try {
    const model = new modelFruit(req.body);
    const result = await model.save(); // Them du lieu vao database
    if (result) {
      res.json({
        status: 200,
        message: "Add successful !",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Add default !",
        data: result,
      });
    }
    // res.send(result);
  } catch (error) {
    console.log(error);
  }
});
router.get("/list", async (req, res) => {
  const result = await modelFruit.find().populate("id_distributor");
  try {
    res.send(result);
  } catch (error) {
    console.log(error);
  }
  5 - [];
});

router.get("/getlistbyprice", async (req, res) => {
  try {
    const { start, end } = req.query;

    // Kiểm tra xem có các tham số start và end không
    if (!start || !end) {
      return res.status(400).send("Missing start or end parameters");
    }

    const startPrice = parseFloat(start);
    const endPrice = parseFloat(end);

    // Kiểm tra giá trị hợp lệ của start và end
    if (isNaN(startPrice) || isNaN(endPrice)) {
      return res.status(400).send("Invalid price range");
    }

    const query = { price: { $gte: startPrice, $lte: endPrice } };
    const result = await modelFruit
      .find(query, "name price quantity id_distributor")
      .populate("id_distributor")
      .sort({ quantity: -1 })
      .skip(0)
      .limit(2);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getbyid/:id", async (req, res) => {
  const result = await modelFruit
    .findById(req.params.id)
    .populate("id_distributor");
  try {
    if (result) {
      res.send(result);
    } else {
      res.json({
        status: 400,
        message: "No find ID !",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

router.delete("/delete/:id", async (req, res) => {
  const result = await modelFruit.findByIdAndDelete(req.params.id);
  try {
    if (result) {
      res.json({
        status: 200,
        message: "Delete successful !",
        data: result,
      });
    } else {
      res.json({
        status: 400,
        message: "Xoa that bai !",
        data: [],
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send("Invalid ID format");
    } else {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
});

module.exports = router;
