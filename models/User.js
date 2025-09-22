const pool = require('../config/database');

class User {
  static async create() {
    const query = 'INSERT INTO users DEFAULT VALUES RETURNING *';
    const result = await pool.query(query);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getProfile(userId) {
    const query = `
      SELECT up.*, u.created_at as user_created_at
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      WHERE u.id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];
  }

  static async updateProfile(userId, { age, weight, height }) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Update or create user profile
      const profileQuery = `
        INSERT INTO user_profiles (user_id, age, current_weight, current_height, updated_at)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id)
        DO UPDATE SET
          age = COALESCE($2, user_profiles.age),
          current_weight = COALESCE($3, user_profiles.current_weight),
          current_height = COALESCE($4, user_profiles.current_height),
          updated_at = CURRENT_TIMESTAMP
        RETURNING *
      `;
      const profileResult = await client.query(profileQuery, [userId, age, weight, height]);

      // Add to weight history if weight is provided
      if (weight) {
        await client.query(
          'INSERT INTO weight_history (user_id, weight) VALUES ($1, $2)',
          [userId, weight]
        );
      }

      // Add to height history if height is provided
      if (height) {
        await client.query(
          'INSERT INTO height_history (user_id, height) VALUES ($1, $2)',
          [userId, height]
        );
      }

      await client.query('COMMIT');
      return profileResult.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getWeightHistory(userId, limit = 50) {
    const query = `
      SELECT weight, recorded_date, created_at
      FROM weight_history
      WHERE user_id = $1
      ORDER BY recorded_date DESC, created_at DESC
      LIMIT $2
    `;
    const result = await pool.query(query, [userId, limit]);
    return result.rows;
  }

  static async getHeightHistory(userId, limit = 50) {
    const query = `
      SELECT height, recorded_date, created_at
      FROM height_history
      WHERE user_id = $1
      ORDER BY recorded_date DESC, created_at DESC
      LIMIT $2
    `;
    const result = await pool.query(query, [userId, limit]);
    return result.rows;
  }
}

module.exports = User;