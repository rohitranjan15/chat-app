const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User home page");
});

router.post("/create", (req, res) => {
  const user = req.body;
  res.json({ message: "User created", user });
});

module.exports = router; // Ensure that we export the router instance
