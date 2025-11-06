const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');

const saltRounds = 10;

module.exports = {
  register: async (request, h) => {
    const { name, email, password } = request.payload;
    try {
      // check existing
      const { rows } = await db.query('SELECT id FROM users WHERE email = $1', [email]);
      if (rows.length) return h.response({ error: 'Email already registered' }).code(400);

      const hashed = await bcrypt.hash(password, saltRounds);
      const result = await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email, created_at`,
        [name, email, hashed]
      );
      return h.response({ user: result.rows[0] }).code(201);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  login: async (request, h) => {
    const { email, password } = request.payload;
    try {
      const { rows } = await db.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
      if (!rows.length) return h.response({ error: 'Invalid credentials' }).code(401);

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return h.response({ error: 'Invalid credentials' }).code(401);

      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, config.jwtSecret, { expiresIn: '7d' });
      return h.response({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  me: async (request, h) => {
    // request.auth.credentials not populated by our simple validate but token payload is available on request.auth.credentials
    // hapi-auth-jwt2 puts payload into request.auth.credentials
    const cred = request.auth.credentials || {};
    return h.response({ user: cred }).code(200);
  }
};
