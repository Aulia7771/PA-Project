const db = require('../db');

const CheckoutItemHandler = {
  async getAll(request, h) {
    try {
      const { rows } = await db.query(
        'SELECT * FROM checkout_items ORDER BY checkout_item_id DESC'
      );
      return h.response(rows);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async getByCheckout(request, h) {
    try {
      const { checkout_id } = request.params;

      const { rows } = await db.query(
        'SELECT * FROM checkout_items WHERE checkout_id=$1 ORDER BY checkout_item_id ASC',
        [checkout_id]
      );

      return h.response(rows);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async add(request, h) {
    try {
      const { checkout_id, product_id, quantity, price } = request.payload;

      const { rows } = await db.query(
        `INSERT INTO checkout_items (checkout_id, product_id, quantity, price)
         VALUES ($1,$2,$3,$4)
         RETURNING *`,
        [checkout_id, product_id, quantity, price]
      );

      return h.response(rows[0]).code(201);

    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },
};

module.exports = CheckoutItemHandler;
