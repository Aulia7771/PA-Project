module.exports = (cache, db) => ({

  getAll: async () => {
    const { rows } = await db.query(
      "SELECT * FROM shopping_cart ORDER BY cart_id DESC"
    );
    return rows;
  },

  getById: async (id) => {
    const { rows } = await db.query(
      "SELECT * FROM shopping_cart WHERE cart_id=$1",
      [id]
    );
    return rows[0] || null;
  },

  getByUser: async (user_id) => {
    const { rows } = await db.query(
      "SELECT * FROM shopping_cart WHERE user_id=$1",
      [user_id]
    );
    return rows;
  },

  // Add to cart
  async add({ user_id, product_id, quantity }) {
    if (!user_id || !product_id || !quantity) {
      throw { statusCode: 400, message: "user_id, product_id, quantity wajib diisi" };
    }

    // ambil stock
    const productRes = await db.query(
      "SELECT stock FROM products WHERE product_id=$1",
      [product_id]
    );

    if (!productRes.rowCount) {
      throw { statusCode: 404, message: "Produk tidak ditemukan" };
    }

    const stock = Number(productRes.rows[0].stock);

    if (stock === 0) {
      throw { statusCode: 409, message: "Stock habis", stock: 0 };
    }

    // cek cart existing
    const cartRes = await db.query(
      "SELECT quantity FROM shopping_cart WHERE user_id=$1 AND product_id=$2",
      [user_id, product_id]
    );

    let newQty = quantity;

    if (cartRes.rows.length) {
      newQty += cartRes.rows[0].quantity;
    }

    if (newQty > stock) {
      throw {
        statusCode: 409,
        message: `Stock tersisa hanya ${stock}`,
        stock
      };
    }

    // upsert cart
    const result = cartRes.rows.length
      ? await db.query(
          `UPDATE shopping_cart
           SET quantity=$1
           WHERE user_id=$2 AND product_id=$3
           RETURNING *`,
          [newQty, user_id, product_id]
        )
      : await db.query(
          `INSERT INTO shopping_cart (user_id, product_id, quantity)
           VALUES ($1,$2,$3)
           RETURNING *`,
          [user_id, product_id, quantity]
        );

    if (cache) await cache.del(`cart:${user_id}`);

    return result.rows[0];
  }
});

