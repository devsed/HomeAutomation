const SmartHomeRoot = require('./smaRoot');

const deviceModel = require("../models/device")
const functionModel = require("../models/function")

class SmartHomeFunction extends SmartHomeRoot {
    constructor() {
        super();
        this.model = functionModel;
        this.childModel = null;
    }
    _load(item,req) {
        item.parentid = req.body.parentid;
        item.functionid = req.body.functionid;
    }
}

module.exports = SmartHomeFunction;
