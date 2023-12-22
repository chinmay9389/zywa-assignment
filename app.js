const mongoose = require("mongoose");
const express = require("express");
const executeSequentially = require("./utils/csv-utils");
const Card = require("./models/index");
mongoose
  .connect("mongodb://mongo:27017/zwya")
  .then(() => executeSequentially());

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.post("/get_card_status", async (req, res) => {
  const { phoneNumber, cardId } = req.body;
  try {
    const card = await Card.findOne({ $or: [{ phoneNumber }, { cardId }] });

    if (card) {
      res.json({
        success: true,
        message: "Card status found.",
        data: {
          phoneNumber,
          cardId,
          status: card.status,
          timestamp: card.timestamp,
          comment: card.comment,
        },
      });
    } else {
      res.json({
        success: false,
        message: "Card status not found.",
        data: {
          phoneNumber,
          cardId,
          status: "Unknown",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      data: null,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
