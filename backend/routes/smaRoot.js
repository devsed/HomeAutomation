

class SmartHomeRoot {
    constructor() {
        //if(name === undefined) name = '';
        this.name = null;
        //this.id = null;
        this.type = -1;
        this.model = null;
        this.childModel = null;
        this.parentId = null;
    }
    Items(req, res, next) {
        this.model.find(function(err,items) {
            if(err || !items) {
                return res.status(404).json({"message":"item not found"});
            }
            res.status(200).json(items)
        })
    }
    _load(item,req) {
    }
    GetOne(req,res,next) {
        let self = this;
        this.model.findOne({"_id":req.params.id}, function(err,item) {
            if(err || !item) {
                return res.status(404).json({"message":"item not found"});
            }
            return res.status(200).json(item);
        })
    }
    ReplaceOne(req,res,next) {
        let item = new this.model({
            name: req.body.name,
            type:req.body.type
        });
        this._load(item,req);
        item._id = req.body.id;
        this.model.replaceOne({"_id":req.body.id}, item, function(err) {
            if(err) {
                console.log(err.message);
                return res.status(404).json({"message":"item not found"});
            }
            return res.status(200).json({"message":"success"});
        });
    }
    GetChildren (req,res,next) {
        if(!this.childModel) {
            return res.status(404).json({"message":"no childModel"});
        }
        this.childModel.find({"parentid":req.params.id}, function(err,items) {
            if(err || !items) {
                return res.status(404).json({"message":"no items"});
            }
            res.status(200).json(items)
        })
    }
    Save(req,res,next) {
        let item = new this.model({
            name: req.body.name,
            //id: req.body.id,
            type:req.body.type
        });
        this._load(item,req);
        item.save(function(err) {
            if(err) {
                return res.status(409).json({"message":"item not saved"})
            }
            //console.log(item._id)    
            return res.status(200).json({"message":"success","id":item.id});
        })
        console.log(item.id);
    }
    Delete(req,res,next) {
        console.log("delete:"+req.params.id);
        this.model.deleteOne({"_id": req.params.id}, function(err) {
            if(err) {
                return res.status(404).json({"message":"not found"});
            }
            return res.status(200).json({"message":"success"})
        })
    }
    DeleteChildren(req,res,next) {
        console.log("deleteChildren:"+req.params.id);
        this.childModel.delete({"parentid":req.params.id}, function(err) {
            if(err) {
                return res.status(404).json({"message":"not found"});
            }
            return res.status(200).json({"message":"success"})
        })
    }
}

module.exports = SmartHomeRoot;
