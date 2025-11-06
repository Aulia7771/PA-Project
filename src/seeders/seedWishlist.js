const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding wishlist...');
  const usersRes    = await db.query('SELECT user_id FROM users');
  const productsRes = await db.query('SELECT product_id FROM products');
  const userIds     = usersRes.rows.map(r => r.user_id);
  const productIds  = productsRes.rows.map(r => r.product_id);

  const inserts = [];
  const total = 1500; 

  for (let i = 0; i < total; i++) {
    const user_id    = faker.helpers.arrayElement(userIds);
    const product_id = faker.helpers.arrayElement(productIds);
    const addedAt    = faker.date.recent({ days:60 });

    inserts.push([user_id, product_id, addedAt]);
  }

  const text = `
    INSERT INTO wishlist (user_id, product_id, added_at)
    VALUES ${inserts.map((_, i) => `($${i*3+1}, $${i*3+2}, $${i*3+3})`).join(',')}
  `;
  const params = inserts.flat();
  await db.query(text, params);

  console.log(`Seeded wishlist: ${total} entries`);
};
