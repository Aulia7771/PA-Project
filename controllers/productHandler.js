const ProductService = require('../services/productService');

module.exports = {
  createProductHandler: async (request, h) => {
    const newProduct = await ProductService.createProduct(request.payload);
    return h.response(newProduct).code(201);
  },

  getAllProductsHandler: async (_, h) => {
    const products = await ProductService.getAllProducts();
    return h.response(products);
  },

  getProductByIdHandler: async (request, h) => {
    const { id } = request.params;
    const product = await ProductService.getProductById(id);
    if (!product) {
      return h.response({ message: 'Product not found' }).code(404);
    }
    return h.response(product);
  },

  updateProductHandler: async (request, h) => {
    const { id } = request.params;
    const updated = await ProductService.updateProduct(id, request.payload);
    if (!updated) {
      return h.response({ message: 'Product not found' }).code(404);
    }
    return h.response(updated);
  },

  deleteProductHandler: async (request, h) => {
    const { id } = request.params;
    await ProductService.deleteProduct(id);
    return h.response({ message: 'Product deleted' });
  },
};
