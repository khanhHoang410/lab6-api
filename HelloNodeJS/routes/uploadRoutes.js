var express = require("express");
var router = express.Router();
const Upload = require("../config/upload");

/* GET users listing. */
router.get("/test", function (req, res, next) {
  res.send("respond with a resource upload file");
});

router.get("/mulUpload", Upload.array("images", 5), async (req, res) => {
  try {
    const { files } = req;
    const urlImages = files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    );
    console.log(urlImages);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
