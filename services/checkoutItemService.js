const db = require('../db');

const createCheckoutItem = async ({ checkout_id, product_id, quantity, price }) => {
  const result = await db.query(
    `INSERT INTO checkout_items (checkout_id, product_id, quantity, price) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [checkout_id, product_id, quantity || 1, price]
  );
  return result.rows[0];
};

const getAllCheckoutItems = async () => {
  const result = await db.query('SELECT * FROM checkout_items ORDER BY created_at DESC');
  return result.rows;
};

const updateCheckoutItem = async (checkout_item_id, { quantity, price }) => {
  const result = await db.query(
    `UPDATE checkout_items 
     SET quantity = $1, price = $2, updated_at = CURRENT_TIMESTAMP 
     WHERE checkout_item_id = $3 RETURNING *`,
    [quantity, price, checkout_item_id]
  );
  return result.rows[0];
};

const deleteCheckoutItem = async (checkout_item_id) => {
  await db.query('DELETE FROM checkout_items WHERE checkout_item_id = $1', [checkout_item_id]);
};

module.exports = {
  createCheckoutItem,
  getAllCheckoutItems,
  updateCheckoutItem,
  deleteCheckoutItem,
};
