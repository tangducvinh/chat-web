"use strict";

const { default: mongoose } = require("mongoose");
const { countConnect } = require("../helpers/check.connect");
const {
  db: { name, password, db },
} = require("../config/mongodb.config");

const connectString = `mongodb+srv://${name}:${password}@cluster0.rglos.mongodb.net/?retryWrites=true&w=majority&appName=${db}`;

class Database {
  constructor() {
    this.connect();
  }

  // connect
  connect(type = "mongodb") {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString, { maxPoolSize: 50 })
      .then((_) => console.log("Connect Mongodb Success", countConnect()))
      .catch((eer) => console.log("Error Connect!", eer));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
