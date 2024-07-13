const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const port = 3000;

// Import the db connection
const db = require("./global/config");

// Import routes
const indexRouter = require("./src/routes/chat");
const usersRouter = require("./src/routes/user");

// Create HTTP server and integrate Socket.io
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Import and use Socket.io handlers
require("./src/sockets/chatSocket")(io);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
