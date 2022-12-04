const { sendResponse } = require("../utils");
const cloudinary = require("cloudinary");

require("dotenv").config();
const { CLOUDNAME, CLOUDAPIKEY, CLOUDINARYSECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDNAME,
  api_key: CLOUDAPIKEY,
  api_secret: CLOUDINARYSECRET,
  secure: true,
});

const getAllImages = async (req, res) => {
  try {
    // Get details about the asset
    const images = await cloudinary.v2.api.resources({
      type: "upload",
    });
      console.log(images);
      sendResponse(res, 200, images.resources, "Images exist in account");
      
  }
  catch (error) {
    console.error(error);
    }
    
};

module.exports = {
  getAllImages,
};
