exports.up = (pgm) => {
  pgm.createTable('checkout_items', {
    checkout_item_id: 'serial',
    checkout_id: { type: 'integer' },
    product_id: { type: 'integer' },
    quantity: { type: 'integer' },
    price: { type: 'integer', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
    updated_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('checkout_items');
};
