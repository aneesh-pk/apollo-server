const {ApolloServer, gql} = require('apollo-server');
const {
    login,
    createUser
} = require("./models/mutations/mutation");

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const {Users} = require("./models/Users");
const {UserFiles} = require("./models/Files");


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type User {
    id: Int
    username: String
    password: String
    email: String
  }
  
  type LoginResponse {
    success: Boolean
    info: String
    user: User
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    users: [User]
  }
  
  type Mutation{
    login(username: String, password: String): LoginResponse
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
    Query: {
        users: () => Users.collection().fetch().then(function (user) {
            return user.toJSON()
        }),
    },
    Mutation: {
        login: (gql, {username, password}) => login(username, password).then(user => {
            return user;
        }),
        create_user: (gql, {username, password, email}) => createUser(username, password, email).then(user => {
            return user;
        })
    },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({typeDefs, resolvers});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});