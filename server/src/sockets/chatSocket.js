module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
