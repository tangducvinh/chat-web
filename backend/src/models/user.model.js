"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "users";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
    },
    user_email: {
      type: String,
    },
    user_avatar: {
      type: String,
    },
    user_password: {
      type: String,
      minLength: 6,
      maxLength: 20,
    },
    user_list_friends: [
      {
        infor_user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        infor_room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
