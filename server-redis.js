require('dotenv').config({ path: '.env.redis' });

const Hapi = require('@hapi/hapi');
const jwt = require('hapi-auth-jwt2');

const config = require('./src/config');
const db = require('./src/db');

// REDIS CACHE
const redisClient = require('./src/cache/redisClient');
const cache = redisClient(process.env.CACHE_HOST, process.env.CACHE_PORT);

// SERVICES (WITH CACHE)
const productsService = require('./src/services/productsService')(cache, db);
const cartService = require('./src/services/shoppingCartService')(cache, db);
const checkoutService = require('./src/services/checkoutService')(cache, db);

// ROUTES
const usersRoutes = require('./src/routes/usersRoutes');
const productsRoutes = require('./src/routes/productsRoutes')(productsService);
const shoppingCartRoutes = require('./src/routes/shoppingCartRoutes')(cartService);
const checkoutRoutes = require('./src/routes/checkoutRoutes')(checkoutService);
const checkoutItemsRoutes = require('./src/routes/checkoutItemsRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const balanceRoutes = require('./src/routes/balanceRoutes');
const wishlistRoutes = require('./src/routes/wishlistRoutes');
const balanceHistoriesRoutes = require('./src/routes/balanceHistoriesRoutes');

const validateUser = async (decoded) => {
  return decoded && decoded.id ? { isValid: true } : { isValid: false };
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    host: 'localhost',
  });

  await server.register(jwt);

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validateUser,
    verifyOptions: { algorithms: ["HS256"] },
  });

  // DEFAULT JWT AUTH
  server.auth.default('jwt');

  // OPEN ROUTES (tanpa login)
  const openRoutes = [
    ...productsRoutes,
    ...shoppingCartRoutes
  ].map(r => ({ ...r, options: { auth: false } }));

  server.route([
    ...usersRoutes,
    ...openRoutes,
    ...checkoutRoutes,
    ...checkoutItemsRoutes,
    ...paymentRoutes,
    ...balanceRoutes,
    ...wishlistRoutes,
    ...balanceHistoriesRoutes
  ]);

  await server.start();
  console.log("Server WITH REDIS CACHE running on", server.info.uri);
};

init();
