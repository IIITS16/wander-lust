
const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path") ;
const { count } = require("console");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const app = express();

const port = process.env.PORT || 8080;


main().then( ()=>{console.log("Mongoose connected")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wander-lust');
}

app.set("view engine","ejs");   
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method')); 
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs',ejsMate);

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

// edit route 

app.get("/listing/edit/:id",async (req,res)=>{
    let {id} = req.params;
    let nlisting = await Listing.findById(id);

    if(!nlisting){
        return res.status(404).send("Data not found");
    }
    res.render("listing/edit.ejs", { nlisting });

});

app.put("/listing/edit/:id" ,   async(req,res)=>{
    
    try{
        let {id} = req.params;
        let {title , description , price , location , country} = req.body;

        //const updatedata = await Listing.findByIdAndUpdate(id,{title : title},{description : description} , {price : price} , {location : location} , {country : country} ,  { new: true, runValidators: true });

          const updatedata = await Listing.findByIdAndUpdate(
            id,
            { title, description, price, location, country }, // Combined into one object
            { new: true, runValidators: true }
        );


        console.log("Updated Listing:", updatedata);
        res.redirect("/listing");

    }catch (err) {
        console.log("Error updating Listing:", err);
        res.redirect("/listing");
    }
})

app.delete("/listing/:id",async(req,res)=>{
    try{
        let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    console.log("Deleted Successfully");}
    catch(e){
         console.log("Error deleting chat:", e);
    }
    res.redirect("/listing");
})