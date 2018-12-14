const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    name:String,
    //id:String,
    type:Number,
    parentid:String
});

module.exports = mongoose.model("smartHomeRoom",Schema);
