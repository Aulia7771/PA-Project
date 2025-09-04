const Hapi = require('@hapi/hapi');
const cartRoutes = require('./routes/usersRoutes');
const connectDB = require('./db');

const init = async () => {
  await connectDB();
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route(cartRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();