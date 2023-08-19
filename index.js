const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./schema");
const { products, categories, reviews } = require("./db");
const { Query } = require("./resolvers/query");
const { Mutation } = require("./resolvers/mutation");
const { Product } = require("./resolvers/product");
const { Category } = require("./resolvers/category");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
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
