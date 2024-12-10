"use strict";

const Room = require("../models/room.model");

const createRoom = async ({ dataUser, name }) => {
  return await Room.create({
    room_name: name,
    room_menbers: dataUser,
  });
};

module.exports = {
  createRoom,
};
