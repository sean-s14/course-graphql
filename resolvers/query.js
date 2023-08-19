exports.Query = {
  products: (parent, { filter }, { products, reviews }) => {
    if (!filter) return products;
    return products.filter((product) => {
      if (filter.onSale && product.onSale !== filter.onSale) return false;
      if (filter.avgRating) {
        // Get all reviews for the current product
        const productReviews = reviews.filter(
          (review) => review.productId === product.id
        );

        // Calculate the average rating for the current product based on the reviews
        const avgRating =
          productReviews.reduce((acc, review) => acc + review.rating, 0) /
          productReviews.length;

        if (avgRating < filter.avgRating) return false;
      }
      if (filter.avgRating && product.avgRating < filter.avgRating)
        return false;
      return true;
    });
  },
  product: (parent, args, context) => {
    return context.products.find((product) => product.id === args.id);
  },
  categories: (parent, args, context) => context.categories,
  category: (parent, args, context) => {
    return context.categories.find((category) => category.id === args.id);
  },
};
