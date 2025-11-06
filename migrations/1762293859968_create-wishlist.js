exports.up = (pgm) => {
  pgm.createTable('wishlist', {
    wishlist_id: 'serial',
    user_id: { type: 'integer' },
    product_id: { type: 'integer' },
    added_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('wishlist');
};
