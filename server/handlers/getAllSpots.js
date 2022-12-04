const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//returns an array of all Items
const getAllSpots = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("RiverQuiver");
    const spots = await db.collection("spots").find().toArray();

    return spots
      ? sendResponse(res, 200, spots, "Successfully retrieved all spots!")
      : sendResponse(res, 404, spots, "Could not find spots!");
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
};

module.exports = {
  getAllSpots,
};
