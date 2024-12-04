"use strict";
const { Types } = require("mongoose");
const Notification = require("../models/notification.model");
// const { stringToObjectId } = require("../ultis/convert");
const createNotification = async ({ userSend, userReceive, content }) => {
  const notification = await Notification.create({
    noti_send: userSend,
    noti_receive: userReceive,
    noti_content: content,
  });

  return await notification.populate({
    path: "noti_send",
    select: "user_name, user_avatar",
  });
};

const getListNotification = async ({ userId, limit = 10 }) => {
  return await Notification.find({ noti_receive: new Types.ObjectId(userId) })
    .populate({
      path: "noti_send",
      select: ["user_name", "user_avatar"],
    })
    .select(["_id", "noti_send", "noti_content", "createdAt"]);
};

module.exports = {
  createNotification,
  getListNotification,
};
