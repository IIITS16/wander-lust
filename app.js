
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

app.set("view engine","ejs");   
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));

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

// Index Route
app.get("/Listing" , async (req,res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs" , {allListing});
})

// Create
app.get("/Listing/new", (req,res) => {
    res.render("listing/newform.ejs");
})

// Show data Route

app.get("/Listing/:id" , async(req,res) => {
    let {id} = req.params;
    let currdata = await Listing.findById(id);
    res.render("listing/show.ejs",{currdata});
})

// Crete request
app.post("/listing" ,async(req,res)=>{
    //let {title,description,image,price,location,country} = req.body;

    let incomingdata = req.body.incdata;
    const newList = new Listing(incomingdata);
    await newList.save()
    res.redirect("/listing")
})