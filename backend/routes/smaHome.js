//const mongoose = require("mongoose");

const SmartHomeRoot = require('./smaRoot');
const houseModel = require("../models/home");
const roomModel = require("../models/room");

class SmartHomeHome extends SmartHomeRoot {
    constructor(id) {
        super(id);
        this.model = houseModel;
        this.childModel = roomModel;
    }
}

module.exports = SmartHomeHome;
