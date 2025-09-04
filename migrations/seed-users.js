import pkg from 'pg';
import { faker } from '@faker-js/faker';

const { Client } = pkg;

async function seedUsers() {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce',
    password: '1234567',
    port: 5432,
  });

  await client.connect();

  console.log('Mulai generate 1 juta data dummy...');

  const batchSize = 10000;
  const totalRecords = 1000000;

  for (let i = 0; i < totalRecords; i += batchSize) {
    const values = [];

    for (let j = 0; j < batchSize; j++) {
      const username = faker.internet.username();
      const email = faker.internet.email();
      const password_hash = faker.internet.password({ length: 20 });
      const full_name = faker.person.fullName();
      const address = faker.location.streetAddress();
      const country_code = faker.number.int({ min: 1, max: 999 });
      const phone_number = faker.number.int({ min: 1000000000, max: 9999999999 });
      const created_at = faker.date.recent({ days: 365 }).toISOString();

      values.push(
        `('${username}', '${email}', '${password_hash}', '${full_name}', '${address}', ${country_code}, ${phone_number}, '${created_at}')`
      );
    }

    const query = `
      INSERT INTO users (username, email, password_hash, full_name, address, country_code, phone_number, created_at)
      VALUES ${values.join(', ')}
    `;

    await client.query(query);
    console.log(`Inserted ${i + batchSize} / ${totalRecords}`);
  }

  await client.end();
  console.log('✅ Selesai insert 1 juta data dummy!');
}

seedUsers().catch(err => console.error(err));
