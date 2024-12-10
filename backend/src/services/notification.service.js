"use strict";
const { Types } = require("mongoose");
const Notification = require("../models/notification.model");
// const { stringToObjectId } = require("../ultis/convert");
const createNotification = async ({
  userSend,
  userReceive,
  content,
  status,
}) => {
  const notification = await Notification.create({
    noti_send: userSend,
    noti_receive: userReceive,
    noti_content: content,
    noti_status_reply: status,
  });

  return await notification.populate([
    {
      path: "noti_send",
      select: ["user_name", "user_avatar"],
    },
    {
      path: "noti_receive",
      select: ["user_name", "user_avatar"],
    },
  ]);
};

const updateNotification = async ({ content, notificationId }) => {
  const notification = await Notification.updateOne(
    { _id: new Types.ObjectId(notificationId) },
    {
      noti_content: content,
      noti_status_reply: true,
    },
    { new: true }
  );
  return notification;
};

const getListNotification = async ({ userId, limit = 10 }) => {
  return await Notification.find({ noti_receive: new Types.ObjectId(userId) })
    .sort({ createdAt: -1 })
    .populate({
      path: "noti_send",
      select: ["user_name", "user_avatar"],
    })
    .select([
      "_id",
      "noti_send",
      "noti_content",
      "createdAt",
      "noti_status_reply",
    ]);
};

module.exports = {
  createNotification,
  getListNotification,
  updateNotification,
};
