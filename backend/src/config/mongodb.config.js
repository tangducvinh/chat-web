"use strict";

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 5501,
  },
  db: {
    name: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    db: process.env.DEV_DB_NAME,
  },
};

module.exports = dev



