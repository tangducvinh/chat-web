"use strict";

const router = require("express").Router();
const routerUser = require("./user");
const routerNotification = require("./notification");

const initRouter = (app) => {
  app.use("/api/user", routerUser);
  app.use("/api/notification", routerNotification);
};

module.exports = initRouter;
