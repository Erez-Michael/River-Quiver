const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Sends pin to MONGOdb when signed in user adds them to secretMap.js ////////////////////

const createPins = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  
  const newPin = req.body; 

  try {
    await client.connect();
    const db = client.db("RiverQuiver");

    // TODO: check that user exists

    const result = await db.collection("pins").insertOne({
      ...newPin,
      createdAt: Date.now(),
    });
    sendResponse(
      res,
      201,
      { ...newPin, _id: result.insertedId },
      "Pin successfully added"
    );
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
};
module.exports = {
  createPins,
};
