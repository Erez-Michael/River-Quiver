const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

//const { getWetsuits } = require("./handlers/getWetsuits");
//const { getRiverData } = require("./handlers/getRiverData");
//const { createUser } = require("./handlers/createUser");

const port = 8000;

express()
  .use(express.json())
  .use(helmet())
  .use(morgan("tiny"))

  /* -------------------------------------ENDPOINTS-------------------------------------------

  .get("/wetsuits", getWetsuits)
  .get(
    "/https://api-iwls.dfo-mpo.gc.ca/api/v1/stations?code=15520",
    getRiverData
  )
  .post("/create-user", createUser)
*/
  // -------------------------------------ENDPOINTS-------------------------------------------

  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
