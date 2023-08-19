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
};
