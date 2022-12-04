const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Method to get all Comments
const getAllComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const spotId = req.query.spotId;

  try {
    await client.connect();
    const db = client.db("RiverQuiver");

    const comments = await db.collection("comments").find({ spotId }).toArray();

    return comments.length > 0
      ? sendResponse(res, 200, comments, "Data retrieved from database.")
      : sendResponse(res, 404, comments, "Data not found.");
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
};

module.exports = { getAllComments };
