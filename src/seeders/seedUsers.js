const db = require('../db');
const bcrypt = require('bcrypt');  
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding users...');
  const users = [];
  const total = 1000; 

  for (let i = 0; i < total; i++) {
    const firstName = faker.person.firstName();
    const lastName  = faker.person.lastName();
    const username  = `${firstName}${lastName}${faker.number.int({ min:10, max:99 })}`.toLowerCase();
    const email     = faker.internet.email({ firstName, lastName }).toLowerCase();
    const rawPass   = faker.internet.password(8);
    const password  = await bcrypt.hash(rawPass, 10);

    const countryCode = faker.number.int({ min:1, max:999 });
    const phoneSuffix = faker.string.numeric(faker.number.int({ min:8, max:10 }));
    const phoneNumber = `${countryCode}${phoneSuffix}`;

    users.push([
      username,
      email,
      password,
      faker.person.fullName({ firstName, lastName }),
      faker.location.streetAddress(),
      countryCode,
      phoneNumber
    ]);
  }

  const text = `
    INSERT INTO users (username, email, password_hash, full_name, address, country_code, phone_number)
    VALUES ${users.map((_, i) => `($${i*7+1}, $${i*7+2}, $${i*7+3}, $${i*7+4}, $${i*7+5}, $${i*7+6}, $${i*7+7})`).join(',')}
    RETURNING user_id
  `;
  const params = users.flat();
  const res = await db.query(text, params);
  console.log(`Seeded users: ${res.rowCount || res.rows.length} entries`);
};
