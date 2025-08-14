exports.up = (pgm) => {
  pgm.createTable('payment', {
    payment_id: {
      type: 'serial',
      primaryKey: false,
    },
    checkout_id: {
      type: 'integer',
      notNull: true,
    },
    payment_method: {
      type: 'varchar(50)',
      notNull: true,
    },
    payment_status: {
      type: 'varchar(50)',
      notNull: true,
    },
    paid_at: {
      type: 'timestamp',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('payment');
};
