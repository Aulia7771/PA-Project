exports.up = (pgm) => {
  pgm.createTable('users', {
    user_id: 'serial',
    username: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(100)', notNull: true },
    password_hash: { type: 'varchar(255)', notNull: true },
    full_name: { type: 'varchar(100)' },
    address: { type: 'varchar(255)' },
    country_code: { type: 'smallint' },
    phone_number: { type: 'bigint' },
    created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
