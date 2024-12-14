"use strict";

const { Types } = require("mongoose");
const Room = require("../models/room.model");

const createRoom = async ({ dataUser, name, image, type }) => {
  return await Room.create({
    room_name: name,
    room_menbers: dataUser,
    room_image: image,
    room_type: type,
  });
};

const getListRoomByUser = async ({ userId, limit = 20, skip = 0 }) => {
  const listRoom = await Room.find({
    room_menbers: new Types.ObjectId(userId),
  })
    .sort({ updatedAt: -1 })
    .select(["room_name", "room_image", "room_menbers", "room_type"])
    .limit(limit)
    .skip(skip)
    .populate({
      path: "room_menbers",
      select: ["user_avatar", "user_name"],
    });

  return listRoom;
};

const addMessageToRoom = async ({ messageId, roomId }) => {
  return await Room.updateOne(
    { _id: new Types.ObjectId(roomId) },
    {
      $addToSet: { room_list_messages: messageId },
    }
  );
};

const getListHistoryMessage = async ({ limit, skip, roomId }) => {
  const listMessages = await Room.findOne(
    { _id: new Types.ObjectId(roomId) },
    {
      room_list_messages: {
        $slice: [{ $reverseArray: "$room_list_messages" }, skip, limit],
      },
    }
  );

  if (!listMessages) return;

  return listMessages.populate([
    {
      path: "room_list_messages",
      select: ["_id", "createdAt", "mes_content"],
      populate: {
        path: "mes_user_send",
        select: ["user_name", "user_avatar", "_id"],
      },
    },
  ]);
};

module.exports = {
  createRoom,
  addMessageToRoom,
  getListHistoryMessage,
  getListRoomByUser,
};
