const { ApolloServer, gql } = require("apollo-server");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Query {
    me: User
  }

  type User {
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
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 [Custom] Server ready at ${url}`);
});
