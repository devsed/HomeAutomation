const SmartHomeRoot = require('./smaRoot');

const deviceModel = require("../models/device")
const functionModel = require("../models/function");

const fetch = require('node-fetch');

const legalTypes = ["Switch", "Dimmer", "Number", "String", "DateTime"]  // "Color"
const readWriteTypes = 2;

class SmartHomeDevice extends SmartHomeRoot {
    constructor() {
        super();
        this.model = deviceModel;
        this.childModel = functionModel;
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
