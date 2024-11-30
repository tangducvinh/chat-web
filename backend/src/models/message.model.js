"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Message";
const COLLECTION_NAME = "messages";

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema(
  {
    mes_user_send: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    mes_content: {
      type: String,
      require: true,
    },
    mes_scope: {
      type: String,
      enum: ["global", "room"],
      index: true,
    },
    mes_room: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
      index: true,
    },
    mes_create_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, messageSchema);
