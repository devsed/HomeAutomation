const SmartHomeRoot = require('./smaRoot');
const homeModel = require("../models/home");
const roomModel = require("../models/room");
const userModel = require("../models/user");
const SmartHomeProxy = require("./smaProxy");

class SmartHomeHome extends SmartHomeRoot {
    constructor() {
		super();
        this.model = homeModel;
		this.childModel = roomModel;
		this.deleteHome = this.deleteHome.bind(this);
		this.saveHome = this.saveHome.bind(this);
    }

	_load(item,req) {
        item.proxySettings = req.body.proxySettings;
	}

	deleteHome(homeId) {
		homeModel.deleteOne({"_id": homeId});
	}

	saveHome(req, res, next) {
        let home = new this.model({
            name: req.body.name,
			type: req.body.type,
			proxySettings: req.body.proxySettings
		});

		home.save(function(err) {
        	if (err) {
                return res.status(409).json({"message":"home not saved"});
			}
			userModel.findOne({"_id":req.session.userId}, function(err,user) {
				if (err || !user) {
					this.deleteHome(home.homeId);
					return res.status(409).json({"message":"home not saved"});
				}			
				user.homeId = home.id;
				userModel.replaceOne({"_id":req.session.userId}, user, function(err) {
					if (err) {
						this.deleteHome(home.homeId);
						return res.status(409).json({"message":"home not saved"});
					}
					return res.status(200).json(home);
				});
			});
        });
	}

	Save(req,res,next) {
		if (req.body.proxySettings.areTested) {
			var origBody = req.body;
			req.body = req.body.proxySettings;
			let smaProxy = new SmartHomeProxy();
			var self = this;
			smaProxy.testConnection(req, res, function(err) {
				if (err) {
					return res.status(409).json({"message":"home not saved"});
				} else {
					req.body = origBody;
					self.saveHome(req, res, next);
				}
			});
		} else {
			this.saveHome(req, res, next);
		}
    }
}

module.exports = SmartHomeHome;
