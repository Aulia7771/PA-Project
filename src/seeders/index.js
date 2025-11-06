(async () => {
  try {
    console.log('Starting seed process...');
    await require('./seedUsers')();
    await require('./seedProducts')();
    await require('./seedBalance')();
    await require('./seedBalanceHistories')();
    await require('./seedShoppingCart')();
    await require('./seedWishlist')();
    await require('./seedCheckout')();
    await require('./seedCheckoutItems')();
    await require('./seedPayment')();
    
    console.log('All seed processes completed successfully');
    process.exit(0);
  } catch (err) {
    console.error('Seed process failed:', err);
    process.exit(1);
  }
})();
