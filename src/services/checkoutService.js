const pool = require('../db');

class CheckoutService {
  async getAllByUser(user_id) {
    const res = await pool.query('SELECT * FROM checkout WHERE user_id=$1', [user_id]);
    return res.rows;
  }

  async create({ user_id, total_amount, status }) {
    const res = await pool.query(
      `INSERT INTO checkout (user_id, total_amount, status)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, total_amount, status]
    );
    return res.rows[0];
  }

  async updateStatus(checkout_id, status) {
    const res = await pool.query(
      `UPDATE checkout SET status=$1, updated_at=NOW() WHERE checkout_id=$2 RETURNING *`,
      [status, checkout_id]
    );
    return res.rows[0];
  }
}

module.exports = new CheckoutService();
