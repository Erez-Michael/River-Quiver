const { sendResponse } = require("../utils");

const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("RiverQuiver");
    const _id = req.params._id;

    const deleteComment = await db.collection("comments").deleteOne({ "_id" : ObjectId(_id) });

    return deleteComment.deletedCount !== 0
      ? sendResponse(res, 200, { deleteComment }, "Comment deleted")
      : sendResponse(res, 400, "[ ERROR ] Not able to delete comment");
  } catch (error) {
    sendResponse(res, 400, null, `${error}`);
  } finally {
    await client.close();
  }
};
module.exports = { deleteComment };
