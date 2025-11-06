const db = require('../db');
const ShoppingCartHandler = require("../handlers/shoppingCartHandler");
const {
  shoppingCartValidator,
} = require("../validators/shoppingCartValidator");

module.exports = [
  {
    method: "GET",
    path: "/shopping_cart",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM shopping_cart");
      return res.rows;
    },
  },
  { method: "GET", path: "/cart/{id}", handler: ShoppingCartHandler.getById },
  {
    method: "POST",
    path: "/cart",
    options: { validate: shoppingCartValidator },
    handler: ShoppingCartHandler.create,
  },
  {
    method: "PUT",
    path: "/cart/{id}",
    options: { validate: shoppingCartValidator },
    handler: ShoppingCartHandler.update,
  },
  { method: "DELETE", path: "/cart/{id}", handler: ShoppingCartHandler.remove },
];
