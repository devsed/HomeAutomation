const request = require('request');
const homeModel = require('../models/home');

const legalTypes = ["Switch", "Dimmer", "Number", "String", "DateTime"]  // "Color"
const readWriteTypes = 2;

class SmartHomeProxy {

	constructor() {
		this.getProxyUrl = this.getProxyUrl.bind(this);
		this.parseFuncData = this.parseFuncData.bind(this);
	  }
	  
    getProxyUrl(settings) {
        var plen = 0;
        if (settings.user === "" && settings.password === "") {
            return encodeURI(settings.addr)
        }
        if (settings.addr.startsWith("https://"))
            plen = "https://".length;
        else if (settings.addr.startsWith("http://"))
            plen = "http://".length;
        const protocol = settings.addr.substring(0, plen);
        const url = settings.addr.substring(plen);
        const user = encodeURI(settings.user).replace("@", "%40")
        return protocol + user + ":" + encodeURI(settings.password) + "@" + encodeURI(url);
	}

	parseFuncData(data) {
        let ret = [];
        data.forEach(element => {
            let ind = legalTypes.indexOf(element.type);
            if (ind > -1) {
                var cell = {
                    "state": element.state,
                    "type": element.type,
                    "name": element.name,
                    "label": element.label,
                    "controllable": (ind < readWriteTypes)
                }
                ret.push(cell);
            }
        });
        return ret;
    }

	testConnection(req, res, notifyWith) { // headers: { "Accept":"application/json"}
		var testWithHome = typeof notifyWith === "function" && notifyWith.name !== "next";
		
		request.get(this.getProxyUrl(req.body) + "/rest/uuid", { timeout: 2000 }, function(err, resp, body) {
			if (!err) {
				if (resp.statusCode == 200) {
					return testWithHome ? notifyWith(null) : res.status(200).json(body);
				} else {
					return testWithHome ? notifyWith("err") :
						res.status(resp.statusCode).json({ "message": resp.statusMessage });
				}
			} else {
				return testWithHome ? notifyWith("err") : 
					res.status(404).json({ "message": "connection not available" });
			}
		});
	}

	getFunctionTypes(req, res) {
		const endind = (req.params.all == "all" || req.params.all == 1 ) ? legalTypes.length : readWriteTypes;
		let ret = []
		for(let i = 0; i < endind; i++) {
			ret.push(legalTypes[i]);
		}
		return res.status(200).json(ret);
	}

	getFunctions(req, res) {
		var self = this;
		homeModel.findById(req.params.homeid, function (err, home) {
			if (err || !home) {
				return res.status(404).json({ "message": "home not found" });
			}

			request.get(self.getProxyUrl(home.proxySettings) + "/rest/items", function(err, resp, body) {
				if (!err) {
					if (resp.statusCode == 200) {
						let parsed = self.parseFuncData(JSON.parse(body));
						return res.status(200).json(parsed);
					} else {
						return res.status(resp.statusCode).json({ "message": resp.statusMessage });
					}
				} else {
					return res.status(404).json({ "message": "items not found" });
				}
			});
		})
	}
}

module.exports = SmartHomeProxy;