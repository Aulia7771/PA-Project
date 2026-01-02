const db = require('../db');

class BalanceService {
  async getByUser(user_id) {
    const res = await db.query(
      'SELECT * FROM balance WHERE user_id=$1',
      [user_id]
    );
    return res.rows[0];
  }

  async updateBalance(user_id, balance_amount) {
    const res = await db.query(
      `UPDATE balance
       SET balance_amount=$1, updated_at=NOW()
       WHERE user_id=$2
       RETURNING *`,
      [balance_amount, user_id]
    );
    return res.rows[0];
  }

  async create({ user_id, balance_amount }) {
    const res = await db.query(
      `INSERT INTO balance (user_id, balance_amount)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, balance_amount]
    );
    return res.rows[0];
  }

  async debit(user_id, amount) {
    const res = await db.query(
      `UPDATE balance
       SET balance_amount = balance_amount - $2, updated_at=NOW()
       WHERE user_id=$1
       RETURNING *`,
      [user_id, amount]
    );
    return res.rows[0];
  }
}

module.exports = new BalanceService();
