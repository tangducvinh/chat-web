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

const getRoomById = async (roomId) => {
  return await Room.findById(roomId).populate({
    path: "room_menbers",
    select: ["user_name", "_id"],
  });
};

const getListRoomByUser = async ({ userId, limit = 15, skip = 0 }) => {
  const listRoom = await Room.aggregate([
    { $match: { room_menbers: new Types.ObjectId(userId) } }, // Match user ID
    { $sort: { updatedAt: -1 } }, // Sort by `updatedAt`
    { $skip: skip }, // Pagination
    { $limit: limit },
    {
      $project: {
        room_name: 1,
        room_image: 1,
        room_menbers: 1,
        room_type: 1,
        room_list_messages: { $slice: ["$room_list_messages", -1] }, // Last message
      },
    },
  ]);

  // Populate `room_menbers` and `room_list_messages` after aggregation
  const populatedRooms = await Room.populate(listRoom, [
    {
      path: "room_menbers",
      select: ["user_avatar", "user_name"],
    },
    {
      path: "room_list_messages",
      // select: ["user_avatar", "user_name"],
      select: ["mes_content", "mes_user_send"],
      populate: {
        path: "mes_user_send",
        select: ["user_name"],
      },
    },
  ]);

  return populatedRooms;
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
  const room = await Room.findOne(
    { _id: new Types.ObjectId(roomId) },
    { room_list_messages: 1 }
  );

  if (!room) return [];

  // Get the total number of messages
  const totalMessages = room.room_list_messages.length;

  // Adjust skip to avoid exceeding the total length
  if (skip >= totalMessages) {
    return []; // Return an empty array if skip is beyond the total messages
  }

  // Calculate the effective limit (to prevent overflow)
  const effectiveLimit = Math.min(limit, totalMessages - skip);

  const listMessages = await Room.findOne(
    { _id: new Types.ObjectId(roomId) },
    {
      room_list_messages: {
        $slice: [
          { $reverseArray: "$room_list_messages" },
          skip,
          effectiveLimit,
        ],
      },
    }
  );

  if (!listMessages) return [];

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
  getRoomById,
};
