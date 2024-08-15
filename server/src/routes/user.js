const express = require("express");
const router = express.Router();

const { validateSchema } = require("../utility/validator");
const { validateUserAccessToken } = require("./../middleware/middleware");
const { login, signup, sendRequest } = require("../schema/userSchema");
const {
  loginHandler,
  signupHandler,
  sendRequestHandler,
} = require("../handler/userHandler");

router.get("/", (req, res) => {
  res.send("User home page");
});

router.post("/signup", async (req, res) => {
  try {
    await validateSchema(signup, req.body);
    const response = await signupHandler(req.body, res);
    return response;
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: err.details ? err.details[0].message : err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    await validateSchema(login, req.body);
    const response = await loginHandler(req.body, res);
    return response;
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ error: err.details ? err.details[0].message : err.message });
  }
});

module.exports = router; // Ensure that we export the router instance
