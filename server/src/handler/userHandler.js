const db = require("../../global/config");
const constants = require("../../global/constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;

const UserHelperLib = require("../helper/userHelper");
const FriendRequestHelperLib = require("../helper/friendRequestHelper");

const userHelperLib = new UserHelperLib();
const friendRequestHelperLib = new FriendRequestHelperLib();

const loginHandler = async (request, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      request.email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.user_id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    await db.query("UPDATE user SET access_token = ? WHERE user_id = ?", [
      token,
      user.user_id,
    ]);

    // If successful, return a success message (token generation can be added here)
    return res
      .status(200)
      .json({ message: "Success", data: { access_token: token } });
  } catch (error) {
    throw error;
  }
};

const signupHandler = async (request, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      request.email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);
    await db.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [request.name, request.email, hashedPassword]
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};

const sendRequestHandler = async (req, res) => {
  try {
    const userId = req.id;
    const otherUserId = req.user_id;

    if (userId == otherUserId) {
      return res.status(400).json({ message: "User doesnot exist" });
    }

    //validate the other user data
    const otherUserData = await userHelperLib.getUserDetails(req.user_id);
    if (!otherUserData) {
      return res.status(400).json({ message: "User doesnot exist" });
    }

    //check whether the friend request is already sent or not
    const friendRequestData =
      await friendRequestHelperLib.getFriendRequestDetails(userId, otherUserId);
    if (friendRequestData.length) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    //send friend request
    await friendRequestHelperLib.sendFriendRequest(userId, otherUserId);

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};

const friendRequestHandler = async (req, res) => {
  try {
    //check whether the friend request is already sent or not
    const friendRequestData =
      await friendRequestHelperLib.getFriendRequestDetailsbasedOnRequestId( req.request_id, req.id );
    if (!friendRequestData) {
      return res.status(400).json({ message: "Friend request does not exist" });
    }

    //update friend request
    await friendRequestHelperLib.updateFriendRequest( req.request_id, req.status );

    return res.status(200).json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginHandler,
  signupHandler,
  sendRequestHandler,
  friendRequestHandler,
};
