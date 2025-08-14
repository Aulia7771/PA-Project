exports.up = (pgm) => {
  pgm.createTable('checkout', {
    checkout_id: {
      type: 'serial',
      primaryKey: false,
    },
    user_id: {
      type: 'integer',
      notNull: true,
    },
    total_amount: {
      type: 'integer',
      notNull: true,
    },
    checkout_at: {
      type: 'timestamp',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    status: {
      type: 'varchar(50)',
      default: 'Pending',
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('checkout');
};
