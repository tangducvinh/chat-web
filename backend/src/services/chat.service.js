const UserService = require("../services/user.service");
const MessageService = require("../services/message.service");

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

    // handle message
    socket.on("client-send-message", async (payload) => {
      console.log(payload);
      // save message into db
      const message = await MessageService.createMessage({
        mes_user_send: payload.userId,
        mes_content: payload.content,
        mes_scope: payload.scope,
      });

      const listMessage = await MessageService.getListMessage({
        limit: 2,
        filter: { mes_scope: message.mes_scope },
      });

      console.log({ listMessage });

      if (message.mes_scope === "global") {
        io.sockets.emit("server-send-message", listMessage.reverse());
      } else {
        console.log("handle send for only room  ");
      }

      // io.sockets.emit("server-send-message", dataMessage);
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

    // handle disconnect
    socket.on("disconnect", () => {
      console.log("ngat ket noi: ", socket.id);
      listUsers = listUsers.filter((item) => item.idSocket !== socket.id);
      socket.broadcast.emit("server-send-update-user-online", { listUsers });
    });
  });
};

module.exports = SocketServices;
