exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('products', {
    product_id: 'serial',
    product_name: { type: 'varchar(100)', notNull: true },
    description: { type: 'text' },
    price: { type: 'integer', notNull: true },
    stock: { type: 'integer', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('CURRENT_TIMESTAMP') },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('products');
};
