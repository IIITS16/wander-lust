const mongoose = require("mongoose");
const schema = mongoose.Schema


const listingschema = new schema({
    title : {
        type : String,
        required : true
    },
    description :{
        type : String
    },
    image : {
        type : String,

        // check is image null or not given
        default : "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=2048x2048&w=is&k=20&c=yhDN3-AsSRzQWjgRmXIvuMRC1GcNpWdqNzKF7ij8W4k=",

        // check if it is given null
        set : (v) => v ==="" ? "https://media.istockphoto.com/id/104731717/photo/luxury-resort.jpg?s=2048x2048&w=is&k=20&c=yhDN3-AsSRzQWjgRmXIvuMRC1GcNpWdqNzKF7ij8W4k=" : v,
    },
    price :{
        type: Number,
        required : true
    },
    location: {
        type : String,
    },
    country : {
        type : String
    }
    
});

const Listing = mongoose.model("Listing" , listingschema)

module.exports = Listing