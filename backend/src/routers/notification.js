"use strict";

const router = require("express").Router();
const NotificationController = require("../controllers/notification.controller");
const asyncHandler = require("../helpers/asyncHandler");

router.get("/list", asyncHandler(NotificationController.getListNotification));

module.exports = router;
