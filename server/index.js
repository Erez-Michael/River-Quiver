const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

// GET //
const { getPins } = require("./handlers/getPins");
const {getAllSpots}= require("./handlers/getAllSpots");
const {getAllComments}= require("./handlers/getAllComments");
const { getWetsuits } = require("./handlers/getWetsuits");
const { getUserById } = require("./handlers/getUserById");
const { getAllImages} = require("./handlers/getAllImages");
// POST //
const { createUser } = require("./handlers/createUser");
const { createPins } = require("./handlers/createPins");
const { createComments } = require("./handlers/createComments");
// DELETE //
const { deletePin } = require("./handlers/deletePin");
const {deleteComment}= require("./handlers/deleteComment");


const port = 8000;

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  // ------------------------------------- \\ ENDPOINTS // ------------------------------------------- //
  //
  .get("/getPins", getPins)
  .get("getUser/:_id", getUserById)
  .get("/getAllSpots", getAllSpots)
  .get("/getAllComments", getAllComments)
  .get("/wetsuits", getWetsuits)
  .get("/getAllImages", getAllImages)
  //
  .post("/createUser", createUser)
  .post("/createPins", createPins)
  .post("/createComments", createComments)
  //
  .delete("/deletePin/:_id", deletePin)
  .delete("/deleteComment/:_id", deleteComment)
  // ------------------------------------- // ENDPOINTS \\ ------------------------------------------- //

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
