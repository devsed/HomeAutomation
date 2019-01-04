//const mongoose = require("mongoose");

const SmartHomeRoot = require('./smaRoot');
const houseModel = require("../models/home");
const roomModel = require("../models/room");
const userModel = require("../models/user");

class SmartHomeHome extends SmartHomeRoot {
    constructor(id) {
        super(id);
        this.model = houseModel;
        this.childModel = roomModel;
    }

	_load(item, req) {
		item.proxySettings = new Object({
			username:req.body.serviceUsername,
			password:req.body.servicePassword
		})
	}
}

module.exports = SmartHomeHome;
