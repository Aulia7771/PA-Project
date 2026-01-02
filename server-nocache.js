require('dotenv').config();

const Hapi = require('@hapi/hapi');
const jwt = require('hapi-auth-jwt2');

const config = require('./src/config');
const db = require('./src/db');

const productsService =
  require('./src/services/productsService')(null, db);

const cartService =
  require('./src/services/shoppingCartService')(null, db);

const checkoutService =
  require('./src/services/checkoutService')(db); 

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
  if (decoded && decoded.id) return { isValid: true };
  return { isValid: false };
};

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  await server.register(jwt);

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validateUser,
    verifyOptions: { algorithms: ["HS256"] }
  });

  server.auth.default('jwt');

  server.route([
    ...usersRoutes,
    ...productsRoutes,
    ...shoppingCartRoutes,
    ...checkoutRoutes,
    ...checkoutItemsRoutes,
    ...paymentRoutes,
    ...balanceRoutes,
    ...wishlistRoutes,
    ...balanceHistoriesRoutes,
  ]);

  await server.start();
  console.log("Server WITHOUT CACHE running on", server.info.uri);
};

init();
