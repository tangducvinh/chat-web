"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Room";
const COLLECTION_NAME = "rooms";

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema(
  {
    room_name: {
      type: String,
      index: true,
    },
    room_image: {
      type: String,
    },
    room_menbers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    room_type: {
      type: String,
      enum: ["two", "group"],
    },
    room_list_messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, roomSchema);
