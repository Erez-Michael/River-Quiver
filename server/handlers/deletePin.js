const { sendResponse } = require("../utils");

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deletePin = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("RiverQuiver");
    const _id = req.params._id;

    const deletePin = await db
      .collection("pins")
      .deleteOne({ _id: ObjectId(_id) });

    return deletePin.deletedCount !== 0
      ? sendResponse(res, 200, { deletePin }, "Pin deleted")
      : sendResponse(res, 400, "[ ERROR ] Not able to delete Pin");
  } catch (error) {
    sendResponse(res, 400, null, `${error}`);
  } finally {
    await client.close();
  }
};
module.exports = { deletePin };
