const db = require('../db');

const BalanceHistoriesHandler = {
  
  async getAllHistories(request, h) {
    try {
      const { rows } = await db.query(
        'SELECT * FROM balance_histories ORDER BY history_id DESC'
      );
      return h.response(rows);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

  async getByUser(request, h) {
    try {
      const { user_id } = request.params;
      const { rows } = await db.query(
        `SELECT * FROM balance_histories 
         WHERE user_id=$1 
         ORDER BY history_id DESC`,
        [user_id]
      );
      return h.response(rows);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

  async addHistory(request, h) {
    try {
      const { user_id, transaction_type, amount, description } = request.payload;

      const { rows } = await db.query(
        `INSERT INTO balance_histories (user_id, transaction_type, amount, description)
         VALUES ($1,$2,$3,$4)
         RETURNING *`,
        [user_id, transaction_type, amount, description]
      );

      return h.response(rows[0]).code(201);

    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

};

module.exports = BalanceHistoriesHandler;
