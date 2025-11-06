const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding checkout_items...');
  const checkoutRes = await db.query('SELECT checkout_id FROM checkout');
  const productRes  = await db.query('SELECT product_id, price FROM products');
  const checkoutIds = checkoutRes.rows.map(r => r.checkout_id);
  const products   = productRes.rows;

  const inserts = [];

  for (const checkout_id of checkoutIds) {
    const numItems   = faker.number.int({ min:1, max:5 });
    for (let j = 0; j < numItems; j++) {
      const prod     = faker.helpers.arrayElement(products);
      const quantity = faker.number.int({ min:1, max:3 });
      const price    = prod.price;
      const created  = faker.date.recent({ days:30 });
      const updated  = created;

      inserts.push([ checkout_id, prod.product_id, quantity, price, created, updated ]);
    }
  }

  const text = `
    INSERT INTO checkout_items (checkout_id, product_id, quantity, price, created_at, updated_at)
    VALUES ${inserts.map((_, i) => `($${i*6+1}, $${i*6+2}, $${i*6+3}, $${i*6+4}, $${i*6+5}, $${i*6+6})`).join(',')}
  `;
  const params = inserts.flat();
  await db.query(text, params);

  console.log(`Seeded checkout_items: ${inserts.length} entries`);
};
