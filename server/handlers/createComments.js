const { sendResponse } = require("../utils");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Sends comments to MONGOdb when signed in user adds them to comment section ////////////////////

const createComments = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const newComment = req.body;
  console.log(newComment);

  try {
    await client.connect();
    const db = client.db("RiverQuiver");

    // TODO: check that user exists

    // const user = await db
    //   .collection("comments")
    //   .findOne({ user: newComment.user });
    // if (user) {
    //   const data = await db
    //     .collection("comments")
    //     .updateOne(
    //       { user: newComment.user },
    //       { $push: { comments: { comment: newComment.comments } } }
    //     ); //add .something
    //   console.log(data);

    //   if (!data) {
    //     sendResponse(res, 404, "Failed to add comment");
    //   } else {
    //     sendResponse(
    //       res,
    //       201,
    //       { ...newComment, _id: data.data },
    //       "Comment successfully added"
    //     );
    //   }
    // } else {
    const result = await db.collection("comments").insertOne({
      ...newComment,
      createdAt: Date.now(),
    });
    sendResponse(
      res,
      201,
      { ...newComment, _id: result.insertedId },
      "Comment successfully added"
    );
    //   }
  } catch (err) {
    sendResponse(res, 400, err);
  } finally {
    await client.close();
  }
};

module.exports = {
  createComments,
};
