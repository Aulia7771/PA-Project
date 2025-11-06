const pool = require('../db');

class BalanceService {
  async getByUser(user_id) {
    const res = await pool.query('SELECT * FROM balance WHERE user_id=$1', [user_id]);
    return res.rows[0];
  }

  async updateBalance(user_id, balance_amount) {
    const res = await pool.query(
      `UPDATE balance SET balance_amount=$1, updated_at=NOW() WHERE user_id=$2 RETURNING *`,
      [balance_amount, user_id]
    );
    return res.rows[0];
  }

  async create({ user_id, balance_amount }) {
    const res = await pool.query(
      `INSERT INTO balance (user_id, balance_amount) VALUES ($1, $2) RETURNING *`,
      [user_id, balance_amount]
    );
    return res.rows[0];
  }
}

module.exports = new BalanceService();
