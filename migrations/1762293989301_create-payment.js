exports.up = (pgm) => {
  pgm.createTable('payment', {
    payment_id: 'serial',
    checkout_id: { type: 'integer' },
    payment_method: { type: 'varchar(50)' },
    payment_status: { type: 'varchar(50)' },
    paid_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('payment');
};
