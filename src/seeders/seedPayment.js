const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding payment...');
  const checkoutRes = await db.query('SELECT checkout_id FROM checkout WHERE status = \'Success\'');
  const checkoutIds = checkoutRes.rows.map(r => r.checkout_id);
                                                                                                                      
  const inserts = [];
  const total = Math.floor(checkoutIds.length * 0.6);

  for (let i = 0; i < total; i++) {
    const checkout_id   = faker.helpers.arrayElement(checkoutIds);
    const method        = faker.helpers.arrayElement(['CreditCard','BankTransfer','E-Wallet']);
    const paymentStatus = faker.helpers.arrayElement(['Paid','Pending','Failed']);
    const paidAt        = paymentStatus === 'Paid' ? faker.date.recent({ days:10 }) : null;

    inserts.push([ checkout_id, method, paymentStatus, paidAt ]);
  }

  const text = `
    INSERT INTO payment (checkout_id, payment_method, payment_status, paid_at)
    VALUES ${inserts.map((_, i) => `($${i*4+1}, $${i*4+2}, $${i*4+3}, $${i*4+4})`).join(',')}
  `;
  const params = inserts.flat();
  await db.query(text, params);

  console.log(`Seeded payment: ${inserts.length} entries`);
};
