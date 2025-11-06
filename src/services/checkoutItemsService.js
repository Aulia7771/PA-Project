const pool = require('../db');

class CheckoutItemsService {
  async getByCheckout(checkout_id) {
    const res = await pool.query('SELECT * FROM checkout_items WHERE checkout_id=$1', [checkout_id]);
    return res.rows;
  }

  async create({ checkout_id, product_id, quantity, price }) {
    const res = await pool.query(
      `INSERT INTO checkout_items (checkout_id, product_id, quantity, price)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [checkout_id, product_id, quantity, price]
    );
    return res.rows[0];
  }
}

module.exports = new CheckoutItemsService();
