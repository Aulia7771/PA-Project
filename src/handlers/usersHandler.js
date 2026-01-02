const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const config = require('../config');

const saltRounds = 10;

module.exports = {
  register: async (request, h) => {
    const { username, email, password, full_name, address, country_code, phone_number } = request.payload;

    try {
      // email unik
      const exists = await db.query(
        'SELECT user_id FROM users WHERE email=$1',
        [email]
      );
      if (exists.rows.length)
        return h.response({ error: 'Email already registered' }).code(400);

      const password_hash = await bcrypt.hash(password, saltRounds);

      const result = await db.query(
        `INSERT INTO users (username, email, password_hash, full_name, address, country_code, phone_number)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         RETURNING user_id, username, email, full_name`,
        [username, email, password_hash, full_name, address, country_code, phone_number]
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
      const res = await db.query(
        'SELECT user_id, username, email, password_hash FROM users WHERE email=$1',
        [email]
      );

      if (!res.rows.length)
        return h.response({ error: 'Invalid email or password' }).code(401);

      const user = res.rows[0];

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match)
        return h.response({ error: 'Invalid email or password' }).code(401);

      const token = jwt.sign(
        { user_id: user.user_id, username: user.username, email: user.email },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      return h.response({
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          email: user.email
        }
      });

    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  getById: async (request, h) => {
    const { user_id } = request.params;

    try {
      const res = await db.query(
        'SELECT user_id, username, email, full_name, address, country_code, phone_number FROM users WHERE user_id=$1',
        [user_id]
      );

      if (!res.rows.length)
        return h.response({ error: 'User not found' }).code(404);

      return h.response(res.rows[0]);

    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  me: async (request, h) => {
    const cred = request.auth.credentials;
    return h.response({ user: cred });
  },
};
