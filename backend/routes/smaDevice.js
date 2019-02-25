const SmartHomeRoot = require('./smaRoot');

const deviceModel = require("../models/device")
const functionModel = require("../models/function");

class SmartHomeDevice extends SmartHomeRoot {
    constructor() {
        super();
        this.model = deviceModel;
        this.childModel = functionModel;
	}
	
    _load(item, req) {
        item.parentid = req.body.parentid;
	}
	
    GetOne(req, res, next) {
        let self = this;
        this.model.findOne({ "_id": req.params.id }, function (err, item) {
            if (err || !item) {
                return res.status(404).json({ "message": "item not found" });
            }
            // get children (functions) also
            self.childModel.find({ "parentid": item.id }, function (err, items) {
                if (err) {
                    return res.status(404).json({ "message": "err" });
                }
                let funcs = [];
                items.forEach(element => {
                    let newit = {
                        name: element.name,
                        "type": element.type,
                        functionid: element.functionid
                    }
                    funcs.push(newit);
                });
                let itemr = {
                    name: item.name,
                    type: item.type,
                    patentid: item.parentid,
                    "functions": funcs
                }

                return res.status(200).json(itemr)
            })
            //return res.status(200).json(item);
        })
    }
}

module.exports = SmartHomeDevice;
