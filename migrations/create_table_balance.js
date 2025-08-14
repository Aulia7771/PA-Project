exports.up = (pgm) => {
  pgm.createTable('balance', {
    balance_id: {
      type: 'serial',
      primaryKey: false,
    },
    user_id: {
      type: 'integer',
    },
    balance_amount: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('balance');
};
