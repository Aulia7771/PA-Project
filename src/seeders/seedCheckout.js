const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding checkout...');
  const usersRes = await db.query('SELECT user_id FROM users');
  const userIds  = usersRes.rows.map(r => r.user_id);

  const inserts = [];
  const total   = 2000; 

  for (let i = 0; i < total; i++) {
    const user_id   = faker.helpers.arrayElement(userIds);
    const isBig     = faker.number.int({ min:1, max:100 }) > 85;
    const total_amount = isBig
      ? faker.number.int({ min:500000, max:5000000 })
      : faker.number.int({ min:10000, max:100000 });
    const status    = faker.helpers.arrayElement(['Pending','Success','Failed']);
    const checkoutAt = faker.date.recent({ days:30 });

    inserts.push([ user_id, total_amount, checkoutAt, status, checkoutAt ]);
  }

  const text = `
    INSERT INTO checkout (user_id, total_amount, checkout_at, status, updated_at)
    VALUES ${inserts.map((_, i) => `($${i*5+1}, $${i*5+2}, $${i*5+3}, $${i*5+4}, $${i*5+5})`).join(',')}
  `;
  const params = inserts.flat();
  await db.query(text, params);

  console.log(`Seeded checkout: ${inserts.length} entries`);
};
