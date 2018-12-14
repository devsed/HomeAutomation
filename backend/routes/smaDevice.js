const SmartHomeRoot = require('./smaRoot');

const deviceModel = require("../models/device")
const functionModel = require("../models/function")

class SmartHomeDevice extends SmartHomeRoot {
    constructor() {
        super();
        this.model = deviceModel;
        this.childModel = functionModel;
    }
    _load(item,req) {
        item.parentid = req.body.parentid;
    }
}

module.exports = SmartHomeDevice;
