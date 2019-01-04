const SmartHomeRoot = require('./smaRoot');
const userModel = require("../models/user");

class SmartHomeUser extends SmartHomeRoot {
    constructor() {
        super();
        this.model = userModel;
	}
}

module.exports = SmartHomeUser;