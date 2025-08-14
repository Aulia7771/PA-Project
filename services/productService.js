const db = require('../db');

const createProduct = async ({ product_name, description, price, stock }) => {
  const result = await db.query(
    `INSERT INTO products (product_name, description, price, stock)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [product_name, description, price, stock]
  );
  return result.rows[0];
};

const getAllProducts = async () => {
  const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
  return result.rows;
};

const getProductById = async (id) => {
  const result = await db.query('SELECT * FROM products WHERE product_id = $1', [id]);
  return result.rows[0];
};

const updateProduct = async (id, { product_name, description, price, stock }) => {
  const result = await db.query(
    `UPDATE products
     SET product_name = $1, description = $2, price = $3, stock = $4
     WHERE product_id = $5 RETURNING *`,
    [product_name, description, price, stock, id]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  await db.query('DELETE FROM products WHERE product_id = $1', [id]);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
