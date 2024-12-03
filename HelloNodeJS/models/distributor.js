const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tao collection distributor = table
const Distributors = new Schema(
  {
    name: { type: String },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("distributor", Distributors);
