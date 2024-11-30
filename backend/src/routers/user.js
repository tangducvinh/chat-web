"use strict";

const router = require("express").Router();
const userController = require("../controllers/user.controller");
const asyncHandler = require("../helpers/asyncHandler");

router.post("/", asyncHandler(userController.createUser));

module.exports = router;
