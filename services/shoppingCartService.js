const db = require('../db');

const addItem = async (payload) => {
  const { user_id, product_id, quantity } = payload;
  const result = await db.query(
    'INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
    [user_id, product_id, quantity || 1]
  );
  return result.rows[0];
};

const getItems = async () => {
  const result = await db.query('SELECT * FROM shopping_cart ORDER BY added_at DESC');
  return result.rows;
};

const updateItem = async (id, payload) => {
  const { quantity } = payload;
  const result = await db.query(
    'UPDATE shopping_cart SET quantity = $1 WHERE cart_id = $2 RETURNING *',
    [quantity, id]
  );
  return result.rows[0];
};

const deleteItem = async (id) => {
  await db.query('DELETE FROM shopping_cart WHERE cart_id = $1', [id]);
};

module.exports = {
  addItem,
  getItems,
  updateItem,
  deleteItem,
};
