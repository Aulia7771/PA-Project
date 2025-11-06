const Hapi = require('@hapi/hapi');
const jwt = require('hapi-auth-jwt2');
const config = require('./config');
const usersRoutes = require('./routes/usersRoutes');
const productsRoutes = require('./routes/productsRoutes');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const balanceHistoriesRoutes = require('./routes/balanceHistoriesRoutes');
const checkoutItemsRoutes = require('./routes/checkoutItemsRoutes');

const validateUser = async (decoded, request, h) => {
  // decoded: payload from JWT
  // Simple check: ensure user id exists in token
  if (decoded && decoded.id) {
    return { isValid: true };
  }
  return { isValid: false };
};

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register(jwt);

  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate: validateUser,
    verifyOptions: { algorithms: ['HS256'] }
  });

  server.auth.default('jwt');

  // public routes (register/login) will explicitly set auth: false
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
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
