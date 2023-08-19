const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./schema");
const { products, categories, reviews } = require("./db");
const { Query } = require("./resolvers/query");
const { Product } = require("./resolvers/product");
const { Category } = require("./resolvers/category");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Product,
    Category,
  },
  context: {
    products,
    categories,
    reviews,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
