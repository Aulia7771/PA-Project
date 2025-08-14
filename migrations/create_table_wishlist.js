exports.up = (pgm) => {
  pgm.createTable('wishlist', {
    wishlist_id: {
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
    added_at: {
      type: 'timestamp',
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('wishlist');
};
