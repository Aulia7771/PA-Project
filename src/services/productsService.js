module.exports = (cache, db) => {
  if (!db || typeof db.query !== "function") {
    throw new Error("ProductsService requires db with query()");
  }

  return {

    async getAll() {
      const { rows } = await db.query(
        "SELECT * FROM products ORDER BY product_id ASC"
      );
      return rows;
    },

    async getById(id) {
      const { rows } = await db.query(
        "SELECT * FROM products WHERE product_id = $1",
        [id]
      );
      return rows[0] || null;
    },

    async searchProducts({ keyword, min_price, max_price, category }) {
      let query = `
        SELECT product_id, product_name, price, stock, category
        FROM products
        WHERE 1=1
      `;
      const values = [];
      let i = 1;

      if (keyword) {
        query += ` AND (product_name ILIKE $${i} OR description ILIKE $${i})`;
        values.push(`%${keyword}%`);
        i++;
      }

      if (min_price) {
        query += ` AND price >= $${i}`;
        values.push(min_price);
        i++;
      }

      if (max_price) {
        query += ` AND price <= $${i}`;
        values.push(max_price);
        i++;
      }

      if (category) {
        query += ` AND category = $${i}`;
        values.push(category);
        i++;
      }

      query += " ORDER BY product_id ASC";

      const { rows } = await db.query(query, values);
      return rows;
    }
  };
};
