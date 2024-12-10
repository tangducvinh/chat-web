"use strict";

const router = require("express").Router();
const userController = require("../controllers/user.controller");
const asyncHandler = require("../helpers/asyncHandler");

router.post("/", asyncHandler(userController.createUser));
router.get("/list", asyncHandler(userController.getListUser));
router.get("/list-friend/:uid", asyncHandler(userController.getListFriend));

module.exports = router;
