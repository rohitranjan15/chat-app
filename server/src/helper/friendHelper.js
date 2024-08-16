const db = require("../../global/config");

class friendHelper {
  async createFriend(userId, friendId) {
    try {
      const sqlQuery = `INSERT INTO friend(user_id, friend_id) VALUES(?,?)`;
      await db.query(sqlQuery, [userId, friendId]);
      return;
    } catch (err) {
      throw err;
    }
  }

  async getFriendList(userId) {
    try {
      const sqlQuery = `SELECT id, CASE WHEN user_id = ? THEN friend_id ELSE user_id END AS friend_id FROM friend WHERE( user_id = ? OR friend_id = ?) AND status = 1 `;
      const friendList = await db.query(sqlQuery, [userId, userId, userId]);
      return friendList[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = friendHelper;
