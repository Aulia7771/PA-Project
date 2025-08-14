exports.up = (pgm) => {
  pgm.createTable('shopping_cart', {
    cart_id: {
      type: 'serial',
      primaryKey: false,
    },
    user_id: {
      type: 'integer',
      notNull: true,
    },
    product_id: {
      type: 'integer',
      notNull: true,
    },
    quantity: {
      type: 'integer',
      default: 1,
    },
    added_at: {
      type: 'timestamp',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('shopping_cart');
};
