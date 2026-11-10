// to initialize data in db

const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing  =  require("../models/listing.js");

main().then( ()=>{console.log("Mongoose connected")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wander-lust');
  console.log("Mongo is conected");
}

const initDB = async () => {
    // pahle wala sara data delete kar do
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initalized in DB");
}

async function start() {
    try {
        await main();
        await initDB();
    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.connection.close();
    }
}

start();