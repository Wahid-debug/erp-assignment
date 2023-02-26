const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.post("/create", productController.create);
productRouter.get("/getAllProducts", productController.getAllProduct);
productRouter.delete("/deleteProduct/:product_id", productController.deleteProduct);
productRouter.put("/updateProduct/:product_id", productController.updateProduct);

module.exports = productRouter;