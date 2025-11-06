const db = require('../db');

const CheckoutItemHandler = {
  async getByCheckout(request, h) {
    const { checkout_id } = request.params;
    const { rows } = await db.query('SELECT * FROM checkout_items WHERE checkout_id=$1', [checkout_id]);
    return h.response(rows);
  },

  async add(request, h) {
    const { checkout_id, product_id, quantity, price } = request.payload;
    const { rows } = await db.query(
      'INSERT INTO checkout_items (checkout_id, product_id, quantity, price) VALUES ($1,$2,$3,$4) RETURNING *',
      [checkout_id, product_id, quantity, price]
    );
    return h.response(rows[0]).code(201);
  },
};

module.exports = CheckoutItemHandler;
