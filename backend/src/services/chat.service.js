const UserService = require("../services/user.service");
const MessageService = require("../services/message.service");
const NotificationService = require("../services/notification.service.js");

const SocketServices = (io) => {
  let listUsers = [];
  let listTyping = [];

  io.on("connection", async (socket) => {
    console.log("co nguoi ket noi", socket.id);

    // handle user access into system
    socket.on("client-send-information-access", async (payload) => {
      // found user
      const foundUser = await UserService.foundUser({
        user_name: payload.name,
      });

      // if user already exists
      if (foundUser) {
        return socket.emit("server-send-response-access", {
          message: "User name already exists!",
        });
      }

      // create user
      const newUser = await UserService.createUser({
        user_name: payload.name,
      });

      if (!newUser) {
        return socket.emit("server-send-response-access", {
          message: "Something went wrong",
        });
      }

      socket.emit("server-send-response-access", {
        message: "Access successfully",
        metadata: newUser,
      });

      listUsers.unshift({
        name: newUser.name,
        id: newUser.id,
        idSocket: socket.id,
      });
      io.sockets.emit("server-send-update-user-online", { listUsers });
    });

    // handle get user name by accessToken
    socket.on("client-send-get-user-by-accessToken", async (accessToken) => {
      const user = await UserService.getUserByAccessToken(accessToken);
      socket.emit("server-send-user-get-by-accessToken", user);

      const { name, id } = user.metadata;
      listUsers.unshift({ name, id, idSocket: socket.id });
      io.sockets.emit("server-send-update-user-online", { listUsers });
    });

    // handle get history message
    socket.on("client-send-get-history-messages", async (payload) => {
      const listMessages = await MessageService.getListMessage({
        limit: 15,
        skip: 0,
        filter: { mes_scope: payload.scope },
      });

      socket.emit("server-send-history-messages", listMessages);
    });

    // handle message
    socket.on("client-send-message", async (payload) => {
      // save message into db
      const message = await MessageService.createMessage({
        mes_user_send: payload.userId,
        mes_content: payload.content,
        mes_scope: payload.scope,
      });

      if (message.mes_scope === "global") {
        io.sockets.emit("server-send-message", message);
      } else {
        console.log("handle send for only room");
      }

      // io.sockets.emit("server-send-message", dataMessage);
    });

    // handle get more message
    socket.on("client-get-more-message", async (payload) => {
      console.log("call api yet");
      const listMessages = await MessageService.getListMessage({
        limit: 15,
        skip: payload.skip,
        filter: { mes_scope: payload.scope },
      });

      socket.emit("server-send-more-messages", listMessages);
    });

    // handle get friend request
    socket.on("client-send-friend-request", async (payload) => {
      const user = await UserService.foundUser({ _id: payload.userSend });

      const notification = await NotificationService.createNotification({
        ...payload,
        content: `${user.user_name} gửi lời mời kết bạn!`,
      });

      const foundIdSocketUser = listUsers.find(
        (item) => item.id === payload.userReceive
      );

      if (!foundIdSocketUser) return;
      socket
        .to(foundIdSocketUser.idSocket)
        .emit("server-send-notice-friend-request", notification);
    });

    // handle accepted friend 
    socket.on("client-send-accepted-friend", async(payload) => {
      console.log(payload)
    })

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

    // handle disconnect
    socket.on("disconnect", () => {
      console.log("ngat ket noi: ", socket.id);
      listUsers = listUsers.filter((item) => item.idSocket !== socket.id);
      console.log({ listUsers });
      socket.broadcast.emit("server-send-update-user-online", { listUsers });
    });
  });
};

module.exports = SocketServices;
