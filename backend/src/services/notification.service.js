"use strict";
const Notification = require("../models/notification.model");

const createNotification = async ({ userSend, userReceive, content }) => {
  return await Notification.create({
    noti_send: userSend,
    noti_receive: userReceive,
    noti_content: content,
  });
};

module.exports = {
  createNotification,
};
