const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding balance_histories...');
  const usersRes = await db.query('SELECT user_id FROM users');
  const userIds  = usersRes.rows.map(r => r.user_id);

  const inserts = [];
  const total = userIds.length * 3; 

  for (let i = 0; i < total; i++) {
    const user_id         = faker.helpers.arrayElement(userIds);
    const amount          = faker.number.int({ min:10, max:500000 });
    const transactionType = faker.helpers.arrayElement(['Topup', 'Purchase', 'Refund']);
    const description     = faker.lorem.sentence();
    const createdAt       = faker.date.recent({ days:90 });

    inserts.push([user_id, amount, transactionType, description, createdAt]);
  }

  const text = `
    INSERT INTO balance_histories (user_id, amount, transaction_type, description, created_at)
    VALUES ${inserts.map((_, i) => `($${i*5+1}, $${i*5+2}, $${i*5+3}, $${i*5+4}, $${i*5+5})`).join(',')}
  `;
  const params = inserts.flat();
  await db.query(text, params);

  console.log(`Seeded balance_histories: ${inserts.length} entries`);
};
