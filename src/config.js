require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'fab8568990cf761e33e81e15f97afeb316d193171432628b73e7d66fa06f3647',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || 'ecommerce',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234567'
  }
};
