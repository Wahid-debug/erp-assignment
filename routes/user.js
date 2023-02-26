const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.post("/create", userController.create);
userRouter.get("/getall", userController.getAllUsers);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.put("/update/:id", userController.updateUser);

module.exports = userRouter;