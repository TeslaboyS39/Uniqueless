const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { productTypeDefs, productResolvers } = require("./schema/productSchema");
const { userTypeDefs, userResolvers } = require("./schema/userSchema");

const server = new ApolloServer({
  typeDefs: [productTypeDefs, userTypeDefs],
  resolvers: [productResolvers, userResolvers],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
