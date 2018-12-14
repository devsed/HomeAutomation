//const mongoose = require("mongoose");

const SmartHomeRoot = require('./smaRoot');

const roomModel = require("../models/room");
const deviceModel = require("../models/device")

class SmartHomeRoom extends SmartHomeRoot {
    constructor() {
        super();
        this.model = roomModel;
        this.childModel = deviceModel;
    }
    _load(item,req) {
        item.parentid = req.body.parentid;
    }
}

module.exports = SmartHomeRoom;
