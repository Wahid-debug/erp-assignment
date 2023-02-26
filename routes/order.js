const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.post("/create", orderController.create);
orderRouter.get("/getAllOrders", orderController.getAllOrders);
orderRouter.delete("/delete/:order_id", orderController.deleteOrder);
orderRouter.put("/update/:order_id", orderController.updateOrder);
orderRouter.get("/orderReportbyUser", orderController.orderReportByUser);

module.exports = orderRouter;