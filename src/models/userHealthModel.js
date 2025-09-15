const pool = require('../config/database');

class UserHealthModel {
  static async createUserHealth(userData) {
    const { user_id, weight, height, age } = userData;
    const query = `
      INSERT INTO user_health (user_id, weight, height, age, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING *
    `;
    const values = [user_id, weight, height, age];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getUserHealthById(userId) {
    const query = 'SELECT * FROM user_health WHERE user_id = $1';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async updateUserHealth(userId, userData) {
    const { weight, height, age } = userData;
    const query = `
      UPDATE user_health 
      SET weight = $2, height = $3, age = $4, updated_at = NOW()
      WHERE user_id = $1
      RETURNING *
    `;
    const values = [userId, weight, height, age];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteUserHealth(userId) {
    const query = 'DELETE FROM user_health WHERE user_id = $1 RETURNING *';
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async getAllUsersHealth() {
    const query = 'SELECT * FROM user_health ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = UserHealthModel;