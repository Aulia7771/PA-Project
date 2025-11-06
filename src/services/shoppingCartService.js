const pool = require('../db');

class ShoppingCartService {
  async getByUser(user_id) {
    const res = await pool.query('SELECT * FROM shopping_cart WHERE user_id=$1', [user_id]);
    return res.rows;
  }

  async addItem({ user_id, product_id, quantity }) {
    const res = await pool.query(
      `INSERT INTO shopping_cart (user_id, product_id, quantity)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, product_id, quantity]
    );
    return res.rows[0];
  }

  async updateItem(cart_id, { quantity }) {
    const res = await pool.query(
      `UPDATE shopping_cart SET quantity=$1 WHERE cart_id=$2 RETURNING *`,
      [quantity, cart_id]
    );
    return res.rows[0];
  }

  async deleteItem(cart_id) {
    await pool.query('DELETE FROM shopping_cart WHERE cart_id=$1', [cart_id]);
  }
}

module.exports = new ShoppingCartService();
