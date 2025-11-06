const db = require('../db');

const BalanceHandler = {
  async getBalance(request, h) {
    const { user_id } = request.params;
    const { rows } = await db.query('SELECT * FROM balance WHERE user_id=$1', [user_id]);
    return h.response(rows[0] || { user_id, amount: 0 });
  },

  async topUp(request, h) {
    const { user_id, amount } = request.payload;
    const { rows } = await db.query(
      `UPDATE balance SET amount = amount + $2 WHERE user_id=$1 RETURNING *`,
      [user_id, amount]
    );
    return h.response(rows[0]);
  },
};

module.exports = BalanceHandler;
