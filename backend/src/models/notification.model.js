"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "notifications";

// Declare the Schema of the Mongo model
var notificationSchema = new mongoose.Schema(
  {
    noti_send: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    noti_receive: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    noti_content: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, notificationSchema);
