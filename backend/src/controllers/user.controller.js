"use strict";
const UserService = require("../services/user.service");
const { CREATED, OK } = require("../core/success.response");

const createUser = async (req, res, next) => {
  console.log(req.body);
  new CREATED({
    metadata: await UserService.createUser(req.body),
  }).send(res);
};

module.exports = {
  createUser,
};
