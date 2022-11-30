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
  console.log(newPin);
  try {
    await client.connect();
    const db = client.db("RiverQuiver");
    const user = await db.collection("pins").findOne({ user: newPin.user });
    if (user) { 
      const data = await db
      .collection("pins")
      .updateOne({ user: newPin.user }, { $push: { pins: { lat: newPin.pins.lat, lng: newPin.pins.lng, time: newPin.pins.time } } }); 
      console.log(data);
      
      if (!data) {
        sendResponse(res, 404, "Failed to add pin");
      } else {
        sendResponse(res, 201, { ...newPin, _id: data.data },
          "Pin successfully added"
          );
        }
    } else {
      const result = await db.collection("pins").insertOne({ user: newPin.user, pins: [{ lat: newPin.lat, lng: newPin.lng, time: newPin.time }] });
      sendResponse(
        res,
        201,
        { ...newPin, _id: result.data },
        "Pin and user successfully added"
      );
      }
      }
  catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
};
module.exports = {
  createPins
};
