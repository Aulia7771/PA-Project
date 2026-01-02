const db = require('../db');
const usersHandler = require("../handlers/usersHandler");
const usersValidator = require("../validators/usersValidator");

module.exports = [
  {
    method: "GET",
    path: "/users",
    options: { auth: false },
    handler: async () => {
      const res = await db.query("SELECT * FROM users ORDER BY user_id ASC");
      return res.rows;
    },
  },

  {
    method: "GET",
    path: "/users/{user_id}",
    options: { auth: false },
    handler: usersHandler.getById,
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

  {
    method: "GET",
    path: "/me",
    options: { auth: "jwt" },
    handler: usersHandler.me,
  }
];
