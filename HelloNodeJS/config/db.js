const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const atlat =
  "mongodb+srv://lekhadai2005:56WmF3BrniJW5RKQ@cluster0.iidcb.mongodb.net/myDB?retryWrites=true&w=majority&appName=Cluster0";
const connect = async () => {
  try {
    await mongoose.connect(atlat, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect success !");
  } catch (error) {
    console.log("Connect fail !");
    console.log(error);
  }
};
module.exports = { connect };
