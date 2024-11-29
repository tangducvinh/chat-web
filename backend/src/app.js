const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
// app.set("view engine", "ejs");
// app.set("views", "./src/views");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.URL_CLIENT,
    methods: ["GET", "POST"],
  },
});

let dataMessage = [];
let listUsers = [];

let listTyping = [];

io.on("connection", (socket) => {
  console.log("co nguoi ket noi", socket.id);
  setTimeout(() => {
    io.sockets.emit("server-send-update-user-online", { listUsers });
  }, 500);

  socket.on("client-send-information-login", (payload) => {
    listUsers.unshift({ ...payload, id: socket.id });
    console.log(listUsers);
  });

  socket.on("client-send-message", (payload) => {
    dataMessage.unshift(payload);
    io.sockets.emit("server-send-message", dataMessage);
  });

  // handle listening typing
  socket.on("someone-typing", (name) => {
    if (listTyping.length > 3) listTyping.pop();
    listTyping.unshift(name);
    socket.broadcast.emit("update-typing", listTyping);
  });

  // handle listening stop typing
  socket.on("someone-stop-typing", (name) => {
    listTyping = listTyping.filter((item) => item !== name);
    socket.broadcast.emit("update-typing", listTyping);
  });

  socket.on("disconnect", () => {
    console.log("ngat ket noi: ", socket.id);
    listUsers = listUsers.filter((item) => item.id !== socket.id);
    socket.broadcast.emit("server-send-update-user-online", { listUsers });
  });
});

app.get("/", (req, res, next) => {
  res.json("home");
});

module.exports = server;

// socket.join  .. tao room || tham gia vao room
// socket.adapter.rooms  // cac room dang co
// io.sockets.in('dsdfsdf').emit()
