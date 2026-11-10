
const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path") ;
const app = express();

const port = process.env.PORT || 8080;

main().then( ()=>{console.log("Mongoose connected")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wander-lust');
}

app.listen(port ,()=>{
    console.log("Server is listening");
});

// *************Routes**************

app.get("/",(req,res)=>{
    res.send("hi i am root")
})

// app.get("/testlisting",async (req,res)=>{
//     let sample = new Listing({
//         title : "My new Villa",
//         discription : "Out new home 300sq feet",
//         price : 19000000,
//         location : "Haryana",
//         country : "india"   ,
//     })

//     await  sample.save();
//     console.log("Success");
//     res.send("Successfully");
// })

app.get("/Listing" , (req,res) => {
    const allListing = Listing.find({});
    res.render("index.ejs" , {allListing});
})