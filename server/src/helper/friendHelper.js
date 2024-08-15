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
}

module.exports = friendHelper;
