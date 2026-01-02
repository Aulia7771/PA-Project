const productsHandler = require("../handlers/productsHandler");

module.exports = (service) => {
  const handler = productsHandler(service);

  return [
    {
      method: "GET",
      path: "/products",
      handler: handler.getAll,
      options: { auth: false }
    },
    {
      method: "GET",
      path: "/products/{id}",
      handler: handler.getById,
      options: { auth: false }
    },
    {
      method: "GET",
      path: "/products/search",
      handler: handler.searchProducts,
      options: { auth: false }
    }
  ];
};
