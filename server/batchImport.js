const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const wetsuits = require("./data/wetsuits.json");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async() => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        
        const db = await client.db("RiverQuiver");
        console.log("database connected!");

        console.log(`wetsuits: ${wetsuits.length} items to be inserted to database`);
        const wetsuitInsert = await db.collection("wetsuits").insertMany(wetsuits);

        console.log(wetsuitInsert);

    }catch(err){
        console.log(err);
    } finally {
        client.close();
        console.log("database disconnected!")
    }
}

batchImport();