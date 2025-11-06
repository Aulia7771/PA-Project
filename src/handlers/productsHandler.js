const db = require('../db');

module.exports = {
  list: async (request, h) => {
    try {
      const { rows } = await db.query('SELECT id, name, description, price, stock, created_at FROM products ORDER BY created_at DESC');
      return h.response({ products: rows });
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  get: async (request, h) => {
    try {
      const id = request.params.id;
      const { rows } = await db.query('SELECT id, name, description, price, stock FROM products WHERE id = $1', [id]);
      if (!rows.length) return h.response({ error: 'Product not found' }).code(404);
      return h.response({ product: rows[0] });
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  create: async (request, h) => {
    const { name, description, price, stock } = request.payload;
    try {
      const { rows } = await db.query(
        'INSERT INTO products (name, description, price, stock) VALUES ($1,$2,$3,$4) RETURNING id, name, description, price, stock, created_at',
        [name, description, price, stock]
      );
      return h.response({ product: rows[0] }).code(201);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  update: async (request, h) => {
    const id = request.params.id;
    const fields = request.payload;
    const keys = Object.keys(fields);
    if (!keys.length) return h.response({ error: 'No fields to update' }).code(400);

    // build dynamic SET
    const setClauses = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
    const values = keys.map(k => fields[k]);
    values.push(id);
    const sql = `UPDATE products SET ${setClauses}, updated_at = now() WHERE id = $${values.length} RETURNING id, name, description, price, stock`;

    try {
      const { rows } = await db.query(sql, values);
      if (!rows.length) return h.response({ error: 'Product not found' }).code(404);
      return h.response({ product: rows[0] });
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  remove: async (request, h) => {
    const id = request.params.id;
    try {
      const { rowCount } = await db.query('DELETE FROM products WHERE id = $1', [id]);
      if (!rowCount) return h.response({ error: 'Product not found' }).code(404);
      return h.response({ message: 'Deleted' });
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  }
};
