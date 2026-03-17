const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  category: String,
  name: String,
  price: Number,
  type: String,
  image: String,
  iceType: String,
  drinkType: String,
});

module.exports = mongoose.model("Food", foodSchema);
