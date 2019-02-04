const { gql } = require("apollo-server");

const typeDef = gql`
  input loginInput {
    email: String
    password: String
  }

  input userRegisterInput {
    email: String
    password: String,
    name: String
  }

  input userUpdateInput {
    name: String
  }

  type LoginResponse {
    success: Boolean
    token: String
    info: String
    user: User
  }

  type User {
    id: Int
    name: String
    password: String
    email: String
  }
  
  
  type CreateUserResponse {
    success: Boolean
    info: String
    user : User
  }

  type UpdateUserResponse {
    success: Boolean
    info: String
    user : User
  }
  
  type DeleteUserResponse {
    success: Boolean
    info: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  extend type Query{
    user: User @auth
  }
  
  extend type Mutation{
    login(user: loginInput): LoginResponse,
    create_user(user: userRegisterInput): CreateUserResponse
    update_user(user: userUpdateInput): UpdateUserResponse @auth
    delete_user: DeleteUserResponse @auth
  }
`;


module.exports.typeDef = typeDef;