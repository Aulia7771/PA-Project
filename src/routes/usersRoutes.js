const db = require('../db');
const usersHandler = require("../handlers/usersHandler");
const usersValidator = require("../validators/usersValidator");

module.exports = [
  {
    method: "GET",
    path: "/users",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM users");
      return res.rows;
    },
  },
  {
    method: "POST",
    path: "/users",
    options: { auth: false },
    handler: usersHandler.register,
  },
  {
    method: "POST",
    path: "/login",
    options: { auth: false },
    handler: usersHandler.login,
  },
];
