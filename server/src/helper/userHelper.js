const db = require("../../global/config");

class helper {
  async getUserDetails(userId) {
    try {
      const query = `SELECT * FROM user WHERE user_id = ?`;
      const userData = await db.query(query, [userId]);
      return userData[0][0];
    } catch (err) {
      throw err;
    }
  }

  async getUserBasedOnIds(userIds) {
    try {
      const query = `SELECT user_id, username FROM user WHERE user_id IN (?)`;
      const userList = await db.query(query, [userIds]);
      return userList[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = helper;
