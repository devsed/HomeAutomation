//const mongoose = require("mongoose");
const SmartHomeRoot = require('./smaRoot');
const houseModel = require("../models/home");
const roomModel = require("../models/room");
const userModel = require("../models/user");

class SmartHomeHome extends SmartHomeRoot {
    constructor() {
		super();
        this.model = houseModel;
		this.childModel = roomModel;
    }

	deleteHome(homeId) {
		houseModel.deleteOne({"_id": homeId});
	}

    Save(req,res,next) {
        let home = new this.model({
            name: req.body.name,
			type: req.body.type,
			proxySettings: {
				"username": req.body.serviceUsername,
				"password": req.body.servicePassword
			}
		});
		
		home.save(function(err) {
        	if (err) {
                return res.status(409).json({"message":"home not saved"})
			}
			userModel.findOne({"_id":req.session.userId}, function(err,user) {
				if (err || !user) {
					this.deleteHome(home.homeId);
					return res.status(409).json({"message":"home not saved"})
				}			
				user.homeId = home.id;
				userModel.replaceOne({"_id":req.session.userId}, user, function(err) {
					if (err) {
						this.deleteHome(home.homeId);
						return res.status(409).json({"message":"home not saved"})
					}
					return res.status(200).json({"message":"home saved successfully"});
				});
			});
        });
    }
}

module.exports = SmartHomeHome;
