const User = require("../models/user.model");
const {
  NotFoundError,
  ConflictRequestError,
} = require("../core/error.response");
const { generateAccessToken } = require("../auth/jwt");
const jwt = require("jsonwebtoken");

const createUser = async (data) => {
  const user = await User.create(data);
  const accessToken = generateAccessToken({
    id: user._id.toString(),
    name: user.user_name,
  });
  return { accessToken, id: user._id.toString(), name: user.user_name };
};

const getUserByAccessToken = async (accessToken) => {
  try {
    let result;
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return { message: "Token invalid" };
      }
      result = { message: "Get user successfully", metadata: decode };
    });
    return result;
  } catch (e) {
    return { message: "Something went wrong" };
  }
};

const foundUser = async (filter) => {
  return await User.findOne(filter);
};

module.exports = {
  createUser,
  foundUser,
  getUserByAccessToken,
};
