exports.up = (pgm) => {
  pgm.createTable('shopping_cart', {
    cart_id: 'serial',
    user_id: { type: 'integer' },
    product_id: { type: 'integer' },
    quantity: { type: 'integer', default: 1 },
    added_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('shopping_cart');
};
