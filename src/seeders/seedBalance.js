const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding balance...');
  const usersRes = await db.query('SELECT user_id FROM users');
  const userIds  = usersRes.rows.map(r => r.user_id);

  const inserts = [];
  const total = userIds.length; 

  for (const user_id of userIds) {
    const balanceAmount = faker.number.int({ min:0, max:1000000 });
    const createdAt     = faker.date.past({ years:1 });
    const updatedAt     = faker.date.between({ from: createdAt, to: new Date() });

    inserts.push([user_id, balanceAmount, createdAt, updatedAt]);
  }

  const text = `
    INSERT INTO balance (user_id, balance_amount, created_at, updated_at)
    VALUES ${inserts.map((_, i) => `($${i*4+1}, $${i*4+2}, $${i*4+3}, $${i*4+4})`).join(',')}
  `;
  const params = inserts.flat();
  await db.query(text, params);

  console.log(`Seeded balance: ${inserts.length} entries`);
};
