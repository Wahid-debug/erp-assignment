const express = require("express");
const outletRouter = express.Router();
const outletController = require("../controllers/outletController");

outletRouter.post("/create", outletController.create);
outletRouter.get("/getAllOutlet", outletController.getAllOutlet);
outletRouter.delete("/deleteOutlet/:outlet_id", outletController.deleteOutlet);
outletRouter.put("/updateOutlet/:outlet_id", outletController.updateOutlet);

module.exports = outletRouter;