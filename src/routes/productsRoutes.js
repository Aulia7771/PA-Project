const db = require("../db");
const ProductsHandler = require("../handlers/productsHandler");
const ProductsValidator = require("../validators/productsValidator");

module.exports = [
  {
    method: "GET",
    path: "/products",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM products");
      return res.rows;
    },
  },
  {
    method: "GET",
    path: "/products/{id}",
    options: { auth: false, handler: ProductsHandler.get },
  },
  {
    method: "POST",
    path: "/products",
    options: {
      validate: { payload: ProductsValidator.create },
      handler: ProductsHandler.create,
    },
  },
  {
    method: "PUT",
    path: "/products/{id}",
    options: {
      validate: { payload: ProductsValidator.update },
      handler: ProductsHandler.update,
    },
  },
  {
    method: "DELETE",
    path: "/products/{id}",
    options: { handler: ProductsHandler.remove },
  },
];
