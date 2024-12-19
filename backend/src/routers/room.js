"use strict";

const router = require("express").Router();
const RoomController = require("../controllers/room.controller");
const asyncHandler = require("../helpers/asyncHandler");

router.post("/", asyncHandler(RoomController.createRoom));
router.get("/:id", asyncHandler(RoomController.getRoomById));

module.exports = router;
