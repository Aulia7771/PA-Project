// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'ecommerce',
//   password: '1234567',
//   port: 5432,
// });

// module.exports = pool;
const { Pool } = require('pg');

let pool;

const connectDB = async () => {
  if (!pool) {
    pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'ecommerce',
      password: '1234567',
      port: 5432,
    });
  }

  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }

  return pool;
};

module.exports = connectDB;
