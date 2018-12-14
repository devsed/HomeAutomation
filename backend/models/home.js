const mongoose = require("mongoose");

let Schema = mongoose.Schema({
    name:String,
    //id:String,
    type:Number,
    proxySettings:Object
});

module.exports = mongoose.model("smartHome",Schema);
