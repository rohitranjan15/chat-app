const express = require("express");
const router = express.Router();

const { validateSchema } = require("../utility/validator");
const { validateUserAccessToken } = require("./../middleware/middleware");
const { login, signup, sendRequest, friendRequest} = require("../schema/userSchema");
const { loginHandler, signupHandler, sendRequestHandler, friendRequestHandler, getFriendRequestHandler} = require("../handler/userHandler");

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

router.post("/sendRequest", validateUserAccessToken, async (req, res) => {
  try {
    await validateSchema(sendRequest, req.body);
    const response = await sendRequestHandler(req.body, res);
    return response;
  } catch (err) {
    res
      .status(400)
      .json({ error: err.details ? err.details[0].message : err.message });
  }
});

router.put(
  "/friendRequest/:request_id",
  validateUserAccessToken,
  async (req, res) => {
    try {
      req.body.request_id = req.params.request_id;
      await validateSchema(friendRequest, req.body);
      const response = await friendRequestHandler(req.body, res);
      return response;
    } catch (err) {
      res
        .status(400)
        .json({ error: err.details ? err.details[0].message : err.message });
    }
  }
);

router.get("/friendRequest", validateUserAccessToken, async (req, res) => {
  try {
    const response = await getFriendRequestHandler(req.body, res);
    return response;
  } catch (err) {
    res
      .status(400)
      .json({ error: err.details ? err.details[0].message : err.message });
  }
});

module.exports = router; // Ensure that we export the router instance
