const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const initRouter = require("./routers");
const SocketServices = require("./services/chat.service");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.URL_CLIENT,
    methods: ["GET", "POST"],
  },
});
global._io = io;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

initRouter(app);
require("./dbs/init.mongodb");

SocketServices(io);

// handle error
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err?.status || 500;
  console.log({ err });
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: err?.message || "Not Found 1",
  });
});

module.exports = server;

// socket.join  .. tao room || tham gia vao room
// socket.adapter.rooms  // cac room dang co
// io.sockets.in('dsdfsdf').emit()
