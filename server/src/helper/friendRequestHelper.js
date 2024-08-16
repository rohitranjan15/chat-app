const db = require("../../global/config");
const constants = require("../../global/constants");

class friendRequestHelper {
  async getFriendRequestDetails(userId, friendId) {
    try {
      const sqlQuery = `SELECT * FROM friend_request WHERE status = ? AND (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)`;
      const friendRequestData = await db.query(sqlQuery, [
        constants.FRIEND_REQUEST_PENDING,
        userId,
        friendId,
        friendId,
        userId,
      ]);
      return friendRequestData[0];
    } catch (err) {
      throw err;
    }
  }

  async sendFriendRequest(userId, friendId) {
    try {
      const sqlQuery = `INSERT INTO friend_request(sender_id, receiver_id) VALUES (?, ?)`;
      await db.query(sqlQuery, [userId, friendId]);
      return;
    } catch (err) {
      throw err;
    }
  }

  async getFriendRequestDetailsbasedOnRequestId(requestId, receiverId) {
    try {
      const sqlQuery = `SELECT * FROM friend_request WHERE friend_request_id = ? AND receiver_id = ? AND status = ?`;
      const friendRequestData = await db.query(sqlQuery, [
        requestId,
        receiverId,
        constants.FRIEND_REQUEST_PENDING,
      ]);
      return friendRequestData[0][0];
    } catch (err) {
      throw err;
    }
  }

  async updateFriendRequest(requestId, status) {
    try {
      const sqlQuery = `UPDATE friend_request SET status = ? WHERE friend_request_id = ?`;
      await db.query(sqlQuery, [status, requestId]);
      return;
    } catch (err) {
      throw err;
    }
  }

  async getFriendRequestList(userId) {
    try {
      const sqlQuery = `SELECT fr.*, u.username FROM friend_request fr JOIN user u ON  fr.receiver_id = u.user_id WHERE fr.receiver_id = ? AND fr.status = ?`;
      const friendRequestList = await db.query(sqlQuery, [
        userId,
        constants.FRIEND_REQUEST_PENDING,
      ]);
      return friendRequestList[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = friendRequestHelper;
