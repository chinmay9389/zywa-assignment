const path = require("path");
const csv = require("csv-parser");
const fs = require("fs");
const Card = require("../models/index");
const convertStringToDate = require("./date-utils");

const loadCSVData = async (file, status) => {
  const dataFolderPath = path.join(__dirname, "..", "data");
  const filePath = path.join(dataFolderPath, file);

  const cards = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const cardData = {
          ID: data.hasOwnProperty("ID") ? data["ID"] : data["ID "],
          cardId: data["Card ID"],
          phoneNumber: data.hasOwnProperty("User Mobile")
            ? data["User Mobile"]?.replace(/"/g, "")
            : data["User contact"]?.replace(/"/g, ""),
          timestamp: convertStringToDate(data.Timestamp),
          comment: data.hasOwnProperty("Comment") ? data["Comment"] : "",
          status: status || "",
        };
        cards.push(cardData);
      })
      .on("end", () => {
        resolve();
      })
      .on("error", (error) => {
        reject(error);
      });
  });

  for (const cardData of cards) {
    const existingCard = await Card.findOne({
      $or: [{ phoneNumber: cardData.phoneNumber }, { cardId: cardData.cardId }],
    });

    if (existingCard) {
      existingCard.phoneNumber = cardData.phoneNumber;
      existingCard.timestamp = cardData.timestamp;
      existingCard.comment = cardData.comment;
      existingCard.status = cardData.status;

      await existingCard.save();
    } else {
      const newCard = new Card(cardData);
      await newCard.save();
    }
  }

  console.log(`${file} data loaded into MongoDB.`);
};
const executeSequentially = async () => {
  try {
    await loadCSVData("Sample Card Status Info - Pickup.csv", "pickup");
    await loadCSVData(
      "Sample Card Status Info - Delivery exceptions.csv",
      "deliveryExceptions"
    );
    await loadCSVData("Sample Card Status Info - Delivered.csv", "delivered");
    await loadCSVData("Sample Card Status Info - Returned.csv", "returned");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Schedule the next execution after 24 hours
    setTimeout(executeSequentially, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
  }
};
module.exports = executeSequentially;
