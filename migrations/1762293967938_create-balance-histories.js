exports.up = (pgm) => {
  pgm.createTable('balance_histories', {
    history_id: { type: 'bigserial'},
    user_id: { type: 'integer' },
    amount: { type: 'integer', notNull: true },
    transaction_type: { type: 'varchar(50)', notNull: true },
    description: { type: 'text' },
    created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('balance_histories');
};
