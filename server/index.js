const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

//const {getUser} = require("./handlers/getUsers")
const { getPins } = require("./handlers/getPins");
const { getWetsuits } = require("./handlers/getWetsuits");
const { createUser } = require("./handlers/createUser");
const { createPins } = require("./handlers/createPins");
const { createComments } = require("./handlers/createComments");



const port = 8000;

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  // -------------------------------------ENDPOINTS-------------------------------------------
  .get("/getPins", getPins)
  //.get("getUser", getUser)
  .get("/wetsuits", getWetsuits)
  .post("/create-user", createUser)
  .post("/create-pins", createPins)
  .post("/create-comments", createComments)

  // -------------------------------------ENDPOINTS-------------------------------------------

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
