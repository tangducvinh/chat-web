"use strict";
const UserService = require("../services/user.service");
const { CREATED, OK } = require("../core/success.response");

const createUser = async (req, res, next) => {
  console.log(req.body);
  new CREATED({
    metadata: await UserService.createUser(req.body),
  }).send(res);
};

const getListUser = async (req, res, next) => {
  new OK({
    message: "Get list user successfully",
    metadata: await UserService.getListUser({
      filter: req.query,
      limit: req.query?.limit,
    }),
  }).send(res);
};

const getListFriend = async (req, res, next) => {
  new OK({
    message: "Get list friend successfully",
    metadata: await UserService.getListFriend({ userId: req.params.uid }),
  }).send(res);
};

module.exports = {
  createUser,
  getListUser,
  getListFriend,
};
