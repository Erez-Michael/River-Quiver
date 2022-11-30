const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//returns an array of all WETSUITS
const getWetsuits = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("RiverQuiver");
    const items = await db.collection("wetsuits").find().toArray();

    return items
      ? sendResponse(res, 200, items, "Successfully retrieved all wetsuits!")
      : sendResponse(res, 404, items, "Could not find wetsuits!");
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
};

module.exports = {
  getWetsuits
};
