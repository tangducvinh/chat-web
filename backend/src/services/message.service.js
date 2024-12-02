"use strict";
const Message = require("../models/message.model");

const createMessage = async (data) => {
  return (await Message.create(data)).populate({
    path: "mes_user_send",
    select: ["user_name", "_id", "user_avatar"],
  });
};

const getListMessage = async ({ limit, filter, skip }) => {
  return await Message.find(filter)
    .populate({
      path: "mes_user_send",
      select: ["user_name", "_id", "user_avatar"],
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .select(["mes_user_send", "mes_content", "mes_scope", "createdAt"]);
};

module.exports = {
  createMessage,
  getListMessage,
};
