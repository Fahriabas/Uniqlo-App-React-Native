const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require("./schemas/user");
const { typeDefs: productTypeDefs, resolvers: productResolvers } = require("./schemas/product")



const server = new ApolloServer({
  typeDefs: [userTypeDefs, productTypeDefs],
  resolvers: [userResolvers, productResolvers],
  introspection : true
})

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000}
})
.then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
})
.catch((err) => {
  console.log(err);
})