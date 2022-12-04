const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

//const wetsuits = require("./data/wetsuits.json");
const spots = require("./data/spots.json");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async() => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("RiverQuiver");

        //const wetsuitInsert = await db.collection("wetsuits").insertMany(wetsuits);
        const spotsInsert = await db.collection("spots").insertMany(spots);

        console.log(spotsInsert);

    }catch(err){
        console.log(err);
    } finally {
        client.close();
    }
}

batchImport();