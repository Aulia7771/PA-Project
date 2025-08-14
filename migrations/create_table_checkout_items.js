exports.up = (pgm) => {
  pgm.createTable('checkout_items', {
    checkout_item_id: {
      type: 'serial',
      primaryKey: false,
    },
    checkout_id: {
      type: 'integer',
      notNull: true,
    },
    product_id: {
      type: 'integer',
      notNull: true,
    },
    quantity: {
      type: 'integer',
    },
    price: {
      type: 'integer',
      notNull: true,
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
  pgm.dropTable('checkout_items');
};
