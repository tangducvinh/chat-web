"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Room";
const COLLECTION_NAME = "rooms";

// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    index: true,
  },
  room_menbers: {
    type: Array,
  },
  room_list_messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: [],
    },
  ],
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, roomSchema);
