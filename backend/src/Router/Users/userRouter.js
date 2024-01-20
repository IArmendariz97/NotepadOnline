// routes/note.routes.js
const express = require("express");
const userController = require("../../Controllers/Users/userController");

const userRouter = express.Router();

userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;
