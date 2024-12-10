"use strict";

const RoomService = require("../services/room.service");
const { CREATED, OK } = require("../core/success.response");

const createRoom = async (req, res, next) => {
  new OK({
    message: "create room successfully",
    metadata: await RoomService.createRoom({
      name: req.body.name,
      dataUser: req.body.listUser,
    }),
  }).send(res);
};

module.exports = {
  createRoom,
};
