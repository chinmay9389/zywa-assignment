const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  ID: String,
  cardId: String,
  phoneNumber: String,
  timestamp: Date,
  comment: String,
  status: String,
});
const Card = mongoose.model("Card", cardSchema);
module.exports = Card;
