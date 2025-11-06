const pool = require('../db');

class ProductsService {
  async getAll() {
    const res = await pool.query('SELECT * FROM products ORDER BY product_id ASC');
    return res.rows;
  }

  async getById(product_id) {
    const res = await pool.query('SELECT * FROM products WHERE product_id=$1', [product_id]);
    return res.rows[0];
  }

  async create({ product_name, description, price, stock }) {
    const res = await pool.query(
      `INSERT INTO products (product_name, description, price, stock)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [product_name, description, price, stock]
    );
    return res.rows[0];
  }

  async update(product_id, { product_name, description, price, stock }) {
    const res = await pool.query(
      `UPDATE products
       SET product_name=$1, description=$2, price=$3, stock=$4
       WHERE product_id=$5 RETURNING *`,
      [product_name, description, price, stock, product_id]
    );
    return res.rows[0];
  }

  async delete(product_id) {
    await pool.query('DELETE FROM products WHERE product_id=$1', [product_id]);
  }
}

module.exports = new ProductsService();
