const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require('@apollo/federation');

require('./datastore/utils.js');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Query {
    me: User
  }

  type User @key (fields: "id"){
    id: ID!
    username: String!
    first_name: String
    last_name: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    me() {
      return { id: "1", username: "nuttyket", first_name: "Nachiket", last_name: "Joshi" }
    },

    User: {
      __resolverreference(user, {fetchUserById}) {
        return fetchUserById(user.id);
      }
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }])
});

server.listen().then(({ url }) => {
  console.log(`🚀 [Federation Enabled] Server ready at ${url}`);
});
