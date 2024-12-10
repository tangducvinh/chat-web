"use strict";

const router = require("express").Router();
const routerUser = require("./user");
const routerNotification = require("./notification");
const routerRoom = require("./room");

const initRouter = (app) => {
  app.use("/api/user", routerUser);
  app.use("/api/notification", routerNotification);
  app.use("/api/room", routerRoom);
};

module.exports = initRouter;
