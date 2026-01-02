const db = require('../db');

const BalanceHandler = {
  async getAll(request, h) {
    try {
      const { rows } = await db.query(
        "SELECT * FROM balance ORDER BY balance_id ASC"
      );
      return h.response(rows);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

  async getBalance(request, h) {
    try {
      const { user_id } = request.params;

      let { rows } = await db.query(
        'SELECT * FROM balance WHERE user_id=$1',
        [user_id]
      );

      if (!rows.length) {
        // Auto create saldo user baru
        const create = await db.query(
          `INSERT INTO balance (user_id, balance_amount)
           VALUES ($1, 0)
           RETURNING *`,
          [user_id]
        );
        rows = create.rows;
      }

      return h.response(rows[0]);

    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

  async topUp(request, h) {
    try {
      const { user_id, amount } = request.payload;

      // Pastikan saldo ada
      await db.query(
        `INSERT INTO balance (user_id, balance_amount)
         VALUES ($1, 0)
         ON CONFLICT (user_id) DO NOTHING`,
        [user_id]
      );

      const { rows } = await db.query(
        `UPDATE balance
         SET balance_amount = balance_amount + $2, updated_at = NOW()
         WHERE user_id=$1
         RETURNING *`,
        [user_id, amount]
      );

      return h.response(rows[0]);

    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

  async debit(request, h) {
    try {
      const { user_id, amount } = request.payload;

      // Cek saldo
      const res = await db.query(
        'SELECT balance_amount FROM balance WHERE user_id=$1',
        [user_id]
      );

      if (!res.rows.length)
        return h.response({ error: "Balance not found" }).code(404);

      const saldo = parseFloat(res.rows[0].balance_amount);

      if (saldo < amount)
        return h.response({ error: "Insufficient balance" }).code(400);

      const { rows } = await db.query(
        `UPDATE balance
         SET balance_amount = balance_amount - $2, updated_at = NOW()
         WHERE user_id=$1
         RETURNING *`,
        [user_id, amount]
      );

      return h.response(rows[0]);

    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },
};

module.exports = BalanceHandler;
