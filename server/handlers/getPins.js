const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Gets pins of logged in user ////////////////////


const getPins = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    
    try {
      await client.connect();

      const db = client.db("RiverQuiver");
      const pins = await db.collection("pins").find().toArray();

      if (pins.length === 0) {
        sendResponse(res, 404, {}, "Pins have not yet been added by user");
      } else {
        sendResponse(res, 200, pins, "Pins exist in account");
      }
    } catch (err) {
      sendResponse(res, 400, err);
    } finally {
      await client.close();
    }
};

module.exports = {
  getPins
};
