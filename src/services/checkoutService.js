module.exports = (db) => ({

  checkout: async ({ cart_id, payment_method }) => {
    if (!cart_id || !payment_method) {
      throw new Error("cart_id dan payment_method wajib diisi");
    }

    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // 1. Ambil cart + product (LOCK)
      const cartRes = await client.query(
        `SELECT c.cart_id, c.user_id, c.product_id, c.quantity,
                p.price, p.stock
         FROM shopping_cart c
         JOIN products p ON p.product_id = c.product_id
         WHERE c.cart_id = $1
         FOR UPDATE`,
        [cart_id]
      );

      if (!cartRes.rows.length) {
        throw new Error("Cart tidak ditemukan");
      }

      const cart = cartRes.rows[0];
      const { user_id, product_id, quantity, price, stock } = cart;

      // 2. Validasi stock
      if (stock === 0) {
        throw new Error("Stock produk habis");
      }

      if (quantity > stock) {
        throw new Error(`Stock tersisa hanya ${stock}`);
      }

      const total = price * quantity;

      // 3. Lock & cek balance
      const balanceRes = await client.query(
        "SELECT balance_amount FROM balance WHERE user_id=$1 FOR UPDATE",
        [user_id]
      );

      if (!balanceRes.rows.length) {
        throw new Error("Balance user tidak ditemukan");
      }

      const currentBalance = Number(balanceRes.rows[0].balance_amount);

      if (currentBalance < total) {
        throw new Error("Saldo tidak mencukupi");
      }

      // 4. Insert checkout
      const checkoutRes = await client.query(
        `INSERT INTO checkout (user_id, total_amount, status)
         VALUES ($1,$2,'PAID')
         RETURNING checkout_id`,
        [user_id, total]
      );

      const checkout_id = checkoutRes.rows[0].checkout_id;

      // 5. Checkout items
      await client.query(
        `INSERT INTO checkout_items (checkout_id, product_id, quantity, price)
         VALUES ($1,$2,$3,$4)`,
        [checkout_id, product_id, quantity, price]
      );

      // 6. Reduce stock
      await client.query(
        "UPDATE products SET stock = stock - $1 WHERE product_id=$2",
        [quantity, product_id]
      );

      // 7. Reduce balance 
      await client.query(
        "UPDATE balance SET balance_amount = balance_amount - $1 WHERE user_id=$2",
        [total, user_id]
      );

      // 8. Balance history
      await client.query(
        `INSERT INTO balance_histories (user_id, amount, transaction_type, description)
         VALUES ($1,$2,'Purchase','Checkout')`,
        [user_id, total]
      );

      // 9. Payment
      await client.query(
        `INSERT INTO payment (checkout_id, payment_method, payment_status, paid_at)
         VALUES ($1,$2,'Success',NOW())`,
        [checkout_id, payment_method]
      );

      // 10. Clear cart
      await client.query(
        "DELETE FROM shopping_cart WHERE cart_id=$1",
        [cart_id]
      );

      await client.query("COMMIT");

      return {
        message: "Checkout berhasil",
        checkout_id,
        total
      };

    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

});
