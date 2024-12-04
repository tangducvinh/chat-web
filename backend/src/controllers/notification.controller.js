"use strict";
const NotificationService = require("../services/notification.service");
const { CREATED, OK } = require("../core/success.response");

const getListNotification = async (req, res, next) => {
  new OK({
    message: "Get list notification successfully",
    metadata: await NotificationService.getListNotification({
      userId: req.query.userId,
    }),
  }).send(res);
};

module.exports = {
  getListNotification,
};
