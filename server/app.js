const express = require("express");
const app = express();
const port = 3000;

// Import routes
const indexRouter = require("./routes/chat");
const usersRouter = require("./routes/user");

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
