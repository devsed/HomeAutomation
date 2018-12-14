const express = require("express");
//const mongoose = require("mongoose");

const SmartHomeHome = require('./smaHome');
const SmartHomeRoom = require('./smaRoom');
const SmartHomeDevice = require('./smaDevice');
const SmartHomeFunction = require('./smaFunction');

var smaHome = new SmartHomeHome();
var smaRoom = new SmartHomeRoom();
var smaDevice = new SmartHomeDevice();
var smaFunction = new SmartHomeFunction();

let router = express.Router();

// Get all Homes
router.get("/homes", smaHome.Items.bind(smaHome))
// Save a Home
router.post("/homes", smaHome.Save.bind(smaHome));
// Get one Home
router.get("/home/:id", smaHome.GetOne.bind(smaHome));
// Replace (update) a Home
router.put("/home/", smaHome.ReplaceOne.bind(smaHome));
// Delete a Home
router.delete("/home/:id", smaHome.Delete.bind(smaHome));

// Get children of a Home, i.e. Rooms in that Home
router.get("/rooms/:id", smaHome.GetChildren.bind(smaHome));
// Delete children of a Home, i.e. Rooms
router.delete("/rooms/:id", smaHome.DeleteChildren.bind(smaHome));

// Get all Rooms
router.get("/rooms", smaRoom.Items.bind(smaRoom));
// Save a Room
router.post("/rooms", smaRoom.Save.bind(smaRoom));
// Get one Room
router.get("/room/:id", smaRoom.GetOne.bind(smaRoom));
// Replace (update) a Room
router.put("/room/", smaRoom.ReplaceOne.bind(smaRoom));

// Get children of a Room, i.e. Devices in that Room
router.get("/devices/:id", smaRoom.GetChildren.bind(smaRoom));
// Delete children of a Room, i.e. Devices in that Room
router.delete("/devices/:id", smaRoom.DeleteChildren.bind(smaRoom));

// Save a Device
router.post("/devices", smaDevice.Save.bind(smaDevice));
// Get one Device
router.get("/device/:id", smaDevice.GetOne.bind(smaDevice));
// Replace a Device
router.put("/device/", smaDevice.ReplaceOne.bind(smaDevice));

// Get children of a Device, i.e. Functions of that Device
router.get("/functions/:id", smaDevice.GetChildren.bind(smaDevice));
// Delete children of a Device, i.e. Functions on that Device
router.delete("/functions/:id", smaDevice.DeleteChildren.bind(smaDevice));

// Save a Function
router.post("/functions", smaFunction.Save.bind(smaFunction));
// Get one Function
router.get("/functions/:id", smaFunction.GetOne.bind(smaFunction));
// Replace a Function
router.put("/functions/", smaFunction.ReplaceOne.bind(smaFunction));

module.exports = router;
