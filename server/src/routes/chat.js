const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Chat home page");
});

router.post("/message", (req, res) => {
  const message = req.body.message;
  res.json({ message: `Message received: ${message}` });
});

module.exports = router; // Ensure that we export the router instance
