exports.up = (pgm) => {
  pgm.createTable('checkout', {
    checkout_id: 'serial',
    user_id: { type: 'integer' },
    total_amount: { type: 'integer' },
    checkout_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
    status: { type: 'varchar(50)', default: 'Pending' },
    updated_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('checkout');
};
