const { ApolloServer, gql } = require("apollo-server");
const users = require("./app/src/users");
const { AuthDirective } = require("./app/src/directives/requireAuthDirective");

const typeDef = gql`
  directive @auth on FIELD_DEFINITION
  type Query
  type Mutation
`;

const server = new ApolloServer({
  typeDefs: [typeDef, users.typeDef],
  resolvers: [users.resolvers],
  schemaDirectives: {
    auth: AuthDirective,
  },
  context: ({ req, res }) => (
    {
      token: req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : ""
    }
  ),
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});