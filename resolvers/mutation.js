const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const newCategory = {
      id: uuid(),
      ...input,
    };
    categories.push(newCategory);
    return newCategory;
  },
  addProduct: (parent, { input }, { products }) => {
    const newProduct = {
      id: uuid(),
      ...input,
    };
    products.push(newProduct);
    return newProduct;
  },
  addReview: (parent, { input }, { reviews }) => {
    const newReview = {
      id: uuid(),
      date: new Date().toISOString(),
      ...input,
    };
    reviews.push(newReview);
    return newReview;
  },
  deleteCategory: (parent, { id }, { categories, products }) => {
    const categoryIndex = categories.findIndex(
      (category) => category.id === id
    );
    if (categoryIndex === -1) return false;

    // Change all products with this categoryId to be null
    products.forEach((product) => {
      if (product.categoryId === id) {
        product.categoryId = null;
      }
    });
    categories.splice(categoryIndex, 1);
    return true;
  },
  deleteProduct: (parent, { id }, { products, reviews }) => {
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) return false;

    // Delete all reviews with this productId
    reviews.forEach((review, index) => {
      if (review.productId === id) {
        reviews.splice(index, 1);
      }
    });

    products.splice(productIndex, 1);
    return true;
  },
  deleteReview: (parent, { id }, { reviews }) => {
    const reviewIndex = reviews.findIndex((review) => review.id === id);
    if (reviewIndex === -1) return false;
    reviews.splice(reviewIndex, 1);
    return true;
  },
  updateCategory: (parent, { id, input }, { categories }) => {
    const category = categories.find((category) => category.id === id);
    if (!category) return null;
    Object.assign(category, input);
    return category;
  },
  updateProduct: (parent, { id, input }, { products }) => {
    const product = products.find((product) => product.id === id);
    if (!product) return null;
    Object.assign(product, input);
    return product;
  },
  updateReview: (parent, { id, input }, { reviews }) => {
    const review = reviews.find((review) => review.id === id);
    if (!review) return null;
    Object.assign(review, input);
    return review;
  },
};
