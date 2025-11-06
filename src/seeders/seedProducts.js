const db = require('../db');
const { faker } = require('@faker-js/faker');

module.exports = async () => {
  console.log('Seeding products...');
  const products = [];
  const total = 1000; 

  for (let i = 0; i < total; i++) {
    const productName = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const price       = faker.number.int({ min:10000, max:3000000 });
    const stock       = faker.number.int({ min:0, max:500 });
    const createdAt   = faker.date.past({ years: 2 });

    products.push([
      productName,
      description,
      price,
      stock,
      createdAt
    ]);
  }

  const text = `
    INSERT INTO products (product_name, description, price, stock, created_at)
    VALUES ${products.map((_, i) => `($${i*5+1}, $${i*5+2}, $${i*5+3}, $${i*5+4}, $${i*5+5})`).join(',')}
    RETURNING product_id
  `;
  const params = products.flat();
  const res = await db.query(text, params);
  console.log(`Seeded products: ${res.rowCount || res.rows.length} entries`);
};
