const User = require("../models/user.model");
const { Types } = require("mongoose");
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

const getListUser = async ({ filter, limit = 15 }) => {
  const query = {};
  if (filter.name) {
    query.user_name = { $regex: filter.name, $options: "i" };
  }

  // return await User.find(query).limit(limit);
  const response = await User.find(query).limit(limit);

  return response;
};

const acceptFriend = async ({ userSend, userReceive, roomId }) => {
  await User.updateOne(
    { _id: userSend },
    {
      $addToSet: {
        user_list_friends: {
          infor_user: userReceive,
          infor_room: roomId,
        },
      },
    }
  );
  await User.updateOne(
    { _id: userReceive },
    {
      $addToSet: {
        user_list_friends: {
          infor_user: userSend,
          infor_room: roomId,
        },
      },
    }
  );
};

const getListFriend = async ({ userId, limit = 1, skip = 0 }) => {
  console.log("get list friend");
  const user = await User.findOne(
    { _id: new Types.ObjectId(userId) }
    // { user_list_friends: { $slice: [skip, limit] } }
  ).select(["user_list_friends"]);

  const populatedUser = await User.populate(user, [
    {
      path: "user_list_friends.infor_user",
      select: ["user_name", "user_avatar", "_id"],
    },
  ]);

  return populatedUser;
};

module.exports = {
  createUser,
  foundUser,
  getUserByAccessToken,
  getListUser,
  acceptFriend,
  getListFriend,
};
