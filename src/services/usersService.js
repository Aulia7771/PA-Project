const pool = require('../db');
const bcrypt = require('bcrypt');

class UsersService {
  async getAll() {
    const res = await pool.query('SELECT user_id, username, email, full_name FROM users');
    return res.rows;
  }

  async getById(user_id) {
    const res = await pool.query('SELECT * FROM users WHERE user_id=$1', [user_id]);
    return res.rows[0];
  }

  async create({ username, email, password_hash, full_name, address, country_code, phone_number }) {
    const hashed = await bcrypt.hash(password_hash, 10);
    const res = await pool.query(
      `INSERT INTO users (username, email, password_hash, full_name, address, country_code, phone_number)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id, username, email`,
      [username, email, hashed, full_name, address, country_code, phone_number]
    );
    return res.rows[0];
  }

  async verifyUser(email, password_hash) {
    const res = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = res.rows[0];
    if (!user) return null;
    const match = await bcrypt.compare(password_hash, user.password_hash);
    return match ? user : null;
  }

  async delete(user_id) {
    await pool.query('DELETE FROM users WHERE user_id=$1', [user_id]);
  }
}

module.exports = new UsersService();
