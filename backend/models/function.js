const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    name:String,
    funtionid:String,
    type:Number,
    parentid:String
});

module.exports = mongoose.model("smartHomeFunction",Schema);
