const db = require('../db');

class BalanceHistoriesService {
  async getByUser(user_id) {
    const res = await db.query(
      `SELECT * FROM balance_histories 
       WHERE user_id=$1 
       ORDER BY history_id DESC`,
      [user_id]
    );
    return res.rows;
  }

  async getAll() {
    const res = await db.query(
      `SELECT * FROM balance_histories ORDER BY history_id DESC`
    );
    return res.rows;
  }

  async create({ user_id, amount, transaction_type, description }) {
    const res = await db.query(
      `INSERT INTO balance_histories (user_id, amount, transaction_type, description)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user_id, amount, transaction_type, description]
    );
    return res.rows[0];
  }
}

module.exports = new BalanceHistoriesService();
