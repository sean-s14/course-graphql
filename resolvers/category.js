exports.Category = {
  products: (parent, args, context) => {
    const categoryProducts = context.products.filter(
      (product) => product.categoryId === parent.id
    );
    return categoryProducts.filter((product) => {
      if (!args.filter) return true;
      return Boolean(args.filter.onSale) === product.onSale;
    });
  },
};
