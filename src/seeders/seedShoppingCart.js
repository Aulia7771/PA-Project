const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding shopping_cart...');
  const usersRes    = await db.query('SELECT user_id FROM users');
  const productsRes = await db.query('SELECT product_id FROM products');
  const userIds     = usersRes.rows.map(r => r.user_id);
  const productIds  = productsRes.rows.map(r => r.product_id);

  const inserts = [];
  const total = 2000; 

  for (let i = 0; i < total; i++) {
    const user_id    = faker.helpers.arrayElement(userIds);
    const product_id = faker.helpers.arrayElement(productIds);
    const quantity   = faker.number.int({ min:1, max:5 });
    const addedAt    = faker.date.recent({ days:30 });

    inserts.push([user_id, product_id, quantity, addedAt]);
  }

  const text = `
    INSERT INTO shopping_cart (user_id, product_id, quantity, added_at)
    VALUES ${inserts.map((_, i) => `($${i*4+1}, $${i*4+2}, $${i*4+3}, $${i*4+4})`).join(',')}
  `;
  const params = inserts.flat();
  await db.query(text, params);

  console.log(`Seeded shopping_cart: ${total} entries`);
};
