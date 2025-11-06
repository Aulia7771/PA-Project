const db = require('../db');

const BalanceHistoriesHandler = {
  async getAll(request, h) {
    const { user_id } = request.params;
    const { rows } = await db.query('SELECT * FROM balance_histories WHERE user_id=$1', [user_id]);
    return h.response(rows);
  },

  async addHistory(request, h) {
    const { user_id, type, amount, description } = request.payload;
    const { rows } = await db.query(
      'INSERT INTO balance_histories (user_id, type, amount, description) VALUES ($1,$2,$3,$4) RETURNING *',
      [user_id, type, amount, description]
    );
    return h.response(rows[0]).code(201);
  },
};

module.exports = BalanceHistoriesHandler;
